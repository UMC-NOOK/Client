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

import tabBgActive from '../../../assets/button/home/tab-on.png';
import tabBgInactive from '../../../assets/button/home/tab-off.png';

// ⬅️ 홈으로 아이콘 (경로 확인해서 맞춰줘)
import chevronLeft from '../../../assets/button/home/chevron-leftT.png';

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
  argyle: wallpaperArgyle,
  drop: wallpaperDrop,
  check: wallpaperCheck,
  stars: wallpaperStars,

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

  const handleGoHome = () => navigate('/home');

  return (
    <div className="w-full h-full flex justify-center items-start gap-[18px] py-[27px] relative rounded-[12px]">
      {/* ⬅️ 상단 좌측 홈 버튼 */}
      <button
        type="button"
        onClick={handleGoHome}
        aria-label="홈으로"
        className="top-[27px] z-40 flex items-center gap-[12px] bg-transparent"
      >
        <img
          src={chevronLeft}
          alt=""
          className="w-[20px] h-[20px] select-none pointer-events-none"
        />
        <span className="text-white text-[20px] font-normal leading-none flex-shrink-0 [font-family:Pretendard]">
          홈
        </span>
      </button>

      {/* 왼쪽 미리보기 */}
      <div className="w-[528px] h-[648px] rounded-[12px] bg-[#423C35]/10 flex relative overflow-hidden shrink-0">
        <div className="absolute z-10 w-full h-full ">
          {/* 배경 */}
          <img
            src={previewWallpaperImg}
            alt="Wallpaper"
            className="absolute inset-0 object-cover rounded-[12px]"
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
            className="absolute z-[30] bottom-[382px] left-[290px] w-[164px] h-[130px] object-contain"
          />

          {/* 안내 박스(디자인 유지용) */}
          <div className="absolute z-20 left-[25px] bottom-[14px] w-[477px] h-[137px] rounded-[12px] border border-dashed border-[rgba(211,211,211,0.2)] shrink-0" />

          {/* 누키 위 텍스트 = 별명(alias) 미리보기 */}
          <div className="absolute z-[40] top-[112px] left-[380px] -translate-x-1/2 transform text-white text-[13.135px] font-[400] text-center [font-family:Pretendard]">
            {alias}
          </div>
        </div>
      </div>

      {/* 오른쪽: 탭 박스(고정) + 바깥 저장 버튼(간격 고정) */}
      <div className="w-[432px]">
        <div
          className="relative z-20 flex ml-[14px] overflow-visible isolate"
          role="tablist"
          aria-label="디자인 설정 탭"
        >
          {TABS.map((tab, i) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  'relative w-[100px] h-[27.6px] flex items-center justify-center bg-transparent pt-[7.36px] pb-[4.6px]' ,
                  active ? 'z-20' : 'z-10',
                  i > 0 && '-ml-[10px]',
                )}
              >
                <img
                  src={active ? tabBgActive : tabBgInactive}
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                />
                <span
                  className={clsx(
                    'relative z-10 flex justify-center items-center flex-shrink-0',
                    'text-[14px] font-normal leading-none',
                    active ? 'text-white' : 'text-white/50',
                    '[font-family:Pretendard]',
                  )}
                >
                  {tab}
                </span>
              </button>
            );
          })}
        </div>

        {/* 탭 내용 박스 */}
        <div className="relative z-20 w-[432px] h-[568.407px] rounded-[12px] bg-[#2C251D] px-[36px] mt-0 box-border ">
          <div className="h-full overflow-y-hidden ">
            {activeTab === '별명' && (
              <NicknameTab
                selectedPrefix={nicknamePrefix}
                setSelectedPrefix={setNicknamePrefix}
                selectedSuffix={nicknameSuffix}
                setSelectedSuffix={setNicknameSuffix}
              />
            )}

            {activeTab === '누키' && (
              <NookieTab selected={lampKey} setSelected={setLampKey} />
            )}

            {activeTab === '마이홈' && (
              <MyHomeTab selected={patternKey} setSelected={setPatternKey} />
            )}
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-center mt-[18px]">
          <button
            className="w-[88px] h-[34px] rounded-[8px] bg-[#423C35] text-white text-[14px] font-[300]" //font-300 임시조치
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? '저장' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
