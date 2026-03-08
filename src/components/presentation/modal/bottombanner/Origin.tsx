/**
 * BannerActionCard
 *
 * [사용 예시]
 * <BannerActionCard
 *   line1="클라우드 쿠쿠 랜드" // 첫 번째 줄 텍스트
 *   line2="147쪽부터 이어서 포커스 하기" // 두 번째 줄 텍스트
 *   onClick={() => console.log("click")}
 * />
 *
 * ++ 아이콘 변경이 필요하면 iconSrc/iconAlt로 override
 */

import React from "react";
import defaultArrowRight from "../../../../assets/icons/arrow_right.svg";
import bottomBannerImg from "../../../../assets/images/bottom_banner.jpg";

type Props = {
  line1: string;
  line2: string;

  iconSrc?: string;
  iconAlt?: string;

  useGradientOverlay?: boolean;

  onClick?: () => void;

  maxWidthPx?: number;
  className?: string;
  ariaLabel?: string;
};

export default function BannerActionCard({
  line1,
  line2,
  iconSrc = defaultArrowRight,
  iconAlt = "arrow right",
  useGradientOverlay = false,
  onClick,
  maxWidthPx = 343,
  className = "",
  ariaLabel = "banner action card",
}: Props) {
  const containerStyle: React.CSSProperties = {
    maxWidth: `${maxWidthPx}px`,
    height: "76px",
    backgroundImage: `url(${bottomBannerImg})`,
    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "lightgray",
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      style={containerStyle}
      className={[
        "relative w-full flex items-center justify-between",
        "px-4 py-5",
        "rounded-lg",
        "shadow-elevation-20",
        "overflow-hidden text-left",
        "cursor-pointer",
        className,
      ].join(" ")}
    >
      {useGradientOverlay && (
        <div className="absolute inset-0 bg-gradient-mask pointer-events-none" />
      )}

      <div className="relative z-10 flex flex-1 flex-col gap-2 min-w-0">
        <p className="truncate text-label-14-sb text-gray-90">{line1}</p>
        <p className="truncate text-label-14-sb text-gray-90">{line2}</p>
      </div>

      <div className="relative z-10 flex shrink-0 items-center justify-center w-6 h-6">
        <img src={iconSrc} alt={iconAlt} className="w-6 h-6" />
      </div>
    </button>
  );
}