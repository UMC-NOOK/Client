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
  const leftIconSrc =
    leftIconType === "back" ? BackIcon : CloseIcon;

  return (
    <div className="w-full min-h-screen flex flex-col pb-10">
      {/* 상단 헤더 */}
      <div className="flex flex-col items-start self-stretch pb-4">
        <div className="w-full h-10 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="flex p-2 justify-center items-center"
          >
            <img src={leftIconSrc} alt="뒤로가기" className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!isNextActive}
            className="flex h-10 px-4 justify-center items-center disabled:cursor-not-allowed"
          >
            <span
              className={[
                "text-[18px] font-medium leading-4.5",
                isNextActive ? "text-[#ECECEC]" : "text-[#525775]",
              ].join(" ")}
            >
              {nextLabel}
            </span>
          </button>
        </div>
      </div>

    {/* 디바이더 (단일 바 + 진행바 오버레이) */}
      <div className="w-full px-4">
        <div className="w-full h-1 rounded-[80px] bg-[#272D49] relative overflow-hidden">
          <div
            className={[
              "h-full rounded",           
              step === 1 ? "w-0" : step === 2 ? "w-1/2" : "w-full",
              "bg-[#ECECEC]",
            ].join(" ")}
          />
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="w-full flex flex-col items-start pt-12">
        <div className="w-full flex flex-col items-start px-1">
          <h1 className="text-[#ECECEC] text-[20px] font-bold leading-7.5">
            {title}
          </h1>

          {subtitle && (
            <p className="text-[#697198] text-[14px] font-medium leading-5.25">
              {subtitle}
            </p>
          )}
        </div>

        <div className="w-full px-1 mt-8">
          <div className="w-full flex flex-col items-start gap-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
