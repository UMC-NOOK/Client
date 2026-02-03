//Client/src/components/input/SearchField.tsx
import { useRef } from "react";
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

  const enterInputMode = () => {
    onFocus?.();
    inputRef.current?.focus();
  };

  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        enterInputMode();
      }}
      onTouchStart={enterInputMode}
      className="w-full flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-[13.5px]"
    >
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEnter?.();
            if (!onEnter) onSearchClick?.();
          }
        }}
        placeholder={isInputMode ? "" : placeholder}
        className="
          flex-1 bg-transparent outline-none
          text-gray-100 placeholder-gray-300
          text-body-16-r truncate
        "
      />

      <button type="button" onClick={onSearchClick}>
        <img
          src={searchIcon}
          alt="검색"
          className="w-[19.5px] h-[19.5px]"
          draggable={false}
        />
      </button>
    </div>
  );
}
