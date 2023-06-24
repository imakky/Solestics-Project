import * as React from "react";
import {
  NumericalFacets,
  NumericalFacetsProps,
  StandardFacets,
  StandardFacetsProps,
} from "@yext/search-ui-react";
import CategoryTiles from "./CategoryTiles";
import { CategoryLink } from "../../types/kg";
import SortingDropdown from "./SortingDropdown";
import PriceSlider from "../PriceSlider";

interface BeverageFiltersProps {
  standardFacetsProps?: StandardFacetsProps;
  numericalFacetProps?: NumericalFacetsProps;
  categories?: CategoryLink[];
}
const BeverageFilters = ({
  standardFacetsProps,
  numericalFacetProps,
  categories,
}: BeverageFiltersProps) => {
  return (
    <div className="md:w-60">
      <SortingDropdown containerCss="pt-4 pb-8 md:hidden" />
      {categories && (
        <CategoryTiles title="CATEGORIES" categories={categories} />
      )}
      <StandardFacets {...standardFacetsProps} />
      <PriceSlider
        title="PRICE RANGE"
        customCssClasses={{
          title: "font-bold",
          sliderContainer: "px-4 md:px-0",
        }}
      />
      <NumericalFacets
        includedFieldIds={["c_abv"]}
        {...numericalFacetProps}
        customCssClasses={{
          rangeInputContainer: "hidden",
          ...numericalFacetProps?.customCssClasses,
        }}
      />
    </div>
  );
};

export default BeverageFilters;
