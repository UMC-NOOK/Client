import React from 'react';
import { useNavigate } from 'react-router-dom';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';

const NoRegisteredBooksBox = () => {
  const navigate = useNavigate();
  const today = new Date();

  // 오늘이 포함된 주의 월요일부터 시작 (한국 기준 월요일 시작)
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const datesOfWeek = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="w-[246px] h-[157px] bg-[#423C35]/10 rounded-[12px] px-[12px] pt-[12px] pb-[14px] flex flex-col justify-center">
      {/* 요일 */}
      <div className="grid grid-cols-7 gap-[18px] text-center mb-[8px]">
        {['월', '화', '수', '목', '금', '토', '일'].map((day, i) => (
          <div
            key={i}
            className="text-[12px] leading-[14.4px] font-normal text-white/50"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 선 + 날짜 */}
      <div className="flex flex-col items-center mb-[10px]">
        <div className="w-[220px] h-[0.5px] bg-[#555351] mb-[10px]" />
        <div className="flex justify-between w-full text-[12px] font-normal leading-[14.4px]">
          {datesOfWeek.map((date, i) => (
            <span
              key={i}
              className={`text-center w-[15px] ${
                isSameDay(date, today) ? 'text-white' : 'text-white/50'
              }`}
            >
              {format(date, 'd')}
            </span>
          ))}
        </div>
      </div>

      {/* 텍스트 + 버튼 */}
      <div className="flex flex-col items-center mt-[10px] gap-[8px]">
        <p className="text-white text-sm font-[400] leading-[14.4px]">
          등록한 책이 없나요?
        </p>
        <button
          onClick={() => navigate('/lounge/search-result')}
          className="bg-[#423C35] text-white text-[12px] font-[600] px-[12px] py-[8px] rounded-[8px] leading-[14.4px]"
        >
          지금 검색하러 가기
        </button>
      </div>
    </div>
  );
};

export default NoRegisteredBooksBox;
