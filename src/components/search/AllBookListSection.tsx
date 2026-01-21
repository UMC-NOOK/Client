// src/components/search/AllBookListSection.tsx
import { useMemo, useRef } from "react";
import bookCover from "../../assets/search/mock_bookcover.svg";
import { recommendedBooks, bestBooks } from "./mock/allBooks";

type Props = { query: string };

const LIMIT = 5;

type RecommendedBook = (typeof recommendedBooks)[number];
type BestBook = (typeof bestBooks)[number];

function HorizontalBookScroller({
  sectionKey,
  books,
}: {
  sectionKey: string;
  books: RecommendedBook[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // 마우스 좌클릭만
    if (e.button !== 0) return;

    const el = ref.current;
    if (!el) return;

    e.preventDefault();

    isDragging.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = el.scrollLeft;

    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";
    el.style.cursor = "grabbing";

    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const el = ref.current;
    if (!el) return;

    e.preventDefault();
    el.scrollLeft = startScrollLeft.current - (e.clientX - startX.current);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const el = ref.current;
    if (!el) return;

    el.style.scrollSnapType = "x mandatory";
    el.style.scrollBehavior = "smooth";
    el.style.cursor = "grab";

    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      style={{ touchAction: "pan-x" }}
      className="
        -mx-4
        overflow-x-auto
        cursor-grab
        select-none
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        [scroll-snap-type:x_mandatory]
      "
    >
      {/* ✅ 안쪽 콘텐츠는 다시 px-4로 정렬 + 오른쪽 패딩 영역까지 안 잘리게 pr-4 확보 */}
      <div className="flex flex-row items-start gap-[8px] px-4 pr-4">
        {books.map((book, index) => (
          <div
            key={`${sectionKey}-${book.id}-${index}`}
            className="flex flex-col items-start gap-[4px] shrink-0 w-[100px] snap-start"
          >
            <img
              src={bookCover}
              alt={book.title}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="w-[100px] h-[144px] rounded-[2px] object-cover"
            />
            <span className="text-[#ECECEC] text-[14px] font-[600] leading-[21px] font-[SUIT Variable] line-clamp-2 w-full break-keep tracking-tight">
              {book.title}
            </span>
            <span className="text-[#A2A7C3] text-[12px] font-[400] leading-[18px] font-[SUIT] truncate w-full">
              {book.author}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AllBookListSection({ query }: Props) {
  const q = query.trim().toLowerCase();

  const filteredRecommended = useMemo((): RecommendedBook[] => {
    const base = !q
      ? recommendedBooks
      : recommendedBooks.filter(
          (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
        );

    return base.slice(0, LIMIT);
  }, [q]);

  const filteredBest = useMemo((): BestBook[] => {
    if (!q) return bestBooks;
    return bestBooks.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [q]);

  return (
    <section className="w-full flex flex-col items-start gap-[32px] pt-8">
      {/* 추천 */}
      <div className="w-full flex flex-col items-start gap-[16px]">
        <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
          이 책을 추천해요
        </span>
        <HorizontalBookScroller sectionKey="recommended" books={filteredRecommended} />
      </div>

      {/* 주간 베스트 */}
      <div className="w-full flex flex-col items-start gap-[16px]">
        <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
          주간 베스트
        </span>

        <div className="w-full flex flex-col items-start gap-[8px]">
          {filteredBest.map((book, idx) => (
            <div key={`best-${book.id}-${idx}`} className="flex items-center w-full h-[28px] gap-[8px]">
              <div className="w-[28px] h-[28px] flex items-center justify-center px-[10px] py-[1px]">
                <span className="text-[#ECECEC] text-[16px] font-[600] leading-[16px] font-[SUIT Variable]">
                  {idx + 1}
                </span>
              </div>

              <div className="flex-1 py-[4px] overflow-hidden">
                <span className="block text-[#ECECEC] text-[16px] font-[600] leading-[16px] font-[SUIT Variable] truncate">
                  {book.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
