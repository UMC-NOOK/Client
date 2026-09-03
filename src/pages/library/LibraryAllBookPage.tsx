import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Icon from "../../components/action/Button/Icon";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import TabBar from "../../components/navigation/tabs/TabBar";
import BookList from "../../components/content/card/Book/List";
import Divider from "../../components/layout/Divider";
import LoadingState from "../../components/feedback/LoadingState";

import chevronLeft from "../../assets/icons/chevron_left.svg";
import search from "../../assets/icons/search.svg";
import bookCoverPlaceholder from "../../assets/images/book-cover-placeholder.png";

import { getLibraryStatusBooks } from "../../api/library";
import { getBookDetailWithBookId } from "../../api/bookInfo";
import { useLibraryStatusCounts } from "../../hooks/queries/library/useLibraryStatusCounts";

import type {
  BookItemsStatusItems,
  BookStatusType,
} from "../../types/libraryInfo/library";

type LibraryTab = BookStatusType;

/** API 요청·화면에 한 번에 보이는 최대 권수 */
const PAGE_SIZE = 5;

const TAB_OPTIONS = [
  { label: "독서 전", value: "BEFORE" },
  { label: "독서 중", value: "READING" },
  { label: "완독", value: "FINISHED" },
] as const;

const SECTION_SUBJECT: Record<LibraryTab, string> = {
  BEFORE: "독서 전인",
  READING: "독서 중인",
  FINISHED: "완독한",
};

const SECTION_BOTTOM: Record<LibraryTab, string> = {
  BEFORE: "아직 포커스 한 적 없는 책들이에요.",
  READING: "한 번 이상 포커스 한 책들이에요.",
  FINISHED: "다 읽은 책들이에요.",
};

function isLibraryTab(value: string): value is LibraryTab {
  return value === "BEFORE" || value === "READING" || value === "FINISHED";
}

function hasMorePages(hasNext: boolean | null) {
  return hasNext === true;
}

function formatDateLabel(iso: string) {
  const d = new Date(iso);

  if (Number.isNaN(d.getTime())) return iso.slice(0, 10);

  return `${String(d.getFullYear()).slice(2)}.${d.getMonth() + 1}.${d.getDate()}`;
}

function getBookListProps(item: BookItemsStatusItems<LibraryTab>, tab: LibraryTab) {
  if (tab === "BEFORE") {
    return { type: "BEFORE" as const, typeLabel: null };
  }

  if (tab === "READING") {
    const readingItem = item as BookItemsStatusItems<"READING">;

    return {
      type: "READINGORDONE" as const,
      typeLabel: readingItem.startedAt
        ? formatDateLabel(readingItem.startedAt)
        : null,
    };
  }

  const finishedItem = item as BookItemsStatusItems<"FINISHED">;

  if (finishedItem.startedAt && finishedItem.endedAt) {
    return {
      type: "READINGORDONE" as const,
      typeLabel: `${formatDateLabel(finishedItem.startedAt)} - ${formatDateLabel(
        finishedItem.endedAt,
      )}`,
    };
  }

  return { type: "READINGORDONE" as const, typeLabel: null };
}

function getEmptyText(tab: LibraryTab) {
  if (tab === "BEFORE") return "서재에 독서 전인 책이 없어요.";
  if (tab === "READING") return "서재에 독서 중인 책이 없어요.";

  return "서재에 완독한 책이 없어요.";
}

export default function LibraryAllBookPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: statusCounts, isLoading: isStatusCountsLoading } =
    useLibraryStatusCounts();

  const statusParam = searchParams.get("status");
  const tab: LibraryTab =
    statusParam && isLibraryTab(statusParam) ? statusParam : "BEFORE";

  const [bookItems, setBookItems] = useState<BookItemsStatusItems<LibraryTab>[]>(
    [],
  );
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(false);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadMoreTargetRef = useRef<HTMLDivElement | null>(null);
  const requestIdRef = useRef(0);
  const isFetchingNextPageRef = useRef(false);

  const setTab = useCallback(
    (next: LibraryTab) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          p.set("status", next);
          p.delete("cursor");
          p.delete("size");
          return p;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const handleBookClick = async (bookId: number) => {
    try {
      const bookDetail = await getBookDetailWithBookId(bookId);

      if (!bookDetail.isbn13) {
        throw new Error(`ISBN13이 없는 도서입니다: ${bookId}`);
      }

      navigate(`/library/${encodeURIComponent(bookDetail.isbn13)}`);
    } catch (error) {
      console.error("도서 상세 정보 조회에 실패했습니다.", error);
    }
  };

  const fetchLibraryStatusBooks = useCallback(
    async ({
      cursor,
      mode,
    }: {
      cursor: number | null;
      mode: "reset" | "append";
    }) => {
      if (mode === "append" && isFetchingNextPageRef.current) return;

      const requestId = ++requestIdRef.current;

      if (mode === "append") {
        isFetchingNextPageRef.current = true;
      }

      try {
        if (mode === "reset") {
          setIsInitialLoading(true);
        } else {
          setIsFetchingNextPage(true);
        }

        setIsError(false);

        const result = await getLibraryStatusBooks({
          status: tab,
          cursor,
          size: PAGE_SIZE,
        });

        if (requestId !== requestIdRef.current) return;

        const page = result.bookItems;

        setBookItems((prev) =>
          mode === "append" ? [...prev, ...page.items] : page.items,
        );
        setNextCursor(page.nextCursor);
        setHasNext(hasMorePages(page.hasNext));
      } catch (error) {
        console.error("서재 상태별 책 목록 조회 실패:", error);

        if (requestId !== requestIdRef.current) return;

        setIsError(true);

        if (mode === "reset") {
          setBookItems([]);
          setNextCursor(null);
          setHasNext(false);
        }
      } finally {
        if (requestId === requestIdRef.current) {
          if (mode === "reset") {
            setIsInitialLoading(false);
          } else {
            setIsFetchingNextPage(false);
          }
        }

        if (mode === "append") {
          isFetchingNextPageRef.current = false;
        }
      }
    },
    [tab],
  );

  useEffect(() => {
    setBookItems([]);
    setNextCursor(null);
    setHasNext(false);
    setIsError(false);

    void fetchLibraryStatusBooks({
      cursor: null,
      mode: "reset",
    });
  }, [fetchLibraryStatusBooks]);

  useEffect(() => {
    const target = loadMoreTargetRef.current;

    if (!target) return;
    if (isInitialLoading) return;
    if (isFetchingNextPage) return;
    if (isError) return;
    if (!hasNext) return;
    if (nextCursor === null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        void fetchLibraryStatusBooks({
          cursor: nextCursor,
          mode: "append",
        });
      },
      {
        root: null,
        rootMargin: "80px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [
    fetchLibraryStatusBooks,
    hasNext,
    isError,
    isFetchingNextPage,
    isInitialLoading,
    nextCursor,
    bookItems.length,
  ]);

  if (isInitialLoading || isStatusCountsLoading) {
    return <LoadingState variant="fullscreen" />;
  }

  return (
    <div>
      <div className="pt-2">
        <TabBar
          left={
            <Link to="/library">
              <Icon size="m">
                <img src={chevronLeft} alt="뒤로가기" />
              </Icon>
            </Link>
          }
          center={
            <div className="text-title-18-m text-gray-90">서재 전체 보기</div>
          }
          right={
            <Icon size="m">
              <img src={search} alt="검색" />
            </Icon>
          }
        />
      </div>

      <div className="py-8">
        <SectionHeader
          size="20"
          top={
            <div className="flex items-center gap-1">
              <label className="text-title-20-b text-gray-90">
                {SECTION_SUBJECT[tab]} 책이{" "}
              </label>
              <label className="text-title-20-b text-yellow-70">
                {statusCounts?.[tab] ?? 0}권
              </label>
              <label className="text-title-20-b text-gray-90"> 있어요.</label>
            </div>
          }
          bottom={<div className="text-body-14-m">{SECTION_BOTTOM[tab]}</div>}
        />
      </div>

      <div>
        <TabBar
          options={TAB_OPTIONS}
          value={tab}
          onChange={(value) => setTab(value as LibraryTab)}
          variant="underlineGradient"
        />
      </div>

      <div className="flex flex-col pt-6">
        {isError && bookItems.length === 0 ? (
          <div className="text-label-14-sb text-gray-60">
            목록을 불러오지 못했어요.
          </div>
        ) : bookItems.length === 0 ? (
          <div className="text-label-14-sb text-gray-60">{getEmptyText(tab)}</div>
        ) : (
          <div
            className="flex flex-col"
          >
            {bookItems.map((item, index) => {
              const bookListProps = getBookListProps(item, tab);

              return (
                <div
                  key={`${item.bookId}-${index}`}
                  className={index === 0 ? "" : "pt-4"}
                >
                  <BookList
                    imageUrl={item.coverUrl || bookCoverPlaceholder}
                    title={item.title}
                    author={item.author}
                    type={bookListProps.type}
                    typeLabel={bookListProps.typeLabel}
                    onClick={() => void handleBookClick(item.bookId)}
                  />

                  {index !== bookItems.length - 1 ? (
                    <div className="py-1">
                      <Divider width="full" />
                    </div>
                  ) : null}
                </div>
              );
            })}

            {hasNext ? (
              <div ref={loadMoreTargetRef} className="h-6 shrink-0" />
            ) : null}

            {isFetchingNextPage ? (
              <div className="py-4 text-center text-label-14-sb text-gray-60">
                더 불러오는 중…
              </div>
            ) : null}

            {isError && bookItems.length > 0 ? (
              <div className="py-4 text-center text-label-14-sb text-gray-60">
                추가 목록을 불러오지 못했어요.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
