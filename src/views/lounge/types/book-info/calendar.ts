export type YMD = [number, number, number];

export interface Calendar {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    dates: YMD[];
  };
}
