// Client/src/components/search/SearchResultSection.tsx
import bookCover from "../../assets/search/mock_bookcover.svg";
import physicalBookIcon from "../../assets/search/card-book-icon-shape.svg";
import type { SearchScope } from "./SearchTopSection";

// Mock Data Imports
import { allBooks as allBooksExternal } from "./mock/allBooks";
import { focusedBooks, unreadBooks, fallbackRecommendedBooks } from "./mock/myLibrary";

type Props = {
  scope: SearchScope; // "all" | "my"
  query: string;
  onDirectAdd?: () => void;
};

type Book = {
  id: number | string;
  title: string;
  author: string;
  category: string; // [국내도서] 등
  isEbook: boolean; // 아이콘 제어용
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
  const COVER_W = 56;
  const GAP_X = 12;
  const ICON_BOX = 16;

  const ICON_LEFT = COVER_W + GAP_X;
  const ICON_BOTTOM_FROM_ITEM = 12;
  const DIVIDER_PADDING_BOTTOM = 4;
  const DIVIDER_PADDING_TOP = 4;


  return (
    <div
      className="flex flex-col items-center gap-1 self-stretch"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        alignSelf: "stretch",
      }}
    >
      <div
        className="w-full"
        style={{
          display: "flex",
          padding: "12px 0", 
          alignItems: "flex-start",
          gap: "12px",
          alignSelf: "stretch",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            width: COVER_W,
            height: 82,
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <img
            src={bookCover}
            alt={book.title}
            draggable={false}
            className="w-[56px] h-[82px] object-cover rounded-[2px]"
          />
        </div>

        <div className="flex-1 flex flex-col items-start">
          <div
            className="w-full break-keep line-clamp-2"
            style={{
              color: "#ECECEC",
              fontFamily: '"SUIT Variable"',
              fontSize: 14,
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "150%",
              marginBottom: 2, 
            }}
          >
            <span>[{book.category}] {book.title}</span>
          </div>

          <div
            className="w-full truncate"
            style={{
              color: "#A2A7C3",
              fontFamily: "Pretendard", 
              fontSize: 13,
              fontWeight: 400,
              lineHeight: "150%",
            }}
          >
            {book.author}
          </div>
        </div>

        {!book.isEbook && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: ICON_LEFT,
              bottom: ICON_BOTTOM_FROM_ITEM, 
              width: ICON_BOX,
              height: ICON_BOX,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              pointerEvents: "none",
            }}
          >
            <img
              src={physicalBookIcon}
              alt="실물 도서"
              draggable={false}
              style={{ width: "12.833px", height: "11.667px" }}
            />
          </div>
        )}
      </div>

      {showDivider && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: DIVIDER_PADDING_BOTTOM,
            paddingTop: DIVIDER_PADDING_TOP,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 1,
              background:
                "linear-gradient(90deg, rgba(46, 57, 107, 0.00) 0%, #2E396B 50%, rgba(46, 57, 107, 0.00) 100%)",
            }}
          />
        </div>
      )}
    </div>
  );
}

function DirectAddRow({ onClick }: { onClick?: () => void }) {
  return (
    <div className="w-full flex items-center justify-start pt-4">
      <span
        style={{
          color: "#8B94B2",
          fontFamily: '"SUIT Variable"',
          fontSize: 14,
          fontWeight: 600,
          lineHeight: "100%",
        }}
      >
        찾으시는 도서가 없나요?
      </span>

      <button
        type="button"
        onClick={onClick}
        style={{
          display: "flex",
          padding: "4px 8px",
          justifyContent: "center",
          alignItems: "center",
          background: "transparent",
        }}
      >
        <span
          style={{
            color: "#8B94B2",
            fontFamily: '"SUIT Variable"',
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "100%",
            textDecorationLine: "underline",
          }}
        >
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
    // scope === "my"
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

  return (
    <section
      className="w-full"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "40px",
      }}
    >
      <div
        className="w-full"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          alignSelf: "stretch",
          paddingTop: 20,
        }}
      >
        <div className="w-full" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            style={{
              color: "#ECECEC",
              fontFamily: '"SUIT Variable"',
              fontSize: 13,
              fontWeight: 600,
              lineHeight: "100%",
            }}
          >
            {count}권의 도서가 검색되었어요.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {count === 0 ? (
            <DirectAddRow onClick={onDirectAdd} />
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
              <DirectAddRow onClick={onDirectAdd} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}