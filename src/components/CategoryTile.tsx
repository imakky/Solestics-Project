import * as React from "react";
import { twMerge } from "tailwind-merge";

interface TileProps {
  title: string;
  slug: string;
  containerCss?: string;
  titleCss?: string;
}

const Tile = ({ title, slug, containerCss, titleCss }: TileProps) => {
  return (
    <a href={slug}>
      <div
        className={twMerge(
          "mr-3 mb-3 flex w-fit items-center border border-orange bg-light-orange text-sm md:hover:bg-orange",
          containerCss,
          titleCss
        )}
      >
        <div className="px-6 py-1 ">{title}</div>
      </div>
    </a>
  );
};

export default Tile;
