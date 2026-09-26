import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import chevronLeftIcon from "../../assets/icons/chevron_left.svg";
import ContainerText from "../../components/action/Button/ContainerText";
import BookList from "../../components/content/card/Book/List";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import LoadingState from "../../components/feedback/LoadingState";
import SearchInput from "../../components/input/SearchField";
import Divider from "../../components/layout/Divider";
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import BottomSheet from "../../components/presentation/modal/bottomsheet/Origin";
import RecentKeywordSection from "../../components/search/RecentKeywordSection";
import { useDeleteSearchHistory } from "../../hooks/mutations/useDeleteSearchHIstory";
import { useFocusLibraryBooks } from "../../hooks/queries/focus/useFocusLibraryBooks";
import { useInfiniteSearchBooks } from "../../hooks/queries/useInfiniteSearchBooks";
import { useSearchHistories } from "../../hooks/queries/useSearchHistories";
import type { FocusBookStatus, FocusLibrarySort } from "../../types/focus/focus";

type ViewMode = "idle" | "searching" | "results";

const SORT_OPTIONS: { value: FocusLibrarySort; label: string }[] = [
  { value: "RECENT_FOCUSED", label: "최근 포커스 한 순" },
  { value: "RECORD_COUNT_DESC", label: "기록 많은 순" },
  { value: "RECORD_COUNT_ASC", label: "기록 적은 순" },
  { value: "ALPHABETICAL", label: "가나다 순" },
];

const STATUS_LABEL: Record<FocusBookStatus, string> = {
  BEFORE: "독서 전",
  READING: "독서 중",
  FINISHED: "완독",
};

// 최근 검색어 칩 말줄임 기준(공백 포함 글자수) — 값이 바뀌면 이 숫자만 바꾸면 된다.
const RECENT_KEYWORD_MAX_CHARS = 7;

// 서재 목록(FocusLibraryListItem)과 검색 결과(SearchBookItem)의 필드명이 달라 화면 렌더링용으로 통일한다.
type SelectableBook = {
  bookId: number;
  title: string;
  author: string;
  coverUrl: string;
  status: FocusBookStatus;
};

function BookListRows({
  books,
  onSelectBook,
}: {
  books: SelectableBook[];
  onSelectBook: (bookId: number) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      {books.map((book, index) => (
        <div key={book.bookId}>
          <BookList
            imageUrl={book.coverUrl}
            title={book.title}
            author={book.author}
            type="REPORT"
            typeLabel={STATUS_LABEL[book.status]}
            onClick={() => onSelectBook(book.bookId)}
          />
          {index !== books.length - 1 && <Divider width="full" />}
        </div>
      ))}
    </div>
  );
}

