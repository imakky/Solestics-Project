import { EntityReference } from "./beverages";
import { CategoryPhoto } from "./kg";
import Site from "./Site";

export interface ParentCategory {
  name: string;
  slug: string;
  c_parentCategory?: ParentCategory[];
}

// TODO: Create different type for bev cat stream
interface BeverageCategory {
  name: string;
  c_beverages?: EntityReference[];
  c_parentCategory?: EntityReference[];
  c_subCategories?: EntityReference[];
  c_categoryPhotos?: CategoryPhoto[];
  slug?: string;
  _site?: Site;
  id: string;
}

export default BeverageCategory;
