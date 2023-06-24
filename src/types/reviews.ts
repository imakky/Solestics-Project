export interface Review {
  $key: {
    locale: string;
    primary_key: string;
  };
  authorName: string;
  content: string;
  entity: {
    id: string;
  };
  rating: number;
  reviewDate: string;
}

export interface ReviewsResponse {
  docs: Review[];
  count: number;
  nextPageToken?: string;
}