export default function FocusSelectPage() {
  const navigate = useNavigate();
  const loadMoreTargetRef = useRef<HTMLDivElement | null>(null);

  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [mode, setMode] = useState<ViewMode>("idle");
  const [sortOption, setSortOption] = useState<FocusLibrarySort>("RECENT_FOCUSED");
  const [showSortSheet, setShowSortSheet] = useState(false);

  const {
    data: libraryData,
    isLoading: isLibraryLoading,
    isError: isLibraryError,
    hasNextPage: hasNextLibraryPage,
    fetchNextPage: fetchNextLibraryPage,
    isFetchingNextPage: isFetchingNextLibraryPage,
  } = useFocusLibraryBooks(sortOption);

  const libraryBooks = useMemo<SelectableBook[]>(
    () =>
      libraryData?.pages.flatMap((page) =>
        page.items.map((item) => ({
          bookId: item.bookId,
          title: item.title,
          author: item.author,
          coverUrl: item.coverUrl,
          status: item.readingStatus,
        })),
      ) ?? [],
    [libraryData],
  );

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    hasNextPage: hasNextSearchPage,
    fetchNextPage: fetchNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useInfiniteSearchBooks({
    type: "LIBRARY",
    keyword: submittedQuery,
    enabled: mode === "results",
  });

  // 검색 결과는 idle 목록의 정렬 옵션과 무관하게 항상 서버가 주는 관련도순 그대로 보여준다.
  const searchResults = useMemo<SelectableBook[]>(
    () =>
      searchData?.pages.flatMap((page) =>
        page.books.map((item) => ({
          // LIBRARY 검색은 항상 내부 도서 ID를 채워서 준다(GLOBAL만 null).
          bookId: item.bookId ?? 0,
          title: item.title,
          author: item.author,
          coverUrl: item.coverImageUrl,
          status: (item.readingStatus as FocusBookStatus | null) ?? "BEFORE",
        })),
      ) ?? [],
    [searchData],
  );
  const totalSearchResults = searchData?.pages[0]?.totalResults ?? 0;

  const { data: historyData } = useSearchHistories({
    type: "LIBRARY",
    enabled: mode === "searching",
  });
  // 서버는 검색 기록을 문자열 배열로만 준다(id 없음) — 화면 렌더링용 id는 index로 붙인다.
  const recentKeywords = useMemo(
    () => (historyData ?? []).map((text, index) => ({ id: index, text })),
    [historyData],
  );
  const { mutate: deleteHistory } = useDeleteSearchHistory();

  const goToThemeSelect = (bookId: number) => {
    navigate(`/focus/theme?bookId=${encodeURIComponent(bookId)}`);
  };

  const commitSearch = (overrideQuery?: string) => {
    const target = (overrideQuery ?? query).trim();
    if (!target) return;

    setQuery(target);
    setSubmittedQuery(target);
    setMode("results");
  };

  useEffect(() => {
    const target = loadMoreTargetRef.current;
    const hasNextPage = mode === "idle" ? hasNextLibraryPage : hasNextSearchPage;
    const isFetchingNextPage =
      mode === "idle" ? isFetchingNextLibraryPage : isFetchingNextSearchPage;

    if (!target || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        void (mode === "idle" ? fetchNextLibraryPage() : fetchNextSearchPage());
      },
      { root: null, rootMargin: "200px 0px", threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [
    mode,
    hasNextLibraryPage,
    hasNextSearchPage,
    isFetchingNextLibraryPage,
    isFetchingNextSearchPage,
    fetchNextLibraryPage,
    fetchNextSearchPage,
  ]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <TopNavigation
          left={<img src={chevronLeftIcon} alt="뒤로가기" />}
          onClickLeft={() => navigate(-1)}
          center="도서 선택"
        />

        <SearchInput
          placeholder="내 서재에서 책을 찾아보세요."
          value={query}
          onChange={(value) => {
            // 타이핑만으로는 검색을 실행하지 않는다 — 엔터/검색 아이콘으로 제출해야 결과가 뜬다
            setQuery(value);
            setMode("searching");
          }}
          onSearchClick={() => commitSearch()}
          onEnter={() => commitSearch()}
          onFocus={() => {
            if (mode === "idle") setMode("searching");
          }}
          onBlur={() => {
            // 검색어 없이 포커스가 빠지면 목록으로 되돌린다. 최근 검색어 칩과 X 버튼은
            // mousedown에서 blur를 막아두고 있어 그 클릭이 이 로직 때문에 씹히지 않는다.
            if (query.trim() === "") setMode("idle");
          }}
          maxLength={500}
          onClear={() => {
            setQuery("");
            setMode("idle");
          }}
        />
      </div>

      {mode === "idle" &&
        (isLibraryLoading ? (
          <div className="mt-16 flex w-full items-center justify-center py-16">
            <LoadingState />
          </div>
        ) : isLibraryError && libraryBooks.length === 0 ? (
          <p className="mt-16 py-16 text-center text-label-14-sb text-gray-60">
            목록을 불러오지 못했어요.
          </p>
        ) : libraryBooks.length === 0 ? (
          <div className="mt-24 flex w-full items-center justify-center py-24">
            <p className="text-label-14-sb text-gray-60">서재에 등록한 책이 없어요.</p>
          </div>
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
            <BookListRows books={libraryBooks} onSelectBook={goToThemeSelect} />
            {hasNextLibraryPage ? (
              <div ref={loadMoreTargetRef} className="h-6 w-full shrink-0" />
            ) : null}
            {isFetchingNextLibraryPage ? (
              <p className="w-full py-4 text-center text-label-14-sb text-gray-60">
                더 불러오는 중…
              </p>
            ) : null}
          </div>
        ))}

      {mode === "searching" && (
        <RecentKeywordSection
          keywords={recentKeywords}
          onDelete={(id) => {
            const target = recentKeywords.find((keyword) => keyword.id === id);
            if (target) deleteHistory({ type: "LIBRARY", keyword: target.text });
          }}
          onClickKeyword={(text) => commitSearch(text)}
          maxTextLength={RECENT_KEYWORD_MAX_CHARS}
          showAllKeywords
        />
      )}

      {mode === "results" &&
        (isSearchLoading ? (
          <div className="mt-8 flex w-full items-center justify-center py-16">
            <LoadingState />
          </div>
        ) : isSearchError ? (
          <p className="mt-8 py-16 text-center text-label-14-sb text-gray-60">
            검색 결과를 불러오지 못했어요.
          </p>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            <SectionHeader size="13" top={`${totalSearchResults}권의 도서가 검색되었어요.`} />
            <BookListRows books={searchResults} onSelectBook={goToThemeSelect} />
            {hasNextSearchPage ? (
              <div ref={loadMoreTargetRef} className="h-6 w-full shrink-0" />
            ) : null}
            {isFetchingNextSearchPage ? (
              <p className="w-full py-4 text-center text-label-14-sb text-gray-60">
                더 불러오는 중…
              </p>
            ) : null}
          </div>
        ))}

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
