import React from "react";

import searchIcon from "../../../../assets/icons/book_shelf.svg";
import libraryIcon from "../../../../assets/icons/library_focus.svg";

type BookListType = "NONE" | "SEARCH" | "LIBRARY" | "REPORT";

type TypeMeta = {
  iconSrc: string | null; // NONE/REPORT는 null
};

type Props = {
  imageUrl: string;
  title: string;
  author: string;
  type: BookListType;
  typeLabel?: string | null;
  imageAlt?: string;
  onClick?: () => void;
};

const TYPE_META: Record<BookListType, TypeMeta> = {
  SEARCH: { iconSrc: searchIcon },
  LIBRARY: { iconSrc: libraryIcon },
  NONE: { iconSrc: null },
  REPORT: { iconSrc: null },
};

export function BookListCard({
  imageUrl,
  title,
  author,
  type,
  typeLabel = null,
  imageAlt = "book cover",
  onClick,
}: Props) {
  const meta = TYPE_META[type];
  const showBottomRow = Boolean(meta.iconSrc || typeLabel);

  return (
    <div
      className={[
        // 카드 컨테이너 (디자인: width 343 / height 106 / padding y 12 / gap 12)
        "flex w-full max-w-[343px] h-[106px] items-start gap-3 py-3"
      ].join(" ")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Left Image: 56 x 82 */}
      <div
        className="flex w-14 h-[82px] shrink-0 items-center justify-center rounded-[2px] bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={imageAlt}
      />

      {/* Right Content
          ✅ 핵심: 오른쪽도 이미지 높이(82px)에 맞춰서 레이아웃 기준을 동일하게!
      */}
      <div className="flex flex-1 h-[82px] min-w-0 flex-col justify-between items-start">
        {/* Title + Author */}
        <div className="flex flex-col gap-1 min-w-0 self-stretch">
          <p className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-gray-90 text-label-16-b">
            {title}
          </p>
          <p className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-gray-70 text-label-12-r">
            {author}
          </p>
        </div>

        {/* Bottom Row: 아이콘 + 라벨 (이미지 하단 라인에 맞춰짐) */}
        {showBottomRow ? (
          <div className="flex items-center gap-1">
            {/* 아이콘이 있을 때만 렌더 */}
            {meta.iconSrc ? (
              <span
                className="relative block shrink-0"
                aria-hidden="true"
                style={{ width: "16px", height: "16px" }}
              >
                <img
                  src={meta.iconSrc}
                  alt=""
                  className="absolute"
                  style={{
                    width: "13.333px",
                    height: "13.333px",
                    right: "1.333px",
                    bottom: "1.333px",
                  }}
                />
              </span>
            ) : null}

            {typeLabel ? (
              <span className="text-gray-70 text-label-12-r">{typeLabel}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}