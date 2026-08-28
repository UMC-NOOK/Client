import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import {
  DotLottieReact,
  type DotLottie,
} from "@lottiefiles/dotlottie-react";

import loadingAnimation from "../../assets/animations/loading-state.json?raw";
import loadingFallback from "../../assets/icons/loading-state.svg";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export type LoadingStateProps = {
  className?: string;
  label?: string;
  speed?: number;
  variant?: "inline" | "fullscreen";
};

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);

  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionPreference() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerReducedMotionPreference() {
  return false;
}

/**
 * 공용 로딩 UI
 *
 * 사용
 * - 영역 안: <LoadingState />
 * - 전체 화면: <LoadingState variant="fullscreen" />
 * - 안내 문구: label 사용
 * - 속도 조절: speed 사용 (0.1~1, 기본 1)
 * - 추가 스타일: className 사용
 *
 * 동작
 * - 자동 재생 / 무한 반복
 * - 동작 줄이기 또는 재생 오류: 정적 SVG 사용
 */
export default function LoadingState({
  className = "",
  label = "로딩 중입니다.",
  speed = 1,
  variant = "inline",
}: LoadingStateProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);
  const [hasAnimationError, setHasAnimationError] = useState(false);
  const playerRef = useRef<DotLottie | null>(null);

  const handleAnimationLoad = useCallback(() => {
    setIsAnimationLoaded(true);
  }, []);

  const handleAnimationError = useCallback(() => {
    setHasAnimationError(true);
  }, []);

  const handlePlayerRef = useCallback(
    (player: DotLottie | null) => {
      const previousPlayer = playerRef.current;

      if (previousPlayer) {
        previousPlayer.removeEventListener("load", handleAnimationLoad);
        previousPlayer.removeEventListener("loadError", handleAnimationError);
        previousPlayer.removeEventListener("renderError", handleAnimationError);
      }

      playerRef.current = player;

      if (player) {
        player.addEventListener("load", handleAnimationLoad);
        player.addEventListener("loadError", handleAnimationError);
        player.addEventListener("renderError", handleAnimationError);
      }
    },
    [handleAnimationError, handleAnimationLoad],
  );

  const showFallback =
    prefersReducedMotion || hasAnimationError || !isAnimationLoaded;
  const isFullscreen = variant === "fullscreen";
  const animationSpeed = Math.min(1, Math.max(0.1, speed));

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={[
        isFullscreen
          ? "fixed inset-y-0 left-1/2 z-50 flex w-full max-w-93.75 -translate-x-1/2 items-center justify-center bg-gradient-background"
          : "relative size-25",
        className,
      ].join(" ")}
    >
      <span className="sr-only">{label}</span>

      <div
        aria-hidden
        className={isFullscreen ? "relative size-25" : "size-full"}
      >
        {showFallback && (
          <img
            src={loadingFallback}
            alt=""
            className="size-full"
            draggable={false}
          />
        )}

        {!prefersReducedMotion && !hasAnimationError && (
          <DotLottieReact
            data={loadingAnimation}
            autoplay
            loop
            speed={animationSpeed}
            dotLottieRefCallback={handlePlayerRef}
            className={[
              "absolute inset-0 size-full",
              isAnimationLoaded ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        )}
      </div>
    </div>
  );
}
