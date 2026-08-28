// Client/src/components/search/SearchTopSection.tsx
import { useEffect, useState } from "react";
import closeIcon from "../../assets/logo/close-button.svg";
import SearchInput from "../input/SearchField";
import Text from "../navigation/tabs/Text";
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
      {/* ✅ 공용 헤더 */}
      <TopNavigation
        // 오른쪽 X와 대칭 맞추려 좌측 스페이서도 40x40으로
        left={<div className="h-10 w-10" aria-hidden="true" />}
        center={
          <h1 className="text-gray-90 text-title-18-m text-center">{title}</h1>
        }
        right={
          // 2겹: 40x40 버튼 + padding round-8(8px)
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-10 w-10 items-center justify-center p-2"
          >
            {/* 3겹: 24x24 컨테이너 */}
            <span className="flex h-6 w-6 items-center justify-center">
              {/* 4겹: 17.5 글리프 (gray-90) */}
              <img
                src={closeIcon}
                alt=""
                draggable={false}
                className="h-[1.094rem] w-[1.094rem]" /* 17.5px */
              />
            </span>
          </button>
        }
      />

      {/* 탭 + 검색바 */}
      <div className="w-full flex flex-col items-start gap-4">
        <Text<SearchScope>
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
          placeholder={placeholder}
        />
      </div>
    </section>
  );
}