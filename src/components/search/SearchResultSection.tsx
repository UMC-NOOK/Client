// Client/src/components/search/SearchResultSection.tsx
import bookCover from "../../assets/search/mock_bookcover.svg";
import physicalBookIcon from "../../assets/search/card-book-icon-shape.svg";
import type { SearchScope } from "./SearchTopSection";

// Mock Data Imports
import { allBooks as allBooksExternal } from "./mock/allBooks";
import {
  focusedBooks,
  unreadBooks,
  fallbackRecommendedBooks,
} from "./mock/myLibrary";

type Props = {
  scope: SearchScope; // "all" | "my"
  query: string;
  onDirectAdd?: () => void;
};

type Book = {
  id: number | string;
  title: string;
  author: string;
  category: string;
  isInMyLibrary: boolean;
};

function uniqById<T extends { id: any }>(arr: T[]) {
  const seen = new Set<any>();
  const out: T[] = [];
  for (const x of arr) {
    if (seen.has(x.id)) continue;
    seen.add(x.id);
    out.push(x);
  }
  return out;
}

function ResultRow({ book, showDivider }: { book: Book; showDivider: boolean }) {
  return (
    <div className="flex flex-col items-center self-stretch">
      {/* row */}
      <div className="w-full flex items-start gap-3 py-3 relative">
        {/* cover */}
        <div className="flex justify-center items-center shrink-0 w-14 h-20.5">
          <img
            src={bookCover}
            alt={book.title}
            draggable={false}
            className="w-14 h-20.5 object-cover rounded-xs"
          />
        </div>

        {/* text */}
        <div className="flex-1 flex flex-col items-start min-w-0">
          <div className="w-full break-keep line-clamp-2 text-gray-100 text-subtitle-14-sb mb-0.5">
            <span>
              [{book.category}] {book.title}
            </span>
          </div>

          <div className="w-full truncate text-gray-300 text-body-13-r">
            {book.author}
          </div>
        </div>

        {/* icon */}
        {!book.isInMyLibrary && (
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

      {/* divider */}
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
      <span className="text-gray-400 text-label-14-sb">
        찾으시는 도서가 없나요?
      </span>

      <button
        type="button"
        onClick={onClick}
        onMouseDown={(e) => e.preventDefault()}
        className="flex px-2 py-1 items-center bg-transparent"
      >
        <span className="text-gray-400 text-label-14-sb underline underline-offset-2">
          도서 직접 추가
        </span>
      </button>
    </div>
  );
}

export default function SearchResultSection({ scope, query, onDirectAdd }: Props) {
  const q = query.trim().toLowerCase();

  let source: Book[] = [];
  if (scope === "all") {
    source = allBooksExternal as Book[];
  } else {
    source = uniqById([
      ...focusedBooks,
      ...unreadBooks,
      ...fallbackRecommendedBooks,
    ]) as Book[];
  }

  const filtered = !q
    ? []
    : source.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );

  const count = filtered.length;
  const isEmpty = count === 0;

  return (
    <section className="w-full flex flex-col items-start gap-10">
      <div className="w-full flex flex-col items-start pt-5">
        {/* count */}
        <div className="w-full flex flex-col gap-2">
          <span className="text-gray-100 text-label-13-sb pb-4">
            {count}권의 도서가 검색되었어요.
          </span>
        </div>

        {/* list */}
        <div className="w-full flex flex-col items-start">
          {isEmpty ? (
            <DirectAddRow onClick={onDirectAdd} isEmpty={true} />
          ) : (
            <>
              <div className="w-full flex flex-col">
                {filtered.map((book, idx) => (
                  <ResultRow
                    key={`sr-${scope}-${book.id}-${idx}`}
                    book={book}
                    showDivider={true}
                  />
                ))}
              </div>
              <DirectAddRow onClick={onDirectAdd} isEmpty={false} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
