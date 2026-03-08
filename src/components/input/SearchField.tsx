// Client/src/components/input/SearchField.tsx
import { useRef, useState } from "react";
import searchIcon from "../../assets/logo/search-field-button-icon-shape.svg";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSearchClick?: () => void;
  onEnter?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  isInputMode?: boolean;
};

export default function SearchInput({
  value,
  onChange,
  onSearchClick,
  onEnter,
  onFocus,
  onBlur,
  placeholder = "검색어를 입력하세요",
  isInputMode = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const enterInputMode = () => {
    inputRef.current?.focus();
  };

  const showFakeCursor = isFocused && value.length === 0;

  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        enterInputMode();
      }}
      onTouchStart={enterInputMode}
      className="flex w-full self-stretch items-center gap-2 rounded-lg bg-gray-17 px-4 py-1"
    >
      <div className="relative flex-1">
        {showFakeCursor && (
          <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[16px] font-normal leading-[24px] text-gray-90">
            |
          </span>
        )}

        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter?.();
              if (!onEnter) onSearchClick?.();
            }
          }}
          placeholder={!isFocused && !value ? placeholder : ""}
          className="w-full bg-transparent outline-none text-[16px] font-normal leading-[24px] text-gray-90 placeholder-gray-70 truncate caret-transparent"
        />
      </div>

      <button
        type="button"
        onClick={onSearchClick}
        className="flex h-[35.5px] w-[35.5px] items-center justify-center"
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