import * as React from "react";
import { useSearchState, useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import classNames from "classnames";
import { Direction, SortBy, SortType } from "@yext/search-headless-react";
import { v4 as uuid } from "uuid";

const sortConfig: Record<string, { label: string; sortBy: SortBy }> = {
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

interface SortingDrawerProps {
  containerCss?: string;
}

export const SortingDropdown = ({ containerCss = "" }: SortingDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<
    { label: string; sortBy: SortBy } | undefined
  >(undefined);

  const sortBys = useSearchState((state) => state.vertical.sortBys);
  const searchActions = useSearchActions();

  useEffect(() => {
    setSelectedSort(
      Object.values(sortConfig).find(
        (s) =>
          s.sortBy.field === sortBys?.[0]?.field &&
          s.sortBy.direction === sortBys?.[0]?.direction
      )
    );
  }, [sortBys]);

  const handleTileClick = (sortBy: SortBy): void => {
    setOpen(false);
    searchActions.setSortBys([sortBy]);
    searchActions.executeVerticalQuery();
  };

  return (
    <div className={classNames("flex", containerCss)}>
      <div>
        <div
          className="flex h-10 w-48 items-center justify-between border border-dark-orange bg-light-orange px-2"
          onClick={() => setOpen(!open)}
        >
          <div className="text-sm ">
            <div className="font-semibold">Sort By:</div>
            <div>{selectedSort?.label}</div>
          </div>
          {open ? <BiChevronUp /> : <BiChevronDown />}
        </div>
        <ul
          className={classNames("absolute flex flex-col border", {
            "border-toast-dark-orange mt-2": open,
          })}
        >
          {open &&
            Object.entries(sortConfig)
              .filter(([k, v]) => v.sortBy !== selectedSort?.sortBy)
              .map(([k, v]) => (
                <li key={uuid()}>
                  <button
                    className="flex h-10 w-48 items-center bg-light-orange px-2 text-sm hover:bg-orange"
                    onClick={() => handleTileClick(v.sortBy)}
                  >
                    {v.label}
                  </button>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default SortingDropdown;
