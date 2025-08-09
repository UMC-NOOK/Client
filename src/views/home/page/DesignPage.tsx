import React, { useEffect, useMemo, useState } from 'react';
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
import { useGetProfile } from '../hooks/useQuery/useGetProfile';
import { usePatchProfile } from '../hooks/useMutation/usePatchProfile';

// ---- 로컬 키 & 서버 enum 타입 ----
type LampKey = 'base' | 'orange' | 'green' | 'blue';
type PatternKey = 'default' | 'stripe' | 'stars' | 'drop' | 'check' | 'argyle';
type CharacterColor = 'BLUE' | 'RED' | 'ORANGE' | 'GREEN';
type BackgroundPattern = 'NONE' | 'STRIPE' | 'ARGYLE' | 'DOT' | 'PLAID' | 'STAR';

// 서버 enum <-> 로컬 키 매핑
const lampKeyToEnum: Record<LampKey, CharacterColor> = {
  base: 'RED',
  orange: 'ORANGE',
  green: 'GREEN',
  blue: 'BLUE',
};
const enumToLampKey: Record<CharacterColor, LampKey> = {
  BLUE: 'blue',
  GREEN: 'green',
  ORANGE: 'orange',
  RED: 'base',
};

const patternKeyToEnum: Record<PatternKey, BackgroundPattern> = {
  default: 'NONE',
  stripe: 'STRIPE',
  argyle: 'ARGYLE',
  drop: 'DOT',
  check: 'PLAID',
  stars: 'STAR',
};
const enumToPatternKey: Record<BackgroundPattern, PatternKey> = {
  NONE: 'default',
  STRIPE: 'stripe',
  ARGYLE: 'argyle',
  DOT: 'drop',
  PLAID: 'check',
  STAR: 'stars',
};

// 이미지 맵
const lampImages: Record<LampKey, string> = {
  base: lampBase,
  orange: lampOrange,
  green: lampGreen,
  blue: lampBlue,
};
const wallpaperImages: Record<PatternKey, string> = {
  default: wallpaperDefault,
  stripe: wallpaperStripe,
  stars: wallpaperStars,
  drop: wallpaperDrop,
  check: wallpaperCheck,
  argyle: wallpaperArgyle,
};

const TABS = ['별명', '누키', '마이홈'] as const;
type TabKey = typeof TABS[number];

const DesignPage: React.FC = () => {
  const navigate = useNavigate();

  // 서버 상태
  const { data: profile } = useGetProfile();
  const { mutate: patchProfile, isPending } = usePatchProfile();

  // 별명(= alias) → 프리/서픽스 UI
  const [nicknamePrefix, setNicknamePrefix] = useState('프로');
  const [nicknameSuffix, setNicknameSuffix] = useState('독자');

  // 누키(색/배경) → 로컬 키로 관리
  const [lampKey, setLampKey] = useState<LampKey>('base');
  const [patternKey, setPatternKey] = useState<PatternKey>('default');

  const [activeTab, setActiveTab] = useState<TabKey>('별명');

  // 서버 값으로 초기화
  useEffect(() => {
    if (!profile) return;
    if (profile.alias?.trim()) {
      const parts = profile.alias.trim().split(/\s+/);
      setNicknamePrefix(parts[0] ?? '프로');
      setNicknameSuffix(parts.slice(1).join(' ') || '독자');
    } else {
      setNicknamePrefix('프로');
      setNicknameSuffix('독자');
    }
    setLampKey(enumToLampKey[profile.characterColor]);
    setPatternKey(enumToPatternKey[profile.backgroundPattern]);
  }, [profile]);

  const alias = useMemo(
    () => `${nicknamePrefix} ${nicknameSuffix}`.trim(),
    [nicknamePrefix, nicknameSuffix],
  );

  const previewLampImg = lampImages[lampKey];
  const previewWallpaperImg = wallpaperImages[patternKey];

  const handleSave = () => {
    patchProfile(
      {
        alias,
        characterColor: lampKeyToEnum[lampKey],
        backgroundPattern: patternKeyToEnum[patternKey],
      },
      { onSuccess: () => navigate('/home') },
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-start gap-[16px] py-[27px] relative rounded-[12px]">
      {/* 왼쪽 미리보기 */}
      <div
        className="w-[528px] h-[648px] rounded-[12px] bg-[#423C35]/10 flex items-center justify-center relative overflow-hidden"
        style={{ flexShrink: 0 }}
      >
        <div className="absolute z-10 w-full h-full">
          {/* 배경 */}
          <img
            src={previewWallpaperImg}
            alt="Wallpaper"
            className="absolute inset-0 w-[528px] h-full object-cover rounded-[12px]"
          />

          {/* 누키 베이스 */}
          <img
            src={baseNookie}
            alt="Base Nookie"
            className="relative z-10 w-full h-full object-contain"
          />

          {/* 램프 */}
          <img
            src={previewLampImg}
            alt="Lamp"
            className="absolute z-[30] top-[-115px] left-[300px] w-[140px] h-full object-contain"
          />

          {/* 안내 박스(디자인 유지용) */}
          <div
            className="absolute z-20 left-[25px] bottom-[14px] w-[477px] h-[137px] rounded-[12px] border border-dashed"
            style={{ borderColor: 'rgba(211, 211, 211, 0.2)', flexShrink: 0 }}
          />

          {/* 누키 위 텍스트 = 별명(alias) 미리보기 */}
          <div
            className="absolute z-[40] top-[124px] left-[369px] transform -translate-x-1/2 text-white text-[13.135px] font-[400] text-center"
            style={{ fontFamily: 'Pretendard' }}
          >
            {alias}
          </div>
        </div>
      </div>

      {/* 오른쪽 탭 */}
      <div className="relative w-[432px] h-[568.407px] pt-0">
        {/* 탭 버튼 */}
        <div className="relative z-10 flex ml-[14px]">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'w-[100px] h-[34.951px] flex justify-center items-center text-[14px] font-semibold',
                'rounded-t-[8px] overflow-hidden',
                'transform skew-x-[-12deg]',
                activeTab === tab ? 'bg-[#2D2822] text-white' : 'bg-[#211A11] text-white/60'
              )}
            >
              <span className="transform skew-x-[12deg]">{tab}</span>
            </button>
          ))}
        </div>

        {/* 탭 내용 */}
        <div className="relative z-20 w-full h-full rounded-[12px] bg-[#2D2822] px-[38px] pt-[21.41px] ">
          {activeTab === '별명' && (
            <NicknameTab
              selectedPrefix={nicknamePrefix}
              setSelectedPrefix={setNicknamePrefix}
              selectedSuffix={nicknameSuffix}
              setSelectedSuffix={setNicknameSuffix}
            />
          )}

          {activeTab === '누키' && (
            <NookieTab
              selected={lampKey}
              setSelected={setLampKey}
            />
          )}

          {activeTab === '마이홈' && (
            <MyHomeTab
              selected={patternKey}
              setSelected={setPatternKey}
            />
          )}

          {/* 저장 버튼 */}
          <div className="flex justify-center">
            <button
              className="w-[88px] h-[33px] rounded-[8px] bg-[#423C35] text-white text-[14px] font-semibold mt-[18px] disabled:opacity-60"
              onClick={handleSave}
              disabled={isPending}
            >
              {isPending ? '저장 중…' : '저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
