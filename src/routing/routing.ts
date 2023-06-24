import {
  State,
  SearchActions,
  Matcher,
  DisplayableFacet,
  DisplayableFacetOption,
  NumberRangeValue,
  LowerNumberRangeLimit,
  UpperNumberRangeLimit,
  SelectableStaticFilter,
  SortBy,
  SortType,
  Direction,
  SearchHeadless,
} from "@yext/search-headless-react";

export interface Router {
  serializeState: (state: State) => URLSearchParams | undefined;
  deserializeParams: (
    params: URLSearchParams,
    actions: SearchActions,
    state: State
  ) => void;
  updateCadence: "onStateChange" | "onSearch";
  includeFacets?: boolean;
}

export const defaultRouter: Router = {
  /*
  this app makes sense to be onSearch because both built in components and custom components
  will update the state and then execute a vertical search
  */
  updateCadence: "onSearch",
  // this function does not return a verticalKey param because it is inferred to be already set
  serializeState: (state) => {
    // Page limit defaults to 20
    const pageLimit = state.vertical.limit ?? 20;

    // page number depends on the current offset and the page limit
    const pageNumber = state.vertical.offset
      ? Math.floor(state.vertical.offset / pageLimit) + 1
      : 1;

    // check if there are any selected facets, static filters, or sorts to serialize
    const selectedFacetCount =
      state.filters.facets?.filter((facet) =>
        facet.options.some((option) => option.selected)
      ).length ?? 0;
    const selectedStaticFilterCount =
      state.filters.static?.filter((staticFilter) => staticFilter.selected)
        .length ?? 0;
    const sortByCount = state.vertical.sortBys?.length ?? 0;

    const params = new URLSearchParams();
    if (
      selectedFacetCount > 0 ||
      selectedStaticFilterCount > 0 ||
      state.query.input ||
      pageNumber > 1 ||
      sortByCount > 0
    ) {
      if (state.query.input) {
        params.set("query", state.query.input);
      }
      if (pageNumber > 1) {
        params.set("page", pageNumber.toString());
      }
      if (selectedFacetCount > 0) {
        addFacetsToParams(state, params);
      }
      if (selectedStaticFilterCount > 0) {
        serializeStaticFilters(state, params);
      }
      if (state.vertical.sortBys) {
        serializeSortBy(state.vertical.sortBys, params);
      }
      return params;
    }
  },
  // TODO: don't replace things that are already set in state
  deserializeParams: (params, actions, state) => {
    // const verticalKey = params.get("verticalKey");
    const query = params.get("query");
    const page = params.get("page");
    const sort = params.get("sort");

    if (query) {
      actions.setQuery(query);
    }

    const pageLimit = state.vertical.limit;
    if (page) {
      actions.setOffset(
        pageLimit ? (parseInt(page) - 1) * pageLimit : (parseInt(page) - 1) * 20
      );
    }

    if (sort) {
      const sortBy = deserializeSortBys(sort);
      sortBy && actions.setSortBys([sortBy]);
    }

    // filter out the params that are not facets
    const facetParams = Array.from(params.entries())
      .map(([fieldId, values]) => ({ fieldId, selectedOptions: values }))
      .filter(
        ({ fieldId }) =>
          !["query", "page", "verticalKey"].includes(fieldId) &&
          !filterFieldIdRegex.test(fieldId)
      );

    setInitialFacets(facetParams, actions);

    const stateFilters = state.filters.static ?? [];

    const filters = stateFilters.concat(deserializeStaticFilters(params));
    actions.setStaticFilters(filters);
  },
};

// function that adds the selected facets to the params
const addFacetsToParams = (state: State, params: URLSearchParams) => {
  const facets = state.filters.facets;

  if (facets) {
    facets.forEach((facet) => {
      const selectedFacetOptions = facet.options
        .filter((option) => option.selected)
        .map((option) => {
          if (option.matcher === Matcher.Between) {
            return serializeNumberRangeValue(
              facet.fieldId,
              option.value as NumberRangeValue
            );
          }
          return option.value;
        });
      if (selectedFacetOptions.length > 0) {
        params.set(facet.fieldId, selectedFacetOptions.join(","));
      }
    });
  }
};

// regex for any string that starts with f_
const filterFieldIdRegex = /^f_/;

/*
 * Function that sets facets before there is an inital search. The intital search will return the facet display names which
 * is why it doesn't matter what is passed for the display name value here.
 */
const setInitialFacets = (
  facetParams: { fieldId: string; selectedOptions: string }[],
  actions: SearchHeadless
) => {
  // map the facet params to a DisplayableFacet object
  const selectedFacets: DisplayableFacet[] = facetParams.map((facet) => {
    const { fieldId, selectedOptions } = facet;

    const options: DisplayableFacetOption[] = selectedOptions
      .split(",")
      .map((option) => {
        // use rangeRegex to check if selectedOptions is a range
        if (option.includes("=" || ">" || "<")) {
          const numberRangeOption = deserializeNumberRangeValue(
            fieldId,
            option
          );
          return {
            value: numberRangeOption,
            selected: true,
            matcher: Matcher.Between,
            displayName: fieldId,
            count: 0,
          };
        } else {
          return {
            value: option,
            selected: true,
            matcher: Matcher.Equals,
            count: 0,
            displayName: fieldId,
          };
        }
      });

    return {
      fieldId,
      options,
      displayName: fieldId,
      matcher: Matcher.Equals,
    };
  });

  actions.setFacets(selectedFacets);
};

