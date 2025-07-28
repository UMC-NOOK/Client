import React from "react";

const JoinReadingRoomModal = () => {
    return(
        <div 
            className="relative w-224 h-86 rounded-xl"
            style={{backgroundColor : 'rgba(45, 40, 34, 1)'}}>
            <div className="absolute transform -translate-x-1/2 -translate-y-2/3 top-1/2 left-1/2 text-white text-center text-lg whitespace-nowrap">
                이 리딩룸에 가입하시겠습니까?
            </div>
            <div className="absolute right-14 bottom-10 mt-17">
                <button 
                    className="w-34 h-15 px-10 py-2 rounded-lg mr-7 font-bold"
                    style={{backgroundColor: 'rgba(122,191,201,1)'}}>
                    가입
                </button>
                <button
                    className="w-35 h-15 px-10 py-2 rounded-lg border text-[rgba(255,255,255,0.5)] font-bold"
                    style={{borderColor: 'rgba(255, 255, 255, 0.5)'}}>
                        취소
                </button>
            </div>
            
        </div>
    )
}

export default JoinReadingRoomModal;