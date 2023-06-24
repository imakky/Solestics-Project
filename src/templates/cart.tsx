import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/PageLayout";
import ShoppingCart from "../components/ShoppingCart";
import "../index.css";

export const getPath: GetPath<TemplateProps> = () => {
  return "/cart";
};

export const getRedirects: GetRedirects<TemplateProps> = () => {
  return [];
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: `Toast | Cart`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: "Ecomm Demo Shopping Cart",
        },
      },
    ],
  };
};

const Cart: Template<TemplateRenderProps> = () => {
  return (
    <PageLayout>
      <ShoppingCart />
    </PageLayout>
  );
};

export default Cart;
