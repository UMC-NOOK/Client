import React from 'react';

const RegisteredBooksCalendarBox = () => {
  const week = ['월', '화', '수', '목', '금', '토', '일'];

  // 목업 이미지 데이터 (2~8일)
  const bookThumbnails: { [day: number]: string } = {
    2: '/mock/book1.png',
    5: '/mock/book2.png',
    7: '/mock/book3.png',
  };

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
        {Array.from({ length: 7 }, (_, i) => {
          const day = i + 2; // 2~8일
          const hasBook = !!bookThumbnails[day];
          const image = bookThumbnails[day];

          return (
            <div key={day} className="flex flex-col items-center gap-[12px] w-[15px]">
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
                  src={image}
                  alt={`Book on ${day}`}
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
