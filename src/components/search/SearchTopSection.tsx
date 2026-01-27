// Client/src/components/search/SearchTopSection.tsx
import { useEffect, useRef, useState } from "react";
import closeIcon from "../../assets/logo/close-button.svg";
import searchIcon from "../../assets/logo/search-field-button-icon-shape.svg";

export type SearchScope = "all" | "my";

type Props = {
  title?: string;

  activeScope?: SearchScope;
  onScopeChange?: (scope: SearchScope) => void;

  query?: string;
  onQueryChange?: (v: string) => void;

  onClose?: () => void;
  onSearchClick?: () => void;

  onFocus?: () => void;
  onBlur?: () => void;

  onEnter?: () => void;

  isInputMode?: boolean;

  placeholder?: string;
};

export default function SearchTopSection({
  title = "도서 검색",
  activeScope = "all",
  onScopeChange,
  query = "",
  onQueryChange,
  onClose,
  onSearchClick,
  onFocus,
  onBlur,
  onEnter,
  isInputMode = false,
  placeholder = "제목, 저자, ISBN으로 검색",
}: Props) {
  const [currentScope, setCurrentScope] = useState<SearchScope>(activeScope);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCurrentScope(activeScope);
  }, [activeScope]);

  const handleScopeClick = (scope: SearchScope) => {
    setCurrentScope(scope);
    onScopeChange?.(scope);
  };

  const enterInputMode = () => {
    onFocus?.();
    inputRef.current?.focus();
  };

  return (
    <section className="w-full flex flex-col items-start gap-4">
      {/* 헤더 */}
      <div className="w-full h-10 flex items-center justify-between">
        <div className="w-6 h-6" aria-hidden="true" />
        <h1 className="text-gray-100 text-[18px] font-medium leading-6.75 font-[SUIT] text-center">
          {title}
        </h1>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center"
        >
          <img
            src={closeIcon}
            alt="닫기"
            className="w-6 h-6"
            draggable={false}
          />
        </button>
      </div>

      {/* 탭 + 검색바 */}
      <div className="w-full flex flex-col items-start gap-4">
        {/* 탭 */}
        <div className="w-full rounded-[20px] bg-gray-900 flex relative">
          <TabButton
            label="전체 도서 검색"
            active={currentScope === "all"}
            onClick={() => handleScopeClick("all")}
          />
          <TabButton
            label="내 서재 검색"
            active={currentScope === "my"}
            onClick={() => handleScopeClick("my")}
          />
        </div>

        <div
          onMouseDown={(e) => {
            e.preventDefault();
            enterInputMode();
          }}
          onTouchStart={() => {
            enterInputMode();
          }}
          className="w-full flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-[13.5px]"
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange?.(e.target.value)}
            onFocus={() => {
              onFocus?.();
            }}
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
              text-[16px] font-normal leading-6 font-[SUIT]
              truncate
            "
          />

          <button
            type="button"
            onClick={onSearchClick}
            className="flex items-center justify-center"
          >
            <img
              src={searchIcon}
              alt="검색"
              className="w-[19.5px] h-[19.5px]"
              style={{ aspectRatio: "19.5 / 19.5" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-10 px-4 py-3 items-center justify-center flex-1 rounded-[20px] z-10 ${
        active ? "bg-gray-700" : ""
      }`}
    >
      <span
        className="truncate"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: active ? "#ECECEC" : "#697198",
          fontFamily: "SUIT Variable",
          fontSize: 16,
          fontWeight: 600,
          lineHeight: "100%",
        }}
      >
        {label}
      </span>
    </button>
  );
}
