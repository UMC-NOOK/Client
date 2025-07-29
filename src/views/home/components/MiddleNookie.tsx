import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import profileIcon from '../../../assets/button/home/profile.png';
import penIcon from '../../../assets/button/home/solar_pen.png';
import designIcon from '../../../assets/button/home/design.png';
import ReadingGoalModal from './ReadingGoalModal';

import baseNookie from '../../../assets/button/home/default-background.png';
import lampBase from '../../../assets/button/home/base-nookie.png';
import lampOrange from '../../../assets/button/home/orange-nookie.png';
import lampGreen from '../../../assets/button/home/green-nookie.png';
import lampBlue from '../../../assets/button/home/blue-nookie.png';

import wallpaperDefault from '../../../assets/button/home/default-wallpaper-c.png';
import wallpaperStripe from '../../../assets/button/home/stripe-wallpaper.png';
import wallpaperStars from '../../../assets/button/home/star-wallpaper.png';
import wallpaperDrop from '../../../assets/button/home/drop-wallpaper.png';
import wallpaperCheck from '../../../assets/button/home/check-wallpaper.png';
import wallpaperArgyle from '../../../assets/button/home/argyle-wallpaper.png';

const lampImages: Record<string, string> = {
  base: lampBase,
  orange: lampOrange,
  green: lampGreen,
  blue: lampBlue,
};

const wallpaperImages: Record<string, string> = {
  default: wallpaperDefault,
  stripe: wallpaperStripe,
  stars: wallpaperStars,
  drop: wallpaperDrop,
  check: wallpaperCheck,
  argyle: wallpaperArgyle,
};

const MiddleNookie = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalBooks, setGoalBooks] = useState(50);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    selectedLamp = 'base',
    selectedWallpaper = 'default',
    nicknamePrefix = '프로',
    nicknameSuffix = '독자',
  } = location.state || {};

  const currentBooks = 0;
  const remainingDays = 193;
  const progressPercent = (currentBooks / goalBooks) * 100;

  const handleSaveGoal = (newGoal: number) => {
    setGoalBooks(newGoal);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative w-[528px] h-[648px] rounded-[12px] bg-[#423C35]/10 flex flex-col items-center justify-end overflow-hidden">
        {/* 벽지 */}
        <img
          src={wallpaperImages[selectedWallpaper]}
          alt="wallpaper"
          className="absolute inset-0 w-full h-full object-cover z-0 rounded-[12px]"
        />

        {/* 베이스 누키 이미지 */}
        <img
          src={baseNookie}
          alt="base"
          className="absolute inset-0 w-full h-full object-contain z-10"
        />

        {/* 전등 갓 */}
        <img
          src={lampImages[selectedLamp]}
          alt="lamp"
          className="absolute z-20 top-[-115px] left-[300px] w-[140px] h-full object-contain"
        />

        {/* 누키 위 별명 텍스트 */}
        <p
          className="absolute top-[124px] left-[369px] transform -translate-x-1/2 text-white text-[13.135px] font-[400] text-center z-30"
          style={{ fontFamily: 'Pretendard' }}
        >
          {nicknamePrefix} {nicknameSuffix}
        </p>

        {/* 디자인 아이콘 */}
        <button
          className="absolute top-[26px] right-[23px] w-[28px] h-[28px] flex items-center justify-center z-30"
          onClick={() => navigate('/home/DesignPage')} 
        >
          <img src={designIcon} alt="lamp" className="w-[28px] h-[28px]" />
        </button>

        {/* 하단 영역 */}
        <div className="w-[477px] h-[137px] rounded-[12px] bg-[#423C35]/20 backdrop-blur-[10px] flex flex-row items-center px-[25px] py-[25px] gap-[24px] mb-[14px] relative z-30">
          {/* ✏️ 목표 수정 버튼 */}
          <button
            className="absolute right-[25px] top-[25px] w-[28px] h-[28px] bg-[#423C35]/50 rounded-[4px] flex items-center justify-center"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={penIcon} alt="edit" className="w-[16px] h-[16px]" />
          </button>

          {/* 프로필 */}
          <div className="flex flex-col items-center">
            <img src={profileIcon} alt="profile" className="w-[53px] h-[53px]" />
            <p className="mt-[10px] text-white text-[14px] font-[600]">
              경민
            </p>
          </div>

          {/* 목표 정보 */}
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
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsModalOpen(false)} />
          <ReadingGoalModal onClose={() => setIsModalOpen(false)} onSave={handleSaveGoal} />
        </>
      )}
    </>
  );
};

export default MiddleNookie;
