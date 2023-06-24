import * as React from "react";
import SearchExperience from "./search/SearchExperience";
import { twMerge } from "tailwind-merge";
// import Header from "./header";
import Header from "./TwHeader";
import AppProvider from "./providers/AppProvider";
import { SelectableStaticFilter } from "@yext/search-headless-react";

type Props = {
  children?: React.ReactNode;
  header?: boolean;
  containerCss?: string;
  verticalKey?: string;
  hideLocationPicker?: boolean;
  initialFilters?: SelectableStaticFilter[];
  excludedFieldIds?: string[];
};

const PageLayout = ({
  children,
  header = true,
  containerCss,
  verticalKey,
  hideLocationPicker,
  initialFilters,
  excludedFieldIds,
}: Props) => {
  return (
    <SearchExperience
      verticalKey={verticalKey}
      initialFilters={initialFilters}
      excludedParams={excludedFieldIds}
    >
      <AppProvider>
        <div className="min-h-screen font-primary">
          {header && <Header hideLocationPicker={hideLocationPicker} />}
          <div
            className={twMerge(
              "mx-auto max-w-screen-xl px-5 md:px-14" +
                // `${hideLocationPicker ? " pt-16" : ""}`,
                containerCss
            )}
          >
            {children}
          </div>
        </div>
      </AppProvider>
    </SearchExperience>
  );
};

export default PageLayout;
