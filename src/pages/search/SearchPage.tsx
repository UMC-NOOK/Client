// Client/src/pages/search/SearchPage.tsx

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

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
import { useLibrarySearchHome } from "../../hooks/queries/useLibrarySearchHome";
import { useBestsellers } from "../../hooks/queries/useBestsellers";
import { useRecommendations } from "../../hooks/queries/useRecommendations";
import { useDeleteSearchHistory } from "../../hooks/mutations/useDeleteSearchHIstory";

import type { SearchBooksResult } from "../../api/search";

type ViewMode = "idle" | "searching" | "results";

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const restoredQuery = location.state?.restoreSearch
    ? (location.state.searchQuery ?? "")
    : "";

  const restoredScope: SearchScope =
    location.state?.restoreSearch
      ? (location.state.searchScope ?? "all")
      : "all";

  const [scope, setScope] =
    useState<SearchScope>(restoredScope);

  const [query, setQuery] =
    useState(restoredQuery);

  const [submittedQuery, setSubmittedQuery] =
    useState(restoredQuery);

  const [mode, setMode] = useState<ViewMode>(
    restoredQuery ? "results" : "idle",
  );

  const [recent, setRecent] =
    useState<RecentKeyword[]>([]);

  const searchType =
    scope === "all" ? "GLOBAL" : "LIBRARY";

  const { mutate: deleteHistory } =
    useDeleteSearchHistory();

  const { data: historyData } = useSearchHistories({
    type: searchType,
    enabled: mode === "searching",
  });

  const { data: libraryHomeData } =
    useLibrarySearchHome(
      mode === "idle" && scope === "my",
    );

  const { data: bestsellersData } =
    useBestsellers(
      mode === "idle" && scope === "all",
    );

  const { data: recommendationsData } =
    useRecommendations(
      mode === "idle" && scope === "all",
    );

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
    enabled:
      mode === "results" &&
      Boolean(submittedQuery.trim()),
  });

  useEffect(() => {
    if (!historyData) return;

    setRecent(
      historyData.map(
        (text: string, index: number) => ({
          id: index + 1,
          text,
        }),
      ),
    );
  }, [historyData]);

  const books = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages
      .flatMap((page: SearchBooksResult) =>
        Array.isArray(page.books)
          ? page.books
          : [],
      )
      .filter(Boolean);
  }, [data]);

  const totalResults =
    data?.pages?.[0]?.totalResults ?? 0;

  const safeBooks = Array.isArray(books)
    ? books
    : [];

  const librarySections =
    libraryHomeData?.sections ?? [];

  const recommendedBooks =
    recommendationsData ?? [];

  const bestBooks =
    bestsellersData ?? [];

  const handleSearch = useCallback(
    (overrideQuery?: string) => {
      const target = (
        overrideQuery ?? query
      ).trim();

      if (!target) return;

      setQuery(target);
      setSubmittedQuery(target);
      setMode("results");

      navigate("/search", {
        replace: true,
        state: {
          restoreSearch: true,
          searchQuery: target,
          searchScope: scope,
        },
      });

      setRecent((previous) => {
        const withoutDuplicate =
          previous.filter(
            (item) => item.text !== target,
          );

        return [
          {
            id: Date.now(),
            text: target,
          },
          ...withoutDuplicate,
        ].slice(0, 10);
      });
    },
    [navigate, query, scope],
  );

  const handleLoadMore = useCallback(() => {
    if (
      !hasNextPage ||
      isFetchingNextPage
    ) {
      return;
    }

    void fetchNextPage();
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  const handleDirectAdd = useCallback(() => {
    navigate("/search/new");
  }, [navigate]);

  return (
    <div className="w-full pb-0">
      <SearchTopSection
        title="도서 검색"
        activeScope={scope}
        onScopeChange={(nextScope) => {
          setScope(nextScope);

          setMode((previousMode) =>
            previousMode === "results"
              ? "results"
              : "idle",
          );
        }}
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setMode("searching");
        }}
        onSearchClick={() => {
          handleSearch();
        }}
        onEnter={() => {
          handleSearch();
        }}
        onFocus={() => {
          setMode("searching");
        }}
        onBlur={() => {}}
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
          onDelete={(id) => {
            const target =
              recent.find(
                (keyword) =>
                  keyword.id === id,
              );

            if (!target) return;

            deleteHistory(
              {
                type: searchType,
                keyword: target.text,
              },
              {
                onSuccess: () => {
                  setRecent((previous) =>
                    previous.filter(
                      (keyword) =>
                        keyword.id !== id,
                    ),
                  );
                },
              },
            );
          }}
          onClickKeyword={(text) => {
            handleSearch(text);
          }}
        />
      )}

      {mode === "idle" &&
        (scope === "all" ? (
          <AllBookListSection
            recommendedBooks={
              recommendedBooks
            }
            bestBooks={bestBooks}
          />
        ) : (
          <MyLibraryListSection
            sections={librarySections}
          />
        ))}

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
          hasNext={Boolean(hasNextPage)}
          isFetchingNextPage={
            isFetchingNextPage
          }
          onLoadMore={handleLoadMore}
          onDirectAdd={handleDirectAdd}
        />
      )}
    </div>
  );
}