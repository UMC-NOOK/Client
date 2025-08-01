import React from 'react';

const BookSummaryCard = () => {
  const summary = {
    total: 34,
    reading: 32,
    finished: 2,
    bookmarked: 10,
    logs: 23,
  };

  return (
    <div className="w-[246px] h-[154px] rounded-[12px] bg-[#423C351A] flex flex-col">
      {/* 상단 문장 */}å
      <p className="pl-[25px] text-[12px] leading-[25px] font-[400] text-white">
        누키와 책{' '}
        <span className="text-[16px] font-[400] leading-[25px] text-white font-pretendard">
          {summary.total}권
        </span>{' '}
        을 읽었어요.
      </p>

      {/* 구분선 */}
      <div className="w-[203px] h-[0.5px] bg-[#555351] ml-[25px] mt-[4px]" />

      {/* 책 상태 요약 */}
      <div className="flex flex-col gap-[1px] justify-start pl-[25px] pr-[27px]">
        {[
          ['독서 중', summary.reading],
          ['완독', summary.finished],
          ['찜', summary.bookmarked],
          ['독서 기록', summary.logs],
        ].map(([label, count]) => (
          <div key={label} className="flex justify-between items-center h-[25px]">
            <span className="text-[12px] leading-[25px] text-white/50 font-[400]">
              {label}
            </span>
            <span className="text-[12px] leading-[25px] text-white/50 font-[400]">
              {count}권
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSummaryCard;
