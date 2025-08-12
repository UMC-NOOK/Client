import React from 'react';
import { useNavigate } from 'react-router-dom';
import rightArrowIcon from '../../../assets/button/home/chevron-right.png';
import savedIcon from '../../../assets/button/home/bookmark.png';
import { useGetHomeReading } from '../hooks/useQuery/useGetHomeReading';

const CurrentlyReadingBox = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetHomeReading(); // { bookId, title, thumbnailUrl } | undefined

  const hasBooks = !!data;
  const randomBook = hasBooks ? { id: String(data.bookId), title: data.title } : null;

  return (
    <div className="w-[246px] h-[60px] bg-[#423C35]/10 rounded-[12px] py-0 flex items-start justify-between">
      {/* 왼쪽: 아이콘 + 텍스트 */}
      <div className="flex items-start gap-[14px] pt-[16px] pb-[14px] ml-[15px]">
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
          <p className="text-[12px] leading-[14.4px] font-[400] text-white/50">
            지금 독서 중인 책
          </p>
          <button
            disabled={!hasBooks || isLoading}
            onClick={() => randomBook && navigate(`/library/${randomBook.id}`)}
            className="text-[12px] leading-[14.4px] font-[400] text-white text-left disabled:opacity-50"
          >
            {isLoading ? '로딩 중…' : hasBooks ? randomBook?.title : '독서 중인 책이 없어요'}
          </button>
        </div>
      </div>

      {/* 오른쪽 아이콘 */}
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

export default CurrentlyReadingBox;
