import * as React from "react";
import { CategoryPhoto, ComplexImage } from "../../types/kg";
import CategoryLayout from "../CategoryLayout";
import CoverPhoto from "../CoverPhoto";

interface CategorySearchGridProps {
  coverPhoto?: ComplexImage;
  title?: string;
  categoryPhotos?: CategoryPhoto[];
  categoryPhotoContainerCss?: string;
}

export const CategorySearchGrid = ({
  coverPhoto,
  title,
  categoryPhotos,
  categoryPhotoContainerCss,
}: CategorySearchGridProps) => {
  return (
    <>
      {coverPhoto && <CoverPhoto image={coverPhoto} />}
      {categoryPhotos && (
        <CategoryLayout
          title={title}
          categoryPhotos={categoryPhotos}
          containerCss={categoryPhotoContainerCss}
        />
      )}
    </>
  );
};

export default CategorySearchGrid;
