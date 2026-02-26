/**
 * SingleLineBannerCard
 *
 * [사용 예시]
 * <SingleLineBannerCard
 *   label="지금 바로 독서 기록 추가하기" // 한 줄 텍스트
 *   onClick={() => console.log("clicked")}
 * />
 *
 * ++ 아이콘 변경이 필요하면 iconSrc/iconAlt로 override
 */

import React from "react";
import defaultArrowRight from "../../../../assets/icons/arrow_right.svg";
import bottomBannerImg from "../../../../assets/images/bottom_banner.jpg";

type Props = {
  label: string;

  iconSrc?: string;
  iconAlt?: string;

  onClick?: () => void;

  maxWidthPx?: number;
  className?: string;
  ariaLabel?: string;
};

export default function SingleLineBannerCard({
  label,
  iconSrc = defaultArrowRight,
  iconAlt = "arrow right",
  onClick,
  maxWidthPx = 343,
  className = "",
  ariaLabel = "single line banner card",
}: Props) {
  const containerStyle: React.CSSProperties = {
    maxWidth: `${maxWidthPx}px`,
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
        "w-full flex items-center justify-between",
        "p-4", // 16px
        "rounded-lg",
        "shadow-elevation-20",
        "overflow-hidden text-left",
        "cursor-pointer",
        className,
      ].join(" ")}
    >
      <p className="truncate text-label-14-sb text-gray-90">{label}</p>

      <div className="flex shrink-0 items-center justify-center w-6 h-6">
        <img src={iconSrc} alt={iconAlt} className="w-6 h-6" />
      </div>
    </button>
  );
}