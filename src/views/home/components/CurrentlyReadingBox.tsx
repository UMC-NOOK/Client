import React from 'react';
import { useNavigate } from 'react-router-dom';
import rightArrowIcon from '../../../assets/button/home/chevron-right.png';
import savedIcon from '../../../assets/button/home/bookmark.png';
import { useGetHomeReading } from '../hooks/useQuery/useGetHomeReading';

const CurrentlyReadingBox = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetHomeReading(); // { bookId, title, thumbnailUrl } | undefined

  // bookId가 0일 수도 있으니 null/undefined만 배제
  const hasReading = data?.bookId != null;

  const labelText = hasReading ? '지금 독서 중인 책' : '독서 중인 책이 없어요.';
  const mainText = isLoading
    ? '추천 책 보기'
    : hasReading
    ? data!.title
    : '추천 책 보기';

  const rightButtonAria = hasReading ? '독서 기록으로 이동' : '라운지로 이동';

  const handleGo = () => {
    if (isLoading) return;

    if (hasReading) {
      // 상세 페이지로 이동하면서 state 전달
      navigate(`/library/${data!.bookId}`, {
        state: {
          bookId: data!.bookId,
          bookImg: data!.thumbnailUrl, // API의 thumbnailUrl을 페이지에서 기대하는 bookImg 키로 매핑
          title: data!.title,
          // author: ... // 필요하면 상세 페이지에서 별도 API로 보강
        },
      });
    } else {
      navigate('/lounge');
    }
  };

  return (
    <div className="w-[246px] h-[60px] bg-[#423C35]/10 rounded-[12px] py-0 flex items-start justify-between">
      {/* 왼쪽: 아이콘 + 텍스트 */}
      <div className="flex items-start gap-[14px] pt-[16px] pb-[14px] ml-[24px]">
        {/* 아이콘 박스 */}
        <div className="w-[30px] h-[30px] bg-[#423C35] rounded-[8px] flex items-center justify-center flex-shrink-0">
          <img
            src={savedIcon}
            alt="reading-icon"
            className="w-[18px] h-[18px] object-contain"
          />
        </div>

        {/* 텍스트 블록 */}
        <div className="flex flex-col gap-[2px]">
          {/* 상태에 따라 변경되는 라벨 */}
          <p className="text-[12px] leading-[14.4px] font-[400] text-white/50">
            {labelText}
          </p>

          {/* 제목/가이드 문구 */}
          <button
            disabled={isLoading}
            onClick={handleGo}
            className="text-[12px] leading-[14.4px] font-[400] text-white text-left disabled:opacity-50
                       max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {mainText}
          </button>
        </div>
      </div>

      {/* 오른쪽 아이콘 */}
      <button
        onClick={handleGo}
        disabled={isLoading}
        className="mt-[25px] mr-[20.33px] w-[6.667px] h-[12px] flex-shrink-0 disabled:opacity-50"
        aria-label={rightButtonAria}
        title={rightButtonAria}
      >
        <img
          src={rightArrowIcon}
          alt=""
          className="w-[6.667px] h-[12px] object-contain"
        />
      </button>
    </div>
  );
};

export default CurrentlyReadingBox;
