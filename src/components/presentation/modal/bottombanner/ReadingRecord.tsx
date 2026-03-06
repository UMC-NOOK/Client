/**
 * ReadingRecordBannerCard
 *
 * [사용 예시]
 * <ReadingRecordBannerCard
 *   count={5} // 숫자/문자열 (자동으로 "개" 붙여 렌더링)
 *   subtitle="기억에 남는 문장, 떠오르는 감상을 기록하세요." // 두번째 줄 설명
 *   onClick={() => console.log("clicked")}
 * />
 *
 * ++ 아이콘 변경이 필요하면 iconSrc/iconAlt로 override
 */

import React from "react";
import plusIcon from "../../../../assets/icons/plus.svg";
import bottomBannerImg from "../../../../assets/images/bottom_banner.jpg";

type Props = {
  count: number | string;
  subtitle: string;

  onClick?: () => void;

  /** 고정 폭이 필요한 경우만 사용 (기본 343px) */
  maxWidthPx?: number;

  /** 우측 아이콘 (기본 plus.svg) */
  iconSrc?: string;
  iconAlt?: string;

  className?: string;
  ariaLabel?: string;
};

export default function ReadingRecordBannerCard({
  count,
  subtitle,
  onClick,
  maxWidthPx = 343,
  iconSrc = plusIcon,
  iconAlt = "plus",
  className = "",
  ariaLabel = "reading record banner",
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
        "w-full relative flex items-center justify-between",
        "px-4 py-5",
        "rounded-lg",
        "shadow-elevation-20",
        "overflow-hidden text-left",
        "cursor-pointer",
        className,
      ].join(" ")}
    >
      <div className="min-w-0 flex-1 flex flex-col gap-2">
        <div className="min-w-0 flex items-center gap-1">
          <span className="truncate text-label-16-sb text-gray-90">독서 기록</span>
          <span className="shrink-0 text-label-16-sb text-yellow-70">{count}개</span>
        </div>

        <p className="truncate text-label-14-sb text-gray-50">{subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center justify-center w-6 h-6">
        <img src={iconSrc} alt={iconAlt} className="w-6 h-6" />
      </div>
    </button>
  );
}