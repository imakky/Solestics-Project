import { Direction, SortBy, SortType } from "@yext/search-headless-react";



export const endpoints = {
  universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
  verticalSearch:
    "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
  questionSubmission:
    "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
  universalAutocomplete:
    "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
  verticalAutocomplete:
    "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
  filterSearch:
    "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",
}

const searchConfig = {
  apiKey: "210c246a7718477e8ab5557bbdf6e843",
  experienceKey: "product-search",
  locale: "en",
  endpoints: endpoints,
};

export const beverageSortConfig: Record<
  string,
  { label: string; sortBy: SortBy }
> = {
  alpha_asc: {
    label: "Name: A-Z",
    sortBy: {
      field: "name",
      direction: Direction.Ascending,
      type: SortType.Field,
    },
  },
  alpha_desc: {
    label: "Name: Z-A",
    sortBy: {
      field: "name",
      direction: Direction.Descending,
      type: SortType.Field,
    },
  },
  price_desc: {
    label: "Price: High to Low",
    sortBy: {
      field: "c_variantBeverages.c_price",
      direction: Direction.Descending,
      type: SortType.Field,
    },
  },
  price_asc: {
    label: "Price: Low to High",
    sortBy: {
      field: "c_variantBeverages.c_price",
      direction: Direction.Ascending,
      type: SortType.Field,
    },
  },
};

export default searchConfig;
