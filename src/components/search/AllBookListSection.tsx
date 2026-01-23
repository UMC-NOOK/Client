import { useRef } from "react";
import bookCover from "../../assets/search/mock_bookcover.svg";
import { bestBooks, recommendedBooks, type Book } from "./mock/allBooks";

const LIMIT = 5;

function HorizontalBookScroller({ books }: { books: Book[] }) {
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
    try { el.releasePointerCapture(e.pointerId); } catch {}
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
      <div className="flex flex-row items-start gap-[8px] pr-4 h-full">
        {books.slice(0, LIMIT).map((book, index) => (
          <div
            key={`rec-${book.id}-${index}`}
            className="flex flex-col items-start shrink-0 w-[100px] snap-start"
          >
            <img
              src={bookCover}
              alt={book.title}
              draggable={false}
              className="w-[100px] h-[144px] rounded-[2px] object-cover"
            />
            
            <div className="flex flex-col items-start w-full mt-[4px]">
              <span className="text-[#ECECEC] text-[14px] font-[600] leading-[21px] font-[SUIT Variable] line-clamp-2 w-full break-keep">
                {book.title}
              </span>
              <span className="text-[#A2A7C3] text-[12px] font-[400] leading-[18px] font-[SUIT] truncate w-full mt-[2px]">
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
    <section className="w-full flex flex-col items-start gap-[32px] pt-8">
      <div className="w-full flex flex-col items-start gap-[16px]">
        <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
          이 책을 추천해요
        </span>
        <HorizontalBookScroller books={recommendedBooks} />
      </div>

      <div className="w-full flex flex-col items-start gap-[16px]">
        <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
          주간 베스트
        </span>
        <div className="w-full flex flex-col items-start gap-[8px]">
          {bestBooks.map((book, idx) => (
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