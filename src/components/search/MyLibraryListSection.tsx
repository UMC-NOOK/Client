import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bookCover from "../../assets/search/mock_bookcover.svg";
import type { LibraryHomeSection } from "../../api/search";

type Props = {
  sections: LibraryHomeSection[];
};

const LIMIT = 5;

function SectionBlock({
  title,
  items,
}: {
  title: string;
  items: LibraryHomeSection["items"];
}) {
  if (!items.length) return null;

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <span className="text-gray-90 text-label-13-b">{title}</span>
      <HorizontalBookScroller books={items} />
    </div>
  );
}

function HorizontalBookScroller({
  books,
}: {
  books: LibraryHomeSection["items"];
}) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);

  const drag = useRef({
    isDragging: false,
    moved: false,
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
    if (e.button !== 0) return;
    const el = ref.current;
    if (!el) return;

    drag.current.isDragging = true;
    drag.current.moved = false;
    drag.current.startX = e.clientX;
    drag.current.startScrollLeft = el.scrollLeft;
    drag.current.pointerId = e.pointerId;

    setSnapEnabled(false);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current.isDragging) return;

    if (Math.abs(e.clientX - drag.current.startX) > 5) {
      drag.current.moved = true;
    }

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

  const handleBookClick = (book: LibraryHomeSection["items"][number]) => {
    if (drag.current.moved) return;

    if (book.bookId != null) {
      console.log("navigate to book detail by bookId", book.bookId);
      navigate(`/library/${book.bookId}?type=bookId`);
      return;
    }

    if (book.isbn13) {
      console.log("navigate to book detail by isbn13", book.isbn13);
      navigate(`/library/${book.isbn13}?type=isbn13`);
    }
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
        {sliced.map((book, index) => (
          <div
            key={`${book.bookId ?? book.isbn13 ?? index}`}
            className="flex flex-col items-start shrink-0 w-25 snap-start cursor-pointer"
            onClick={() => handleBookClick(book)}
          >
            <img
              src={book.coverUrl || bookCover}
              alt={book.title}
              draggable={false}
              className="w-25 h-36 rounded-xs object-cover"
              onError={(e) => {
                e.currentTarget.src = bookCover;
              }}
            />

            <div className="flex flex-col items-start w-full mt-1">
              <span className="text-gray-90 text-body-14-m line-clamp-2 w-full break-keep">
                {book.title}
              </span>

              <span className="text-gray-70 text-body-12-r truncate w-full mt-0.5">
                {book.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MyLibraryListSection({ sections }: Props) {
  return (
    <section className="w-full flex flex-col items-start gap-8 pt-8">
      {sections.map((section) => (
        <SectionBlock
          key={section.type}
          title={section.title}
          items={section.items}
        />
      ))}
    </section>
  );
}