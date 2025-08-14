import React, { useEffect } from 'react';
import card from "../../../../assets/readingRoom/card/card.png";
import { useMyReadingRoomStore, MyReadingRoom } from '../../../../store/reading-room/useMyReadingRoomStore';
//import myReadingRoomData from '../../../../mock/readingRoom/myReadingRoomData';
import myReadingRoomData from '../../../../mock/readingRoom/myReadingRoomData';

interface ReadingRoomCardProps {
    room: MyReadingRoom;
}

const ReadingRoomCard = ({room}: ReadingRoomCardProps) => {
    //const myRooms = useMyReadingRoomStore((state => state.rooms));
    const setMyRooms = useMyReadingRoomStore((state) => state.setRooms);

    useEffect(()=> {
        setMyRooms(myReadingRoomData);
    }, []);

    return (
        <div className='relative w-124 h-200 group rounded-xl overflow-hidden'>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="248" 
                height="122" 
                viewBox="0 0 248 122" 
                fill="none"
                className='absolute top-0 left-0 z-10 '>
                <g clip-path="url(#clip0_1185_4567)">
                    <foreignObject x="-8" y="-8" width="248" height="138">
            
                    </foreignObject>
                    <rect data-figma-bg-blur-radius="0" width="248" height="122" rx="8" fill="url(#paint0_linear_1185_4567)"/>
                </g>
                <defs>
                <clipPath id="bgblur_1_1185_4567_clip_path" transform="translate(8 8)"><rect width="248" height="122" rx="8"/>
                </clipPath><linearGradient id="paint0_linear_1185_4567" x1="124" y1="0" x2="124" y2="122" gradientUnits="userSpaceOnUse">
                <stop stop-color="#2B2217"/>
                <stop offset="1" stop-color="#2B2217" stop-opacity="0"/>
            </linearGradient>
            <clipPath id="clip0_1185_4567">
                <rect width="248" height="122" rx="8" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            <img src={card} 
                alt='RoomCard'
                className='absolute top-0 left-0 w-full h-full object-cover rounded-lg z-0'/>


            <div className='flex flex-col absolute top-13 left-12 z-20 text-white'>
                <span className='text-base font-semibold'> {room.title} </span>
                <span className='text-2xs font-thin'> {room.introduction} </span>
                <div 
                    className='flex flex-row items-start text-2xs font-thin gap-2 mt-5'>
                    {room.tags.map((tag, idx) => (
                        <span 
                            className='flex justify-center items-center rounded-lg px-5 py-2'
                            key={idx}
                            style={{backgroundColor: 'rgba(66, 60, 53, 0.80)'}}> 
                            # {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className='flex flex-row text-white'>
                <div className='absolute bottom-7 left-10 text-sm'>
                    {room.peopleOnLive}명 접속 중
                </div>
                <div className='absolute bottom-7 right-10 text-sm'>
                    {room.peopleCount}/4
                </div>
            </div>
        </div>
    );
};

export default ReadingRoomCard;