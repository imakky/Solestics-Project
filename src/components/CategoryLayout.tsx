import * as React from "react";
import { Image } from "@yext/pages/components";
import { twMerge } from "tailwind-merge";
import { v4 as uuid } from "uuid";
import { CategoryPhoto } from "../types/kg";
import PlaceholderIcon from "../icons/PlaceholderIcon";

interface CategoryContainerProps {
  categoryPhotos: CategoryPhoto[];
  containerCss?: string;
  title?: string;
}

const CategoryLayout = ({
  categoryPhotos,
  containerCss,
  title,
}: CategoryContainerProps): JSX.Element => {
  return (
    <>
      <div className="py-4 ">
        <span className="text-2xl font-extrabold text-dark-orange md:text-4xl">
          {title}
        </span>
        <div
          className={twMerge(
            "grid grid-cols-2 justify-items-center gap-2 py-4",
            containerCss
          )}
        >
          {categoryPhotos.map((catPhoto) => (
            <a
              key={uuid()}
              className="group flex flex-col items-center hover:cursor-pointer"
              href={catPhoto.slug}
            >
              <div className="flex h-44 w-40">
                <Image
                  layout="fill"
                  image={catPhoto.photo}
                  placeholder={<PlaceholderIcon />}
                />
              </div>
              <div className="pt-1.5 text-blue group-hover:underline">
                {catPhoto.name.toUpperCase()}
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryLayout;
