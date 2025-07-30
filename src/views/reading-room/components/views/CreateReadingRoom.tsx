import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Campfire from '../../../../assets/readingRoom/bg/Campfire.png';
import Subway from '../../../../assets/readingRoom/bg/Subway.png';
import ReadingRoom from '../../../../assets/readingRoom/bg/ReadingRoom.png';
import InsertInfo from '../InsertInfo';

const CreateReadingRoom = () => {
    const navigate = useNavigate();
    type ThemeType = 'Campfire' | 'Subway' | 'ReadingRoom';
    const[selected, setSelected] = useState<ThemeType>('Campfire');

    const themeImages: Record<ThemeType, string> = {
        Campfire,
        Subway,
        ReadingRoom,
    };

    return(
        <div className='flex flex-col justify-center items-center'>
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

                <div className='flex flex-row justify-center items-center gap-13 mt-20'>
                    <div>
                        <img src={themeImages[selected]} alt={selected} className='w-270 h-221 rounded-xl'/>
                    </div>

                    <div className='flex flex-col justify-center'>
                        <InsertInfo/>
                    </div>
                </div>

                <div className='flex flex-col mt-6'>
                    <div className='flex flex-row justify-start items-center gap-3'>
                        <div className='text-white text-sm'>
                            테마 선택
                        </div>

                        <div className='text-white text-2xs'>
                            리딩룸 생성 후 테마를 변경할 수 있습니다.
                        </div>
                    </div>
                    
                    <div className='flex justify-between'>
                        <div className='flex flex-row justify-start items-center gap-5 mt-7 mb-34'>
                            <img src={Campfire} alt="Campfire"
                                onClick={() => setSelected('Campfire')}
                                className={`cursor-pointer w-84 h-69 rounded-xl border transition-all duration-200 ${
                                    selected === 'Campfire'
                                        ? "border-[rgba(122,191,201,1)]"
                                        : "border-transparent"
                                }` 
                            }/>
                        
                            <img src={Subway} alt="Subway" 
                                onClick={() => setSelected('Subway')}
                                className={`cursor-pointer w-84 h-69 rounded-xl border transition-all duration-200 ${
                                    selected === 'Subway'
                                        ? "border-[rgba(122,191,201,1)]"
                                        : "border-transparent"
                                }` 
                            }/>
                            
                            <img src={ReadingRoom} alt="ReadingRoom"
                                onClick={() => setSelected('ReadingRoom')}
                                className={`cursor-pointer w-84 h-69 rounded-xl border transition-all duration-200 ${
                                    selected === 'ReadingRoom'
                                        ? "border-[rgba(122,191,201,1)]"
                                        : "border-transparent"
                                }` 
                            }/>
                        </div>

                        <div 
                            className='flex flex-row justify-center items-center w-81 h-20 rounded-lg mt-48'
                            style={{backgroundColor: 'rgba(122,191,201,1)'}}>
                                <div 
                                    className='flex justify-center items-center rounded-full border mr-5 p-1'
                                    style={{borderColor: 'rgba(43, 34, 23, 1)'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 8" fill="none"
                                        className='flex justify-center items-center'>
                                        <path d="M4.44488 0.185547V4.00083M4.44488 7.8161V4.00083M4.44488 4.00083H0.722656M4.44488 4.00083H8.1671" stroke="#2B2217" stroke-width="0.372222" stroke-linecap="round"/>
                                    </svg>
                                </div>
                                <div className='text-sm'>
                                    리딩룸 생성하기
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateReadingRoom;