// Client/src/components/search/MyLibraryListSection.tsx
import React, { useMemo, useRef } from "react";
import bookCover from "../../assets/search/mock_bookcover.svg";
import type { BookItem } from "./mock/myLibrary";
import {
  focusedBooks,
  unreadBooks,
  fallbackRecommendedBooks,
} from "./mock/myLibrary";

const LIMIT = 5;

function SectionBlock({
  title,
  books,
}: {
  title: string;
  books: BookItem[];
}) {
  if (!books.length) return null;

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <span className="text-gray-100 text-label-13-b">{title}</span>
      <HorizontalBookScroller books={books} />
    </div>
  );
}

function HorizontalBookScroller({ books }: { books: BookItem[] }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const drag = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
    pointerId: -1,
  });

  const sliced = useMemo(() => books.slice(0, LIMIT), [books]);

  const setSnapEnabled = (enabled: boolean) => {
    const el = ref.current;
    if (!el) return;
    el.style.scrollSnapType = enabled ? "x mandatory" : "none";
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // left click only
    const el = ref.current;
    if (!el) return;

    e.preventDefault();

    drag.current.isDragging = true;
    drag.current.startX = e.clientX;
    drag.current.startScrollLeft = el.scrollLeft;
    drag.current.pointerId = e.pointerId;

    setSnapEnabled(false);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.isDragging) return;

    e.preventDefault();
    const delta = e.clientX - drag.current.startX;
    el.scrollLeft = drag.current.startScrollLeft - delta;
  };

  const endDrag = () => {
    const el = ref.current;
    if (!el || !drag.current.isDragging) return;

    drag.current.isDragging = false;
    drag.current.pointerId = -1;

    setSnapEnabled(true);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    endDrag();
    try {
      ref.current?.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    endDrag();
    try {
      ref.current?.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerLeave={endDrag}
      className="
        w-[calc(100%+16px)] -mr-4
        overflow-x-auto select-none
        cursor-grab active:cursor-grabbing
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        [scroll-snap-type:x_mandatory]
        [touch-action:pan-x]

      "
    >
      <div className="flex items-start gap-2 pr-4">
        {sliced.map((book) => (
          <div
            key={book.id}
            className="flex flex-col items-start shrink-0 w-25 snap-start"
          >
            <img
              src={bookCover}
              alt={book.title}
              draggable={false}
              className="w-25 h-36 rounded-xs object-cover"
            />

            <div className="flex flex-col items-start w-full mt-1">
              <span className="text-gray-100 text-body-14-m line-clamp-2 w-full break-keep">
                {book.title}
              </span>

              <span className="text-gray-300 text-body-12-r truncate w-full mt-0.5">
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
        <SectionBlock title="이 책을 추천해요" books={fallbackRecommendedBooks} />
      ) : (
        <>
          <SectionBlock title="최근 포커스한 책" books={focusedBooks} />
          <SectionBlock title="아직 읽지 않은 책" books={unreadBooks} />
        </>
      )}
    </section>
  );
}
