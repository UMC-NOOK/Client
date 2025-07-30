import React, { Dispatch, SetStateAction } from "react";

const ShowMoreTagsModal = ({
    selected,
    setSelected,
    onClose,
    } : {
        selected:string[];
        setSelected: Dispatch<SetStateAction<string[]>>;
        onClose: () => void;
    }) => {
    const goalTags = ['자유독서', '필사', '독서기록', '뽀모도로', '루틴'];
    const timeTags = ['아침', '낮', '밤', '주말', '퇴근길', '출근길'];
    const ageTags = ['10대','20대', '30대', '40대', '50대'];
    const particularTags = ['중학생', '고등학생', '대학생', '직장인'];
    const fieldTags1 = ['소설', '시', '희곡', '에세이', '인문', '자기계발'];  
    const fieldTags2 = ['경제경영', '역사', '예술', '과학', '공학', '철학'];
    const fieldTags3 = ['여행', '요리', '가정', '청소년','eBook'];
    const fieldTags4 = ['일본도서', '외국도서', '영어 원서'];

    const toggleTag = (tag: string) => {
        setSelected((prev) => {
            if(prev.includes(tag)) return prev.filter((t) => t !==tag);
            if(prev.length >= 3) return prev;
            return [...prev, tag];
        });
    };

    const renderTags = (tags: string[]) =>
        tags.map((label, idx) => {
            const isSelected = selected.includes(label);
            return(
                <div
                    key={idx}
                    onClick={() => toggleTag(label)}
                    className={`cursor-pointer flex justify-center items-center text-sm rounded-md px-7 py-2 border transition-all duration-200
                        ${
                            isSelected
                                ? "text-white border-[rgba(255,255,255,0.5)]"
                                : "border-transparent"
                        }`}
                    style={{
                        backgroundColor: isSelected
                            ? "rgba(66, 60, 53, 0.5)"
                            : "rgba(31,28,25,0.5)"
                    }}
                >
                    {label}
                </div>
            );
        });

    return(
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50">
            <div 
                className="relative w-224 h-304 rounded-3xl"
                style={{backgroundColor: 'rgba(45, 40 ,34, 1'}}>
            
                <div className="absolute top-15 left-14">
                    <div className="text-white text-lg">
                        목적
                    </div>

                    <div className="flex flex-row justify-center items-center text-white gap-5 mt-3">
                        {renderTags(goalTags)}
                    </div>
                </div>

                <div className="absolute top-58 left-14">
                    <div className="text-white text-lg">
                        시간
                    </div>
                    <div className="flex flex-row justify-start items-center text-white gap-5 mt-3">
                        {renderTags(timeTags)}
                    </div>
                </div>
            
                <div className="absolute top-104 left-14">
                    <div className="text-white text-lg">
                        나이
                    </div>
                    
                    <div className="flex flex-row justify-start items-center text-white gap-5 mt-3">
                        {renderTags(ageTags)}
                    </div>
                
                    <div className="flex flex-row justify-start items-center text-white mt-2 gap-5 ">
                        {renderTags(particularTags)}
                    </div>
                </div>

                <div className="absolute top-164 left-14">
                    <div className="text-white text-lg">
                        분야
                    </div>
                
                    <div className="flex flex-row justify-start items-center text-white gap-5 mt-5">
                        {renderTags(fieldTags1)}
                    </div>
                    <div className="flex flex-row justify-start items-center text-white gap-5 mt-2">
                        {renderTags(fieldTags2)}
                    </div>
                    <div className="flex flex-row justify-start items-center text-white gap-5 mt-2">
                        {renderTags(fieldTags3)}
                    </div>
                    <div className="flex flex-row justify-start items-center text-white gap-5 mt-2">
                        {renderTags(fieldTags4)}
                    </div>
                </div>
            
                <div className="absolute top-275 left-136 pt-4">
                    <div className="flex flex-row justify-end items-center">
                        <button
                            className="w-34 h-15 px-5 py-1 rounded-lg mr-7 font-bold mr-7 text-white"
                            style={{backgroundColor: 'rgba(66,60,53,1)'}}
                            onClick={onClose}>
                                저장
                        </button>
                        <button
                            className="w-34 h-15 px-5 py-1 rounded-lg border text-[rgba(255,255,255,0.5)] font-bold"
                            style={{borderColor: 'rgba(255, 255, 255, 0.5)'}}
                            onClick={onClose}>
                                취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowMoreTagsModal;