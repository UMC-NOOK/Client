// 로그인 페이지 컴포넌트
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/top-navigation-logo.svg";
import google from "../../assets/icons/google.svg";
import kakao from "../../assets/icons/kakao.svg";
import Icon from "../../components/action/Button/Icon";

import type { OAuthProvider } from "../../api/auth";
import { devLogin } from "../../api/auth";

const OAUTH_AUTHORIZE_URL: Record<OAuthProvider, string | undefined> = {
  GOOGLE: import.meta.env.VITE_GOOGLE_AUTHORIZE_URL ?? "",
  KAKAO: import.meta.env.VITE_KAKAO_AUTHORIZE_URL ?? "",
};

export default function LoginPage() {
  const navigate = useNavigate();

  const handleOAuthLogin = (provider: OAuthProvider) => {
    const authorizeUrl = OAUTH_AUTHORIZE_URL[provider];

    if (!authorizeUrl) {
      console.error(`Missing OAuth authorize url for ${provider}`);
      return;
    }

    window.location.href = authorizeUrl;
  };

  const handleDevLogin = async () => {
    try {
      const response = await devLogin({
        email: "dev@test.com",
        nickName: "DEV_USER",
      });

      console.log("🔥 DEV 로그인 응답", response);

      if (!response.isSuccess) {
        alert("임시 로그인 실패");
        return;
      }

      const result = response.result;

      const accessToken = result?.accessToken;
      const refreshToken = result?.refreshToken;
      const onboardingCompleted = result?.onboardingCompleted;

      if (!accessToken) {
        console.error("❌ accessToken 없음", response);
        return;
      }

      localStorage.setItem("accessToken", accessToken);

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      localStorage.setItem(
        "onboardingCompleted",
        onboardingCompleted ? "true" : "false",
      );

      navigate(onboardingCompleted ? "/library" : "/onboarding");
    } catch (error) {
      console.error("❌ 임시 로그인 에러", error);
      alert("임시 로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col px-4 pt-50 pb-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <img src={logo} className="w-50" alt="NOOK logo" />
        <div className="flex text-label-14-rb text-gray-90">
          온전한 독서를 위한 독서 몰입 서비스
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <button
          type="button"
          onClick={handleDevLogin}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-10 text-label-16-sb text-gray-90"
        >
          <span>임시 로그인</span>
        </button>

        <button
          type="button"
          onClick={() => handleOAuthLogin("GOOGLE")}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-label-16-sb text-gray-10"
        >
          <Icon size="s">
            <img src={google} alt="Google" />
          </Icon>
          <span>Google 로그인</span>
        </button>

        <button
          type="button"
          onClick={() => handleOAuthLogin("KAKAO")}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] text-label-16-sb text-gray-10"
        >
          <Icon size="s">
            <img src={kakao} alt="Kakao" />
          </Icon>
          <span>카카오 로그인</span>
        </button>
      </div>
    </div>
  );
}