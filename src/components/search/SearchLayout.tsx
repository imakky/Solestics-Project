import * as React from "react";
import { CategoryLink } from "../../types/kg";
import { useState } from "react";
import MobileFiltersView from "./mobile/MobileFiltersView";
import BeverageResults from "./BeverageResults";
import { useSearchActions } from "@yext/search-headless-react";
import { BreadcrumbsProps } from "../Breadcrumbs";

interface SearchLayoutProps {
  title?: string;
  breadcrumbs?: BreadcrumbsProps;
  categories?: CategoryLink[];
}

const SearchLayout = ({
  title,
  breadcrumbs,
  categories,
}: SearchLayoutProps): JSX.Element => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchActions = useSearchActions();

  const handleBottomButton = () => {
    if (filtersOpen) {
      searchActions.executeVerticalQuery();
    }
    setFiltersOpen(!filtersOpen);
  };

  return (
    <>
      {filtersOpen ? (
        <MobileFiltersView
          bottomButtonOnClick={handleBottomButton}
          categories={categories}
        />
      ) : (
        <BeverageResults
          title={title}
          breadcrumbs={breadcrumbs}
          categories={categories}
          bottomButtonOnClick={handleBottomButton}
        />
      )}
    </>
  );
};

export default SearchLayout;
