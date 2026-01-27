import { useRef } from "react";
import bookCover from "../../assets/search/mock_bookcover.svg";
import type { BookItem } from "./mock/myLibrary";
import {
  focusedBooks,
  unreadBooks,
  fallbackRecommendedBooks,
} from "./mock/myLibrary";

const LIMIT = 5;

function HorizontalBookScroller({ books }: { books: BookItem[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  // --- 드래그 로직  ---
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    e.preventDefault();
    isDragging.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = el.scrollLeft;
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();
    ref.current.scrollLeft =
      startScrollLeft.current - (e.clientX - startX.current);
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (ref.current) {
      ref.current.style.scrollSnapType = "x mandatory";
      ref.current.style.cursor = "grab";
    }
    try {
      ref.current?.releasePointerCapture(e.pointerId);
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
      className="w-[calc(100%+16px)] -mr-4 overflow-x-auto cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [scroll-snap-type:x_mandatory]"
    >
      <div className="flex flex-row items-start gap-2 pr-4 h-full">
        {books.slice(0, LIMIT).map((book, index) => (
          <div
            key={`lib-${book.id}-${index}`}
            className="flex flex-col items-start shrink-0 w-25 snap-start"
          >
            <img
              src={bookCover}
              alt={book.title}
              draggable={false}
              className="w-25 h-36 rounded-xs object-cover"
            />

            <div className="flex flex-col items-start w-full mt-1">
              <span className="text-gray-100 text-[14px] font-semibold leading-5.25 font-[SUIT Variable] line-clamp-2 w-full break-keep">
                {book.title}
              </span>
              <span className="text-gray-300 text-[12px] font-normal leading-4.5 font-[SUIT] truncate w-full mt-0.5">
                {book.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyLibraryListSection() {
  const hasFocused = focusedBooks.length > 0;
  const hasUnread = unreadBooks.length > 0;
  const showFallbackOnly = !hasFocused && !hasUnread;

  return (
    <section className="w-full flex flex-col items-start gap-8 pt-8">
      {showFallbackOnly ? (
        <div className="w-full flex flex-col items-start gap-4">
          <span className="text-gray-100 text-[13px] font-semibold leading-3.25 font-[SUIT Variable]">
            이 책을 추천해요
          </span>
          <HorizontalBookScroller books={fallbackRecommendedBooks} />
        </div>
      ) : (
        <>
          {hasFocused && (
            <div className="w-full flex flex-col items-start gap-4">
              <span className="text-gray-100 text-[13px] font-semibold leading-3.25 font-[SUIT Variable]">
                최근 포커스한 책
              </span>
              <HorizontalBookScroller books={focusedBooks} />
            </div>
          )}
          {hasUnread && (
            <div className="w-full flex flex-col items-start gap-4">
              <span className="text-gray-100 text-[13px] font-semibold leading-3.25 font-[SUIT Variable]">
                아직 읽지 않은 책
              </span>
              <HorizontalBookScroller books={unreadBooks} />
            </div>
          )}
        </>
      )}
    </section>
  );
}
