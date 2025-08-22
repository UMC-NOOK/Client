export interface BookRegistrationResponse {
  isSuccess: boolean;
  message: string;
}

export interface BookRegistrationStartResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
