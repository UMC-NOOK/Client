// Client/src/components/search/SearchResultSection.tsx

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bookCover from "../../assets/search/mock_bookcover.svg";
import physicalBookIcon from "../../assets/search/card-book-icon-shape.svg";
import type { SearchScope } from "./SearchTopSection";
import type { SearchBookItem } from "../../api/search";

type Props = {
  scope: SearchScope;
  query: string;
  books: SearchBookItem[];
  totalResults?: number;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  hasNext?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
  onDirectAdd?: () => void;
};

function ResultRow({
  book,
  showDivider,
}: {
  book: SearchBookItem;
  showDivider: boolean;
}) {
  const navigate = useNavigate();

  const handleBookClick = () => {
    if (book.bookId !== null) {
      navigate(`/library/${book.bookId}?type=bookId`);
      return;
    }

    navigate(`/library/${book.isbn13}?type=isbn13`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex cursor-pointer flex-col items-center self-stretch"
      onClick={handleBookClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleBookClick();
        }
      }}
    >
      <div className="relative flex w-full items-start gap-3 py-3">
        <div className="flex h-20.5 w-14 shrink-0 items-center justify-center">
          <img
            src={book.coverImageUrl || bookCover}
            alt={book.title || "도서 표지"}
            draggable={false}
            className="h-20.5 w-14 rounded-xs object-cover"
            onError={(event) => {
              event.currentTarget.src = bookCover;
            }}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start">
          <div className="mb-0.5 line-clamp-2 w-full break-keep text-subtitle-14-sb text-gray-90">
            <span>
              [{book.mallType ?? "BOOK"}] {book.title ?? ""}
            </span>
          </div>

          <div className="w-full truncate text-body-13-r text-gray-70">
            {book.author ?? ""}
          </div>
        </div>

        {!book.inLibrary && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-17 flex h-4 w-4 items-center justify-start"
          >
            <img
              src={physicalBookIcon}
              alt=""
              draggable={false}
              className="h-[11.667px] w-[12.833px]"
            />
          </div>
        )}
      </div>

      {showDivider && (
        <div className="flex w-full flex-col items-center py-1">
          <div className="h-px w-full bg-gradient-divider" />
        </div>
      )}
    </div>
  );
}

function DirectAddRow({
  onClick,
  isEmpty,
}: {
  onClick?: () => void;
  isEmpty: boolean;
}) {
  return (
    <div
      className={[
        "flex w-full items-center justify-start",
        isEmpty ? "pt-0" : "pt-4",
      ].join(" ")}
    >
      <span className="text-label-14-sb text-gray-60">
        찾으시는 도서가 없나요?
      </span>

      <button
        type="button"
        onClick={onClick}
        onMouseDown={(event) => event.preventDefault()}
        className="flex items-center bg-transparent px-2 py-1"
      >
        <span className="text-label-14-sb text-gray-60 underline underline-offset-2">
          도서 직접 추가
        </span>
      </button>
    </div>
  );
}

export default function SearchResultSection({
  scope,
  query,
  books,
  isLoading = false,
  isError = false,
  errorMessage,
  hasNext = false,
  isFetchingNextPage = false,
  onLoadMore,
  onDirectAdd,
}: Props) {
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);
  const requestPendingRef = useRef(false);

  const q = query.trim();
  const safeBooks = Array.isArray(books) ? books : [];
  const filtered = q ? safeBooks : [];

  const isEmpty =
    !isLoading &&
    !isError &&
    filtered.length === 0;

  /*
   * 다음 페이지 요청이 끝나면 다시 호출할 수 있도록 잠금을 해제합니다.
   */
  useEffect(() => {
    if (!isFetchingNextPage) {
      requestPendingRef.current = false;
    }
  }, [isFetchingNextPage]);

  /*
   * 목록 하단이 화면에서 200px 이내로 가까워지면
   * 다음 페이지를 자동으로 요청합니다.
   */
  useEffect(() => {
    const triggerElement = loadMoreTriggerRef.current;

    if (
      !triggerElement ||
      !hasNext ||
      !onLoadMore ||
      isLoading ||
      isError ||
      isFetchingNextPage
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          !entry?.isIntersecting ||
          requestPendingRef.current
        ) {
          return;
        }

        requestPendingRef.current = true;
        onLoadMore();
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    observer.observe(triggerElement);

    return () => {
      observer.disconnect();
    };
  }, [
    hasNext,
    isLoading,
    isError,
    isFetchingNextPage,
    onLoadMore,
  ]);

  return (
    <section className="flex w-full flex-col items-start gap-10">
      <div className="flex w-full flex-col items-start pt-5">
        <div className="flex w-full flex-col items-start">
          {isLoading ? (
            <div className="w-full py-3 text-body-13-r text-gray-70">
              검색 중...
            </div>
          ) : isError ? (
            <div className="w-full py-3 text-body-13-r text-gray-70">
              {errorMessage ??
                "검색 중 오류가 발생했습니다."}
            </div>
          ) : isEmpty ? (
            <DirectAddRow
              onClick={onDirectAdd}
              isEmpty
            />
          ) : (
            <>
              <div className="flex w-full flex-col">
                {filtered.map((book, index) => {
                  if (!book) return null;

                  return (
                    <ResultRow
                      key={`sr-${scope}-${
                        book.bookId ??
                        book.isbn13 ??
                        index
                      }-${index}`}
                      book={book}
                      showDivider={
                        index < filtered.length - 1
                      }
                    />
                  );
                })}
              </div>

              <DirectAddRow
                onClick={onDirectAdd}
                isEmpty={false}
              />

              {hasNext && (
                <div
                  ref={loadMoreTriggerRef}
                  aria-hidden={!isFetchingNextPage}
                  className="flex min-h-16 w-full items-center justify-center"
                >
                  {isFetchingNextPage && (
                    <span
                      aria-live="polite"
                      className="text-body-13-r text-gray-60"
                    >
                      불러오는 중...
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}