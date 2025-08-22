import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import arrowIcon from '../../../assets/button/home/chevron-right.png';
import fireIllustration from '../../../assets/button/home/fire.png';
import bookroomIllustration from '../../../assets/button/home/bookroom.png'
import subwayIllustration from '../../../assets/button/home/subway.png'

import userIcon from '../../../assets/button/home/user.png';
import { useGetReadingRoomLastAccessed } from '../hooks/useQuery/useGetReadingRoomLastAccessed';
import instance from '../../../apis/instance';

// 전체 리딩룸 조회 API 타입
interface ReadingRoom {
  roomId: number;
  name: string;
  description: string;
  hashtags: string[];
  currentUserCount: number;
  totalUserCount: number;
  themeImageUrl: string;
}

interface ReadingRoomsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ReadingRoom[];
}

const RecentReadingRoomBox: React.FC = () => {
  const navigate = useNavigate();
  const { data: lastAccessedRoom, isLoading: isLastAccessedLoading, isError: isLastAccessedError } = useGetReadingRoomLastAccessed();
  
  // 전체 리딩룸 목록 조회 (첫 번째 페이지만)
  const { data: allRooms, isLoading: isAllRoomsLoading } = useQuery({
    queryKey: ['reading-rooms', 0],
    queryFn: async (): Promise<ReadingRoom[]> => {
      const { data } = await instance.get<ReadingRoomsResponse>('/api/reading-rooms?page=0');
      return data.result;
    },
    staleTime: 5 * 60 * 1000, // 5분
    retry: (failureCount, error: any) => {
      const status = error?.response?.status;
      if (!status) return failureCount < 1;
      return status >= 500 && failureCount < 1;
    },
  });

  // 최근 접속한 리딩룸이 있으면 해당 룸의 상세 정보를 전체 목록에서 찾기
  const currentRoom = lastAccessedRoom && allRooms 
    ? allRooms.find(room => room.roomId === lastAccessedRoom.roomId) || lastAccessedRoom
    : lastAccessedRoom;

  const hasRoom = !!currentRoom;
  const isLoading = isLastAccessedLoading || isAllRoomsLoading;

  // 배경 이미지 결정: themeImageUrl이 있으면 사용, 없으면 기본 fire illustration
  const backgroundImage = currentRoom?.themeImageUrl || fireIllustration;

  return (
    <div
      onClick={() => navigate('/reading-room')}
      className={`relative w-[246px] h-[341px] rounded-[12px] overflow-hidden cursor-pointer ${
        !hasRoom ? 'bg-[#423C35]/10' : ''
      }`}
    >
      {hasRoom && (
        <img
          src={backgroundImage}
          alt="bg"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          onError={(e) => {
            // 이미지 로드 실패 시 기본 이미지로 fallback
            const target = e.target as HTMLImageElement;
            target.src = fireIllustration;
          }}
        />
      )}

      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <div className="flex justify-between items-center mt-[18px] pl-[23px] pr-[20.33px]">
          <p className="text-[14px] leading-[25px] font-[400] text-white/50 ">
            {hasRoom ? '최근 접속한 리딩룸' : '리딩룸'}
          </p>
          <img src={arrowIcon} alt="go" className="w-[6.667px] h-[12px] object-contain" />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/50 text-sm">로딩중...</p>
          </div>
        ) : isLastAccessedError ? (
          // ❌ 진짜 에러(5xx 등)일 때만 실패 UI
          <div className="flex items-center justify-center h-full">
            <p className="text-white/50 text-sm">불러오기 실패</p>
          </div>
        ) : hasRoom ? (
          // ✅ 정상 데이터
          <div className="flex flex-col items-start pb-[20px] pl-[24px]">
            <p className="text-white text-[16px] font-[600] leading-[25px]">{currentRoom?.name}</p>
            <p className="text-white/80 text-[12px] font-[400] leading-[25px] mt-[2px]">
              {currentRoom?.description}
            </p>
            <div className="flex items-center gap-[4px] mt-[8px]">
              <img src={userIcon} alt="user-count" className="w-[12px] h-[12px] object-contain" />
              <p className="text-white text-[10px] font-[400] leading-[25px]">
                {currentRoom?.currentUserCount ?? 0}
              </p>
            </div>
            {/* 해시태그 표시 (선택사항) */}
            {currentRoom?.hashtags && Array.isArray(currentRoom.hashtags) && currentRoom.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-[4px] mt-[4px]">
                {currentRoom.hashtags.slice(0, 3).map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-[6px] py-[2px] bg-white/20 rounded-[4px] text-white text-[8px] font-[400]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          // ✅ room === null → 최근 접속 리딩룸 없음 (정상)
          <div className="flex flex-col items-center justify-end h-full pb-[142px]">
            <p className="text-center text-white text-[12px] font-[400] leading-[25px]">
              내 리딩룸 만들고
            </p>
            <button className="mt-[8px] px-[12px] py-[8px] bg-[#423C35] rounded-[6px]">
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