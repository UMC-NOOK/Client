import { useState } from "react";

import Dim from "../layout/Dim";

type ThemeProps = {
  imageUrl: string;
  select: boolean;
  onClick: () => void;
};

export default function Theme({ imageUrl, select, onClick }: ThemeProps) {
  // TODO: 디자인팀 미확정 임시 처리(회색 배경으로 대체) — 정식 에러 화면 스펙 나오면 교체
  const [imageError, setImageError] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={select}
      className={
        "relative size-20 shrink-0 overflow-clip rounded-md bg-gray-25 shadow-elevation-20 " +
        (select ? "outline-1 outline-gray-90 outline-solid" : "")
      }
    >
      {!imageError && (
        <img
          src={imageUrl}
          alt="Theme"
          className="size-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
      {/* Dim의 width/height prop은 동적으로 조립돼 Tailwind가 못 읽는다. "full"만 안전하다. */}
      {!select && <Dim width="full" height="full" top={0} left={0} />}
    </button>
  );
}
