import { useRef } from "react";
import bookCover from "../../assets/search/mock_bookcover.svg";
import { bestBooks, recommendedBooks, type Book } from "./mock/allBooks";

const LIMIT = 5;

function HorizontalBookScroller({ books }: { books: Book[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
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
      className={[
        "w-[calc(100%+16px)] -mr-4",
        "overflow-x-auto",
        "cursor-grab active:cursor-grabbing",
        "select-none",
        "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        "[scroll-snap-type:x_mandatory]",
      ].join(" ")}
    >
      <div className="flex items-start gap-2 pr-4">
        {books.slice(0, LIMIT).map((book, index) => (
          <div
            key={`rec-${book.id}-${index}`}
            className="shrink-0 w-25 snap-start flex flex-col items-start"
          >
            <img
              src={bookCover}
              alt={book.title}
              draggable={false}
              className="w-25 h-36 rounded-xs object-cover"
            />

            <div className="w-full mt-1 flex flex-col items-start">
              <span className="w-full break-keep line-clamp-2 text-gray-100 text-subtitle-14-sb">
                {book.title}
              </span>

              <span className="w-full mt-0.5 truncate text-gray-300 text-body-12-r">
                {book.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AllBookListSection() {
  return (
    <section className="w-full flex flex-col items-start gap-8 pt-8">
      {/* 추천 */}
      <div className="w-full flex flex-col items-start gap-4">
        <span className="text-gray-100 text-label-13-sb">이 책을 추천해요</span>
        <HorizontalBookScroller books={recommendedBooks} />
      </div>

      {/* 주간 베스트 */}
      <div className="w-full flex flex-col items-start gap-4">
        <span className="text-gray-100 text-label-13-sb">주간 베스트</span>

        <div className="w-full flex flex-col items-start gap-2">
          {bestBooks.map((book, idx) => (
            <div
              key={`best-${book.id}-${idx}`}
              className="w-full h-7 flex items-center gap-2"
            >
              {/* 순위 */}
              <div className="w-7 h-7 flex items-center justify-center">
                <span className="text-gray-100 text-btn-16-sb">{idx + 1}</span>
              </div>

              {/* 제목 */}
              <div className="flex-1 overflow-hidden py-1">
                <span className="block truncate text-gray-100 text-btn-16-sb">
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
