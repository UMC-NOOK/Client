// Client/src/components/input/SearchField.tsx
import { useState } from "react";
import searchIcon from "../../assets/logo/search-field-button-icon-shape.svg";

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
      if (onEnter) {
        onEnter();
      } else {
        onSearchClick?.();
      }
    }
  };

  return (
    <div className="flex w-full items-center gap-2 rounded-lg bg-gray-17 px-4 py-1">
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

      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
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