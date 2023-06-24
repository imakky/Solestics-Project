import * as React from "react";
import { createContext, Dispatch, useReducer } from "react";
import { fetchReviewsFromYext } from "../../api";
import { Review } from "../../types/reviews";
import { ProviderProps } from "./AppProvider";

// state
interface ReviewsState {
  entityId: string;
  reviews: Review[];
  loading: boolean;
  error: boolean;
  nextPageToken?: string;
  count: number;
  countsByRating?: number[];
  pageCount: number;
}

const initialState: ReviewsState = {
  entityId: "",
  reviews: [],
  loading: false,
  error: false,
  nextPageToken: undefined,
  count: 0,
  pageCount: 0,
};

//actions
export enum ReviewsActionTypes {
  FetchedReviews,
  FetchingReviews,
  SetCountsByRating,
}

export interface FetchReviews {
  type: ReviewsActionTypes.FetchedReviews;
  payload: {
    entityId: string;
    nextPageToken?: string;
    reviews: Review[];
    count: number;
    limit?: number;
  };
}

export interface FetchingReviews {
  type: ReviewsActionTypes.FetchingReviews;
}

export interface SetCountsByRating {
  type: ReviewsActionTypes.SetCountsByRating;
  payload: {
    countsByRating: number[];
  };
}

export type ReviewsActions = FetchReviews | FetchingReviews | SetCountsByRating;

export const fetchReviews = async (
  dispatch: Dispatch<ReviewsActions>,
  entityId: string,
  limit = 10,
  params?: Record<string, string>
) => {
  dispatch({ type: ReviewsActionTypes.FetchingReviews });

  const response = await fetchReviewsFromYext(
    entityId,
    undefined,
    limit,
    params
  );

  if (response) {
    dispatch({
      type: ReviewsActionTypes.FetchedReviews,
      payload: {
        entityId,
        nextPageToken: response.nextPageToken,
        reviews: response.docs,
        count: response.count,
        limit,
      },
    });
  }
};

export const fetchReviewTotals = async (
  dispatch: Dispatch<ReviewsActions>,
  entityId: string
) => {
  // use promise.all to call fetchReviewsFromYext 5 times, one for each star rating
  // then dispatch an action to update the state with the totals

  const reviewPromises = await Promise.allSettled(
    [1, 2, 3, 4, 5].map((rating) =>
      fetchReviewsFromYext(entityId, undefined, 1, {
        rating: rating.toString(),
      })
    )
  );

  // reduce the array of promises into an array of counts
  const countsByRating = reviewPromises.reduce((acc, curr) => {
    if (curr.status === "fulfilled") {
      acc.push(curr.value.count);
    }
    return acc;
  }, [] as number[]);

  if (countsByRating.length === 5) {
    dispatch({
      type: ReviewsActionTypes.SetCountsByRating,
      payload: {
        countsByRating,
      },
    });
  } else {
    console.error("Error fetching review totals");
  }
};

// reducer
const reviewsReducer = (state: ReviewsState, action: ReviewsActions) => {
  switch (action.type) {
    case ReviewsActionTypes.FetchingReviews:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ReviewsActionTypes.FetchedReviews:
      return {
        ...state,
        loading: false,
        error: false,
        reviews: action.payload.reviews,
        count: action.payload.count,
        nextPageToken: action.payload.nextPageToken,
        pageCount: Math.ceil(
          action.payload.count / (action.payload.limit ?? 10)
        ),
      };
    case ReviewsActionTypes.SetCountsByRating:
      return {
        ...state,
        countsByRating: action.payload.countsByRating,
      };
    default:
      return state;
  }
};

export const ReviewsContext = createContext<{
  reviewsState: ReviewsState;
  dispatch: Dispatch<ReviewsActions>;
}>({
  reviewsState: initialState,
  dispatch: () => null,
});

const ReviewsProvider = ({ children }: ProviderProps): JSX.Element => {
  const [reviewsState, dispatch] = useReducer(reviewsReducer, initialState);
  return (
    <ReviewsContext.Provider value={{ reviewsState, dispatch }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsProvider;
