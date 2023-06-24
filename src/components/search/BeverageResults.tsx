import * as React from "react";
import {
  Pagination,
  ResultsCount,
  VerticalResults,
} from "@yext/search-ui-react";
import { useSearchState } from "@yext/search-headless-react";
import { CategoryLink } from "../../types/kg";
import { BreadcrumbsProps } from "../Breadcrumbs";
import BeverageFilters from "./BeverageFilters";
import BeverageResultsTitle from "./BeverageResultsTitle";
import { ShakerLoader } from "../ShakerLoader";
import TransitionContainer from "../TransitionContainer";
import BottomButton from "../BottomButton";
import SortingDropdown from "./SortingDropdown";
import { useEffect, useState } from "react";
import Beverage from "../../types/beverages";
import { BeverageCard } from "./cards/BeverageCard";
import { useLocationFilter } from "../../hooks/useLocationFilter";

interface BeverageResultsViewProps {
  title?: string;
  breadcrumbs?: BreadcrumbsProps;
  categories?: CategoryLink[];
  bottomButtonOnClick: () => void;
}
// 1. Locations Filter Search
// 2. Routing & URL Logic
// 3. Sorting Dropdown
// 4. Pagination page height thing. Page url doesnt go away when you go to page 1
// 5. result card styling
const BeverageResults = ({
  title,
  breadcrumbs,
  categories,
  bottomButtonOnClick,
}: BeverageResultsViewProps): JSX.Element => {
  const [showResults, setShowResults] = useState(false);
  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

  useLocationFilter();

  useEffect(() => {
    console.log("searchLoading", searchLoading);

    if (!searchLoading) {
      // const timeout = setTimeout(() => {
      setShowResults(true);
      // }, 300);
      // return () => clearTimeout(timeout);
    }
  }, [searchLoading]);

  return searchLoading ? (
    <ShakerLoader />
  ) : (
    <TransitionContainer show={showResults}>
      <div className="flex items-center justify-between pt-8">
        <BeverageResultsTitle title={title} breadcrumbs={breadcrumbs} />
        <SortingDropdown containerCss="hidden md:flex" />
      </div>
      <ResultsCount customCssClasses={{ resultsCountContainer: "pt-4" }} />
      <div className="flex">
        <div className="hidden pr-10 md:block">
          <BeverageFilters
            categories={categories}
            standardFacetsProps={{
              customCssClasses: {
                optionLabel: "font-bold whitespace-nowrap",
                optionInput: "text-orange focus:ring-orange ",
              },
              showMoreLimit: 5,
            }}
            numericalFacetProps={{
              customCssClasses: {
                optionLabel: "font-bold whitespace-nowrap",
                optionInput: "text-orange focus:ring-orange ",
              },
            }}
          />
        </div>
        <div className="flex flex-col">
          <VerticalResults<Beverage>
            customCssClasses={{
              verticalResultsContainer: "grid grid-cols-2 lg:grid-cols-3 gap-4",
            }}
            CardComponent={BeverageCard}
            displayAllOnNoResults={false}
          />
          <Pagination />
        </div>
      </div>
      <div className="block md:hidden">
        <BottomButton
          label={"SORT / FILTER"}
          handleClick={bottomButtonOnClick}
        />
      </div>
    </TransitionContainer>
  );
};

export default BeverageResults;
