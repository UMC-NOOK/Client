// Client/src/components/search/SearchResultSection.tsx
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

  return (
    <div
      className="flex flex-col items-center self-stretch"
      onClick={() => {
        console.log("navigate to book detail", book.isbn13);
        navigate(`/library/${book.isbn13}`);
      }}
    >
      <div className="w-full flex items-start gap-3 py-3 relative">
        <div className="flex justify-center items-center shrink-0 w-14 h-20.5">
          <img
            src={book?.coverImageUrl || bookCover}
            alt={book?.title || "book cover"}
            draggable={false}
            className="w-14 h-20.5 object-cover rounded-xs"
            onError={(e) => {
              e.currentTarget.src = bookCover;
            }}
          />
        </div>

        <div className="flex-1 flex flex-col items-start min-w-0">
          <div className="w-full break-keep line-clamp-2 text-gray-90 text-subtitle-14-sb mb-0.5">
            <span>
              [{book?.mallType ?? "BOOK"}] {book?.title ?? ""}
            </span>
          </div>

          <div className="w-full truncate text-gray-70 text-body-13-r">
            {book?.author ?? ""}
          </div>
        </div>

        {!book?.inLibrary && (
          <div
            aria-hidden="true"
            className="absolute left-17 bottom-3 w-4 h-4 pointer-events-none flex items-center justify-start"
          >
            <img
              src={physicalBookIcon}
              alt="실물 도서"
              draggable={false}
              className="w-[12.833px] h-[11.667px]"
            />
          </div>
        )}
      </div>

      {showDivider && (
        <div className="w-full flex flex-col items-center py-1">
          <div className="w-full h-px bg-gradient-divider" />
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
        "w-full flex items-center justify-start",
        isEmpty ? "pt-0" : "pt-4",
      ].join(" ")}
    >
      <span className="text-gray-60 text-label-14-sb">
        찾으시는 도서가 없나요?
      </span>

      <button
        type="button"
        onClick={onClick}
        onMouseDown={(e) => e.preventDefault()}
        className="flex px-2 py-1 items-center bg-transparent"
      >
        <span className="text-gray-60 text-label-14-sb underline underline-offset-2">
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
  const q = query.trim();
  const safeBooks = Array.isArray(books) ? books : [];
  const filtered = q ? safeBooks : [];
  const isEmpty = !isLoading && filtered.length === 0;

  return (
    <section className="w-full flex flex-col items-start gap-10">
      <div className="w-full flex flex-col items-start pt-5">
        <div className="w-full flex flex-col items-start">
          {isLoading ? (
            <div className="w-full py-3 text-gray-70 text-body-13-r">
              검색 중...
            </div>
          ) : isError ? (
            <div className="w-full py-3 text-gray-70 text-body-13-r">
              {errorMessage ?? "검색 중 오류가 발생했습니다."}
            </div>
          ) : isEmpty ? (
            <DirectAddRow onClick={onDirectAdd} isEmpty={true} />
          ) : (
            <>
              <div className="w-full flex flex-col">
                {filtered.map((book, idx) => {
                  if (!book) return null;

                  return (
                    <ResultRow
                      key={`sr-${scope}-${book.isbn13 ?? idx}-${idx}`}
                      book={book}
                      showDivider={true}
                    />
                  );
                })}
              </div>

              {hasNext && (
                <div className="w-full flex justify-center pt-4">
                  <button
                    type="button"
                    onClick={onLoadMore}
                    disabled={isFetchingNextPage}
                    className="text-gray-60 text-label-14-sb"
                  >
                    {isFetchingNextPage ? "불러오는 중..." : "더보기"}
                  </button>
                </div>
              )}

              <DirectAddRow onClick={onDirectAdd} isEmpty={false} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