const serializeStaticFilters = (state: State, params: URLSearchParams) => {
  const staticFilters = state.filters.static;
  if (staticFilters) {
    staticFilters
      .filter((staticFilter) => staticFilter.selected)
      .forEach((staticFilter) => {
        const filter = staticFilter.filter;
        switch (filter.kind) {
          case "fieldValue":
            if (filter.matcher === Matcher.Between) {
              const range = filter.value as NumberRangeValue;
              params.set(
                `f_${filter.fieldId}`,
                serializeNumberRangeValue(filter.fieldId, range)
              );
            } else {
              params.set(`f_${filter.fieldId}`, filter.value.toString());
            }
            break;
          // TODO: handle other filter kinds
          case "conjunction":
            break;
          case "disjunction":
            break;
          default:
            return;
        }
      });
    return params;
  }
};

const deserializeStaticFilters = (
  params: URLSearchParams
): SelectableStaticFilter[] => {
  const filterParams = Array.from(params.entries()).filter(([key]) =>
    filterFieldIdRegex.test(key)
  );

  const selectedStaticFilters: SelectableStaticFilter[] = filterParams.map(
    (filter) => {
      const [fieldId, value] = filter;
      const filterId = fieldId.replace("f_", "");

      if (value.includes("=" || ">" || "<")) {
        const range = deserializeNumberRangeValue(filterId, value);
        return {
          filter: {
            kind: "fieldValue",
            fieldId: filterId,
            value: range,
            matcher: Matcher.Between,
          },
          selected: true,
        };
      } else {
        return {
          filter: {
            kind: "fieldValue",
            fieldId: filterId,
            value,
            matcher: Matcher.Equals,
          },
          selected: true,
        };
      }
    }
  );
  return selectedStaticFilters;
};

const serializeSortBy = (sortBys: SortBy[], params: URLSearchParams) => {
  // only serialize the first sortBy
  const sortBy = sortBys[0];

  // only account for SortTypes.Field
  if (sortBy.type === SortType.Field) {
    params.set("sort", `${sortBy.field}:${sortBy.direction}`);
  }
};

const rangeMatcherSymbols: Record<
  Exclude<
    Matcher,
    Matcher.Equals | Matcher.NotEquals | Matcher.Near | Matcher.Between
  >,
  string
> = {
  [Matcher.GreaterThan]: ">",
  [Matcher.GreaterThanOrEqualTo]: ">=",
  [Matcher.LessThan]: "<",
  [Matcher.LessThanOrEqualTo]: "<=",
};

const deserializeSortBys = (sortByString: string): SortBy | undefined => {
  const [field, direction] = sortByString.split(":");
  return {
    field,
    direction: direction as Direction,
    type: SortType.Field,
  };
};

const serializeNumberRangeValue = (
  fieldId: string,
  value: NumberRangeValue
): string => {
  let rangeStr = fieldId;
  if (value.start) {
    rangeStr =
      value.start.value + rangeMatcherSymbols[value.start.matcher] + rangeStr;
  }
  if (value.end) {
    rangeStr =
      rangeStr + rangeMatcherSymbols[value.end.matcher] + value.end.value;
  }
  return rangeStr;
};

const deserializeNumberRangeValue = (
  fieldId: string,
  rangeStr: string
): NumberRangeValue => {
  const numberRangeOption: NumberRangeValue = {};
  // get the string on the left and right side of fieldId in the selectedOptions string
  const [start, end] = rangeStr.split(fieldId);

  if (start) {
    let startMatcher: LowerNumberRangeLimit["matcher"] | undefined;
    // find the matcher symbol in start and get the matcher
    if (start.includes(">=")) {
      startMatcher = Matcher.GreaterThanOrEqualTo;
    } else if (start.includes(">")) {
      startMatcher = Matcher.GreaterThan;
    }

    if (startMatcher) {
      // get the value of the range
      const startValue = start.replace(rangeMatcherSymbols[startMatcher], "");

      numberRangeOption.start = {
        value: Number(startValue),
        matcher: startMatcher,
      };
    } else {
      console.warn("Invalid lower limit matcher. Cannot parse range facet.");
    }
  }

  if (end) {
    let endMatcher: UpperNumberRangeLimit["matcher"] | undefined;
    // find the matcher symbol in start and get the matcher
    if (end.includes("<=")) {
      endMatcher = Matcher.LessThanOrEqualTo;
    } else if (end.includes("<")) {
      endMatcher = Matcher.LessThan;
    }

    if (endMatcher) {
      // get the value of the range
      const endValue = end.replace(rangeMatcherSymbols[endMatcher], "");

      numberRangeOption.end = {
        value: Number(endValue),
        matcher: endMatcher,
      };
    } else {
      console.warn("Invalid upper limit matcher. Cannot parse range facet.");
    }
  }

  return numberRangeOption;
};
