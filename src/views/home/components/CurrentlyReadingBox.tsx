import React from 'react';
import { useNavigate } from 'react-router-dom';
import rightArrowIcon from '../../../assets/button/home/chevron-right.png';
import savedIcon from '../../../assets/button/home/bookmark.png';
import { useGetHomeReading } from '../hooks/useQuery/useGetHomeReading';

const MAX_TITLE_CHARS = 12; // 띄어쓰기 포함 최대 글자수
const toEllipsis = (s: string, max = MAX_TITLE_CHARS) =>
  s.length > max ? s.slice(0, max) + '...' : s;

const CurrentlyReadingBox = () => {
  const navigate = useNavigate();
  // API: { bookId, title, author, coverImgUrl } 반환
  const { data, isLoading } = useGetHomeReading();

  const hasReading = data?.bookId != null;

  const labelText = hasReading ? '지금 독서 중인 책' : '독서 중인 책이 없어요.';

  // 원본 텍스트와 표시 텍스트 분리
  const mainTextRaw = isLoading ? '추천 책 보기' : hasReading ? data!.title : '추천 책 보기';
  const mainText = toEllipsis(mainTextRaw);

  const rightButtonAria = hasReading ? '독서 기록으로 이동' : '라운지로 이동';

  const handleGo = () => {
    if (isLoading) return;

    if (hasReading && data) {
      // ✅ BE: coverImgUrl → FE state: coverImageUrl 로 키 매핑
      navigate(`/library/${data.bookId}`, {
        state: {
          bookId: data.bookId,
          coverImageUrl: data.coverImgUrl ?? '',
          title: data.title ?? '',
          author: data.author ?? '',
        },
      });
    } else {
      navigate('/lounge');
    }
  };

  return (
    <div className="w-[246px] h-[60px] bg-[#423C35]/10 rounded-[12px] py-0 flex items-start justify-between">
      <div className="flex items-start gap-[14px] pt-[16px] pb-[14px] ml-[24px]">
        <div className="w-[30px] h-[30px] bg-[#423C35] rounded-[8px] flex items-center justify-center flex-shrink-0">
          <img src={savedIcon} alt="reading-icon" className="w-[18px] h-[18px] object-contain" />
        </div>

        <div className="flex flex-col gap-[2px]">
          <p className="text-[12px] leading-[14.4px] font-[400] text-white/50">{labelText}</p>
          <button
            disabled={isLoading}
            onClick={handleGo}
            className="text-[12px] leading-[14.4px] font-[400] text-white text-left disabled:opacity-50
                       max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis"
            title={mainTextRaw} // 전체 제목을 툴팁으로
          >
            {mainText}
          </button>
        </div>
      </div>

      <button
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

export default CurrentlyReadingBox;
