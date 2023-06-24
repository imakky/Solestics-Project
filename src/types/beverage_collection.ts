import Beverage from "./beverages";
import { CategoryPhoto } from "./kg";
import Site from "./Site";

// TODO: Create different type for bev cat stream
interface BeverageCollection {
  c_relatedShoes: any;
  id: string;
  name: string;
  description?: string;
  slug?: string;
  c_coverPhotos?: CategoryPhoto[];
  c_associatedBeverages?: Beverage[];
  _site?: Site;
}

export default BeverageCollection;
