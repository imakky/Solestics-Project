import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import Beverage from "../../../types/beverages";
import { Image } from "@yext/pages/components";
import { StarRating } from "../../StarRating";
import classNames from "classnames";
import PlaceholderIcon from "../../../icons/PlaceholderIcon";

interface BeverageCardProps<T> extends CardProps<T> {
  autocomplete?: boolean;
}

export const BeverageCard = ({
  result,
  autocomplete,
}: BeverageCardProps<Beverage>): JSX.Element => {
  const beverage = result.rawData;
  console.log(beverage,"Categories")

    

  return (
    <a href={beverage.slug}>
      <div
        className={classNames("flex py-4 px-4 ", {
          "hover:bg-gray-200": autocomplete,
          "flex-col  border-4 border-transparent hover:border-orange":
            !autocomplete,
        })}
      >
        {beverage.photoGallery && (
          <div
            className={classNames({
              "flex w-full justify-center": !autocomplete,
            })}
          >
            <div
              className={classNames("mr-4", {
                "w-24": !autocomplete,
                "w-16 md:w-10": autocomplete,
              })}
            >
              <img src={beverage.photoGallery[0].image.url}></img>
            </div>
          </div>
        )}
        <div>
          <div
            className={classNames("flex flex-col justify-start pb-2", {
              "h-20 pb-0": !autocomplete,
            })}
          >
            <p className="text-black line-clamp-2">{beverage.name}</p>
            {beverage.c_rating && <StarRating rating={beverage.c_rating} />}
          </div>
          <div>
            <p>Shoes description here</p>
          </div>
          {beverage.c_price && 
              <div className="text-black">₹ {beverage.c_price}</div>
          }
        </div>
      </div>
    </a>
  );
};
