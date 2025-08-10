import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/header/Subtract.svg';
import settingImg from '../../assets/header/Vector.svg';
import logoutImg from '../../assets/header/Group.svg';
import questionImg from '../../assets/header/Frame 238038.png';
import clsx from 'clsx';

import { useGetMe } from '../../views/home/hooks/useQuery/useGetMe';
import SignOut from '../../apis/auth/signOut';

interface ProfileProps {
  isLogin: boolean;
}

const Profile = ({ isLogin }: ProfileProps) => {
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 서버 데이터
  const { data: me } = useGetMe(); // { email, nickname }

  const userName = me?.nickname ?? '사용자';
  const userEmail = me?.email ?? '';

  // 바깥 클릭 시 닫기 (선택)
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
      <button onClick={() => setIsClick((prev) => !prev)}>
        <img
          src={profileImg}
          alt="프로필 이미지"
          className="w-14 h-14 max-w-[28px] max-h-[28px] object-contain"
        />
      </button>

      <div
        className={clsx(
          'w-[20.6rem] h-[21.1rem] bg-[rgba(31,28,25,1)] rounded-[8px] absolute top-full -right-2 mt-3 z-10 flex flex-col justify-center items-start pt-6 pb-10 gap-3',
          { hidden: !isClick, block: isClick },
        )}
      >
        {/* 상단 사용자 영역 */}
        <button
          className="w-93 h-26 px-7 flex items-center hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl"
          onClick={() => {
            setIsClick(false);
            navigate('/settings');
          }}
        >
          <div className="flex gap-5 relative items-center">
            <img
              src={profileImg}
              alt="프로필 이미지"
              className="w-14 h-14 max-w-[30px] max-h-[30px] object-contain"
            />
            <div className="flex flex-col items-start">
              <p className="text-sm font-normal text-nook-100">{userName}</p>
              <p className="text-xs font-normal text-nook-100">{userEmail}</p>
            </div>
          </div>
        </button>

        <p className="w-[85%] mx-auto border-b-1 border-[rgba(211,211,211,0.6)]" />

        {/* 메뉴 */}
        <div className="flex flex-col items-start gap-1.5">
          <button
            className="flex justify-start w-93 h-15 px-7 items-center gap-4 hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl"
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
            className="flex justify-start w-93 h-15 px-7 items-center gap-4 hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl"
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

        <p className="w-[85%] mx-auto border-b-1 border-[rgba(211,211,211,0.6)]" />

        <button
          className="w-93 h-15 px-7 mt-3 flex items-center hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl"
          onClick={onLogout}
        >
          <div className="flex justify-center items-center gap-4">
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
