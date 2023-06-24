import * as React from "react";
import { ComplexImageType, Image, ImageType } from "@yext/pages/components";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import SearchPanel from "./search/SearchPanel";

interface CoverPhotoHeroProps {
  coverPhotos: ComplexImageType[] | ImageType[];
}

const CoverPhotoHero = ({ coverPhotos }: CoverPhotoHeroProps) => {
  return (
    <div className="relative max-h-[900px] min-h-[600px] w-full">
      {coverPhotos.map((coverPhoto, index) => {
        return (
          <div
            key={uuid()}
            className={classNames(`absolute top-0 bottom-0 left-0 right-0 `, {
              "z-50": index === 0,
              "z-40": index === 1,
              "z-30": index === 2,
              "z-20": index === 3,
              "z-10": index === 4,
            })}
          >
            <Image
              image={coverPhoto}
              className={`max-h-full min-h-full min-w-full max-w-full animate-fade-in-out`}
              style={{
                animationDelay: `${index * 6700}ms`,
              }}
            />
          </div>
        );
      })}
      <SearchPanel />
    </div>
  );
};

export default CoverPhotoHero;
