import { ReviewsResponse } from "./types/reviews";

const reviewsPath = "https://streams.yext.com/v2/accounts/me/api/fetchReviews";

export const fetchReviewsFromYext = async (
  entityId: string,
  pageToken?: string,
  limit?: number,
  params?: Record<string, string>
): Promise<ReviewsResponse> => {
  let requestString = `${reviewsPath}?api_key=${
    import.meta.env.YEXT_PUBLIC_REVIEWS_API_KEY
  }&v=20221114&entity.id=${entityId}`;
  if (pageToken) {
    requestString += `&pageToken=${pageToken}`;
  }
  if (limit) {
    requestString += `&limit=${limit}`;
  }
  if (params) {
    Object.keys(params).forEach((key) => {
      requestString += `&${key}=${params[key]}`;
    });
  }

  try {
    const resp = await fetch(requestString);
    const reviewsResponse = await resp.json();
    return reviewsResponse.response;
  } catch (e) {
    return Promise.reject(e);
  }
};
