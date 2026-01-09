export interface MyInfo{
    userId: number;
    email: string,
    nickname: string,
}

export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

export type myInfoResponse = ApiResponse<MyInfo>;