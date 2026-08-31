// src/pages/onboarding/OnboardingLoadingPage.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingState from "../../components/feedback/LoadingState";
import NookLogo from "../../assets/icons/logo.svg";

const SPLASH_DURATION_MS = 3000;

export default function OnboardingLoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      navigate("/onboarding/goal", {
        replace: true,
      });
    }, SPLASH_DURATION_MS);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [navigate]);

  return (
    <main
      className="
        fixed inset-y-0 left-1/2 z-[10000]
        flex w-full max-w-93.75 -translate-x-1/2
        flex-col items-center
        gap-20
        bg-gradient-background
        px-4 pb-10 pt-50
      "
    >
      {/* Logo Section */}
      <section className="flex shrink-0 flex-col items-center gap-4">
        <img
          src={NookLogo}
          alt="NOOK"
          className="h-12 w-44 max-w-none"
          draggable={false}
        />

        <p
          className="
            whitespace-nowrap
            text-center text-[14px]
            font-medium leading-[21px]
            text-gray-90
          "
        >
          온전한 독서를 위한 독서 몰입 서비스
        </p>
      </section>

      {/* Loading Section */}
      <LoadingState
        label="로딩 중입니다."
        speed={0.35}
        className="shrink-0"
      />
    </main>
  );
}