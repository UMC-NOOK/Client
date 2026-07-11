// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
type ViewMode = "idle" | "searching" | "results";
// hooks
import { useLibrarySearchHome } from "../../hooks/queries/useLibrarySearchHome";
import { useGetLibrarySearchItem } from "../../hooks/queries/report/useGetSearchItem";
// assets
import chevron_left from "../../assets/icons/chevron_left.svg";

export default function ReportSearchPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  // const [submittedQuery, setSubmittedQuery] = useState("");
  const [, setSubmittedQuery] = useState("");
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [recent, setRecent] = useState<RecentKeyword[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("RECENT_RECORDED");
  const [mode, setMode] = useState<ViewMode>("idle");

  const options: { label: string; value: SortOption }[] = [
    { label: "최신 기록 순", value: "RECENT_RECORDED" },
    { label: "오래된 기록 순", value: "OLDEST_RECORDED" },
    { label: "기록 많은 순", value: "RECORD_COUNT_DESC" },
    { label: "기록 적은 순", value: "RECORD_COUNT_ASC" },
  ];

  const { data: recordData } = useLibrarySearchHome();
  const {
    data: searchItemData,
    isFetching: isFetchingSearchItem,
    isError: isErrorSearchItem,
  } = useGetLibrarySearchItem(searchQuery);

  const handleSearch = (overrideQuery?: string) => {
    const target = (overrideQuery ?? searchQuery).trim();

    if (!target) return;

    setSearchQuery(target);
    setSubmittedQuery(target);
    setMode("results");

    setRecent((prev) => {
      const withoutDup = prev.filter((item) => item.text !== target);

      return [{ id: Date.now(), text: target }, ...withoutDup].slice(0, 10);
    });
  };

  // 개발용 상태
  // const [hasReport, setHasReport] = useState(true);
  const data = {
    items: [
      {
        bookId: 19,
        title: "테라피스트",
        author: "B. A. 패리스 (지은이), 박설영 (옮긴이)",
        readingStatus: "READING",

        coverImageUrl:
          "https://image.aladin.co.kr/product/28446/67/cover200/k512835515_1.jpg",
      },
      {
        bookId: 99,
        title: "소년이 온다",
        author: "한강",

        coverImageUrl:
          "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbPz6QM%2FbtsFm0GA4WY%2FAAAAAAAAAAAAAAAAAAAAADt7715qbAHxp6NPPLfY-0Z9m3jPraCk2sDQrSAblEhK%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3DE6ifvpq2kHb2bLJwKR2Ofrv2Bzc%253D",
      },
    ],
    nextCursor: "fDk5fDIwMjYtMDQtMDFUMDk6MzA",
    hasNext: true,
  };

  const deleteHistory = (
    params: { type: string; keyword: string },
    options?: { onSuccess: () => void },
  ) => {
    console.log("삭제 요청", params);
    if (options?.onSuccess) {
      options.onSuccess();
    }
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
          placeholder="내 서제에서 책을 찾아보세요."
          onChange={(value) => {
            setSearchQuery(value);
            value.trim() === "" ? setMode("searching") : setMode("results");
          }}
          value={searchQuery}
          onSearchClick={handleSearch}
          onEnter={handleSearch}
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
              top={
                <span>
                  {options.find((o) => o.value === sortOption)?.label}
                </span>
              }
              onClick={() => setShowSortSheet(true)}
            />
          </div>
          <div
            className="flex flex-col gap-2"
            // onClick={() => setHasReport(!hasReport)}
          >
            {data.items.map((item) => (
              <BookList
                key={item.bookId}
                {...item}
                imageUrl={item.coverImageUrl}
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
                  <>
                    {searchItemData?.books.length || 0}권의 도서가 검색되었어요.
                  </>
                }
              />
              {searchItemData?.books?.map((item, index) => (
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
                  {index !== (searchItemData?.books.length || 0) - 1 && (
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
        <div className="flex flex-col gap-1 p-4">
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
