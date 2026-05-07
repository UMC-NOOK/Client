export interface BaseApiResponse<T> {
  isSuccess: true;
  code: string;
  message: string;
  result: T;
}
