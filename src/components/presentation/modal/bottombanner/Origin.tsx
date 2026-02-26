/**
 * ------------------------------------------------------------------
 * BannerActionCard (2-line fixed version)
 * ------------------------------------------------------------------
 * - 2줄 전용 카드 (고정 height 76px)
 * - padding: 20px 16px
 * - background: image + optional gradient overlay
 * - shadow: elevation-20
 * ------------------------------------------------------------------
 */

import React from "react";
import defaultArrowRight from "../../../../assets/icons/arrow_right.svg";

type Props = {
  line1: string;
  line2: string; // ✅ 2줄 전용이므로 필수

  iconSrc?: string;
  iconAlt?: string;

  backgroundImageUrl?: string;

  /** 이미지 위 gradient mask 적용 */
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
  backgroundImageUrl,
  useGradientOverlay = false,
  onClick,
  maxWidthPx = 343,
  className = "",
  ariaLabel = "banner action card",
}: Props) {
  const containerStyle: React.CSSProperties = {
    maxWidth: `${maxWidthPx}px`,
    height: "76px",
    ...(backgroundImageUrl
      ? {
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }
      : {}),
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      style={containerStyle}
      className={[
        // base
        "relative w-full flex items-center justify-between",
        "px-4 py-5",
        "rounded-lg",
        "shadow-elevation-20",
        "overflow-hidden text-left",
        "bg-gray-10",
        // state
        "cursor-pointer",
        className,
      ].join(" ")}
    >
      {/* ✅ gradient overlay 레이어 방식 (background 충돌 방지) */}
      {useGradientOverlay && (
        <div className="absolute inset-0 bg-gradient-mask pointer-events-none" />
      )}

      {/* Content */}
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