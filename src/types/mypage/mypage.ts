export type ResultOfRecentView ={
    bookId: number;
    title : string;
    author : string;
    coverImageUrl : string;
}

export type personalInformationRequest = {
    nickName?: string;
    profileImageKey?: string;
}

export type personalInformationResult = {
    nickName : string;
    profileImageUrl : string;
}

export type Profile = personalInformationResult;
export type RecentView = ResultOfRecentView[];
