import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrowIcon from '../../../assets/button/home/chevron-right.png';
import fireIllustration from '../../../assets/button/home/fire.png';
import userIcon from '../../../assets/button/home/user.png';

// ✅ API Hook(임시- 리딩룸)
import { useGetReadingRoomLastAccessed } from '../hooks/useQuery/useGetReadingRoomLastAccessed';

const RecentReadingRoomBox: React.FC = () => {
  const navigate = useNavigate();
  const { data: room, isLoading, isError } = useGetReadingRoomLastAccessed();
  const hasRoom = !!room;

  return (
    <div
      onClick={() => navigate('/reading-room')}
      className={`relative w-[246px] h-[341px] rounded-[12px] overflow-hidden cursor-pointer
        ${!hasRoom ? 'bg-[#423C35]/10' : ''}  
      `}
    >
      {/* 배경 이미지: hasRoom이 true일 때만 */}
      {hasRoom && (
        <img
          src={fireIllustration}
          alt="bg"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      )}

      {/* 콘텐츠 전체 */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {/* 상단 바 */}
        <div className="flex justify-between items-center mt-[18px] pl-[23px] pr-[20.33px]">
          <p className="text-[14px] leading-[25px] font-[400] text-white/50 ">
            {hasRoom ? '최근 접속한 리딩룸' : '리딩룸'}
          </p>
          <img
            src={arrowIcon}
            alt="go"
            className="w-[6.667px] h-[12px] object-contain"
          />
        </div>

        {/* 메인 콘텐츠 */}
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/50 text-sm">로딩중...</p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/50 text-sm">불러오기 실패</p>
          </div>
        ) : hasRoom ? (
          <div className="flex flex-col items-start pb-[20px] pl-[24px]">
            <p className="text-white text-[16px] font-[600] leading-[25px]">
              {room?.name}
            </p>
            <p className="text-white/80 text-[12px] font-[400] leading-[25px] mt-[2px]">
              {room?.description}
            </p>
            <div className="flex items-center gap-[4px] mt-[8px]">
              <img
                src={userIcon}
                alt="user-count"
                className="w-[12px] h-[12px] object-contain"
              />
              <p className="text-white text-[10px] font-[400] leading-[25px]">
                {room?.currentUserCount ?? 0}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-end h-full pb-[142px]">
            <p className="text-center text-white text-[12px] font-[400] leading-[25px]">
              내 리딩룸 만들고
            </p>

            <button className="mt-[16px] px-[12px] py-[8px] bg-[#423C35] rounded-[6px]">
              <span className="text-white text-[12px] font-[600] leading-[14.4px] ">
                지금 책 읽으러 가기
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentReadingRoomBox;
