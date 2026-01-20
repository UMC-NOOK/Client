// src/components/search/MyLibraryListSection.tsx
import { useMemo } from "react";
import bookCover from "../../assets/search/mock_bookcover.svg";
import { focusedBooks, unreadBooks } from "./mock/books";

type Props = {
  query: string;
};

export default function MyLibraryListSection({ query }: Props) {
  const q = query.trim().toLowerCase();

  const filteredFocused = useMemo(() => {
    if (!q) return focusedBooks;
    return focusedBooks.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredUnread = useMemo(() => {
    if (!q) return unreadBooks;
    return unreadBooks.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [q]);

  const focusedTitle = focusedBooks.length ? "최근 포커스한 책" : "이 책을 추천해요";
  const unreadTitle = unreadBooks.length ? "아직 읽지 않은 책" : "이 책을 추천해요";

  return (
    <section className="w-full flex flex-col items-start gap-[40px] pt-8">
      {/* 최근 포커스한 책 섹션 (가로 스크롤) */}
      <div className="w-full flex flex-col items-start gap-[16px]">
        <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
          {focusedTitle}
        </span>

        <div
          className="
            w-[calc(100%+16px)] -mr-4
            overflow-x-auto
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="flex flex-row items-start gap-[8px]">
            {filteredFocused.map((book) => (
              <div
                key={book.id}
                className="flex flex-col items-start gap-[4px] shrink-0 w-[100px]"
              >
                <img
                  src={bookCover}
                  alt={book.title}
                  className="w-[100px] h-[144px] rounded-[2px] object-cover"
                  draggable={false}
                />
                <span className="text-[#ECECEC] text-[14px] font-[600] leading-[21px] font-[SUIT Variable] truncate w-full">
                  {book.title}
                </span>
                <span className="text-[#A2A7C3] text-[12px] font-[400] leading-[18px] font-[SUIT] truncate w-full">
                  {book.author}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 아직 읽지 않은 책 섹션 (가로 스크롤) */}
      <div className="w-full flex flex-col items-start gap-[16px]">
        <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
          {unreadTitle}
        </span>

        <div
          className="
            w-[calc(100%+16px)] -mr-4
            overflow-x-auto
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="flex flex-row items-start gap-[8px]">
            {filteredUnread.map((book) => (
              <div
                key={book.id}
                className="flex flex-col items-start gap-[4px] shrink-0 w-[100px]"
              >
                <img
                  src={bookCover}
                  alt={book.title}
                  className="w-[100px] h-[144px] rounded-[2px] object-cover"
                  draggable={false}
                />
                <span className="text-[#ECECEC] text-[14px] font-[600] leading-[21px] font-[SUIT Variable] truncate w-full">
                  {book.title}
                </span>
                <span className="text-[#A2A7C3] text-[12px] font-[400] leading-[18px] font-[SUIT] truncate w-full">
                  {book.author}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
