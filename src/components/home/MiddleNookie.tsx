import React, { useState } from 'react';
import profileIcon from '../../assets/button/home/profile.png';
import penIcon from '../../assets/button/home/solar_pen.png';
import ReadingGoalModal from './ReadingGoalModal'; // 경로는 실제 위치에 따라 조정

const MiddleNookie = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalBooks, setGoalBooks] = useState(50); // 목표 권수 상태

  const currentBooks = 0;
  const remainingDays = 193;
  const progressPercent = (currentBooks / goalBooks) * 100;

  const handleSaveGoal = (newGoal: number) => {
    setGoalBooks(newGoal);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* 카드 영역 */}
      <div className="w-[528px] h-[648px] rounded-[12px] bg-[#423C35]/10 flex flex-col items-center justify-end">
        <div className="w-[477px] h-[137px] rounded-[12px] bg-[#423C35]/20 backdrop-blur-[10px] flex flex-row items-center px-[25px] py-[25px] gap-[24px] mb-[14px] relative">
          
          {/* ✏️ 우측 상단 버튼 */}
          <button
            className="absolute right-[25px] top-[25px] w-[28px] h-[28px] bg-[#423C35]/50 rounded-[4px] flex items-center justify-center z-10"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={penIcon}
              alt="edit"
              className="w-[16px] h-[16px] object-contain"
            />
          </button>

          {/* 프로필 영역 */}
          <div className="flex flex-col items-center">
            <img
              src={profileIcon}
              alt="profile"
              className="w-[53px] h-[53px] object-contain"
            />
            <p className="mt-[10px] text-white text-[14px] font-[600]">경민</p>
          </div>

          {/* 목표 정보 영역 */}
          <div className="flex flex-col justify-center">
            <p className="text-white/50 text-[12px] font-[400]">
              D-{remainingDays} | 올해 독서 목표 {goalBooks}권
            </p>

            <div className="h-[11px]" />

            <p className="text-white text-[18px] font-[600]">
              목표까지 {goalBooks - currentBooks}권 남았어요!
            </p>

            <div className="mt-[11px] w-[352px] h-[10px] bg-[#423C35]/50 rounded-[12px] overflow-hidden">
              <div
                className="h-full rounded-[12px]"
                style={{
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #42ABAF 0%, #7ABFC9 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsModalOpen(false)}
          />
          <ReadingGoalModal onClose={() => setIsModalOpen(false)} onSave={handleSaveGoal} />
        </>
      )}
    </>
  );
};

export default MiddleNookie;
