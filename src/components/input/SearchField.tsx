// Client/src/components/input/SearchField.tsx
import { useState } from "react";
import searchIcon from "../../assets/logo/search-field-button-icon-shape.svg";
import clearIcon from "../../assets/icons/SearchClose.svg";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSearchClick?: () => void;
  onEnter?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  onSearchClick,
  onEnter,
  onFocus,
  onBlur,
  placeholder = "검색어를 입력하세요",
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (onEnter) onEnter();
      else onSearchClick?.();
    }
  };

  return (
    // 3겹(검색창): gap 2px(round-2) → X의 좌우 여백이 여기서 나옴
    <div className="flex w-full items-center gap-0.5 rounded-lg bg-gray-17 px-4 py-1">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleEnter}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        placeholder={!isFocused && !value ? placeholder : ""}
        className="
          flex-1
          bg-transparent outline-none
          text-[16px] font-normal leading-6 text-gray-90
          placeholder-gray-70
          caret-[#697198]
        "
      />

      {/* 입력값 있을 때만: 2겹(20x20 래퍼) + 1겹(16.67 아이콘). 자체 좌우 여백 없음 */}
      {value.length > 0 && (
        <button
          type="button"
          aria-label="검색어 지우기"
          onMouseDown={(e) => e.preventDefault()} // input 포커스 유지
          onClick={() => onChange("")}            // 전체 삭제
          className="flex h-5 w-5 shrink-0 items-center justify-center"
        >
          <img
            src={clearIcon}
            alt=""
            className="h-[16.67px] w-[16.67px]"
            draggable={false}
          />
        </button>
      )}

      {/* 검색 버튼 (기존 그대로) */}
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={onSearchClick}
        className="flex h-[35.5px] w-[35.5px] shrink-0 items-center justify-center"
      >
        <img
          src={searchIcon}
          alt="검색"
          className="h-[19.5px] w-[19.5px]"
          draggable={false}
        />
      </button>
    </div>
  );
}