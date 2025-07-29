import React, { useEffect } from 'react';
import ReadingRoomCard from '../ReadingRoomCard';
import SectionTitle from '../SectionTitle';
import AddReadingRoom from '../AddReadingRoom';
import { useMyReadingRoomStore } from '../../../../store/reading-room/useMyReadingRoomStore';
import myReadingRoomData from '../../../../mock/readingRoom/myReadingRoomData';
import ReadingRoomSkeleton from '../ReadingRoomSkelton';

const MyReadingRoomCardList = () => {
    const myRooms = useMyReadingRoomStore((state) => state.rooms);
    const isLoading = useMyReadingRoomStore((state) => state.isLoading);
    const setMyRooms = useMyReadingRoomStore((state) => state.setRooms);
    const setIsLoading = useMyReadingRoomStore((state) => state.setIsLoading);

    const roomLength = myRooms.length;

    if(roomLength > 4){
        console.error('4개 이상의 리딩룸 생성은 불가능합니다.');
    }

    useEffect(()=> {
        setIsLoading(true);
        setTimeout(()=> {
            setMyRooms(myReadingRoomData);
            setIsLoading(false);
        }, 500)
    }, []);

    return (
        <div className='relative w-full group'>
            <SectionTitle/>
            <div className='flex grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 overflow-hidden'>
                {isLoading
                    ? Array.from({length: 4}).map((_,index) => (
                        <ReadingRoomSkeleton/>
                    ))
                    : myRooms.map((room, index) => (
                        <ReadingRoomCard room={room}/>
                    ))
                }
                <AddReadingRoom/>
            </div>
        </div>
    )
}

export default MyReadingRoomCardList;