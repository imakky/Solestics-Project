import * as React from "react";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import { CategoryLink } from "../../types/kg";

interface CategoryTilesProps {
  title?: string;
  categories: CategoryLink[];
}

const CategoryTiles = ({ title, categories }: CategoryTilesProps) => {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  const outerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outerContainerRef.current) {
      outerContainerRef.current.scrollHeight >
        outerContainerRef.current.clientHeight && setCanExpand(true);
    }
  }, [outerContainerRef.current?.clientHeight]);

  const handleChange = (expand: boolean) => {
    outerContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setExpanded(expand);
  };

  return (
    <div className="pb-4">
      <span className="font-bold">{title}</span>
      <div
        ref={outerContainerRef}
        className={classNames(
          "transition-max-h mt-6 flex flex-wrap overflow-hidden duration-200 ease-linear ",
          {
            "max-h-[7.5rem]": !expanded,
            "max-h-96 overflow-y-scroll md:max-h-[600px]": expanded,
          }
        )}
      >
        {categories.map((category) => (
          <a key={uuid()} href={category.slug}>
            <div className="mr-3 mb-3 flex w-fit items-center border border-orange bg-light-orange text-sm md:hover:bg-orange">
              <div className="px-6 py-1 ">{category.name}</div>
            </div>
          </a>
        ))}
      </div>
      {canExpand && (
        <div className="flex w-full justify-center pt-2">
          <button onClick={() => handleChange(!expanded)}>
            <span className="text-sm text-dark-orange hover:underline">
              {expanded ? "Show Less" : "Show More"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryTiles;
