export type MallType = 'RECOMMENDATION' | 'BOOK' | 'FOREIGN' | 'EBOOK';

export interface LoungeBook {
    isbn13: string;
    title: string;
    author: string;
    publisher: string;
    coverImageUrl: string;
}

export interface LoungePagination{
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface LoungeSection {
    sectionId: string;
    categoryId?: string;
    categoryName: string;
    books: LoungeBook[];
    pagination: LoungePagination;
}

export interface LoungeTotalBooksResponse {
    sections: LoungeSection[];
}

export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

export type LoungeBookListResponse = ApiResponse<LoungeTotalBooksResponse>;

export const loungeQueryKeys = {
    books: (mallType: MallType) => ['loungeBooks', mallType] as const,
};
