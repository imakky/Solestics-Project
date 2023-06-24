import * as React from "react";
import { useContext, useEffect, useMemo } from "react";
import {
  fetchReviews,
  fetchReviewTotals,
  ReviewsContext,
} from "./providers/ReviewsProvider";
import { StarRating } from "./StarRating";
import { v4 as uuid } from "uuid";
import { formatDate } from "../util";
import SortingDropdown from "./search/NewSortingDropdown";
import { FaStar } from "react-icons/fa";

interface ReviewSectionProps {
  entityId: string;
  overallRating: number;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// typescript thing that can either be $sortBy__desc or $sortBy__asc
type SortKey = "$sortBy__desc" | "$sortBy__asc";

export interface ReviewSortBy {
  label: string;
  sort: {
    key: SortKey;
    value: string;
  };
}

const reviewSortConfig: ReviewSortBy[] = [
  {
    label: "Newest",
    sort: {
      key: "$sortBy__desc",
      value: "reviewDate",
    },
  },
  {
    label: "Oldest",
    sort: {
      key: "$sortBy__asc",
      value: "reviewDate",
    },
  },
  {
    label: "Rating: High to Low",
    sort: {
      key: "$sortBy__desc",
      value: "rating",
    },
  },
  {
    label: "Rating: Low to High",
    sort: {
      key: "$sortBy__asc",
      value: "rating",
    },
  },
];

const ReviewsSection = ({
  entityId,
  overallRating,
}: ReviewSectionProps): JSX.Element => {
  const { reviewsState, dispatch } = useContext(ReviewsContext);

  const countsByRating = useMemo(
    () => reviewsState.countsByRating?.reverse(),
    [reviewsState.countsByRating]
  );

  useEffect(() => {
    fetchReviewTotals(dispatch, entityId);
    fetchReviews(dispatch, entityId, 5);
  }, []);

  const handleDropdownChange = (sortBy: { key: string; value: string }) => {
    fetchReviews(dispatch, entityId, 5, {
      [sortBy.key]: sortBy.value,
    });
  };

  return reviewsState.count > 0 ? (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                <StarRating
                  key={uuid()}
                  rating={overallRating}
                  aria-hidden="true"
                />
              </div>
              <p className="sr-only">{overallRating} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Based on {reviewsState.count} reviews
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {countsByRating?.map((count, i) => (
                <div key={uuid()} className="flex items-center text-sm">
                  <dt className="flex flex-1 items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {5 - i}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div
                      aria-hidden="true"
                      className="ml-1 flex flex-1 items-center"
                    >
                      <FaStar
                        className={classNames(
                          count > 0 ? "text-orange" : "text-gray-300",
                          "h-4 w-4 flex-shrink-0"
                        )}
                        aria-hidden="true"
                        key={uuid()}
                      />

                      <div className="relative ml-3 flex-1">
                        <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        {count > 0 ? (
                          <div
                            className="orange absolute inset-y-0 rounded-full border border-orange bg-orange"
                            style={{
                              width: `calc(${count} / ${reviewsState.count} * 100%)`,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                    {Math.round((count / reviewsState.count) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          {/* 
          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">
              Share your thoughts
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other
              customers
            </p>

            <a
              href="#"
              className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >
              Write a review
            </a>
          </div> */}
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>
          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              <div className="flex justify-end">
                <SortingDropdown<{ key: string; value: string }>
                  customCssClasses={{ menu: "py-12" }}
                  options={reviewSortConfig}
                  onSortChange={handleDropdownChange}
                />
              </div>
              {reviewsState.reviews?.map((review) => (
                <div key={uuid()} className="py-12">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h4 className="text-sm font-bold text-gray-900">
                          {review.authorName}
                        </h4>
                        <p className="pl-4 text-xs font-normal">
                          {formatDate(review.reviewDate)}
                        </p>
                      </div>
                      <div className="mt-1 flex items-center">
                        <StarRating
                          key={uuid()}
                          aria-hidden="true"
                          rating={review.rating}
                        />
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div
                    className="mt-4 space-y-6 text-base italic text-gray-600"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ReviewsSection;
