import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import arrowIcon from '../../../assets/button/home/chevron-right.png';
import fireIllustration from '../../../assets/button/home/fire.png';
import bookroomIllustration from '../../../assets/button/home/bookroom.png';
import subwayIllustration from '../../../assets/button/home/subway.png';
import userIcon from '../../../assets/button/home/user.png';
import { useGetReadingRoomLastAccessed } from '../hooks/useQuery/useGetReadingRoomLastAccessed';
import instance from '../../../apis/instance';

// -------------------- 타입 --------------------
interface ReadingRoom {
  roomId: number;
  name: string;
  description: string;
  hashtags: string[];
  currentUserCount: number;
  totalUserCount: number;
  themeImageUrl: string | null; // URL 또는 코드(SUBWAY 등)
}

interface ReadingRoomsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ReadingRoom[];
}

interface ReadingRoomDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ReadingRoom;
}

// 서버/훅이 주는 형태가 들쑥날쑥해도 받기 위한 느슨한 타입
type RoomLike = {
  roomId?: number;
  name?: string | null;
  description?: string | null;
  currentUserCount?: number | null;
  totalUserCount?: number | null;
  themeImageUrl?: string | null;       // URL 또는 코드
  hashtags?: unknown;                  // boolean | string[] | null 등 뭐든
};

// 어떤 모양이 와도 ReadingRoom으로 정규화
function normalizeRoom(r?: RoomLike | ReadingRoom | null): ReadingRoom | null {
  if (!r || !r.roomId) return null;

  const hashtags =
    Array.isArray(r.hashtags)
      ? r.hashtags.filter((v): v is string => typeof v === 'string')
      : [];

  return {
    roomId: r.roomId,
    name: r.name ?? '',
    description: r.description ?? '',
    hashtags,
    currentUserCount: r.currentUserCount ?? 0,
    totalUserCount: r.totalUserCount ?? 0,
    themeImageUrl: r.themeImageUrl ?? null,
  };
}

// 코드값 → 실제 이미지 경로로 변환 (URL/데이터URI/절대경로는 그대로 사용)
function resolveThemeUrl(theme?: string | null): string {
  if (!theme) return fireIllustration;
  const t = String(theme).trim();

  if (/^https?:\/\//i.test(t) || /^data:/i.test(t) || t.startsWith('/')) {
    return t;
  }

  const key = t.toUpperCase().replace(/[^A-Z0-9]/g, '');

  const map: Record<string, string> = {
    // 지하철
    SUBWAY: subwayIllustration,
    METRO: subwayIllustration,

    // 도서관
    LIBRARY: bookroomIllustration,
    

    // 불
    FIRE: fireIllustration,
    FLAME: fireIllustration,
  };

  return map[key] ?? fireIllustration;
}

// -------------------- 컴포넌트 --------------------
const RecentReadingRoomBox: React.FC = () => {
  const navigate = useNavigate();

  // 최근 접속 방 (DTO 형태가 달라도 normalize)
  const {
    data: lastAccessedRoomRaw,
    isLoading: isLastAccessedLoading,
    isError: isLastAccessedError,
  } = useGetReadingRoomLastAccessed();
  const lastAccessedRoom = normalizeRoom(lastAccessedRoomRaw);

  // 전체 리딩룸 목록 (첫 페이지)
  const {
    data: allRoomsResp,
    isLoading: isAllRoomsLoading,
  } = useQuery<ReadingRoom[]>({
    queryKey: ['reading-rooms', 0],
    queryFn: async (): Promise<ReadingRoom[]> => {
      const { data } = await instance.get<ReadingRoomsResponse>('/api/reading-rooms?page=0');
      if (!data?.isSuccess) {
        throw new Error(`${data?.code || 'ERROR'}: ${data?.message || '요청 실패'}`);
      }
      return data.result ?? [];
    },
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      const status = error?.response?.status;
      if (!status) return failureCount < 1;
      return status >= 500 && failureCount < 1;
    },
  });

  const allRooms: ReadingRoom[] = allRoomsResp ?? [];

  // 목록에서 최근 접속 방 찾기
  const roomFromList = useMemo(() => {
    if (!lastAccessedRoom || allRooms.length === 0) return null;
    const found = allRooms.find((room) => room.roomId === lastAccessedRoom.roomId);
    return normalizeRoom(found);
  }, [lastAccessedRoom, allRooms]);

  const roomId = lastAccessedRoom?.roomId;

  // 상세 조회가 필요할 때만
  const needDetail =
    !!roomId &&
    (!roomFromList || !roomFromList.themeImageUrl || roomFromList.themeImageUrl.trim() === '') &&
    (!lastAccessedRoom?.themeImageUrl || lastAccessedRoom.themeImageUrl.trim() === '');

  // 상세 조회 (필요 시에만)
  const { data: roomDetailRaw } = useQuery<ReadingRoom>({
    queryKey: ['reading-room', roomId],
    queryFn: async (): Promise<ReadingRoom> => {
      const { data } = await instance.get<ReadingRoomDetailResponse>(`/api/reading-rooms/${roomId}`);
      if (!data?.isSuccess || !data.result) {
        throw new Error(`${data?.code || 'ERROR'}: ${data?.message || '요청 실패'}`);
      }
      return data.result;
    },
    enabled: needDetail,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  const roomDetail = normalizeRoom(roomDetailRaw);

  // 최종 방 객체
  const currentRoom: ReadingRoom | null =
    roomFromList ?? roomDetail ?? lastAccessedRoom ?? null;

  const hasRoom = !!currentRoom;
  const isLoading = isLastAccessedLoading || isAllRoomsLoading;

  // 테마 이미지 결정
  const backgroundImage = resolveThemeUrl(currentRoom?.themeImageUrl);

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
            const target = e.currentTarget as HTMLImageElement;
            if (target.src !== fireIllustration) {
              target.onerror = null;
              target.src = fireIllustration;
            }
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
          <div className="flex items-center justify-center h-full">
            <p className="text-white/50 text-sm">불러오기 실패</p>
          </div>
        ) : hasRoom ? (
          <div className="flex flex-col items-start pb-[20px] pl-[24px]">
            <p className="text-white text-[16px] font-[600] leading-[25px]">
              {currentRoom?.name}
            </p>
            <p className="text-white/80 text-[12px] font-[400] leading-[25px] mt-[2px]">
              {currentRoom?.description}
            </p>
            <div className="flex items-center gap-[4px] mt-[8px]">
              <img src={userIcon} alt="user-count" className="w-[12px] h-[12px] object-contain" />
              <p className="text-white text-[10px] font-[400] leading-[25px]">
                {currentRoom?.currentUserCount ?? 0}
              </p>
            </div>
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
