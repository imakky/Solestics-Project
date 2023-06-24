import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Matcher,
  useSearchActions,
  SelectableStaticFilter,
  useSearchState,
  FieldValueFilter,
  NumberRangeValue,
} from "@yext/search-headless-react";
import { Range, getTrackBackground } from "react-range";
import { twMerge } from "tailwind-merge";
import { debounce } from "lodash";
import { IRenderThumbParams, IRenderTrackParams } from "react-range/lib/types";

interface PriceSliderProps {
  title?: string;
  min?: number;
  max?: number;
  step?: number;
  customCssClasses?: {
    title?: string;
    outerContainer?: string;
    sliderContainer?: string;
  };
}

const STEP = 1;
const MIN = 0;
const MAX = 100;

export const PriceSlider = ({
  min,
  max,
  step,
  title,
  customCssClasses,
}: PriceSliderProps): JSX.Element => {
  const [priceValues, setPriceValues] = useState<number[]>([
    min ?? MIN,
    max ?? MAX,
  ]);

  const searchActions = useSearchActions();
  const filters = useSearchState((state) => state.filters.static);

  useEffect(() => {
    const priceFilter = filters?.find(
      (filter) =>
        filter.filter.kind === "fieldValue" &&
        filter.filter.fieldId === "c_variantBeverages.c_price"
    )?.filter as FieldValueFilter | undefined;
    if (priceFilter) {
      const priceRange = priceFilter.value as NumberRangeValue;
      const startValue = priceRange.start?.value;
      const endValue = priceRange.end?.value;
      setPriceValues([startValue ?? MIN, endValue ?? MAX]);
    }
  }, [filters]);

  const setPriceFilter = (values: number[]): void => {
    const [priceMin, priceMax] = values;

    const filteredFilters =
      filters?.reduce((fieldValueFilters: SelectableStaticFilter[], ssf) => {
        if (
          ssf.filter.kind === "fieldValue" &&
          ssf.filter.fieldId !== "c_variantBeverages.c_price"
        ) {
          fieldValueFilters.push(ssf);
        }
        return fieldValueFilters;
      }, []) ?? [];

    const priceFilter: SelectableStaticFilter = {
      selected: true,
      filter: {
        fieldId: "c_variantBeverages.c_price",
        kind: "fieldValue",
        matcher: Matcher.Between,
        value: {},
      },
    };

    if (!priceMin && !priceMax) {
      searchActions.setStaticFilters(filteredFilters);
    }

    if (priceMin) {
      priceFilter.filter.value = {
        start: {
          matcher: Matcher.GreaterThanOrEqualTo,
          value: priceMin,
        },
      };
    }
    if (priceMax) {
      priceFilter.filter.value = {
        ...priceFilter.filter.value,
        end: {
          matcher: Matcher.LessThanOrEqualTo,
          value: priceMax,
        },
      };
    }

    searchActions.setStaticFilters([...filteredFilters, priceFilter]);

    searchActions.executeVerticalQuery();
  };

  const debouncedUpdatePrices = useMemo(
    () => debounce(setPriceFilter, 500),
    []
  );

  const handleChange = (values: number[]) => {
    if (values[0] > values[1]) {
      values[0] = values[1];
    }
    if (values[1] < values[0]) {
      values[1] = values[0];
    }

    setPriceValues(values);

    values[1] < (max ?? MAX)
      ? debouncedUpdatePrices([values[0], values[1]])
      : debouncedUpdatePrices([values[0]]);
  };

  return (
    <div className={twMerge("mb-8", customCssClasses?.outerContainer)}>
      <div className={twMerge("mb-8 font-bold", customCssClasses?.title)}>
        {title}
      </div>
      <div className={twMerge("px-2", customCssClasses?.sliderContainer)}>
        <Range
          step={step ?? STEP}
          min={min ?? MIN}
          max={max ?? MAX}
          values={priceValues}
          onChange={(values) => handleChange(values)}
          renderTrack={({ props, children }: IRenderTrackParams) => (
            <div
              {...props}
              style={{
                ...props.style,
                background: getTrackBackground({
                  values: priceValues,
                  colors: ["#c4c4c442", "#FFB563", "#c4c4c442"],
                  min: min ?? MIN,
                  max: max ?? MAX,
                }),
              }}
              className="h-2 w-full border border-orange "
            >
              {children}
            </div>
          )}
          renderThumb={({ index, props }: IRenderThumbParams) => (
            <div
              {...props}
              style={{
                ...props.style,
              }}
              className="h-4 w-4 rounded-full bg-orange "
            >
              <div className="absolute -top-4 text-xs ">{`$${
                priceValues[index] === (max ?? MAX)
                  ? priceValues[index] + "+"
                  : priceValues[index]
              }`}</div>
            </div>
          )}
        />
      </div>
      <div className="mt-6 flex justify-between gap-8 md:justify-start">
        <div className="flex">
          <div className="flex h-8 items-center border-t border-l border-b ">
            $
          </div>
          <input
            className="h-8 w-16 border-t border-b border-r text-sm outline-none "
            type="number"
            value={priceValues[0]}
            onChange={(e) =>
              handleChange([Number(e.target.value), priceValues[1]])
            }
          />
        </div>
        <div className="flex">
          <div className="flex h-8 items-center border-t border-l border-b ">
            $
          </div>
          <input
            className="h-8 w-16 border-t border-b border-r text-sm outline-none "
            type="number"
            value={priceValues[1]}
            onChange={(e) =>
              handleChange([priceValues[0], Number(e.target.value)])
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
