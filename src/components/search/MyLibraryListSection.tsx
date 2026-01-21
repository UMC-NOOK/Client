// src/components/search/MyLibraryListSection.tsx
import { useMemo, useRef } from "react";
import bookCover from "../../assets/search/mock_bookcover.svg";
import type { BookItem } from "./mock/myLibrary";
import { focusedBooks, unreadBooks, fallbackRecommendedBooks } from "./mock/myLibrary";

type Props = { query: string };

const LIMIT = 5;

function HorizontalBookScroller({
  sectionKey,
  books,
}: {
  sectionKey: string;
  books: BookItem[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // 마우스 좌클릭만(트랙패드/터치 pointer도 고려)
    if ("button" in e && (e as React.PointerEvent).button !== 0) return;

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
    const el = ref.current;
    if (!el || !isDragging.current) return;

    e.preventDefault();

    const dx = e.clientX - startX.current;
    el.scrollLeft = startScrollLeft.current - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const el = ref.current;
    if (!el) return;

    isDragging.current = false;

    el.style.scrollSnapType = "x mandatory";
    el.style.scrollBehavior = "smooth";
    el.style.cursor = "grab";

    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const limitedBooks = books.slice(0, LIMIT);

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
        cursor-grab active:cursor-grabbing
        select-none
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        [scroll-snap-type:x_mandatory]
      "
    >
      <div className="flex flex-row items-start gap-[8px] px-4 pr-4">
        {limitedBooks.map((book, index) => (
          <div
            key={`${sectionKey}-${book.id}-${index}`}
            className="flex flex-col items-start gap-[4px] shrink-0 w-[100px] snap-start"
          >
            <img
              src={bookCover}
              alt={book.title}
              className="w-[100px] h-[144px] rounded-[2px] object-cover"
              draggable={false}
              onDragStart={(ev) => ev.preventDefault()}
            />
            <span className="text-[#ECECEC] text-[14px] font-[600] leading-[21px] font-[SUIT Variable] line-clamp-2 w-full">
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

export default function MyLibraryListSection({ query }: Props) {
  const q = query.trim().toLowerCase();

  const filterFn = (list: BookItem[]) => {
    const base = !q
      ? list
      : list.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));

    return base.slice(0, LIMIT);
  };

  const filteredFocused = useMemo(() => filterFn(focusedBooks), [q]);
  const filteredUnread = useMemo(() => filterFn(unreadBooks), [q]);
  const filteredFallback = useMemo(() => filterFn(fallbackRecommendedBooks), [q]);

  const hasFocused = focusedBooks.length > 0;
  const hasUnread = unreadBooks.length > 0;
  const showFallbackOnly = !hasFocused && !hasUnread;

  return (
    <section className="w-full flex flex-col items-start gap-[32px] pt-8">
      {showFallbackOnly ? (
        <div className="w-full flex flex-col items-start gap-[16px]">
          <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
            이 책을 추천해요
          </span>
          <HorizontalBookScroller sectionKey="fallback" books={filteredFallback} />
        </div>
      ) : (
        <>
          {hasFocused && (
            <div className="w-full flex flex-col items-start gap-[16px]">
              <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
                최근 포커스한 책
              </span>
              <HorizontalBookScroller sectionKey="focused" books={filteredFocused} />
            </div>
          )}

          {hasUnread && (
            <div className="w-full flex flex-col items-start gap-[16px]">
              <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
                아직 읽지 않은 책
              </span>
              <HorizontalBookScroller sectionKey="unread" books={filteredUnread} />
            </div>
          )}
        </>
      )}
    </section>
  );
}
