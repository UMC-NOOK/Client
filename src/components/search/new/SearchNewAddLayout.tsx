// src/components/search/new/SearchNewAddLayout.tsx
import React from "react";
import CloseIcon from "../../../assets/search/addBookclose.svg";
import BackIcon from "../../../assets/search/newbefore.svg";

type Props = {
  title: string;
  subtitle?: string;
  isNextActive: boolean;
  nextLabel?: string;
  onClose: () => void;
  onNext: () => void;
  children: React.ReactNode;
  leftIconType?: "close" | "back";
  step: 1 | 2 | 3;
};

const STEP_WIDTH: Record<Props["step"], string> = {
  1: "w-0",
  2: "w-1/2",
  3: "w-full",
};

export default function SearchNewAddLayout({
  title,
  subtitle,
  isNextActive,
  nextLabel = "다음",
  onClose,
  onNext,
  children,
  leftIconType = "close",
  step,
}: Props) {
  const leftIconSrc = leftIconType === "back" ? BackIcon : CloseIcon;

  return (
    <div className="w-full min-h-screen flex flex-col pb-10">
      {/* 상단 헤더 */}
      <div className="w-full flex flex-col items-start pb-4">
        <div className="w-full h-10 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="p-2 flex items-center justify-center"
            aria-label={leftIconType === "back" ? "뒤로가기" : "닫기"}
          >
            <img src={leftIconSrc} alt="" className="w-6 h-6" draggable={false} />
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!isNextActive}
            className="h-10 px-4 flex items-center justify-center disabled:cursor-not-allowed"
          >
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            {/* 18px / 1 / 500 (btn-18-m 사용) */}
            <span className={["text-btn-18-m", isNextActive ? "text-gray-100" : "text-gray-600"].join(" ")}>
=======
=======
>>>>>>> Stashed changes
            <span
              className={[
                "text-btn-18-m",
                isNextActive ? "text-gray-100" : "text-gray-600",
              ].join(" ")}
            >
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
              {nextLabel}
            </span>
          </button>
        </div>
      </div>

<<<<<<< Updated upstream
<<<<<<< Updated upstream
      {/* 진행바: 콘텐츠 블럭(px-1)과 좌우 길이 맞추기 */}
      <div className="w-full px-1">
        <div className="w-full h-1 rounded-[80px] bg-gray-800 relative overflow-hidden">
          <div className={["h-full bg-gray-100 rounded-[80px]", STEP_WIDTH[step]].join(" ")} />
        </div>
      </div>
=======
=======
>>>>>>> Stashed changes

      {/* ProgressIndicator 부분 (컴포넌트로 분리) */}
      <ProgressBar step={step} total={3} />
>>>>>>> Stashed changes

      {/* 콘텐츠 */}
      <div className="w-full flex flex-col items-start pt-12">
        <div className="w-full flex flex-col items-start px-1">
          {/* 20px / 150% / 700 */}
          <h1 className="text-gray-100 text-title-20-b">{title}</h1>

          {subtitle && (
            /* 14px / 150% / 500 */
            <p className="text-gray-500 text-body-14-m">{subtitle}</p>
          )}
        </div>

        <div className="w-full px-1 mt-8">
          <div className="w-full flex flex-col items-start gap-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
