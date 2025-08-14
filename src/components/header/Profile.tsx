// src/components/Profile.tsx
import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';

import { useGetMe } from '../../views/home/hooks/useQuery/useGetMe';
import SignOut from '../../apis/auth/signOut';
import instance from '../../apis/instance';

// 프로필 색상별 아이콘 (Small 사이즈)
import profileBlue from '../../assets/button/profile/profile_Sblue.png';
import profileGreen from '../../assets/button/profile/profile_Sgreen.png';
import profileOrange from '../../assets/button/profile/profile_Sorange.png';
import profileRed from '../../assets/button/profile/profile_Syellow.png';

// 기타 아이콘
import settingImg from '../../assets/header/Vector.svg';
import logoutImg from '../../assets/header/Group.svg';
import questionImg from '../../assets/header/Frame 238038.png';

// ===== types (profiles API) =====
type CharacterColor = 'BLUE' | 'GREEN' | 'ORANGE' | 'RED';
interface ProfileResult {
  alias: string;
  characterColor: CharacterColor;
  backgroundPattern: 'NONE' | string;
}
interface ProfileResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ProfileResult;
}

interface ProfileProps {
  isLogin: boolean;
}

const Profile = ({ isLogin }: ProfileProps) => {
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // me
  const { data: me } = useGetMe(); // { email, nickname }
  const userName = me?.nickname ?? '사용자';
  const userEmail = me?.email ?? '';

  // profiles GET (색상)
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async (): Promise<ProfileResult> => {
      const { data } = await instance.get<ProfileResponse>('/api/profiles');
      return data.result;
    },
    staleTime: 5 * 60 * 1000,
  });

  // 색상 → 아이콘 매핑
  const profileIconByColor = useMemo(() => {
    const map: Record<CharacterColor, string> = {
      BLUE: profileBlue,
      GREEN: profileGreen,
      ORANGE: profileOrange,
      RED: profileRed,
    };
    return map;
  }, []);

  const profileIconSrc = profile ? profileIconByColor[profile.characterColor] : profileBlue;

  // 바깥 클릭 시 닫기
  useEffect(() => {
    if (!isClick) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsClick(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [isClick]);

  const onLogout = async () => {
    try {
      await SignOut(); // 서버 로그아웃
    } catch {
      // 서버 실패해도 클라이언트 토큰 제거는 진행
    } finally {
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      setIsClick(false);
      window.location.href = '/login';
    }
  };

  return (
    <div
      ref={ref}
      className={clsx('relative', {
        invisible: !isLogin,
        visible: isLogin,
      })}
    >
      {/* 프로필 토글 버튼 (상단 우측 아이콘) */}
      <button onClick={() => setIsClick((prev) => !prev)}>
        <img
          src={profileIconSrc}
          alt="프로필 이미지"
          className="w-14 h-14 max-w-[28px] max-h-[28px] object-contain"
        />
      </button>

      {/* 드롭다운: 내용 길이에 맞춰 확대 (최소/최대 폭 제한) */}
      <div
        className={clsx(
          'absolute top-full -right-2 mt-3 z-30',
          'bg-[rgba(31,28,25,1)] rounded-[8px]',
          'flex flex-col items-start gap-3 pt-[17px] pb-[18px] px-[10px]',
          'w-max min-w-[20rem] max-w-[90vw] md:max-w-[36rem]',
          { hidden: !isClick, block: isClick },
        )}
      >
        {/* 상단 사용자 영역 */}
        <button
          className="w-full px-7 flex items-center hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl"
          onClick={() => {
            setIsClick(false);
            navigate('/settings');
          }}
        >
          <div className="flex gap-5 items-center max-w-full">
            {/* 드롭다운 상단 아바타도 색상 아이콘 */}
            <img
              src={profileIconSrc}
              alt="프로필 이미지"
              className="w-14 h-14 max-w-[30px] max-h-[30px] object-contain"
            />
            {/* 이메일 길이 대응: min-w-0 + truncate */}
            <div className="flex flex-col items-start min-w-0">
              <p className="text-sm font-normal text-nook-100">{userName}</p>
              <p
                className="text-xs font-normal text-nook-100 whitespace-nowrap truncate max-w-[32rem]"
                title={userEmail}
              >
                {userEmail}
              </p>
            </div>
          </div>
        </button>

        {/* 구분선 */}
        <p className="self-center w-[85%] border-b-1 border-[rgba(211,211,211,0.6)]" />

        {/* 메뉴 */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <button
            className="flex justify-start w-full h-15 px-7 items-center gap-4 hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl"
            onClick={() => {
              setIsClick(false);
              navigate('/settings');
            }}
          >
            <img
              src={settingImg}
              alt="설정"
              className="w-6 h-6 max-w-[12px] max-h-[12px] object-contain"
            />
            <p className="text-sm font-normal text-nook-100">설정</p>
          </button>

          <a
            className="flex justify-start w-full h-15 px-7 items-center gap-4 hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl"
            href="https://nook-app.help"
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsClick(false)}
          >
            <img
              src={questionImg}
              alt="도움말"
              className="w-6 h-6 max-w-[12px] max-h-[12px] object-contain"
            />
            <p className="text-sm font-normal text-nook-100">도움말</p>
          </a>
        </div>

        {/* 구분선 */}
        <p className="self-center w-[85%] border-b-1 border-[rgba(211,211,211,0.6)]" />

        {/* 로그아웃 */}
        <button
          className="w-full h-15 px-7 mt-3 flex items-center hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl"
          onClick={onLogout}
        >
          <div className="flex justify-center items-center gap-4 min-w-0">
            <img
              src={logoutImg}
              alt="로그아웃"
              className="w-6 h-6 max-w-[12px] max-h-[18px] object-contain"
            />
            <p className="text-sm font-normal text-nook-100">로그아웃</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Profile;
