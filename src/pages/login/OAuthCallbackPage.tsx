import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import type { OAuthProvider } from "../../api/auth";
import { useOauthLogin } from "../../hooks/mutations/useOauthLogin";

export default function OAuthCallbackPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutateAsync, isPending } = useOauthLogin();
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
        const result = await mutateAsync({ provider, code });
        console.log("oauth success result", result);

        navigate("/library", { replace: true });
      } catch (error: any) {
        console.error("oauth login error", error);
        console.error("oauth login error response", error?.response?.data);

        requestedRef.current = false;
        navigate("/login", { replace: true });
      }
    };

    void run();
  }, [mutateAsync, navigate, pathname, searchParams]);

  return (
    <div className="flex min-h-dvh items-center justify-center text-label-14-sb text-gray-70">
      {isPending ? "로그인 처리 중..." : "로그인 준비 중..."}
    </div>
  );
}