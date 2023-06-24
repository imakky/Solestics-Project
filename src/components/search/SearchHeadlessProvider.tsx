import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import {
  SearchActions,
  SearchHeadless,
  SearchHeadlessProvider,
  SelectableStaticFilter,
  State,
} from "@yext/search-headless-react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import useURLSearchParams from "../../hooks/useURLSearchParams";

export interface HeadlessProviderProps {
  searcher: SearchHeadless;
  routing?: {
    serializeState: (state: State) => URLSearchParams | undefined;
    deserializeParams: (
      params: URLSearchParams,
      actions: SearchActions,
      state: State,
      initialLoad?: boolean
    ) => void;
    updateCadence: "onStateChange" | "onSearch";
  };
  // this field defines which facets or filters to include in the Search state regardless of the URL
  initialFilters?: SelectableStaticFilter[];
  // this field defines which params from search state to exclude from the URL
  excludedParams?: string[];
  children: React.ReactNode;
}

type InternalRouterProps = Omit<HeadlessProviderProps, "searcher">;

// This is a separate component so that you can useContext()
const InternalRouter = ({
  routing,
  children,
  initialFilters,
}: InternalRouterProps): JSX.Element => {
  const searchActions = useSearchActions();
  const searchState = useSearchState((s) => s);
  const params = useURLSearchParams();
  const [initialSearchComplete, setInitialSearchComplete] = useState(false);

  useEffect(() => {
    if (routing && params) {
      const { deserializeParams } = routing;

      // // sets all the relevant search state from the URL params
      deserializeParams(params, searchActions, searchState, true);

      // // if there are any initial filters, set them
      if (initialFilters) {
        searchActions.setStaticFilters(initialFilters);
      }
      searchActions.executeVerticalQuery();
      setInitialSearchComplete(true);
    }
  }, []);

  useEffect(() => {
    if (
      initialSearchComplete &&
      params &&
      routing &&
      routing.updateCadence === "onSearch"
    ) {
      const { deserializeParams } = routing;

      // sets all the relevant search state from the URL params
      deserializeParams(params, searchActions, searchState, true);

      searchActions.executeNormalVQ();
    }
  }, [params]);

  // THIS PUSHES STATE TOO MANY TIMES
  // Only do anything if the updateCadence is set to onSearch
  // Otherwise, the logic is handled in the SearchHeadlessProvider via overriding search method
  // useEffect(() => {
  //   console.log("hello from line 67");
  //   if (routing && routing.updateCadence === "onSearch") {
  //     const { serializeState } = routing;
  //     searchActions.addListener({
  //       valueAccessor: (s) => s,
  //       callback: (state) => {
  //         if (serializeState) {
  //           const params = serializeState(state);
  //           window.history.pushState(
  //             {},
  //             "",
  //             `${params ? `?${params.toString()}` : location.pathname}`
  //           );
  //         }
  //       },
  //     });
  //   }
  // }, []);

  // Run whatever code is in the onLoad prop
  // useEffect(() => {
  //   if (onLoad) {
  //     onLoad(searchState, searchActions);
  //   }
  // }, []);

  return <>{children}</>;
};

const HeadlessProvider = ({
  searcher,
  routing,
  // onSearch,
  // onLoad,
  children,
  initialFilters,
  excludedParams: excludedFieldIds,
}: HeadlessProviderProps): JSX.Element => {
  const newSearcher = cloneDeep(searcher);

  if (routing && routing.updateCadence === "onSearch") {
    const { serializeState } = routing;
    newSearcher.executeVerticalQuery = async () => {
      const params = serializeState(searcher.state);

      // if there are any excluded field ids, remove them from the URL
      if (params && excludedFieldIds) {
        excludedFieldIds.forEach((id) => {
          params.delete(id);
        });
      }

      // if there are search params, update the URL with them. Otherwise, delete the search params from the url
      if (params) {
        window.history.pushState({}, "", `?${params.toString()}`);
      } else {
        window.history.pushState({}, "", location.pathname);
      }

      return searcher.executeVerticalQuery();
    };
  }

  newSearcher.executeNormalVQ = async () => {
    console.log("executeNormalVQ");
    return searcher.executeVerticalQuery();
  };

  // if (onSearch) {
  //   newSearcher.executeVerticalQuery = async () => {
  //     const result = await searcher.executeVerticalQuery();
  //     onSearch(searcher.state, searcher);
  //     return result;
  //   };
  // }

  return (
    <SearchHeadlessProvider searcher={newSearcher}>
      <InternalRouter
        // onLoad={onLoad}
        // onSearch={onSearch}
        routing={routing}
        initialFilters={initialFilters}
        excludedParams={excludedFieldIds}
      >
        {children}
      </InternalRouter>
    </SearchHeadlessProvider>
  );
};

export default HeadlessProvider;
