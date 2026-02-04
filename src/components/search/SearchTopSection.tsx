// Client/src/components/search/SearchTopSection.tsx
import { useEffect, useRef, useState } from "react";
import closeIcon from "../../assets/logo/close-button.svg";
import SearchInput from "../input/SearchField";
import SegmentedControl from "../navigation/tabs/Text";
import TopNavigation from "../navigation/topnavigation/TopNavigation";

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
  title = "도서git검색",
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
      {/* ✅ 공용 헤더 */}
      <TopNavigation
        left={<div className="w-6 h-6" aria-hidden="true" />}
        center={<h1 className="text-gray-100 text-title-18-m text-center">{title}</h1>}
        right={
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center"
            aria-label="닫기"
          >
            <img src={closeIcon} alt="" className="w-6 h-6" draggable={false} />
          </button>
        }
      />

      {/* 탭 + 검색바 */}
      <div className="w-full flex flex-col items-start gap-4">
        <SegmentedControl<SearchScope>
          ariaLabel="search scope"
          value={currentScope}
          onChange={handleScopeChange}
          buttonWidthPx={168}
          options={[
            { value: "all", label: "전체 도서 검색" },
            { value: "my", label: "내 서재 검색" },
          ]}
        />

        <SearchInput
          value={query}
          onChange={(v) => onQueryChange?.(v)}
          onSearchClick={onSearchClick}
          onEnter={onEnter}
          onFocus={onFocus}
          onBlur={onBlur}
          isInputMode={isInputMode}
          placeholder={placeholder}
        />
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
      className={[
        "relative flex h-10 px-4 py-3 items-center justify-center flex-1 rounded-[20px] z-10",
        active ? "bg-gray-700" : "",
      ].join(" ")}
    >
      <span
        className={[
          "truncate text-label-16-sb",
          active ? "text-gray-100" : "text-gray-500",
        ].join(" ")}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
    </button>
  );
}
