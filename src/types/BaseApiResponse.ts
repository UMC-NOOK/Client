export interface BaseApiResponse <T> {
    isSuccess: true;
    code: "SUCCESS-200";
    message: string;
    result: T;
};
