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
import { ComplexImageType, Image, ImageType } from "@yext/pages/components";
import PageLayout from "../components/PageLayout";
import { StarRating } from "../components/StarRating";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import classNames from "classnames";
import DetailTable from "../components/DetailTable";
import { flattenCategories } from "../util";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCounter from "../components/ProductCounter";
import ToastMessage from "../components/ToastMessage";
import { RadioGroup } from "@headlessui/react";
import PlaceholderIcon from "../icons/PlaceholderIcon";
import ReviewsProvider from "../components/providers/ReviewsProvider";
import ReviewsSection from "../components/ReviewsSection";
// import Beverage as BeverageType from "../types/beverages";
// import Beverage from "../types/beverages" but rename it to BeverageType
import BeverageType from "../types/beverages";

export const config: TemplateConfig = {
  stream: {
    $id: "beverage",
    fields: [
      "id",
      "name",
      "photoGallery",
      "description",
      "c_rating",
      "c_sizes",
      "c_price",
      // "c_usState",
      // "c_originCountry",
      // "c_beverageCategories.name",
      // "c_beverageCategories.slug",
      // "c_beverageCategories.c_parentCategory.name",
      // "c_beverageCategories.c_parentCategory.slug",
      // "c_variantBeverages.id",
      // "c_variantBeverages.name",
      // "c_variantBeverages.c_price",
      // "c_variantBeverages.size",
      // "c_variantBeverages.c_containerType",

      // "c_variantBeverages.photoGallery",
      // "c_abv",
      "slug",
      // "ref_reviewsAgg.averageRating",
      // "ref_reviewsAgg.reviewCount",
    ],
    filter: {
      entityTypes: ["ce_products"],
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

type AggregateReviewData = {
  ref_reviewsAgg: {
    averageRating: number;
    reviewCount: number;
  }[];
};

type BeverageDocument = BeverageType & AggregateReviewData;

// TODO: Transform price prop to be a number
const Beverage: Template<TemplateRenderProps> = ({ document }) => {
  const {
    id,
    name,
    description,
    // c_originCountry,
    // c_usState,
    c_rating,
    c_price,
    c_sizes,
    // c_beverageCategories,
    // c_abv,
    // c_variantBeverages,
    photoGallery,
    // ref_reviewsAgg,
  } = document as BeverageDocument;
 console.log(c_price,"Sizes");
  const [showToast, setShowToast] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    document.c_price);
  
  const [beverageImage, setBeverageImage] = useState<
    ComplexImageType | ImageType | undefined | any
  >();
  const rating : any = c_rating;
  // const rating = c_rating;

  useEffect(() => {
    if (selectedVariant && selectedVariant.photoGallery) {
      setBeverageImage(selectedVariant.photoGallery);
    } else {
      setBeverageImage(photoGallery);
    }
  }, [selectedVariant, photoGallery]);

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <PageLayout verticalKey="products">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6    lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg ">
            {/* <Breadcrumbs
              currentPage={name}
              links={flattenCategories(c_beverageCategories ?? [])}
              containerCss="py-8"
            /> */}
            <div>
              <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {name}
                </h1>
              </div>
              {c_rating && <StarRating rating={rating} starSize={32} />}
            </div>

            {/* Product form */}
            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <section aria-labelledby="options-heading">
                <h2 id="options-heading" className="sr-only">
                  Product options
                </h2>
                  <div className="py-4">
                  <ProductCounter
                      cartVariant={{
                        id: id,
                        price: c_price,
                        size: "7",
                        name: name,
                        photo: beverageImage,
                      }}
                      addedToCart={showToastMessage}
                    />
                  
                </div>
              </section>
            </div>
          </div>
          {/* Product image */}
          {beverageImage ? (
            <div className="my-8 w-56">
              {/* <Image image={beverphotoageImage} /> */}
              <img src={photoGallery[0].image.url}></img>
            </div>
          ) : (
            <PlaceholderIcon />
          )}
          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>
            <div className="mt-4 space-y-6">
              {/* <DetailTable details={getDetailTableData()} /> */}

              <p className="text-base text-gray-500">{description}</p>
            </div>
          </section>
        </div>
        <ToastMessage
          show={showToast}
          message="Added to Cart"
          onClose={() => setShowToast(false)}
        />
      </div>
      <ReviewsProvider>
        <ReviewsSection entityId={id} overallRating={rating} />
      </ReviewsProvider>
    </PageLayout>
  );
};

export default Beverage;
