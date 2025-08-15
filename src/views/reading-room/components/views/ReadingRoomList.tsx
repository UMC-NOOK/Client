import React, { useEffect, useState } from 'react';
import { useReadingRoomStore } from '../../../../store/reading-room/useReadingRoomStore';
import ReadingRoomData from '../../../../mock/readingRoom/readingRoomData';
import ReadingRoomSkeleton from '../reading-room/ReadingRoomSkelton';
import { useNavigate } from 'react-router-dom';
import ReadingRoomCard from '../reading-room/ReadingRoomCard';

const ReadingRoomList = () => {
    const ITEMS_PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const isLoading = useReadingRoomStore((state) => state.isLoading);
    const readingRoom = useReadingRoomStore((state) => state.rooms);
    const setIsLoading = useReadingRoomStore((state) => state.setIsLoading);
    const setReadingRoom = useReadingRoomStore((state) => state.setRooms);


    const totalPages = Math.ceil(readingRoom.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentRooms = readingRoom.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const navigate = useNavigate();

    useEffect(()=> {
        setIsLoading(true);
        setTimeout(()=> {
            setReadingRoom(ReadingRoomData);
            setIsLoading(false);
        }, 500)
    }, []);

    return(
        <div className='flex flex-col justify-center items-center'>
            <div className='flex items-center justify-center'>
                <div className='relative w-full group'>
                    <div className='flex flex-row items-center mt-31'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"
                            onClick={() => navigate('/reading-room')}>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1919 2.05806C14.436 2.30214 14.436 2.69786 14.1919 2.94194L7.13388 10L14.1919 17.0581C14.436 17.3021 14.436 17.6979 14.1919 17.9419C13.9479 18.186 13.5521 18.186 13.3081 17.9419L5.80806 10.4419C5.56398 10.1979 5.56398 9.80214 5.80806 9.55806L13.3081 2.05806C13.5521 1.81398 13.9479 1.81398 14.1919 2.05806Z" fill="white" fill-opacity="0.5"/>
                        </svg>

                        <div className='text-white text-xl ml-6'>
                            내 리딩룸
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5 mt-12'>
                        {isLoading
                            ? Array.from({length: ITEMS_PER_PAGE}).map((_, idx) => (
                                <ReadingRoomSkeleton key={idx}/>
                            ))
                            : currentRooms.map((room, idx) => (
                                <ReadingRoomCard room={room} key={idx}/>
                            ))
                        }
                    </div>

                    {!isLoading &&  (
                        <div className='flex justify-center items-center mt-47 gap-8'>
                            {Array.from({length: totalPages}).map((_,i) => (
                                <div
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`text-white text-base ${
                                    currentPage === i+1
                                    ? 'font-bold'
                                    : 'font-base'
                                    }`
                                }>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReadingRoomList;