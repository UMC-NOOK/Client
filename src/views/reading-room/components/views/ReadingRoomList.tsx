// src/views/reading-room/components/views/ReadingRoomList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReadingRoomSkeleton from '../reading-room/ReadingRoomSkelton';
import ReadingRoomCard from '../reading-room/ReadingRoomCard';
import JoinReadingRoomModal from '../Modals/JoinReadingRoomModal';
import useGetAllReadingRoom from '../../hooks/reading-room/useQuery/useGetAllReadingRoom';
import useInfo from '../../../auth/hook/useQuery/useInfo';
import { ApiResponse, ReadingRoom } from '../../apis/reading-room/types/reading-room-types';
import { useJoinReadingRoom } from '../../hooks/reading-room/useMutation/useJoinReadingRoom';

const ITEMS_PER_PAGE = 12;

const ReadingRoomList = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const apiPage = React.useMemo(() => Math.max(0, currentPage - 1), [currentPage]);

    const { data: rooms = [], isLoading: isRoomsLoading } = useGetAllReadingRoom({ page: apiPage });

    const { data: me, isLoading: isMeLoading, error: meError } = useInfo();
    const userId = me?.userId;

    const [targetRoomId, setTargetRoomId] = React.useState<number | null>(null);

    const { mutate: joinRoom, isPending: isJoining } = useJoinReadingRoom();
    const navigate = useNavigate();

    const totalPages = Math.max(1, currentPage + (rooms.length === ITEMS_PER_PAGE ? 1 : 0));
    const isLoading = isRoomsLoading || isMeLoading;
    
    const openJoinModal = React.useCallback((roomId: number) => {
        setTargetRoomId(roomId);
    }, []);

    const handleConfirmJoin = React.useCallback(() => {
        if (userId == null) {
            console.error('[ReadingRoomList] userId가 없어 네비게이션을 실행할 수 없습니다.');
            return;
        }
        if (targetRoomId == null) return;

        joinRoom(targetRoomId, {
            onSuccess: (res: ApiResponse<number>) => {
                const joinedId = res?.result ?? targetRoomId;
                setTargetRoomId(null); // 모달 닫기
                navigate(`/reading-room/${joinedId}/${userId}`);
            },
            onError: (err) => {
                console.error('리딩룸 가입 실패:', err);
            },
        });
        }, [joinRoom, navigate, userId, targetRoomId]);

    const handleCancelJoin = React.useCallback(() => {
        if (!isJoining) setTargetRoomId(null); 
    }, [isJoining]);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex items-center justify-center">
                <div className="relative w-full group">
                    <div className="flex flex-row items-center mt-31">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            onClick={() => navigate('/reading-room')}
                            className="cursor-pointer"
                        >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.1919 2.05806C14.436 2.30214 14.436 2.69786 14.1919 2.94194L7.13388 10L14.1919 17.0581C14.436 17.3021 14.436 17.6979 14.1919 17.9419C13.9479 18.186 13.5521 18.186 13.3081 17.9419L5.80806 10.4419C5.56398 10.1979 5.56398 9.80214 5.80806 9.55806L13.3081 2.05806C13.5521 1.81398 13.9479 1.81398 14.1919 2.05806Z"
                            fill="white"
                            fillOpacity="0.5"
                        />
                        </svg>
                    <div 
                        className="text-white text-xl ml-6 cursor-pointer"
                        onClick={() => navigate('/reading-room')}>
                            내 리딩룸
                    </div>
                </div>

            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5 mt-12">
                {isLoading
                ? Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => <ReadingRoomSkeleton key={idx} />)
                : rooms.map((room: ReadingRoom) => (
                    <ReadingRoomCard
                        key={room.roomId}
                        room={room}
                        onClick={() => openJoinModal(room.roomId)}
                        variant="all"
                    />
                ))}
            </div>

            {!isLoading && (
                <div className="flex justify-center items-center mt-47 gap-8">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`text-white text-base ${currentPage === i + 1 ? 'font-bold' : 'font-base'}`}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            )}

            {meError && (
                <div className="mt-4 text-red-400 text-sm">사용자 정보를 불러오지 못했습니다. (콘솔 참고)</div>
            )}
            </div>
        </div>

        <JoinReadingRoomModal
            open={targetRoomId != null}
            onConfirm={handleConfirmJoin}
            onCancel={handleCancelJoin}
            isLoading={isJoining}
        />
    </div>
    );
};

export default ReadingRoomList;
