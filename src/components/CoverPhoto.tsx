import * as React from "react";
import { Image } from "@yext/pages/components";
import { ComplexImage } from "../types/kg";

interface CoverPhotoProps {
  image: ComplexImage;
}

// TODO: Consider box shadow and rounding image edges
const CoverPhoto = ({ image }: CoverPhotoProps) => {
  return (
    <div className="flex justify-center">
      {/* TODO: Consider box shadow and rounding image edges */}
      <div className="my-8 flex h-44 w-96 justify-center sm:h-[21.75rem] sm:w-[42.75rem]">
        <Image layout="fill" image={image} />
      </div>
    </div>
  );
};

export default CoverPhoto;
