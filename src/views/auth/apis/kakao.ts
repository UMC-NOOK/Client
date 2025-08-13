import AuthInstance from '../../../apis/auth/authInstance';

interface KakaoLoginRequest {
  code: string;
}

const kakaoLogin = async ({ code }: KakaoLoginRequest) => {
  try {
    const response = await AuthInstance.post(
      `api/users/kakao/login?code=${code}`,
    );
    console.log('로그인 성공:', response);
    return response.data.result;
  } catch (error) {
    console.error('로그인 error:', error);
    throw error;
  }
};

export default kakaoLogin;
