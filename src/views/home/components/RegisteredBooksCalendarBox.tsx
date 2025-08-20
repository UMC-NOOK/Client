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
  const dates = Array.from({ length: 7 }, (_, i) => format(addDays(weekStart, i), 'yyyy-MM-dd'));

  // 오늘 인덱스 (월=0)
  const todayStr = format(today, 'yyyy-MM-dd');
  const todayIdx = dates.findIndex((d) => d === todayStr);

  // 날짜 → 대표 썸네일 매핑d
  const thumbMap: Record<string, string | undefined> = {};
  for (const d of monthly) {
    if (!d?.date || !Array.isArray(d.books)) continue;
    const thumb = d.books[0]?.thumbnailUrl;
    if (thumb) thumbMap[d.date] = thumb;
  }

  // 구분선 설정 (디자인 고정값)
  const LINE_WIDTH = 203; // px
  const SEGMENT_W = LINE_WIDTH / 7;

  return (
    <div className="w-[246px] h-[157px] bg-[#423C35]/10 rounded-[12px] 
                    pt-[17px] pb-[14px] pl-[21px] pr-[22px] flex flex-col justify-start">
      
      {/* 요일 */}
      <div className="flex w-[203px] mb-[0px] ">
        {week.map((day, i) => (
          <div
            key={i}
            className="flex w-[29px] h-[30px] items-center justify-center 
                       text-[12px] leading-[14.4px] font-[400] text-white/50"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 긴 구분선(옅은) + 오늘 구간(진한) */}
      <div className="relative mx-auto mb-[2px]" style={{ width: LINE_WIDTH }}>
        <div className="h-[0.5px] w-full bg-[#555351]" />
        {todayIdx >= 0 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[0.5px] bg-white rounded"
            style={{ width: SEGMENT_W, left: todayIdx * SEGMENT_W }}
          />
        )}
      </div>

      {/* 날짜 + 썸네일 */}
      <div className="flex w-[203px]">
        {dates.map((dateStr) => {
          const day = parseInt(dateStr.slice(-2), 10);
          const image = thumbMap[dateStr];
          const hasBook = !!image;

          return (
            <div key={dateStr} className="flex flex-col items-center justify-start w-[29px]">
              {/* 날짜 */}
<<<<<<< Updated upstream
              <div className="flex w-[29px] h-[30px] items-center justify-center 
                              text-[12px] leading-[14.4px] font-[400] text-white/50 mb-[4px]">
=======
              <div className="flex w-[29px] h-[30px] items-center justify-center mb-[4px]
                              text-[12px] leading-[14.4px] font-[400] text-white/50">
>>>>>>> Stashed changes
                {day}
              </div>
              {/* 썸네일 */}
              {hasBook ? (
                <div className="w-[27.2px] h-[40px] shrink-0 overflow-visible">
                  <img
                    src={image as string}
                    alt={`Book on ${dateStr}`}
                    className="w-full h-full object-cover rounded-[4px] shrink-0 [aspect-ratio:17/25]"
                  />
                </div>
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
