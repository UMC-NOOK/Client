import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import type { OAuthProvider } from "../../api/auth";
import { useOauthLogin } from "../../hooks/mutations/useOauthLogin";
import { useRecoverAccount } from "../../hooks/mutations/useRecoverAccount";
import LoadingState from "../../components/feedback/LoadingState";

export default function OAuthCallbackPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutateAsync: oauthLogin } = useOauthLogin();
  const { mutateAsync: recoverAccount } = useRecoverAccount();
  const requestedRef = useRef(false);

  useEffect(() => {
    if (requestedRef.current) return;

    const code = searchParams.get("code");
    const oauthError = searchParams.get("error");

    const provider: OAuthProvider | null =
      pathname === "/google/oauth"
        ? "GOOGLE"
        : pathname === "/kakao/callback"
          ? "KAKAO"
          : null;


    if (oauthError || !code || !provider) {
      navigate("/login", { replace: true });
      return;
    }

    requestedRef.current = true;

    const run = async () => {
      try {
        const loginResponse = await oauthLogin({ provider, code });
        let result = loginResponse.result;

        // 탈퇴 유예 계정은 소셜 로그인 응답의 recoveryToken으로 즉시 복구합니다.
        if ("recoveryToken" in result) {
          const recoverResponse = await recoverAccount(result.recoveryToken);
          result = recoverResponse.result;
        }

        navigate(
          result.onboardingCompleted ? "/library" : "/onboarding",
          { replace: true },
        );
      } catch (error: any) {
        console.error("oauth login error", error);
        console.error("oauth login error response", error?.response?.data);

        requestedRef.current = false;
        navigate("/login", { replace: true });
      }
    };

    void run();
  }, [oauthLogin, recoverAccount, navigate, pathname, searchParams]);

  return <LoadingState variant="fullscreen" />;
}
