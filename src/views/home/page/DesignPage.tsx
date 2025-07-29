// DesignPage.tsx
import React, { useState } from 'react';
import clsx from 'clsx';

import NicknameTab from '../components/NicknameTab';
import NookieTab from '../components/NookieTab';
import MyHomeTab from '../components/MyHomeTab';

import wallpaperDefault from '../../../assets/button/home/default-wallpaper-c.png';
import wallpaperStripe from '../../../assets/button/home/stripe-wallpaper.png';
import wallpaperStars from '../../../assets/button/home/star-wallpaper.png';
import wallpaperDrop from '../../../assets/button/home/drop-wallpaper.png';
import wallpaperCheck from '../../../assets/button/home/check-wallpaper.png';
import wallpaperArgyle from '../../../assets/button/home/argyle-wallpaper.png';

import baseNookie from '../../../assets/button/home/default-background.png';

import lampBase from '../../../assets/button/home/base-nookie.png';
import lampOrange from '../../../assets/button/home/orange-nookie.png';
import lampGreen from '../../../assets/button/home/green-nookie.png';
import lampBlue from '../../../assets/button/home/blue-nookie.png';

import { useNavigate } from 'react-router-dom';

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

const TABS = ['별명', '누키', '마이홈'];

const DesignPage = () => {
  const [activeTab, setActiveTab] = useState('별명');
  const [selectedLamp, setSelectedLamp] = useState('base');
  const [selectedWallpaper, setSelectedWallpaper] = useState('default');
  const [nicknamePrefix, setNicknamePrefix] = useState('프로');
  const [nicknameSuffix, setNicknameSuffix] = useState('독자');

  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/home', {
      state: {
        selectedLamp,
        selectedWallpaper,
        nicknamePrefix,
        nicknameSuffix,
      },
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-start gap-[16px] py-[27px] relative rounded-[12px]">
      {/* 왼쪽 영역 */}
      <div
        className="w-[528px] h-[648px] rounded-[12px] bg-[#423C35]/10 flex items-center justify-center relative overflow-hidden"
        style={{ flexShrink: 0 }}
      >
        <div className="absolute z-10 w-full h-full">
          {/* Wallpaper Layer */}
          <img
            src={wallpaperImages[selectedWallpaper]}
            alt="Wallpaper"
            className="absolute inset-0 w-[528px] h-full object-cover rounded-[12px]"
          />

          {/* Base Body */}
          <img
            src={baseNookie}
            alt="Base Nookie"
            className="relative z-10 w-full h-full object-contain"
          />

          {/* Lamp Shade */}
          <img
            src={lampImages[selectedLamp]}
            alt="Lamp"
            className="absolute z-[30] top-[-115px] left-[300px] w-[140px] h-full object-contain"
          />

          {/* Description Box*/}
          <div
            className="absolute z-20 left-[25px] bottom-[14px] w-[477px] h-[137px] rounded-[12px] border border-dashed"
            style={{
              borderColor: 'rgba(211, 211, 211, 0.2)',
              flexShrink: 0,
            }}
          >
          </div>

          {/* 닉네임 텍스트 */}
          <div
            className="absolute z-[40] top-[124px] left-[369px] transform -translate-x-1/2 text-white text-[13.135px] font-[400] text-center"
            style={{ fontFamily: 'Pretendard' }}
          >
            {nicknamePrefix} {nicknameSuffix}
          </div>
        </div>
      </div>

      {/* 오른쪽 탭 박스 */}
      <div className="relative w-[432px] h-[568.407px] pt-0">
        {/* 탭 버튼 */}
        <div className="relative z-10 flex ml-[14px] ">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'w-[100px] h-[34.951px] flex justify-center items-center text-[14px] font-semibold',
                'rounded-t-[8px] overflow-hidden',
                'transform skew-x-[-12deg]',
                activeTab === tab
                  ? 'bg-[#2D2822] text-white'
                  : 'bg-[#211A11] text-white/60'
              )}
            >
              <span className="transform skew-x-[12deg]">{tab}</span>
            </button>
          ))}
        </div>

        {/* 탭 내용 */}
        <div className="relative z-20 w-full h-full rounded-[12px] bg-[#2D2822] px-[38px] pt-[21.41px] ">
          <div className="mt-[0px] text-white h-full ">
            {activeTab === '별명' && (
              <NicknameTab
                selectedPrefix={nicknamePrefix}
                setSelectedPrefix={setNicknamePrefix}
                selectedSuffix={nicknameSuffix}
                setSelectedSuffix={setNicknameSuffix}
              />
            )}
            {activeTab === '누키' && (
              <NookieTab selected={selectedLamp} setSelected={setSelectedLamp} />
            )}
            {activeTab === '마이홈' && (
              <MyHomeTab selected={selectedWallpaper} setSelected={setSelectedWallpaper} />
            )}
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-center">
            <button
              className="w-[88px] h-[33px] rounded-[8px] bg-[#423C35] text-white text-[14px] font-semibold mt-[18px]"
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
