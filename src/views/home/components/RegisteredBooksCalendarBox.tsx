import React from 'react';
import { startOfWeek, addDays, format } from 'date-fns';

type MonthlyDayBooks = {
  date: string; // 'YYYY-MM-DD'
  books: { bookId: number; thumbnailUrl: string }[];
};

const RegisteredBooksCalendarBox = ({ monthly }: { monthly: MonthlyDayBooks[] }) => {
  const week = ['월', '화', '수', '목', '금', '토', '일'];

  // 이번 주 날짜 스트링 배열
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const dates = Array.from({ length: 7 }, (_, i) =>
    format(addDays(weekStart, i), 'yyyy-MM-dd'),
  );

  // 날짜 → 대표 썸네일 매핑 (하루에 여러 권이면 첫 썸네일 사용)
  const thumbMap: Record<string, string | undefined> = {};
  for (const d of monthly) {
    if (!d?.date || !Array.isArray(d.books)) continue;
    const thumb = d.books[0]?.thumbnailUrl;
    if (thumb) thumbMap[d.date] = thumb;
  }

  return (
    <div className="w-[246px] h-[157px] bg-[#423C35]/10 rounded-[12px] px-[12px] pt-[12px] pb-[14px] flex flex-col justify-start">
      {/* 요일 */}
      <div className="grid grid-cols-7 gap-[18px] text-center">
        {week.map((day, i) => (
          <div
            key={i}
            className="text-[12px] leading-[14.4px] font-normal text-white/50"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 선 */}
      <div className="w-[203px] h-[0.5px] bg-[#555351] mx-auto mt-[8px]" />

      {/* 날짜 + 썸네일 */}
      <div className="flex flex-row justify-between mt-[10px]">
        {dates.map((dateStr) => {
          const day = parseInt(dateStr.slice(-2), 10); 
          const image = thumbMap[dateStr];
          const hasBook = !!image;

          return (
            <div key={dateStr} className="flex flex-col items-center gap-[12px] w-[15px]">
              {/* 날짜 숫자 */}
              <span
                className={`text-[12px] leading-[14.4px] font-normal text-center ${
                  hasBook ? 'text-white' : 'text-white/50'
                }`}
              >
                {day}
              </span>

              {/* 썸네일 or 빈칸 */}
              {hasBook ? (
                <img
                  src={image as string}
                  alt={`Book on ${dateStr}`}
                  className="w-[27.2px] h-[40px] object-cover rounded-[4px]"
                />
              ) : (
                <div className="w-[27.2px] h-[40px]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegisteredBooksCalendarBox;
