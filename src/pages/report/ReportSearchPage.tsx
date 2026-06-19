// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import SearchInput from "../../components/input/SearchField";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import Report from "../../components/content/card/Book/List/Report";
import BottomSheet from "../../components/presentation/modal/bottomsheet/Origin";
import ContainerText from "../../components/action/Button/ContainerText";
import EmptyState from "../../components/content/EmptyState/EmptyState";
import RecentKeywordSection, {
  type RecentKeyword,
} from "../../components/search/RecentKeywordSection";
// types
import type { SortOption } from "../../types/report/sortOption.type";
type ViewMode = "idle" | "searching" | "results";
// api

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
  const [hasReport, setHasReport] = useState(true);
  const data = {
    items: [
      {
        bookId: 101,
        title: "작별하지 않는다",
        author: "한강",
        recordContent: "가장 오래 남았던 문장을 기록한 독서 메모입니다.",
        coverImageUrl:
          "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FA63nA%2FbtsFqKitYc4%2FAAAAAAAAAAAAAAAAAAAAAKUGtE-rV1MNFhMn5XNnw1bxEgBggGOxwdRzsu3XHcdD%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3Ds3s6yuo6E8Qa4sVG%252FjRIQEV12jA%253D",
        recordCount: 4,
      },
      {
        bookId: 99,
        title: "소년이 온다",
        author: "한강",
        recordContent: "감정이 크게 남은 부분을 짧게 정리한 기록입니다.",
        coverImageUrl:
          "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbPz6QM%2FbtsFm0GA4WY%2FAAAAAAAAAAAAAAAAAAAAADt7715qbAHxp6NPPLfY-0Z9m3jPraCk2sDQrSAblEhK%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3DE6ifvpq2kHb2bLJwKR2Ofrv2Bzc%253D",
        recordCount: 2,
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
    <div className="flex flex-col items-center justify-start w-full h-full gap-5">
      {/* header + search */}
      <div className="flex flex-col gap-4 w-full">
        <TopNavigation
          left={<img src={chevron_left} alt="back" />}
          onClickLeft={() => navigate(-1)}
          center="도서 선택"
        />
        <SearchInput
          placeholder="도서 제목, 저자명으로 검색해보세요."
          onChange={(v) => {
            setSearchQuery(v);
            setMode("searching");
          }}
          value={searchQuery}
          onSearchClick={() => handleSearch()}
          onEnter={() => handleSearch()}
          onFocus={() => setMode("searching")}
          onBlur={() => {}}
        />
      </div>

      {/* content */}
      {mode === "idle" && (
        <div className="flex flex-col gap-4">
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
            onClick={() => setHasReport(!hasReport)}
          >
            {hasReport ? (
              data.items.map((item) => (
                <Report
                  key={item.bookId}
                  {...item}
                  imageUrl={item.coverImageUrl}
                  title={item.title}
                  author={item.author}
                  recent={item.recordContent}
                  reviewNumber={item.recordCount}
                />
              ))
            ) : (
              <EmptyState text="작성한 기록이 없어요." />
            )}
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
