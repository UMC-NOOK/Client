import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

import { useGetHomeGoals } from '../hooks/useQuery/useGetHomeGoals';
import { usePatchHomeGoals } from '../hooks/useMutation/usePatchHomeGoals';
import { useGetProfile } from '../hooks/useQuery/useGetProfile';
import { useGetMe } from '../hooks/useQuery/useGetMe';

// ---- enum → 로컬 키 매핑 ----
type LampKey = 'base' | 'orange' | 'green' | 'blue';
type PatternKey = 'default' | 'stripe' | 'stars' | 'drop' | 'check' | 'argyle';
type CharacterColor = 'BLUE' | 'RED' | 'ORANGE' | 'GREEN';
type BackgroundPattern = 'NONE' | 'STRIPE' | 'ARGYLE' | 'DOT' | 'PLAID' | 'STAR';

const enumToLampKey: Record<CharacterColor, LampKey> = {
  BLUE: 'blue',
  GREEN: 'green',
  ORANGE: 'orange',
  RED: 'base', // 서버 RED지만 base(yellow)랑 연결 (디자인 수정)
};
const enumToPatternKey: Record<BackgroundPattern, PatternKey> = {
  NONE: 'default',
  STRIPE: 'stripe',
  ARGYLE: 'argyle',
  DOT: 'drop',
  PLAID: 'check',
  STAR: 'stars',
};

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

const MiddleNookie = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: goals } = useGetHomeGoals();
  const { mutate: saveGoal } = usePatchHomeGoals();
  const { data: profile, isLoading: profileLoading } = useGetProfile(); // { alias, characterColor, backgroundPattern }
  const { data: me } = useGetMe();           // { nickname, email }

  const goalBooks = goals?.goal ?? 50;
  const currentBooks = goals?.bookCount ?? 0;
  const remainingDays = 193;
  const progressPercent = Math.min(100, (currentBooks / Math.max(1, goalBooks)) * 100);

  const lampKey: LampKey = profile?.characterColor
    ? enumToLampKey[profile.characterColor]
    : 'orange';

  const patternKey: PatternKey = profile?.backgroundPattern
    ? enumToPatternKey[profile.backgroundPattern]
    : 'default';

  const handleSaveGoal = (newGoal: number) => {
    saveGoal({ goal: newGoal });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative w-[528px] h-[648px] rounded-[12px] bg-[#423C35]/10 flex flex-col items-center justify-end overflow-hidden">
        {/* 배경 */}
        <img
          src={wallpaperImages[patternKey]}
          alt="wallpaper"
          className="absolute inset-0 w-full h-full object-cover z-0 rounded-[12px]"
        />

        {/* 베이스 */}
        <img
          src={baseNookie}
          alt="base"
          className="absolute inset-0 w-full h-full object-contain z-10"
        />

        {/* 전등 */}
        <img
          src={lampImages[lampKey]}
          alt="lamp"
          className="absolute z-20 top-[-115px] left-[300px] w-[140px] h-full object-contain"
        />

        {/* 별명(alias) */}
        <p
          className="absolute top-[124px] left-[369px] transform -translate-x-1/2 text-white text-[13.135px] font-[400] text-center z-20"
          style={{ fontFamily: 'Pretendard' }}
        >
          {profileLoading ? '' : (profile?.alias || '')}
        </p>

        {/* 디자인 아이콘 */}
        <button
          className="absolute top-[26px] right-[23px] w-[28px] h-[28px] flex items-center justify-center z-10" //z-index 수정
          onClick={() => navigate('/home/DesignPage')}
        >
          <img src={designIcon} alt="lamp" className="w-[28px] h-[28px]" />
        </button>

        {/* 하단 카드 */}
        <div className="w-[477px] h-[137px] rounded-[12px] bg-[#423C35]/20 backdrop-blur-[10px] flex flex-row items-center px-[25px] py-[25px] gap-[24px] mb-[14px] relative z-30">
          {/* 목표 수정 */}
          <button
            className="absolute right-[25px] top-[25px] w-[28px] h-[28px] bg-[#423C35]/50 rounded-[4px] flex items-center justify-center"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={penIcon} alt="edit" className="w-[16px] h-[16px]" />
          </button>

          {/* 회원가입 이름 */}
          <div className="flex flex-col items-center">
            <img src={profileIcon} alt="profile" className="w-[53px] h-[53px]" />
            <p className="mt-[10px] text-white text-[14px] font-[600]">
              {me?.nickname ?? '사용자'}
            </p>
          </div>

          {/* 목표 정보 */}
          <div className="flex flex-col justify-center">
            <p className="text-white/50 text-[12px] font-[400]">
              D-{remainingDays} | 올해 독서 목표 {goalBooks}권
            </p>

            <div className="h-[11px]" />

            <p className="text-white text-[18px] font-[600]">
              목표까지 {Math.max(0, goalBooks - currentBooks)}권 남았어요!
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
