import * as React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import Beverage from "../types/beverages";
import { Image } from "@yext/pages/components";
import { v4 as uuid } from "uuid";
import { BiCaretRightCircle, BiCaretLeftCircle } from "react-icons/bi";

interface CarouselProps {
  title?: string;
  beverages?: Beverage[];
  limit?: number;
  viewAllLink?: string;
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <BiCaretRightCircle
      className={className}
      color="#F85E00"
      style={{
        ...style,
        height: "50px",
        width: "30px",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <BiCaretLeftCircle
      style={{
        ...style,
        height: "50px",
        width: "30px",
        zIndex: 10,
      }}
      className={className}
      color="#F85E00"
      size={50}
      onClick={onClick}
    />
  );
};

const BeverageCarousel = ({
  title,
  beverages,
  limit,
  viewAllLink,
}: CarouselProps) => {
  const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    swipeToSlide: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          infinite: false,
          slidesToScroll: 2,
          swipeToSlide: true,
          prevArrow: <></>,
          nextArrow: <></>,
        },
      },
    ],
  };

  const renderBeverageSlide = (beverage: Beverage) => {
    console.log(beverage,"Beverages");
    return (
      <a href={beverage.slug} key={uuid()}>
        <div className="flex flex-col px-4 ">
          {beverage.photoGallery && (
            <div className="flex items-center justify-center border border-dark-orange bg-light-orange py-6 ">
              <div className="w-24">
                {/* <Image image={beverage.photoGallery.[0].image.url}></Image> */}
                <img src={beverage.photoGallery[0].image.url}></img>
              </div>
            </div>
          )}
          <div className="mt-2 mb-6  pr-4 pl-1">
            <p className="text-xs font-semibold line-clamp-2 sm:text-sm">
              {beverage.name}
            </p>
          </div>
        </div>
      </a>
    );
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between pb-8">
        <h2 className="text-2xl font-extrabold text-dark-orange">{title}</h2>
        {viewAllLink && (
          <a
            className=" pr-[33px] font-semibold text-dark-orange hover:underline"
            href={viewAllLink}
          >
            View All
          </a>
        )}
      </div>
      <Slider {...settings}>
        {beverages
          ?.slice(0, limit ?? beverages.length)
          .map((beverage) => renderBeverageSlide(beverage))}
      </Slider>
    </div>
  );
};

export default BeverageCarousel;
