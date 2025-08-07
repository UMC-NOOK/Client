export interface Book {
  bookId: number;
  isbn13: string;
  title: string;
  author: string;
  publisher: string;
  publicationDate: string;
  mallType: 'BOOK' | 'FOREIGN' | 'EBOOK';
  category: string;
  pages: number;
  description: string;
  coverImageUrl: string;
  registeredBookshelf: boolean;
}

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

export interface BestBook {
  isbn13: string;
  title: string;
  author: string;
  publisher: string;
  coverImageUrl: string;
}

export interface BookInfoResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    book: Book;
    reviewData: {
      reviews: Review[];
      pagination: ReviewPagination;
    };
    bestInThisCategory: BestBook[];
  };
}
