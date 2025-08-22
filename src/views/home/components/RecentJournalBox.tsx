import React from 'react';
import { useNavigate } from 'react-router-dom';
import rightArrowIcon from '../../../assets/button/home/chevron-right.png';
import savedIcon from '../../../assets/button/home/solar_pen.png';
import { useGetHomeRecent } from '../hooks/useQuery/useGetHomeRecent';

const RecentJournalBox = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetHomeRecent(); // { bookId, title, thumbnailUrl } | undefined

  const hasJournals = data?.bookId != null && !!data?.title;

  const labelText = hasJournals ? '최근 남긴 독서기록' : '작성한 독서 기록이 없어요.';
  const mainText = isLoading ? '로딩 중…' : hasJournals ? data!.title : '독서 기록 남기기';

  const rightButtonAria = hasJournals ? '최근 독서기록으로 이동' : '라이브러리로 이동';

  const handleGo = () => {
    if (isLoading) return;

    if (hasJournals) {
      navigate(`/library/${data!.bookId}`, {
        state: {
          bookId: data!.bookId,
          title: data!.title,
          author: data!.author, 
        },
      });
    } else {
      navigate('/library');
    }
  };

  return (
    <div className="w-[246px] h-[60px] bg-[#423C35]/10 rounded-[12px] flex items-start justify-between">
      {/* 왼쪽: 아이콘 + 텍스트 */}
      <div className="flex items-start gap-[14px] pt-[16px] pb-[14px] ml-[24px]">
        {/* 아이콘 박스 */}
        <div className="w-[30px] h-[30px] bg-[#423C35] rounded-[8px] flex items-center justify-center flex-shrink-0">
          <img src={savedIcon} alt="journal-icon" className="w-[18px] h-[18px] object-contain" />
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-[2px]">
          <p className="text-[12px] leading-[14.4px] font-[400] text-white/50">
            {labelText}
          </p>
          <button
            type="button"
            onClick={handleGo}
            disabled={isLoading}
            className="text-[12px] leading-[14.4px] font-[400] text-white text-left disabled:opacity-50
                       max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {mainText}
          </button>
        </div>
      </div>

      {/* 오른쪽 화살표 버튼 */}
      <button
        type="button"
        onClick={handleGo}
        disabled={isLoading}
        className="mt-[25px] mr-[20.33px] w-[6.667px] h-[12px] flex-shrink-0 disabled:opacity-50"
        aria-label={rightButtonAria}
        title={rightButtonAria}
      >
        <img src={rightArrowIcon} alt="" className="w-[6.667px] h-[12px] object-contain" />
      </button>
    </div>
  );
};

export default RecentJournalBox;
