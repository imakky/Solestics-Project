import {
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  GetPath,
  Template,
} from "@yext/pages";
import * as React from "react";
import "../index.css";

import PageLayout from "../components/PageLayout";

// The path must be exactly 404.html
export const getPath: GetPath<TemplateProps> = () => {
  return "404.html";
};

// Add a title to the page
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "Page Not Found",
  };
};

// Template that will show as the page
const FourOhFour: Template<TemplateRenderProps> = () => {
  return (
    <PageLayout>
      <h2 className="py-4 text-2xl font-bold text-dark-orange">
        Page Not Found!
      </h2>
    </PageLayout>
  );
};

export default FourOhFour;
