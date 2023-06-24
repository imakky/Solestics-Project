/* eslint-disable react/prop-types */
import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
  TemplateConfig,
} from "@yext/pages";
import "../index.css";
import { Image } from "@yext/pages/components";
import PageLayout from "../components/PageLayout";
import BeverageCollection from "../types/beverage_collection";
import { BeverageCard } from "../components/search/cards/BeverageCard";
import { v4 as uuid } from "uuid";
import { Source } from "@yext/search-core";

export const config: TemplateConfig = {
  stream: {
    $id: "collection",
    fields: [
      "name",
      "slug",
      "description",
      "c_relatedShoes.name",
      "c_relatedShoes.slug",
      "c_relatedShoes.photoGallery",
      "c_relatedShoes.c_rating",
      "c_relatedShoes.c_price",
    ],
    filter: {
      entityTypes: ["ce_shoesCategories"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = (props) => {
  return props.document.slug;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (
  props
): HeadConfig => {
  return {
    title: `Toast | ${props.document.name}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Collection: Template<TemplateRenderProps> = (props) => {
  const beverageCollection = props.document as BeverageCollection;
  const coverPhoto = beverageCollection.c_coverPhotos?.[0].photo;

  return (
    <PageLayout>
      <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2">
        {/* <div>{coverPhoto && <Image image={coverPhoto} />}</div> */}
        <div>
          <div className="text-3xl text-dark-orange">
            {beverageCollection.name}
          </div>
          <div className="py-4">{beverageCollection.description}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {beverageCollection.c_relatedShoes
          ?.map((beverage : any) => ({
            rawData: beverage,
            source: Source.KnowledgeManager,
          }))
          .map((beverage : any) => (
            <BeverageCard key={uuid()} result={beverage} />
          ))}
      </div>
    </PageLayout>
  );
};

export default Collection;
