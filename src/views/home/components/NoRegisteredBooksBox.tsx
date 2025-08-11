import React from 'react';
import { useNavigate } from 'react-router-dom';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';

const NoRegisteredBooksBox = () => {
  const navigate = useNavigate();
  const today = new Date();

  // 월요일 시작 주
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const datesOfWeek = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // 구분선 길이(디자인 고정값)와 세그먼트 계산
  const LINE_WIDTH = 220; // px (기존 코드와 동일)
  const SEGMENTS = 7;
  const SEGMENT_W = LINE_WIDTH / SEGMENTS;

  // 오늘 날짜가 주에서 몇 번째인지
  const todayIdx = datesOfWeek.findIndex((d) => isSameDay(d, today));

  return (
    <div className="w-[246px] h-[157px] bg-[#423C35]/10 rounded-[12px] px-[21px] pt-[12px] pb-[14px] flex flex-col justify-center">
      {/* 요일 */}
      <div className="grid grid-cols-7 gap-[18px] text-center mb-[8px] w-[203px] px-0">
        {['월', '화', '수', '목', '금', '토', '일'].map((day, i) => (
          <div key={i} className="text-[12px] leading-[14.4px] font-normal text-white/50">
            {day}
          </div>
        ))}
      </div>

      {/* 선 + 날짜 */}
      <div className="w-[203px] flex flex-col items-center mb-[10px]">
        {/* 긴 구분선(옅은) + 오늘 구간(진한) */}
        <div className="relative mb-[10px]" style={{ width: LINE_WIDTH }}>
          {/* 기본 옅은 선 */}
          <div className="h-[0.5px] w-full bg-[#555351]" />
          {/* 오늘 구간만 진한 오버레이 */}
          {todayIdx >= 0 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-white rounded"
              style={{ width: SEGMENT_W, left: todayIdx * SEGMENT_W }}
            />
          )}
        </div>

        {/* 날짜 */}
        <div className="flex justify-between w-full text-[12px] font-normal leading-[14.4px]">
          {datesOfWeek.map((date, i) => (
            <span
              key={i}
              className={`text-center w-[15px] ${
                isSameDay(date, today) ? 'text-white/50' : 'text-white/50'
              }`}
            >
              {format(date, 'd')}
            </span>
          ))}
        </div>
      </div>

      {/* 텍스트 + 버튼 */}
      <div className="flex flex-col items-center mt-[10px] gap-[8px]">
        <p className="text-white text-sm font-[400] leading-[14.4px]">등록한 책이 없나요?</p>
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
