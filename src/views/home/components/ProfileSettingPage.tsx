// src/views/home/page/SettingsPage.tsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// data
import { useGetMe } from '../hooks/useQuery/useGetMe';
import { useUpdateNickname } from '../hooks/useMutation/useUpdateNickname';
import instance from '../../../apis/instance';

// assets
import profileBlue from '../../../assets/button/profile/profile_Lblue.png';
import profileGreen from '../../../assets/button/profile/profile_Lgreen.png';
import profileOrange from '../../../assets/button/profile/profile_Lorange.png';
import profileRed from '../../../assets/button/profile/profile_Lyellow.png';
import boxImage from '../../../assets/button/profile/component.png';

// ===== types =====
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

const SettingsPage = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: me } = useGetMe();
  const { mutate: patchNickname } = useUpdateNickname();

  const [tab, setTab] = useState<'프로필' | '계정'>('프로필');
  const [nickname, setNickname] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 버튼 hover/press 상태
  const [hoverLogout, setHoverLogout] = useState(false);
  const [hoverDelete, setHoverDelete] = useState(false);
  const [pressLogout, setPressLogout] = useState(false);
  const [pressDelete, setPressDelete] = useState(false);

  // 네비게이션 항목들의 호버 상태
  const [hoverProfile, setHoverProfile] = useState(false);
  const [hoverAccount, setHoverAccount] = useState(false);
  const [hoverHelp, setHoverHelp] = useState(false);
  const [hoverTerms, setHoverTerms] = useState(false);
  const [hoverPrivacy, setHoverPrivacy] = useState(false);

  // ===== profiles GET =====
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async (): Promise<ProfileResult> => {
      const { data } = await instance.get<ProfileResponse>('/api/profiles');
      return data.result;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (me) setNickname(me.nickname ?? '');
  }, [me]);

  const onSaveNickname = () => {
    const value = nickname.trim();
    if (!value) return;
    patchNickname(
      { nickname: value },
      { onSuccess: () => qc.invalidateQueries({ queryKey: ['me'] }) },
    );
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await instance.post('/api/users/logout').catch(() => {});
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      qc.clear();
      navigate('/login', { replace: true });
    } catch (e) {
      console.error('logout failed', e);
    } finally {
      setIsLoggingOut(false);
      setPressLogout(false);
    }
  };

  const handleDeleteAccount = async () => {
    const ok = window.confirm('정말 탈퇴하시겠어요?\n탈퇴 후 30일 뒤 계정 정보가 영구 삭제됩니다.');
    if (!ok) return;

    try {
      setIsDeleting(true);
      await instance.delete('/api/users/me');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      qc.clear();
      navigate('/login', { replace: true });
    } catch (e) {
      console.error('delete account failed', e);
      alert('탈퇴 처리에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsDeleting(false);
      setPressDelete(false);
    }
  };

  // 색상별 아이콘 매핑
  const profileIconByColor = useMemo(() => {
    const map: Record<CharacterColor, string> = {
      BLUE: profileBlue,
      GREEN: profileGreen,
      ORANGE: profileOrange,
      RED: profileRed,
    };
    return map;
  }, []);

  const profileIconSrc = profile ? profileIconByColor[profile.characterColor] : profileOrange;

  // L 사이즈 프로필 이미지 고정 클래스 (127×99)
  const AVATAR_L = 'w-[127px] h-[99px] shrink-0 object-contain';

  // 액션 버튼 스타일 (요구 사양 반영)
  // - 박스: inline-flex / padding: 4px 20px / border-radius: 4px / border: 1px solid #423C35
  // - 텍스트: color #423C35, Pretendard 14px, 600, line-height 22px
  const actionBtnStyle = (hover: boolean, pressed: boolean): React.CSSProperties => {
    const text: React.CSSProperties = {
      color: '#423C35',
      textAlign: 'center' as const,
      fontFamily: 'Pretendard',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '22px',
    };

    const base: React.CSSProperties = {
      display: 'inline-flex',
      padding: '4px 20px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      borderRadius: 4,
      border: '1px solid #423C35',
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'background-color 120ms ease, border-color 120ms ease',
      background: 'transparent',
      ...text,
    };

    if (pressed) return { ...base, background: 'rgba(66, 60, 53, 0.25)' };
    if (hover) return { ...base, background: '#423C35' };
    return base;
  };

  // 네비게이션 호버 박스 스타일
  const navItemHoverStyle = (isHover: boolean, isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    width: 184,
    padding: '10px',
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
    background: isHover ? 'rgba(66, 60, 53, 0.40)' : 'transparent',
    cursor: 'pointer',
    transition: 'background-color 200ms ease',
    marginBottom: 10,
  });

  return (
    <div className="w-full flex justify-center pt-[50px]">
      {/* 부모에 상대 위치 주면 z-index 제어가 안정적 */}
      <div className="w-[1080px] flex gap-[48px] relative">
        {/* ===== 왼쪽 박스 ===== */}
        <aside
          className="w-[229px] h-[280px] flex-shrink-0 rounded-[15px] overflow-hidden relative z-30"
          style={{
            backgroundImage: `url(${boxImage})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            paddingTop: 12,
            paddingBottom: 23,
            paddingLeft: 23,
            paddingRight: 22,
          }}
        >
          <nav className="flex flex-col" style={{ marginTop: 10 }}>
            {/* 프로필 탭 */}
            <div
              style={navItemHoverStyle(hoverProfile, tab === '프로필')}
              onMouseEnter={() => setHoverProfile(true)}
              onMouseLeave={() => setHoverProfile(false)}
              onClick={() => setTab('프로필')}
            >
              <span
                className={clsx('relative inline-block', tab === '프로필' ? 'text-white' : 'text-white/50')}
                style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 400, lineHeight: 'normal' }}
              >
                프로필
                <i
                  className={clsx(
                    'absolute left-0 -bottom-[4px] h-px bg-white',
                    tab === '프로필' ? 'w-full opacity-100' : 'w-0 opacity-0',
                  )}
                />
              </span>
            </div>

            {/* 계정 탭 */}
            <div
              style={navItemHoverStyle(hoverAccount, tab === '계정')}
              onMouseEnter={() => setHoverAccount(true)}
              onMouseLeave={() => setHoverAccount(false)}
              onClick={() => setTab('계정')}
            >
              <span
                className={clsx('relative inline-block', tab === '계정' ? 'text-white' : 'text-white/50')}
                style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 400, lineHeight: 'normal' }}
              >
                계정
                <i
                  className={clsx(
                    'absolute left-0 -bottom-[4px] h-px bg-white',
                    tab === '계정' ? 'w-full opacity-100' : 'w-0 opacity-0',
                  )}
                />
              </span>
            </div>

            {/* 도움말 링크 */}
            <a
              href="https://nook-app.help"
              target="_blank"
              rel="noopener noreferrer"
              style={navItemHoverStyle(hoverHelp, false)}
              onMouseEnter={() => setHoverHelp(true)}
              onMouseLeave={() => setHoverHelp(false)}
            >
              <span
                className="inline-block text-white/50"
                style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 400, lineHeight: 'normal' }}
              >
                도움말
              </span>
            </a>

            {/* 이용약관 링크 */}
            <a
              href="/terms"
              style={navItemHoverStyle(hoverTerms, false)}
              onMouseEnter={() => setHoverTerms(true)}
              onMouseLeave={() => setHoverTerms(false)}
            >
              <span
                className="inline-block text-white/50"
                style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 400, lineHeight: 'normal' }}
              >
                이용약관
              </span>
            </a>

            {/* 개인정보취급방침 링크 */}
            <a
              href="/privacy"
              style={navItemHoverStyle(hoverPrivacy, false)}
              onMouseEnter={() => setHoverPrivacy(true)}
              onMouseLeave={() => setHoverPrivacy(false)}
            >
              <span
                className="inline-block text-white/50"
                style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 400, lineHeight: 'normal' }}
              >
                개인정보취급방침
              </span>
            </a>
          </nav>
        </aside>

        {/* ===== 오른쪽 콘텐츠 ===== */}
        <section className="flex-1 relative z-10">
          {tab === '프로필' && (
            <div className="flex flex-col">
              <img
                src={profileIconSrc}
                alt="profile"
                width={127}
                height={99}
                className={`${AVATAR_L} relative z-10`}
                style={{ marginLeft: -28 }}
              />

              {/* 이름 라벨 */}
              <div
                style={{
                  marginTop: 32,
                  display: 'flex',
                  width: 48,
                  height: 25,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#FFF',
                  fontFamily: 'Pretendard',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '22px',
                }}
              >
                이름
              </div>

              {/* 입력 박스: 591×47 */}
              <div
                className="mt-[12px] flex items-center justify-between px-[12px] rounded-[4px] shrink-0"
                style={{ width: 591, height: 47, background: 'rgba(66, 60, 53, 0.30)' }}
              >
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') onSaveNickname(); }}
                  maxLength={30}
                  placeholder="이름을 입력하세요."
                  className="w-full bg-transparent outline-none text-white placeholder-white/50"
                  style={{ fontFamily: 'Pretendard', fontSize: 16, fontWeight: 400, lineHeight: '22px' }}
                />
                <span
                  className="ml-[8px] text-white/50"
                  style={{ fontFamily: 'Pretendard', fontSize: 16, fontWeight: 400, lineHeight: '22px' }}
                >
                  ({nickname.length}/30)
                </span>
              </div>
            </div>
          )}

          {tab === '계정' && (
            <div className="w-[491px] text-white">
              {/* '이메일' 라벨을 '내 계정'으로 변경 + 스타일 적용 */}
              <div
                style={{
                  width: 51.555,
                  color: 'rgba(255, 255, 255, 0.50)',
                  fontFamily: 'Pretendard',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                }}
              >
                내 계정
              </div>

              <p className="mt-[13px]" style={{ fontFamily: 'Inter', fontSize: 16 }}>
                {me?.email ?? ''}
              </p>

              <div className="border-t border-white/20 my-[24px]" />

              <div className="flex items-center justify-between min-h-[28px]">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-[#F1494B] disabled:opacity-60"
                  style={{ fontFamily: 'Inter', fontSize: 16, lineHeight: '24px' }}
                >
                  {isLoggingOut ? '로그 아웃 중…' : '로그 아웃'}
                </button>
                <button
                  onMouseEnter={() => setHoverLogout(true)}
                  onMouseLeave={() => {
                    setHoverLogout(false);
                    setPressLogout(false);
                  }}
                  onMouseDown={() => setPressLogout(true)}
                  onMouseUp={() => setPressLogout(false)}
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  style={actionBtnStyle(hoverLogout && !isLoggingOut, pressLogout && !isLoggingOut)}
                >
                  로그 아웃
                </button>
              </div>

              <div className="border-t border-white/20 my-[24px]" />

              <div className="flex items-center justify-between min-h-[28px]">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="text-[#F1494B] disabled:opacity-60"
                  style={{ fontFamily: 'Inter', fontSize: 16, lineHeight: '24px' }}
                >
                  {isDeleting ? '탈퇴 처리 중…' : '계정 탈퇴'}
                </button>
                <button
                  onMouseEnter={() => setHoverDelete(true)}
                  onMouseLeave={() => {
                    setHoverDelete(false);
                    setPressDelete(false);
                  }}
                  onMouseDown={() => setPressDelete(true)}
                  onMouseUp={() => setPressDelete(false)}
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  style={actionBtnStyle(hoverDelete && !isDeleting, pressDelete && !isDeleting)}
                >
                  계정 탈퇴
                </button>
              </div>

              <div className="border-t border-white/20 my-[24px]" />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;