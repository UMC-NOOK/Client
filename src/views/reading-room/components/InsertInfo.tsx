import React, { useState } from "react";
import ShowMoreTagsModal from "./Modals/ShowMoreTagsModal";

interface Props {
    roomName: string;
    setRoomName: (value: string) => void;
    roomDescription: string;
    setRoomDescription: (value: string) => void;
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const InsertInfo = ({
    roomName,
    setRoomName,
    roomDescription,
    setRoomDescription,
    selectedTags,
    setSelectedTags
    }: Props) => {
    const tag1 = ['자유 독서', '필사', '낮', '밤', '주말', '10대', '대학생', '직장인'];
    const tag2 = ['소설', '인문', '자기계발', '경제경영', '공학', '영어원서'];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const nameVisualLength = Array.from(roomName).length;
    const introVisualLength = Array.from(roomDescription).length;

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => {
            if(prev.includes(tag)) return prev.filter((t) => t !==tag);
            if(prev.length >= 3) return prev;
            return [...prev, tag];
        });
    };

    return(
        <div className="flex flex-col justify-start">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                    <div className="text-white text-sm font-semibold">
                        룸 이름*
                    </div>
                    
                    <div className="text-white text-2xs">
                        {nameVisualLength}/30
                    </div>
                </div>

                <div className="w-224 h-20 rounded-lg"
                    style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                    <input 
                        value={roomName}
                        onChange={(e) => {
                            if(e.target.value.length <= 30) setRoomName(e.target.value);
                        }}
                        placeholder="리딩룸의 이름을 입력해주세요."
                        className="flex justify-start items-center ml-7 mt-6 w-224"
                        style={{color: 'rgba(255, 255, 255,0.5)'}}/>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-20">
                <div className="flex flex-row justify-between">
                    <div className="text-white text-sm font-semibold">
                        한 줄 소개*
                    </div>
                    
                    <div className="text-white text-2xs">
                        {introVisualLength}/30
                    </div>
                </div>

                <div className="w-224 h-20 rounded-lg"
                    style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                    <input 
                        value={roomDescription}
                        onChange={(e) => {
                            if(e.target.value.length <= 30) setRoomDescription(e.target.value);
                        }}
                        placeholder="리딩룸을 소개해주세요."
                        className="flex justify-start items-center ml-7 mt-6 w-224"
                        style={{color: 'rgba(255, 255, 255,0.5)'}}/>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-20">
                <div className="flex flex-row justify-between">
                    <div className="text-white text-sm font-semibold">
                        태그
                    </div>
                    
                    <div className="text-white text-2xs">
                        {selectedTags.length} /3
                    </div>
                </div>
                
                <div className="flex flex-wrap w-224 h-20 rounded-lg items-start gap-2"
                    style={{backgroundColor: 'rgba(31, 28, 25, 0.5)'}}>
                        {selectedTags.length > 0 ? (
                            selectedTags.map((tag,idx)=> (
                                <div
                                    key={idx}
                                    className="flex justify-start items-center bg-[rgba(66,60,53,1)] text-white text-2xs px-3 py-2 gap-1 rounded-lg mt-3">
                                    {tag}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none"
                                        onClick={() =>
                                        setSelectedTags((prev) => prev.filter((t) => t !== tag))
                                        }>
                                        <path d="M5.91136 5.99758L9.00676 2.89916C9.06136 2.84428 9.092 2.77 9.09195 2.69258C9.09189 2.61516 9.06116 2.54092 9.00648 2.48611C8.89703 2.37721 8.70426 2.37666 8.59371 2.48666L5.49913 5.58508L2.40346 2.48583C2.29346 2.37721 2.10068 2.37776 1.99123 2.48638C1.96406 2.51344 1.94256 2.54564 1.92797 2.5811C1.91338 2.61656 1.906 2.65457 1.90626 2.69291C1.90626 2.77101 1.93651 2.84416 1.99123 2.89833L5.08663 5.99731L1.99151 9.09656C1.93689 9.15152 1.9063 9.22591 1.90645 9.30339C1.90661 9.38088 1.93749 9.45514 1.99233 9.50988C2.04541 9.56241 2.12048 9.59266 2.19803 9.59266H2.19968C2.27751 9.59238 2.35258 9.56186 2.40456 9.50878L5.49913 6.41036L8.59481 9.50961C8.64953 9.56406 8.72268 9.59431 8.80023 9.59431C8.83856 9.59435 8.87651 9.58682 8.91193 9.57217C8.94735 9.55752 8.97953 9.53603 9.00663 9.50893C9.03373 9.48183 9.05522 9.44965 9.06987 9.41423C9.08452 9.37882 9.09204 9.34086 9.09201 9.30254C9.09201 9.22471 9.06176 9.15128 9.00676 9.09711L5.91136 5.99758Z" fill="white"/>
                                    </svg>
                                </div>
                            ))
                        )
                        : (
                            <div className="flex justify-start items-center w-224 h-20 ml-7"
                                style={{color: 'rgba(255, 255, 255,0.5)'}}>
                                리딩룸을 대표하는 키워드를 선택해주세요.
                            </div>
                        )
                        }
                
                </div>    

                <div className="flex flex-col w-224 mt-9">
                    <div className="flex flex-wrap gap-2">
                        {tag1.map((lable, idx) => {
                            const isSelected = selectedTags.includes(lable);

                            return(
                                <div
                                    key={idx}
                                    onClick={() => toggleTag(lable)}
                                    className={`cursor-pointer flex justify-center items-center text-2xs text-white rounded-md px-7 py-2 border transition-all duration-200
                                    ${
                                        isSelected
                                            ? "text-white border-[rgba(255,255,255,0.5)]"
                                            : "border-transparent"
                                    }`}
                                        
                                    style={{
                                        backgroundColor: isSelected
                                            ? 'rgba(66,60,53,1)'
                                            : 'rgba(66, 60, 53, 0.5)'
                                    }}>
                                    {lable}
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {tag2.map((lable, idx) => {
                            const isSelected = selectedTags.includes(lable);

                            return(
                                <div
                                    key={idx}
                                    onClick={() => toggleTag(lable)}
                                    className={`cursor-pointer flex justify-center items-center text-2xs text-white rounded-md px-7 py-2 border transition-all duration-200
                                    ${
                                        isSelected
                                            ? "text-white border-[rgba(255,255,255,0.5)]"
                                            : "border-transparent"
                                    }`}
                                        
                                    style={{
                                        backgroundColor: isSelected
                                            ? 'rgba(66,60,53,1)'
                                            : 'rgba(66, 60, 53, 0.5)'
                                    }}>
                                    {lable}
                                </div>
                            )
                        })}

                        <div
                            onClick={() => setIsModalOpen(true)} 
                            className="cursor-pointer flex flex-row text-white justify-center items-center text-2xs rounded-md px-7 py-2 text-white gap-1"
                            style={{backgroundColor: 'rgba(66,60,53,0.5)'}}>
                                더보기
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 1 11 12" fill="none"
                                className="flex items-center">
                                <path d="M5.89583 6.20833V3.34375C5.89583 3.25258 5.85962 3.16515 5.79515 3.10068C5.73069 3.03622 5.64325 3 5.55208 3C5.46092 3 5.37348 3.03622 5.30902 3.10068C5.24455 3.16515 5.20833 3.25258 5.20833 3.34375V6.20833H2.34375C2.25258 6.20833 2.16515 6.24455 2.10068 6.30902C2.03622 6.37348 2 6.46092 2 6.55208C2 6.64325 2.03622 6.73069 2.10068 6.79515C2.16515 6.85962 2.25258 6.89583 2.34375 6.89583H5.20833V9.76042C5.20952 9.85122 5.24612 9.93796 5.31033 10.0022C5.37454 10.0664 5.46128 10.103 5.55208 10.1042C5.64325 10.1042 5.73069 10.068 5.79515 10.0035C5.85962 9.93902 5.89583 9.85158 5.89583 9.76042V6.89583H8.76042C8.85158 6.89583 8.93902 6.85962 9.00349 6.79515C9.06795 6.73069 9.10417 6.64325 9.10417 6.55208C9.10298 6.46128 9.06638 6.37454 9.00217 6.31033C8.93796 6.24612 8.85122 6.20952 8.76042 6.20833H5.89583Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>

            {isModalOpen && (
                <ShowMoreTagsModal
                    selected={selectedTags}
                    setSelected={setSelectedTags}
                    onClose={() => setIsModalOpen(false)}/>
            )}
        </div>
        </div>
    )
}

export default InsertInfo;