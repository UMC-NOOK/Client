export interface BaseApiResponse <T> {
    isSuccess: true;
    code: "SUCCESS-200";
    message: string;
    result: T;
};

export type AuthTokenResult = {
    id: number;
    email: string;
    nickName: string;
    accessToken: string;
    refreshToken: string;
    onboardingCompleted: boolean;
};

export type RecoveryRequiredResult = {
  recoveryToken: string;
};

export type OAuthLoginResponse = BaseApiResponse<
  AuthTokenResult | RecoveryRequiredResult
>;

export type AuthMe = {
  id: number;
  email: string;
  nickName: string;
};
