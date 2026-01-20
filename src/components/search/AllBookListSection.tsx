// src/components/search/AllBookListSection.tsx
import { useMemo } from "react";
import bookCover from "../../assets/search/mock_bookcover.svg";
import { recommendedBooks, bestBooks } from "./mock/allBook";

type Props = {
  query: string;
};

export default function AllBookListSection({ query }: Props) {
  const q = query.trim().toLowerCase();

  const filteredRecommended = useMemo(() => {
    if (!q) return recommendedBooks;
    return recommendedBooks.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredBest = useMemo(() => {
    if (!q) return bestBooks;
    return bestBooks.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [q]);

  return (
    <section className="w-full flex flex-col items-start gap-[40px] pt-8">
      {/* 추천 섹션 */}
      <div className="w-full flex flex-col items-start gap-[16px]">
        <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
          이 책을 추천해요
        </span>

        <div
          className="
            w-[calc(100%+16px)] -mr-4
            overflow-x-auto
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="flex flex-row items-start gap-[8px]">
            {filteredRecommended.map((book) => (
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

      {/* 주간 베스트 섹션 */}
      <div className="w-full flex flex-col items-start gap-[16px]">
        <span className="text-[#ECECEC] text-[13px] font-[600] leading-[13px] font-[SUIT Variable]">
          주간 베스트
        </span>

        <div className="w-full flex flex-col items-start gap-[8px]">
          {filteredBest.map((book, idx) => {
            const rank = idx + 1;
            return (
              <div key={book.id} className="flex items-center w-full h-[28px] gap-[8px]">
                <div className="w-[28px] h-[28px] flex items-center justify-center px-[10px] py-[1px]">
                  <span className="text-[#ECECEC] text-[16px] font-[600] leading-[16px] font-[SUIT Variable]">
                    {rank}
                  </span>
                </div>

                <div className="flex-1 py-[4px] overflow-hidden">
                  <span className="block text-[#ECECEC] text-[16px] font-[600] leading-[16px] font-[SUIT Variable] truncate">
                    {book.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
