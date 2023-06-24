import { ComplexImageType } from "@yext/pages/components";

export interface EntityReference {
  entityId: string;
  name: string;
}

export interface BeverageVariant {
  size?: string;
  name: string;
  c_parentBeverage?: EntityReference[];
  c_price: number;
  primaryPhoto: ComplexImageType;
  id: string;
}
