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
  const LINE_WIDTH = 203; // px
  const SEGMENTS = 7;
  const SEGMENT_W = LINE_WIDTH / SEGMENTS;

  // 오늘 날짜가 주에서 몇 번째인지
  const todayIdx = datesOfWeek.findIndex((d) => isSameDay(d, today));

  return (
    <div className="w-[246px] h-[157px] bg-[#423C35]/10 rounded-[12px] 
                    pt-[17px] pb-[14px] pl-[30px] pr-[22px] flex flex-col justify-center">
      
      {/* 요일 */}
      <div className="flex gap-[0px] mb-[0px] w-[203px]">
        {['월', '화', '수', '목', '금', '토', '일'].map((day, i) => (
          <div
            key={i}
            className="flex w-[29px] h-[30px] items-center justify-center 
                       text-[12px] leading-[14.4px] font-[400] text-white/50"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 선 + 날짜 */}
      <div className="w-[203px] flex flex-col items-center mb-[10px]">
        {/* 긴 구분선 */}
        <div className="relative mb-[2px]" style={{ width: LINE_WIDTH }}>
          <div className="h-[0.5px] w-full bg-[#555351]" />
          {todayIdx >= 0 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[0.5px] bg-white rounded"
              style={{ width: SEGMENT_W, left: todayIdx * SEGMENT_W }}
            />
          )}
        </div>

        {/* 날짜 */}
        <div className="flex gap-[0px] w-[203px]">
          {datesOfWeek.map((date, i) => (
            <div
              key={i}
              className="flex w-[29px] h-[30px] items-center justify-center 
                        text-[12px] leading-[14.4px] font-[400] text-white/50"
            >
              {format(date, 'd')}
            </div>
          ))}
        </div>

      </div>

      {/* 텍스트 + 버튼 */}
      <div className="flex flex-col items-center mt-[0px] gap-[8px]">
        <p className="text-[12px] leading-[14.4px] font-[400] text-white text-center">
          등록한 책이 없나요?
        </p>

        <button
          onClick={() => navigate('/lounge/search-result')}
          className="flex items-center justify-center gap-[10px] 
                     px-[12px] py-[8px] rounded-[6px] bg-[#423C35]"
        >
          <span className="text-[12px] leading-[14.4px] font-semibold text-white">
            지금 검색하러 가기
          </span>
        </button>
      </div>
    </div>
  );
};

export default NoRegisteredBooksBox;
