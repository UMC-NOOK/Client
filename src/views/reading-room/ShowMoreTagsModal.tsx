import React from "react";

const ShowMoreTagsModal = () => {
    return(
        <div 
            className="relative w-224 h-304 rounded-3xl"
            style={{backgroundColor: 'rgba(45, 40 ,34, 1'}}>
            
            <div className="absolute top-20 left-14">
                <div className="ml-2 text-white text-lg">
                    목적
                </div>
                <div 
                    className="flex flex-row justify-center items-center text-white gap-5 mt-5">
                    <div className="flex justify-center items-center w-36 h-14 text-sm rounded-xl" 
                        style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        자유독서
                    </div>
                    <div className="flex justify-center items-center w-36 h-14 text-sm rounded-xl" 
                        style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        필사
                    </div>
                    <div className="flex justify-center items-center w-36 h-14 text-sm rounded-xl" 
                        style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        독서 기록
                    </div>
                    <div className="flex justify-center items-center w-36 h-14 text-sm rounded-xl" 
                        style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        뽀모도로
                    </div>
                    <div className="flex justify-center items-center w-36 h-14 text-sm rounded-xl" 
                        style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        루틴
                    </div>
                </div>
            </div>

            <div className="absolute top-62 left-14">
                <div className="ml-2 text-white text-lg">
                    시간
                </div>
                <div 
                    className="flex flex-row justify-center items-center text-white gap-5 mt-5">
                    <div className="flex justify-center items-center w-36 h-14 text-sm rounded-xl" 
                        style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        아침
                    </div>
                    <div className="flex justify-center items-center w-36 h-14 text-sm rounded-xl" 
                        style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        낮
                    </div>
                    <div className="flex justify-center items-center w-36 h-14 text-sm rounded-xl" 
                        style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        밤
                    </div>
                    <div className="flex justify-center items-center w-36 h-14 text-sm rounded-xl" 
                        style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        주말
                    </div>
                    <div className="flex justify-center items-center w-36 h-14 text-sm rounded-xl" 
                        style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        퇴근길
                    </div>
                    <div className="flex justify-center items-center w-36 h-14 text-sm rounded-xl" 
                        style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        출근길
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowMoreTagsModal;