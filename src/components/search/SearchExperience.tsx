import {
  provideHeadless,
  SelectableStaticFilter,
  useSearchActions,
} from "@yext/search-headless-react";
import * as React from "react";
import { useEffect } from "react";
import searchConfig from "../../config/searchConfig";
import { defaultRouter } from "../../routing/routing";
import SearchHeadlessProvider from "./SearchHeadlessProvider";

interface SearchExperienceProps {
  verticalKey?: string;
  children?: React.ReactNode;
  initialFilters?: SelectableStaticFilter[];
  excludedParams?: string[];
}

const searcher = provideHeadless({
  ...searchConfig,
});

const SearchExperience = ({
  verticalKey = "beverages",
  children,
  initialFilters,
  excludedParams: excludedFieldIds,
}: SearchExperienceProps) => {
  return (
    <SearchHeadlessProvider
      searcher={searcher}
      routing={defaultRouter}
      initialFilters={initialFilters}
      excludedParams={excludedFieldIds}
    >
      <StateManager verticalKey={verticalKey}>{children}</StateManager>
    </SearchHeadlessProvider>
  );
};

const StateManager = ({
  children,
  verticalKey,
}: {
  children: React.ReactNode;
  verticalKey?: string;
}) => {
  const searchActions = useSearchActions();

  useEffect(() => {
    if (verticalKey) {
      searchActions.setVertical(verticalKey);
    }
  }, [verticalKey]);

  return <>{children}</>;
};

export default SearchExperience;
