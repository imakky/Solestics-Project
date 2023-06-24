import * as React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { v4 as uuid } from "uuid";

interface StarRatingProps {
  rating: number;
  starSize?: number;
}

export const StarRating = ({ rating, starSize = 16 }: StarRatingProps) => {
  return (
    <div className="flex text-orange">
      {[...Array(Math.floor(rating))].map((_) => (
        <FaStar key={uuid()} size={starSize} />
      ))}
      {rating % 1 >= 0.5 && <FaStarHalf size={starSize} />}
    </div>
  );
};
