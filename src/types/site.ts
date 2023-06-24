import { ComplexImage } from "./beverages";
import BeverageCollection from "./beverage_collection";
import { CategoryPhoto } from "./kg";

interface Site {
  c_coverPhotos?: CategoryPhoto[];
  c_categoryPhotos?: CategoryPhoto[];
  c_homePhotos?: ComplexImage[];
  c_featuredCollections: BeverageCollection[];
}

export default Site;
