export interface BaseApiResponse <T> {
    isSuccess: true;
    code: "SUCCESS-200";
    message: string;
    result: T;
};

type OAuthLogin = {
    id: number;
    email: string;
    nickName: string;
    accessToken: string;
    refreshToken: string;
    onboardingCompleted : boolean;
};

export type OAuthLoginResponse = BaseApiResponse<OAuthLogin>;