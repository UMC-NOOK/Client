// src/views/reading-room/components/views/MyReadingRoomCardList.tsx
import React from 'react';
import SectionTitle from '../reading-room/SectionTitle';
import AddReadingRoom from '../reading-room/AddReadingRoom';
import ReadingRoomSkeleton from '../reading-room/ReadingRoomSkelton';
import ReadingRoomCard from '../reading-room/ReadingRoomCard';
import useGetMyReadingRoom from '../../hooks/reading-room/useQuery/useGetMyReadingRoom';
import useInfo from '../../../auth/hook/useQuery/useInfo'; // userId 가져오기
import { useNavigate } from 'react-router-dom';
import type { ReadingRoom } from '../../apis/reading-room/types/reading-room-types';

const MyReadingRoomCardList = () => {
    const { data: myRooms = [], isLoading, isError } = useGetMyReadingRoom();
    const { data: me } = useInfo();
    const userId = me?.userId;

    const navigate = useNavigate();

    const handleCardClick = React.useCallback((roomId: number) => {
        if (userId == null) {
            console.error('[ReadingRoomList] userId가 없어 네비게이션을 실행할 수 없습니다.');
            return;
        }
        navigate(`/reading-room/${roomId}/${userId}`);
    }, [navigate, userId]);

    const roomLength = myRooms.length;
    if (roomLength > 4) {
        console.error('4개 이상의 리딩룸 생성은 불가능합니다.');
    }

    return (
        <div className='relative w-full group'>
            <SectionTitle/>

        <div className='flex grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 overflow-hidden'>
            {isLoading
                ? Array.from({ length: 4 }).map((_, index) => <ReadingRoomSkeleton key={index} />)
                : myRooms.map((room: ReadingRoom) => (
                    <ReadingRoomCard
                        key={room.roomId}
                        room={room}
                    onClick={() => handleCardClick(room.roomId)}
                />
            ))}

            {!isLoading && roomLength < 4 && <AddReadingRoom />}
        </div>

        {isError && (
            <div className="mt-4 text-sm text-red-400">내 리딩룸을 불러오지 못했습니다. (콘솔 확인)</div>
        )}
        </div>
    );
};

export default MyReadingRoomCardList;
