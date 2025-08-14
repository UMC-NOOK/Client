import React from 'react';
import { useNavigate } from 'react-router-dom';
import rightArrowIcon from '../../../assets/button/home/chevron-right.png';
import savedIcon from '../../../assets/button/home/solar_pen.png';

// ✅ API 훅
import { useGetHomeRecent } from '../hooks/useQuery/useGetHomeRecent';

const RecentJournalBox = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetHomeRecent(); // { bookId, title, thumbnailUrl } | undefined

  const hasJournals = !!data;
  const randomJournal = hasJournals ? { id: String(data.bookId), title: data.title } : null;

  return (
    <div className="w-[246px] h-[60px] bg-[#423C35]/10 rounded-[12px] py-0 flex items-start justify-between">
      {/* 왼쪽: 아이콘 + 텍스트 */}
      <div className="flex items-start gap-[14px] pt-[16px] pb-[14px] ml-[15px]">
        {/* 아이콘 박스 */}
        <div className="w-[30px] h-[30px] bg-[#423C35] rounded-[8px] flex items-center justify-center flex-shrink-0">
          <img
            src={savedIcon}
            alt="journal-icon"
            className="w-[18px] h-[18px] object-contain"
          />
        </div>

        {/* 텍스트 블록 */}
        <div className="flex flex-col gap-[2px]">
          <p className="text-[12px] leading-[14.4px] font-[400] text-white/50">
            {hasJournals ? '최근 남긴 독서기록' : '작성 한 독서 기록이 없어요'}
          </p>

          {hasJournals ? (
            <button
              onClick={() => randomJournal && navigate(`/library/${randomJournal.id}`)}
              className="text-[12px] leading-[14.4px] font-[400] text-white text-left"
            >
              {isLoading ? '로딩 중…' : randomJournal?.title}
            </button>
          ) : (
            <button
              onClick={() => navigate('/reading-room')}
              className="text-[12px] leading-[14.4px] font-[400] text-white text-left"
            >
              독서 기록 남기기
            </button>
          )}
        </div>
      </div>

      {/* 오른쪽 화살표 */}
      <button
        onClick={() => navigate('/lounge/search-result')}
        className="mt-[25px] mr-[20.33px] w-[6.667px] h-[12px] flex-shrink-0"
      >
        <img
          src={rightArrowIcon}
          alt="go"
          className="w-[6.667px] h-[12px] object-contain"
        />
      </button>
    </div>
  );
};

export default RecentJournalBox;
