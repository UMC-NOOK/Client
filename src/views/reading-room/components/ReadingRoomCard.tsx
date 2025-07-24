import React from 'react';
import card from '../../../assets/readingRoom/card/card.png';

const ReadingRoomCard = () => {
    
    return (
        <div className='relative w-[248px] h-[400px] group rounded-xl overflow-hidden'>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="248" 
                height="122" 
                viewBox="0 0 248 122" 
                fill="none"
                className='absolute top-0 left-0 z-10'>
                <g clip-path="url(#clip0_1185_4567)">
                    <foreignObject x="-8" y="-8" width="264" height="138">
                        <div 
                            xmlns="http://www.w3.org/1999/xhtml" 
                            style={{
                                backdropFilter: 'blur(0px)',
                                clipPath: 'url(#bgblur_1_1185_4567_clip_path)',
                                height: '100%',
                                width: '100%',
                            }}>
                        </div>
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
        </div>
    );
};

export default ReadingRoomCard;