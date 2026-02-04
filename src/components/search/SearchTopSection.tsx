import { useEffect, useState } from "react";
import closeIcon from "../../assets/logo/close-button.svg";
import SearchInput from "../input/SearchField";
import SegmentedControl from "../navigation/tabs/Text";

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

  useEffect(() => {
    setCurrentScope(activeScope);
  }, [activeScope]);

  const handleScopeChange = (scope: SearchScope) => {
    setCurrentScope(scope);
    onScopeChange?.(scope);
  };

  return (
    <section className="w-full flex flex-col items-start gap-4">
      {/* 헤더 */}
      <div className="w-full h-10 flex items-center justify-between">
        <div className="w-6 h-6" aria-hidden="true" />
        <h1 className="text-gray-100 text-title-18-m text-center">{title}</h1>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center"
        >
          <img src={closeIcon} alt="닫기" className="w-6 h-6" draggable={false} />
        </button>
      </div>

      {/* 탭 + 검색바 */}
      <div className="w-full flex flex-col items-start gap-4">
        {/* 탭 (공용 컴포넌트) */}
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

        {/* 검색바 */}
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
