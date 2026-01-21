// Client/src/components/search/SearchResultSection.tsx
import bookCover from "../../assets/search/mock_bookcover.svg";
import physicalBookIcon from "../../assets/search/card-book-icon-shape.svg";
import type { SearchScope } from "./SearchTopSection";

// ✅ 전체 도서 데이터(검색 결과용)
// 너 프로젝트에서 "전체 북데이터"가 따로 있다 했으니, 여기만 네 실제 mock/export에 맞춰 연결해주면 됨.
import { allBooks } from "./mock/allBooks";

// ✅ 내 서재 데이터(검색 결과용)
// focused/unread만으로는 "내 서재 전체"가 부족할 수 있어서,
// 너가 따로 myLibraryBooks 같은 전체 리스트 export 해두는 걸 추천.
// 일단 fallback으로 focused+unread+fallback 합쳐서 사용하도록 해둠.
import { focusedBooks, unreadBooks, fallbackRecommendedBooks } from "./mock/myLibrary";

type Props = {
  scope: SearchScope;
  query: string;
  onDirectAdd?: () => void;
};

type Book = {
  id: number | string;
  title: string;  // 예: "[국내도서] 혼모노", "[eBook] 혼모노"
  author: string; // 예: "성해나"
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

function isEbookTitle(title: string) {
  return title.trim().toLowerCase().startsWith("[ebook]");
}

function ResultRow({
  book,
  showDivider,
}: {
  book: Book;
  showDivider: boolean;
}) {
  const ebook = isEbookTitle(book.title);

  return (
    <div
      className="flex flex-col items-center gap-[4px] self-stretch"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--spacing-round-4, 4px)",
        alignSelf: "stretch",
      }}
    >
      {/* 결과 아이템: 342x82, padding 12px 0, gap 12 */}
      <div
        className="w-full"
        style={{
          display: "flex",
          padding: "var(--spacing-round-12, 12px) 0",
          alignItems: "flex-start",
          gap: "var(--spacing-round-12, 12px)",
          alignSelf: "stretch",
        }}
      >
        {/* 좌측 표지 */}
        <div
          style={{
            display: "flex",
            width: 56,
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

        {/* 우측: 제목/작가/아이콘 */}
        <div className="flex-1 flex flex-col items-start">
          {/* [분류] 제목 (2줄 clamp) */}
          <div
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              alignSelf: "stretch",
              overflow: "hidden",
              color: "var(--Gray-gray-100, #ECECEC)",
              textOverflow: "ellipsis",
              fontFamily: '"SUIT Variable"',
              fontSize: 14,
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "150%",
            }}
          >
            {book.title}
          </div>

          {/* 작가 + (실물책 아이콘은 하단 끝에 얹힘) */}
          <div className="w-full flex items-end">
            <div
              className="flex-1"
              style={{
                alignSelf: "stretch",
                color: "var(--Gray-gray-100, #ECECEC)",
                fontFamily: "Pretendard",
                fontSize: 13,
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "150%",
              }}
            >
              {book.author}
            </div>

            {/* E북 아니면(=실물책이면) 아이콘 */}
            {!ebook ? (
              <div
                className="relative"
                style={{
                  display: "flex",
                  width: 16,
                  height: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <img
                  src={physicalBookIcon}
                  alt=""
                  draggable={false}
                  className="absolute"
                  style={{
                    width: "12.833px",
                    height: "11.667px",
                    left: "1.583px",
                    bottom: "2.167px",
                  }}
                />
              </div>
            ) : (
              // E북이면 공란
              <div style={{ width: 16, height: 16, flexShrink: 0 }} aria-hidden="true" />
            )}
          </div>
        </div>
      </div>

      {/* 구분선 */}
      {showDivider && (
        <div
          style={{
            width: 343,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(46, 57, 107, 0.00) 0%, #2E396B 50%, rgba(46, 57, 107, 0.00) 100%)",
          }}
        />
      )}
    </div>
  );
}

function DirectAddRow({ onClick }: { onClick?: () => void }) {
  return (
    <div className="w-full flex items-center justify-start">
      <span
        style={{
          color: "var(--Gray-gray-400, #8B94B2)",
          fontFamily: '"SUIT Variable"',
          fontSize: 14,
          fontStyle: "normal",
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
          padding: "var(--spacing-round-4, 4px) var(--spacing-round-8, 8px)",
          justifyContent: "center",
          alignItems: "center",
          background: "transparent",
        }}
      >
        <span
          style={{
            color: "var(--Gray-gray-400, #8B94B2)",
            fontFamily: '"SUIT Variable"',
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "100%",
            textDecorationLine: "underline",
            textDecorationStyle: "solid",
            textDecorationSkipInk: "auto",
            textDecorationThickness: "auto",
            textUnderlineOffset: "auto",
            textUnderlinePosition: "from-font",
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

  // ✅ 데이터 소스 선택
  const source: Book[] =
    scope === "all"
      ? (allBooks as Book[])
      : (uniqById([
          ...(focusedBooks as any),
          ...(unreadBooks as any),
          ...(fallbackRecommendedBooks as any),
        ]) as Book[]);

  const filtered = !q
    ? []
    : source.filter(
        (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );

  const count = filtered.length;

  return (
    <section
      className="w-full"
      style={{
        // ✅ 최하단 여백 스펙
        display: "flex",
        width: "var(--Devices-iOS-W, 375px)",
        padding: "0 var(--spacing-round-16, 16px)",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "var(--spacing-round-40, 40px)",
      }}
    >
      {/* ✅ 검색바 밑 여백(gap 20) */}
      <div
        className="w-full"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "var(--spacing-round-20, 20px)",
          alignSelf: "stretch",
          paddingTop: 20, // (SearchTopSection 아래 자연스러운 간격 필요하면 조절)
        }}
      >
        {/* ✅ "N권의 도서가 검색되었어요." 영역(gap 8) */}
        <div
          className="w-full"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "var(--spacing-round-8, 8px)",
            alignSelf: "stretch",
          }}
        >
          <span
            style={{
              color: "var(--Gray-gray-100, #ECECEC)",
              fontFamily: '"SUIT Variable"',
              fontSize: 13,
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "100%",
            }}
          >
            {count}권의 도서가 검색되었어요.
          </span>
        </div>

        {/* ✅ count 아래 여백(gap 16) */}
        <div
          className="w-full"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "var(--spacing-round-16, 16px)",
            alignSelf: "stretch",
          }}
        >
          {/* 0권이면: CTA만 띄우고 끝 */}
          {count === 0 ? (
            <DirectAddRow onClick={onDirectAdd} />
          ) : (
            <>
              {/* ✅ 결과 리스트 */}
              <div className="w-full">
                {filtered.map((book, idx) => (
                  <ResultRow
                    key={`sr-${scope}-${book.id}-${idx}`}
                    book={book}
                    showDivider={true} // 스펙상 "마지막 구분선 이후 공백"까지도 필요해서 마지막도 divider 유지
                  />
                ))}
              </div>

              {/* ✅ 마지막 구분선 이후 gap(4)는 ResultRow 내부 wrapper가 이미 갖고 있음 */}
              <DirectAddRow onClick={onDirectAdd} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
