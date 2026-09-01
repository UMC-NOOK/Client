// libraries
import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// components
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import SearchInput from "../../components/input/SearchField";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import BookList from "../../components/content/card/Book/List";
import BottomSheet from "../../components/presentation/modal/bottomsheet/Origin";
import ContainerText from "../../components/action/Button/ContainerText";
import Divider from "../../components/layout/Divider";
// import EmptyState from "../../components/content/EmptyState/EmptyState";
import RecentKeywordSection, {
  type RecentKeyword,
} from "../../components/search/RecentKeywordSection";
// types
import type { SortOption } from "../../types/report/sortOption.type";
import type { SearchBooksResult } from "../../api/search";
type ViewMode = "idle" | "searching" | "results";
// hooks
import { useGetLibraryBooks } from "../../hooks/queries/report/useGetLibraryBooks";
import { useDeleteSearchHistory } from "../../hooks/mutations/useDeleteSearchHIstory";
import { useSearchHistories } from "../../hooks/queries/useSearchHistories";
import { useInfiniteSearchBooks } from "../../hooks/queries/useInfiniteSearchBooks";
// assets
import chevron_left from "../../assets/icons/chevron_left.svg";

export default function ReportSearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const restoredQuery = location.state?.restoreSearch
    ? (location.state.searchQuery ?? "")
    : "";

  const [searchQuery, setSearchQuery] = useState(restoredQuery);
  // const [submittedQuery, setSubmittedQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState(restoredQuery);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [recent, setRecent] = useState<RecentKeyword[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("RECENT_RECORDED");
  const [mode, setMode] = useState<ViewMode>(
    restoredQuery ? "results" : "idle",
  );

  const options: { label: string; value: SortOption }[] = [
    { label: "최신 기록 순", value: "RECENT_RECORDED" },
    { label: "오래된 기록 순", value: "OLDEST_RECORDED" },
    { label: "기록 많은 순", value: "RECORD_COUNT_DESC" },
    { label: "기록 적은 순", value: "RECORD_COUNT_ASC" },
  ];

  const { mutate: deleteHistory } = useDeleteSearchHistory();

  const { data: recordData } = useGetLibraryBooks();
  // const {
  //   data: searchItemData,
  //   isFetching: isFetchingSearchItem,
  //   isError: isErrorSearchItem,
  // } = useGetLibrarySearchItem(submittedQuery);
  const {
    data,
    isLoading: isFetchingSearchItem,
    isError: isErrorSearchItem,
  } = useInfiniteSearchBooks({
    type: "LIBRARY",
    keyword: submittedQuery,
    enabled: mode === "results" && !!submittedQuery.trim(),
  });

  const searchItemData = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages
      .flatMap((page: SearchBooksResult) =>
        Array.isArray(page.books) ? page.books : [],
      )
      .filter(Boolean);
  }, [data]);

  const { data: historyData } = useSearchHistories({
    type: "LIBRARY",
    enabled: mode === "searching",
  });

  useEffect(() => {
    if (!historyData) return;

    setRecent(
      historyData.map((text: string, index: number) => ({
        id: index + 1,
        text,
      })),
    );
  }, [historyData]);

  const handleSearch = (overrideQuery?: string) => {
    const query =
      typeof overrideQuery === "string" ? overrideQuery : searchQuery;

    const target = query.trim();

    if (!target) {
      setSearchQuery("");
      setSubmittedQuery("");
      setMode("idle");

      navigate(location.pathname, {
        replace: true,
        state: {
          ...location.state,
          restoreSearch: false,
          searchQuery: "",
        },
      });

      return;
    }

    setSearchQuery(target);
    setSubmittedQuery(target);
    setMode("results");

    // 현재 검색 페이지의 히스토리 state를 갱신
    navigate(location.pathname, {
      replace: true,
      state: {
        ...location.state,
        restoreSearch: true,
        searchQuery: target,
      },
    });

    setRecent((prev) => {
      const withoutDup = prev.filter((item) => item.text !== target);

      return [
        {
          id: Date.now(),
          text: target,
        },
        ...withoutDup,
      ].slice(0, 10);
    });
  };

  const onQueryChange = (v: string) => {
    setSearchQuery(v);
    setMode("searching");
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      {/* header + search */}
      <div className="flex flex-col gap-4 w-full">
        <TopNavigation
          left={<img src={chevron_left} alt="back" />}
          onClickLeft={() => navigate(-1)}
          center="도서 선택"
        />
        <SearchInput
          placeholder="내 서재에서 책을 찾아보세요."
          onChange={(v) => onQueryChange?.(v)}
          value={searchQuery}
          onSearchClick={() => handleSearch()}
          onEnter={() => handleSearch()}
          onFocus={() => {
            if (mode !== "results") {
              setMode("searching");
            }
          }}
          onBlur={() => {}}
        />
      </div>

      {/* content */}
      {mode === "idle" && (
        <div className="flex flex-col gap-4 w-full mt-5">
          <div className="self-end m-2">
            <SectionHeader
              size="14"
              showCaret={true}
              open={showSortSheet}
              top={
                <span>
                  {options.find((o) => o.value === sortOption)?.label}
                </span>
              }
              onToggle={setShowSortSheet}
            />
          </div>
          <div
            className="flex flex-col gap-2"
            // onClick={() => setHasReport(!hasReport)}
          >
            {recordData?.items.map((item) => (
              <BookList
                key={item.bookId}
                {...item}
                imageUrl={item.coverUrl}
                title={item.title}
                author={item.author}
                type="REPORT"
                typeLabel={`${
                  item.readingStatus === "BEFORE"
                    ? "읽기 전"
                    : item.readingStatus === "READING"
                      ? "독서 중"
                      : "완독"
                }`}
                onClick={() =>
                  navigate(`/report/${item.bookId}`, {
                    state: { bookTitle: item.title, bookId: item.bookId },
                  })
                }
              />
            ))}
          </div>
        </div>
      )}
      {mode === "searching" && (
        <RecentKeywordSection
          keywords={recent}
          onDelete={(id) => {
            const target = recent.find((k) => k.id === id);
            if (!target) return;

            deleteHistory(
              {
                type: "LIBRARY",
                keyword: target.text,
              },
              {
                onSuccess: () => {
                  setRecent((prev) => prev.filter((k) => k.id !== id));
                },
              },
            );
          }}
          onClickKeyword={(text) => {
            handleSearch(text);
          }}
        />
      )}
      {mode === "results" && (
        <div className="flex flex-col gap-4 w-full mt-8">
          {isFetchingSearchItem && (
            <SectionHeader
              size="13"
              top={<>검색 결과를 불러오는 중이에요...</>}
            />
          )}

          {isErrorSearchItem && (
            <SectionHeader
              size="13"
              top={<>검색 결과를 불러오지 못했어요.</>}
            />
          )}

          {!isFetchingSearchItem && !isErrorSearchItem && (
            <>
              <SectionHeader
                size="13"
                top={
                  <>{searchItemData?.length || 0}권의 도서가 검색되었어요.</>
                }
              />
              {searchItemData?.map((item, index) => (
                <>
                  <BookList
                    key={item.bookId}
                    {...item}
                    imageUrl={item.coverImageUrl}
                    title={item.title}
                    author={item.author}
                    type="REPORT"
                    typeLabel={
                      item.readingStatus === "BEFORE"
                        ? "읽기 전"
                        : item.readingStatus === "READING"
                          ? "독서 중"
                          : "완독"
                    }
                    onClick={() =>
                      navigate(`/report/${item.bookId}`, {
                        state: {
                          bookTitle: item.title,
                          bookId: item.bookId,
                        },
                      })
                    }
                  />
                  {index !== (searchItemData?.length || 0) - 1 && (
                    <Divider width="full" />
                  )}
                </>
              ))}
            </>
          )}
        </div>
      )}

      {/* bottom sheet */}
      <BottomSheet
        open={showSortSheet}
        onClose={() => setShowSortSheet(false)}
        title="정렬"
      >
        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <ContainerText
              key={option.value}
              text={option.label}
              active={sortOption === option.value}
              onClick={() => setSortOption(option.value)}
            />
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
