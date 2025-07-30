import React, { useState } from "react";

const ShowMoreTagsModal = () => {
    const goalTags = ['자유독서', '필사', '독서기록', '뽀모도로', '루틴'];
    const timeTags = ['아침', '낮', '밤', '주말', '퇴근길', '출근길'];
    const ageTags = ['10대','20대', '30대', '40대', '50대'];
    const particularTags = ['중학생', '고등학생', '대학생', '직장인'];
    const fieldTags1 = ['소설', '시', '희곡', '에세이', '인문', '자기계발'];  
    const fieldTags2 = ['경제경영', '역사', '예술', '과학', '공학', '철학'];
    const fieldTags3 = ['여행', '요리', '가정', '청소년','eBook'];
    const fieldTags4 = ['일본도서', '외국도서', '영어 원서'];

    const [selected, setSeleted] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        setSeleted((prev) =>
            prev.includes(tag) ? prev.filter((t)=> t !== tag) : [...prev, tag]
        );
    };

    return(
        <div 
            className="relative w-224 h-304 rounded-3xl"
            style={{backgroundColor: 'rgba(45, 40 ,34, 1'}}>
            
            <div className="absolute top-15 left-14">
                <div className="text-white text-lg">
                    목적
                </div>

                <div className="flex flex-row justify-center items-center text-white gap-5 mt-5">
                    {goalTags.map((lable, idx) => {
                        const isSelected = selected.includes(lable);

                        return(
                            <div
                                key={idx}
                                onClick={() => toggleTag(lable)}
                                className={`cursor-pointer flex justify-center items-center text-sm rounded-md px-7 py-2 border transition-all duration-200
                                    ${
                                    isSelected
                                        ? "text-white border-[rgba(255,255,255,0.5)]"
                                        : "border-transparent"
                                    }`}
                                style={{
                                    backgroundColor: isSelected
                                        ? 'rgba(66,60,53,0.5)'
                                        : 'rgba(31, 28, 25, 0.5)'
                                }}>
                                {lable}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="absolute top-62 left-14">
                <div className="text-white text-lg">
                    시간
                </div>
                <div className="flex flex-row justify-start items-center text-white gap-5 mt-5">
                    {timeTags.map((lable, idx) => {
                        const isSelected = selected.includes(lable);

                        return(
                            <div
                                key={idx}
                                onClick={() => toggleTag(lable)}
                                className={`cursor-pointer flex justify-center items-center text-sm rounded-md px-7 py-2 border transition-all duration-200
                                    ${
                                    isSelected
                                        ? "text-white border-[rgba(255,255,255,0.5)]"
                                        : "border-transparent"
                                    }`}
                                style={{
                                    backgroundColor: isSelected
                                        ? 'rgba(66,60,53,0.5)'
                                        : 'rgba(31, 28, 25, 0.5)'
                                }}>
                                {lable}
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className="absolute top-104 left-14 pt-5">
                <div className="text-white text-lg">
                    나이
                </div>
                <div className="flex flex-row justify-start items-center text-white gap-5 mt-5">
                    {ageTags.map((lable, idx) => {
                        const isSelected = selected.includes(lable);

                        return(
                            <div
                                key={idx}
                                onClick={() => toggleTag(lable)}
                                className={`cursor-pointer flex justify-center items-center text-sm rounded-md px-7 py-2 border transition-all duration-200
                                    ${
                                    isSelected
                                        ? "text-white border-[rgba(255,255,255,0.5)]"
                                        : "border-transparent"
                                    }`}
                                style={{
                                    backgroundColor: isSelected
                                        ? 'rgba(66,60,53,0.5)'
                                        : 'rgba(31, 28, 25, 0.5)'
                                }}>
                                {lable}
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-row justify-start items-center text-white mt-4 gap-5 ">
                    {particularTags.map((lable, idx) => {
                        const isSelected = selected.includes(lable);

                        return(
                            <div
                                key={idx}
                                onClick={() => toggleTag(lable)}
                                className={`cursor-pointer flex justify-center items-center text-sm rounded-md px-7 py-2 border transition-all duration-200
                                    ${
                                    isSelected
                                        ? "text-white border-[rgba(255,255,255,0.5)]"
                                        : "border-transparent"
                                    }`}
                                style={{
                                    backgroundColor: isSelected
                                        ? 'rgba(66,60,53,0.5)'
                                        : 'rgba(31, 28, 25, 0.5)'
                                }}>
                                {lable}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="absolute top-164 left-14 pt-8">
                <div className="text-white text-lg">
                    분야
                </div>
                <div className="flex flex-row justify-start items-center text-white gap-5 mt-5">
                    {fieldTags1.map((lable, idx) => {
                        const isSelected = selected.includes(lable);

                        return(
                            <div
                                key={idx}
                                onClick={() => toggleTag(lable)}
                                className={`cursor-pointer flex justify-center items-center text-sm rounded-md px-7 py-2 border transition-all duration-200
                                    ${
                                    isSelected
                                        ? "text-white border-[rgba(255,255,255,0.5)]"
                                        : "border-transparent"
                                    }`}
                                style={{
                                    backgroundColor: isSelected
                                        ? 'rgba(66,60,53,0.5)'
                                        : 'rgba(31, 28, 25, 0.5)'
                                }}>
                                {lable}
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-row justify-start items-center text-white gap-5 mt-4">
                    {fieldTags2.map((lable, idx) => {
                        const isSelected = selected.includes(lable);

                        return(
                            <div
                                key={idx}
                                onClick={() => toggleTag(lable)}
                                className={`cursor-pointer flex justify-center items-center text-sm rounded-md px-7 py-2 border transition-all duration-200
                                    ${
                                    isSelected
                                        ? "text-white border-[rgba(255,255,255,0.5)]"
                                        : "border-transparent"
                                    }`}
                                style={{
                                    backgroundColor: isSelected
                                        ? 'rgba(66,60,53,0.5)'
                                        : 'rgba(31, 28, 25, 0.5)'
                                }}>
                                {lable}
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-row justify-start items-center text-white gap-5 mt-4">
                    {fieldTags3.map((lable, idx) => {
                        const isSelected = selected.includes(lable);

                        return(
                            <div
                                key={idx}
                                onClick={() => toggleTag(lable)}
                                className={`cursor-pointer flex justify-center items-center text-sm rounded-md px-7 py-2 border transition-all duration-200
                                    ${
                                    isSelected
                                        ? "text-white border-[rgba(255,255,255,0.5)]"
                                        : "border-transparent"
                                    }`}
                                style={{
                                    backgroundColor: isSelected
                                        ? 'rgba(66,60,53,0.5)'
                                        : 'rgba(31, 28, 25, 0.5)'
                                }}>
                                {lable}
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-row justify-start items-center text-white gap-5 mt-4">
                    {fieldTags4.map((lable, idx) => {
                        const isSelected = selected.includes(lable);

                        return(
                            <div
                                key={idx}
                                onClick={() => toggleTag(lable)}
                                className={`cursor-pointer flex justify-center items-center text-sm rounded-md px-7 py-2 border transition-all duration-200
                                    ${
                                    isSelected
                                        ? "text-white border-[rgba(255,255,255,0.5)]"
                                        : "border-transparent"
                                    }`}
                                style={{
                                    backgroundColor: isSelected
                                        ? 'rgba(66,60,53,0.5)'
                                        : 'rgba(31, 28, 25, 0.5)'
                                }}>
                                {lable}
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className="absolute top-275 left-136 pt-4">
                <div className="flex flex-row justify-end items-center">
                    <button
                        className="w-34 h-15 px-5 py-1 rounded-lg mr-7 font-bold mr-7 text-white"
                        style={{backgroundColor: 'rgba(66,60,53,1)'}}>
                            저장
                    </button>
                    <button
                        className="w-34 h-15 px-5 py-1 rounded-lg border text-[rgba(255,255,255,0.5)] font-bold"
                        style={{borderColor: 'rgba(255, 255, 255, 0.5)'}}>
                            취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShowMoreTagsModal;