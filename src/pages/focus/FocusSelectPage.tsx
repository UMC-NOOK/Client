import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import chevronLeftIcon from "../../assets/icons/chevron_left.svg";
import closeIcon from "../../assets/icons/close.svg";
import ContainerText from "../../components/action/Button/ContainerText";
import BookList from "../../components/content/card/Book/List";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import SearchInput from "../../components/input/SearchField";
import Divider from "../../components/layout/Divider";
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import BottomSheet from "../../components/presentation/modal/bottomsheet/Origin";
import RecentKeywordSection, {
  type RecentKeyword,
} from "../../components/search/RecentKeywordSection";
import { mockFocusLibraryBooks } from "../../mocks/focus/focus";
import type {
  FocusBookStatus,
  FocusLibraryBookItem,
} from "../../types/focus/focus";

type ViewMode = "idle" | "searching" | "results";
type SortValue = "RECENT_FOCUS" | "RECORD_MOST" | "RECORD_LEAST" | "ALPHABETICAL";

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "RECENT_FOCUS", label: "최근 포커스 한 순" },
  { value: "RECORD_MOST", label: "기록 많은 순" },
  { value: "RECORD_LEAST", label: "기록 적은 순" },
  { value: "ALPHABETICAL", label: "가나다 순" },
];

const STATUS_LABEL: Record<FocusBookStatus, string> = {
  BEFORE: "독서 전",
  READING: "독서 중",
  FINISHED: "완독",
};

function sortLibraryBooks(items: FocusLibraryBookItem[], sort: SortValue) {
  const sorted = [...items];

  if (sort === "RECENT_FOCUS") {
    sorted.sort((a, b) => {
      if (!a.recentFocusedAt && !b.recentFocusedAt) return 0;
      if (!a.recentFocusedAt) return 1;
      if (!b.recentFocusedAt) return -1;
      return b.recentFocusedAt.localeCompare(a.recentFocusedAt);
    });
  } else if (sort === "RECORD_MOST") {
    sorted.sort((a, b) => b.focusRecordCount - a.focusRecordCount);
  } else if (sort === "RECORD_LEAST") {
    sorted.sort((a, b) => a.focusRecordCount - b.focusRecordCount);
  } else {
    sorted.sort((a, b) => a.title.localeCompare(b.title, "ko"));
  }

  return sorted;
}

function BookListRows({
  books,
  onSelectBook,
}: {
  books: FocusLibraryBookItem[];
  onSelectBook: () => void;
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      {books.map((book, index) => (
        <div key={book.libraryId}>
          <BookList
            imageUrl={book.coverUrl}
            title={book.title}
            author={book.author}
            type="REPORT"
            typeLabel={STATUS_LABEL[book.status]}
            onClick={onSelectBook}
          />
          {index !== books.length - 1 && <Divider width="full" />}
        </div>
      ))}
    </div>
  );
}

export default function FocusSelectPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<ViewMode>("idle");
  const [sortOption, setSortOption] = useState<SortValue>("RECENT_FOCUS");
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [recentKeywords, setRecentKeywords] = useState<RecentKeyword[]>([]);

  const isSearchActive = mode === "searching" || mode === "results";

  const sortedBooks = useMemo(
    () => sortLibraryBooks(mockFocusLibraryBooks, sortOption),
    [sortOption],
  );

  const trimmedQuery = query.trim();
  const searchResults = useMemo(
    () =>
      trimmedQuery
        ? sortedBooks.filter((book) => book.title.includes(trimmedQuery))
        : [],
    [sortedBooks, trimmedQuery],
  );

  // 책 선택 시 메인 화면의 책 카드와 동일하게 테마 선택으로 이동한다.
  // 메인 화면도 아직 선택한 책(libraryId)을 다음 화면으로 넘기지 않는 상태라 동일하게 맞춘다.
  const goToThemeSelect = () => navigate("/focus/theme");

  const commitSearch = (overrideQuery?: string) => {
    const target = (overrideQuery ?? query).trim();
    if (!target) return;

    setQuery(target);
    setMode("results");
    setRecentKeywords((prev) => {
      const withoutDup = prev.filter((keyword) => keyword.text !== target);
      return [{ id: Date.now(), text: target }, ...withoutDup].slice(0, 10);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <TopNavigation
          left={isSearchActive ? undefined : <img src={chevronLeftIcon} alt="뒤로가기" />}
          onClickLeft={isSearchActive ? undefined : () => navigate(-1)}
          center="도서 선택"
          right={isSearchActive ? <img src={closeIcon} alt="닫기" /> : undefined}
          onClickRight={isSearchActive ? () => navigate(-1) : undefined}
        />

        <SearchInput
          placeholder="내 서재에서 책을 찾아보세요."
          value={query}
          onChange={(value) => {
            setQuery(value);
            setMode(value.trim() === "" ? "searching" : "results");
          }}
          onSearchClick={() => commitSearch()}
          onEnter={() => commitSearch()}
          onFocus={() => {
            if (mode === "idle") setMode("searching");
          }}
        />
      </div>

      {mode === "idle" &&
        (mockFocusLibraryBooks.length === 0 ? (
          <p className="py-16 text-center text-body-14-r text-gray-50">
            서재에 등록한 책이 없어요.
          </p>
        ) : (
          <div className="mt-5 flex w-full flex-col items-end gap-2">
            <div className="p-2">
              <SectionHeader
                size="14"
                showCaret
                open={showSortSheet}
                top={SORT_OPTIONS.find((option) => option.value === sortOption)?.label}
                onToggle={setShowSortSheet}
              />
            </div>
            <BookListRows books={sortedBooks} onSelectBook={goToThemeSelect} />
          </div>
        ))}

      {mode === "searching" && (
        <RecentKeywordSection
          keywords={recentKeywords}
          onDelete={(id) =>
            setRecentKeywords((prev) => prev.filter((keyword) => keyword.id !== id))
          }
          onClickKeyword={(text) => commitSearch(text)}
        />
      )}

      {mode === "results" && (
        <div className="mt-8 flex flex-col gap-4">
          <SectionHeader size="13" top={`${searchResults.length}권의 도서가 검색되었어요.`} />
          <BookListRows books={searchResults} onSelectBook={goToThemeSelect} />
        </div>
      )}

      <BottomSheet open={showSortSheet} onClose={() => setShowSortSheet(false)} title="정렬">
        <div className="flex w-full flex-col gap-1">
          {SORT_OPTIONS.map((option) => (
            <ContainerText
              key={option.value}
              text={option.label}
              active={sortOption === option.value}
              onClick={() => {
                setSortOption(option.value);
                setShowSortSheet(false);
              }}
            />
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
