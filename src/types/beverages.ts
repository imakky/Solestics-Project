import { ParentCategory } from "./beverage_categories";

export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

export interface EntityReference {
  entityId: string;
  name: string;
}

export enum C_tag {
  TRENDING = "Trending",
  BEST_SELLER = "Best Seller",
  GIFT = "Gift",
}

export default interface Beverage {
  c_price: JSX.Element;
  reduce(arg0: (acc: any, variant: any) => any, arg1: { min: number; max: number; }): unknown;
  photoGallery: JSX.Element;
  slug: string;
  primaryPhoto?: ComplexImage;
  description?: string;
  name: string;
  c_abv?: number;
  c_beverageCategories: ParentCategory[];
  c_originCountry?: string;
  c_rating?: number;
  c_tag?: C_tag;
  c_transformedPhoto?: Image;
  c_usState?: string;
  c_variantBeverages?: {
    photoGallery: SetStateAction<ComplexImageType | ImageType | undefined>;
    id: string;
    c_price?: string;
    primaryPhoto?: ComplexImage;
    size: string;
    c_containerType?: string;
  }[];
  id: string;
}
