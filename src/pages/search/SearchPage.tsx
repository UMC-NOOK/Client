import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchTopSection, {
  type SearchScope,
} from "../../components/search/SearchTopSection";
import AllBookListSection from "../../components/search/AllBookListSection";
import MyLibraryListSection from "../../components/search/MyLibraryListSection";
import RecentKeywordSection, {
  type RecentKeyword,
} from "../../components/search/RecentKeywordSection";
import SearchResultSection from "../../components/search/SearchResultSection";
import { useInfiniteSearchBooks } from "../../hooks/queries/useInfiniteSearchBooks";
import { useSearchHistories } from "../../hooks/queries/useSearchHistories";
import type { SearchBooksResult } from "../../api/search";
import { useDeleteSearchHistory } from "../../hooks/mutations/useDeleteSearchHIstory";

type ViewMode = "idle" | "searching" | "results";

export default function SearchPage() {
  const navigate = useNavigate();

  const [scope, setScope] = useState<SearchScope>("all");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [mode, setMode] = useState<ViewMode>("idle");
  const [recent, setRecent] = useState<RecentKeyword[]>([]);

  const searchType = scope === "all" ? "GLOBAL" : "LIBRARY";
  useDeleteSearchHistory();

  const { data: historyData } = useSearchHistories({
    type: searchType,
    enabled: mode === "searching",
  });

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteSearchBooks({
    type: searchType,
    keyword: submittedQuery,
    enabled: mode === "results" && !!submittedQuery.trim(),
  });

  useEffect(() => {
    if (!historyData) return;

    setRecent(
      historyData.map((text, index) => ({
        id: index + 1,
        text,
      })),
    );
  }, [historyData]);

  const books = useMemo(() => {
    if (!data?.pages) return [];
    return data?.pages
      .flatMap((page: SearchBooksResult) =>
         Array.isArray(page.books) ? page.books : [],
      )
      .filter(Boolean);
    },[data]);
  
  const totalResults = data?.pages?.[0]?.totalResults ?? 0;
  const safeBooks = Array.isArray(books) ? books : [];
  
  const handleSearch = (overrideQuery?: string) => {
    const target = (overrideQuery ?? query).trim();
    if (!target) return;

    setQuery(target);
    setSubmittedQuery(target);
    setMode("results");

    setRecent((prev) => {
      const withoutDup = prev.filter((item) => item.text !== target);
      return [{ id: Date.now(), text: target }, ...withoutDup].slice(0, 10);
    });
  };

  const isInputMode = mode === "searching";

  return (
    <div className="w-full pb-10">
      <SearchTopSection
        title="도서 검색"
        activeScope={scope}
        onScopeChange={(next) => {
          setScope(next);
          setMode((prev) => (prev === "results" ? "results" : "idle"));
        }}
        query={query}
        onQueryChange={(v) => {
          setQuery(v);
          setMode("searching");
        }}
        onSearchClick={() => handleSearch()}
        onEnter={() => handleSearch()}
        onFocus={() => setMode("searching")}
        onBlur={() => {}}
        isInputMode={isInputMode}
        onClose={() => {
          setQuery("");
          setSubmittedQuery("");
          setMode("idle");
          navigate(-1);
        }}
      />

      {mode === "searching" && (
        <RecentKeywordSection
          keywords={recent}
          onDelete={(id) =>
            setRecent((prev) => prev.filter((k) => k.id !== id))
          }
          onClickKeyword={(text) => {
            handleSearch(text);
          }}
        />
      )}

      {mode === "idle" &&
        (scope === "all" ? <AllBookListSection /> : <MyLibraryListSection />)}

      {mode === "results" && (
        <SearchResultSection
          scope={scope}
          query={submittedQuery}
          books={safeBooks}
          totalResults={totalResults}
          isLoading={isLoading}
          isError={isError}
          errorMessage={
            error instanceof Error
              ? error.message
              : "검색 중 오류가 발생했습니다."
          }
          hasNext={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onDirectAdd={() => navigate("/search/new")}
        />
      )}
    </div>
  );
}