// src/components/search/MyLibraryListSection.tsx
import { useMemo } from "react";
import bookCover from "../../assets/search/mock_bookcover.svg";
import type { BookItem } from "./mock/myLibrary";
import { focusedBooks, unreadBooks, fallbackRecommendedBooks } from "./mock/myLibrary";

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

  const filteredFallback = useMemo(() => {
    if (!q) return fallbackRecommendedBooks;
    return fallbackRecommendedBooks.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [q]);

  const hasFocused = focusedBooks.length > 0;
  const hasUnread = unreadBooks.length > 0;
  const showFallbackOnly = !hasFocused && !hasUnread;

  const renderHorizontalList = (sectionKey: string, books: BookItem[]) => (
    <div
        className="
        w-[calc(100%+16px)] -mr-4
        overflow-x-auto
        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        "
    >
        <div className="flex flex-row items-start gap-[8px]">
        {books.map((book) => (
            <div
            key={`${sectionKey}-${book.id}`} // ✅ 핵심: prefix 붙여서 중복 방지
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
    );


  return (
    <section className="w-full flex flex-col items-start gap-[40px] pt-8">
      {/* 둘 다 없을 때만: 이 책을 추천해요 (한 섹션만) */}
      {showFallbackOnly ? (
        <div className="w-full flex flex-col items-start gap-[16px]">
          <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
            이 책을 추천해요
          </span>
          {renderHorizontalList("fallback", filteredFallback)}
        </div>
      ) : (
        <>
          {/* 최근 포커스한 책 (있을 때만 표시) */}
          {hasFocused && (
            <div className="w-full flex flex-col items-start gap-[16px]">
              <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
                최근 포커스한 책
              </span>
              {renderHorizontalList("focused", filteredFocused)}
            </div>
          )}

          {/* 아직 읽지 않은 책 (있을 때만 표시) */}
          {hasUnread && (
            <div className="w-full flex flex-col items-start gap-[16px]">
              <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
                아직 읽지 않은 책
              </span>
            {renderHorizontalList("unread", filteredUnread)}
            </div>
          )}
        </>
      )}
    </section>
  );
}
