// Client/src/components/input/SearchField.tsx
import { useRef, useState } from "react";
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
  showClearOnFocus?: boolean; // true면 값이 없어도 포커스만으로 지우기 버튼을 보여줌 (기본: 값 있을 때만)
  onClear?: () => void; // 지우기 버튼 클릭 시 동작 커스터마이즈 (기본: onChange(""))
  maxLength?: number;
};

export default function SearchInput({
  value,
  onChange,
  onSearchClick,
  onEnter,
  onFocus,
  onBlur,
  placeholder = "검색어를 입력하세요",
  showClearOnFocus = false,
  onClear,
  maxLength,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const showClearButton = value.length > 0 || (showClearOnFocus && isFocused);

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
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleEnter}
        maxLength={maxLength}
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
      {showClearButton && (
        <button
          type="button"
          aria-label="검색어 지우기"
          onMouseDown={(e) => e.preventDefault()} // input 포커스 유지
          onClick={() => {
            if (onClear) {
              // onClear가 있으면 "검색 종료"로 취급 — 값만 지우지 않고 포커스도 명시적으로 뺀다
              onClear();
              inputRef.current?.blur();
            } else {
              onChange("");
            }
          }}
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