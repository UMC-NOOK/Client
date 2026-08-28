import type BaseApiResponse from "../BaseApiResponse";

export type ResultOfRecentView ={
    bookId: number;
    title : string;
    author : string;
    coverImageUrl : string;
}

export type RecentViewGroup = {
    result: ResultOfRecentView[];
}

export type RecentVieW = BaseApiResponse<RecentViewGroup>;