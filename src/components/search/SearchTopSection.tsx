import { useState, useEffect } from "react";
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
  placeholder = "제목, 저자, ISBN으로 검색",
}: Props) {
  const [currentScope, setCurrentScope] = useState<SearchScope>(activeScope);

  useEffect(() => {
    setCurrentScope(activeScope);
  }, [activeScope]);

  const handleScopeClick = (scope: SearchScope) => {
    setCurrentScope(scope);
    onScopeChange?.(scope);
  };

  return (
    <section className="w-full flex flex-col items-start gap-4">
      {/* 헤더 영역 */}
      <div className="w-full h-10 flex items-center justify-between">
        <div className="w-6 h-6" aria-hidden="true" />
        <h1 className="text-[#ECECEC] text-[18px] font-medium leading-[27px] font-[SUIT] text-center">
          {title}
        </h1>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center"
        >
          <img src={closeIcon} alt="닫기" className="w-6 h-6" draggable={false} />
        </button>
      </div>

      {/* 탭 + 검색바 영역 */}
      <div className="w-full flex flex-col items-start gap-4">
        {/* 탭 */}
        <div className="w-full rounded-[20px] bg-[#1B203B] flex relative">
          <TabButton label="전체 도서 검색" active={currentScope === "all"} onClick={() => handleScopeClick("all")} />
          <TabButton label="내 서재 검색" active={currentScope === "my"} onClick={() => handleScopeClick("my")} />
        </div>

        {/* 검색바 */}
        <div className="w-full flex items-center gap-2 rounded-[8px] bg-[#1B203B] px-4 py-[13.5px]">
          <input
            value={query}
            onChange={(e) => onQueryChange?.(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-[#ECECEC] placeholder-[#A2A7C3] text-[16px] font-[400] leading-[24px] font-[SUIT] truncate"
          />
          <button type="button" onClick={onSearchClick} className="flex items-center justify-center">
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
        active ? "bg-[#353957]" : ""
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
