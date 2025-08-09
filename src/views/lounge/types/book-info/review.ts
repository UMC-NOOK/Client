export interface Review {
  reviewId: number;
  name: string;
  nickname: string;
  rating: number;
  content: string;
  reviewDate: string;
  ownedByUser: boolean;
}

export interface ReviewPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ReviewResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    reviews: Review[];
    pagination: ReviewPagination;
  };
}
