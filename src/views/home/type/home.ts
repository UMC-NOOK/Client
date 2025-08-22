export type ApiEnvelope<T> = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
  };
  
  export type BooksInsightTypeDTO = {
    readingStatus: 'READING' | 'BEFORE' | 'DONE' | string;
    bookCount: number;
  };
  export type BooksInsightDTO = {
    totalBookCount: number;
    totalRecordCount: number;
    statusCounts: BooksInsightTypeDTO[];
  };
  
  // thumbnail 공용
  export type BookThumbnail = {
    bookId: number;
    title: string;
    author: string;        
  };
  
  export type RecentRecordDTO = BookThumbnail;
  
  export type ReadingNowDTO = BookThumbnail;
  
  export type MonthlyDayBooks = {
    date: string; // 'YYYY-MM-DD'
    books: Array<{ bookId: number; thumbnailUrl: string }>;
  };
  export type MonthlyMyBooksResponse = MonthlyDayBooks[];
  
  export type MonthRate = { month: number; rate: number };
  export type MonthlyRecordRateResponseDTO = { rates: MonthRate[] };
  
  export type CategoryDTO = { categoryName: string; count: number };
  export type CategoryResultDTO = { categories: CategoryDTO[] };
  
  export type GoalResultDTO = {
    name: string;
    nickname: string;
    goal: number;
    bookCount: number;
  };
  export type GoalRequestDTO = { goal: number };
  