// src/views/home/page/SettingsPage.tsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// data
import { useGetMe } from '../hooks/useQuery/useGetMe';
import { useUpdateNickname } from '../hooks/useMutation/useUpdateNickname';
import instance from '../../../apis/instance';

// assets (색상별 프로필 이미지 경로에 맞춰 교체)
import profileBlue from '../../../assets/button/profile/profile_Lblue.png';
import profileGreen from '../../../assets/button/profile/profile_Lgreen.png';
import profileOrange from '../../../assets/button/profile/profile_Lorange.png';
import profileRed from '../../../assets/button/profile/profile_Lyellow.png';
// 박스 이미지
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
  const { mutate: patchNickname, isPending: isSavingNickname } = useUpdateNickname();

  const [tab, setTab] = useState<'프로필' | '계정'>('프로필');
  const [nickname, setNickname] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 버튼 hover/press 상태
  const [hoverLogout, setHoverLogout] = useState(false);
  const [hoverDelete, setHoverDelete] = useState(false);
  const [pressLogout, setPressLogout] = useState(false);
  const [pressDelete, setPressDelete] = useState(false);

  // ===== profiles GET =====
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async (): Promise<ProfileResult> => {
      const { data } = await instance.get<ProfileResponse>('/api/profiles');
      return data.result;
    },
    staleTime: 5 * 60 * 1000,
  });

  // 서버 데이터 → 입력 값 동기화
  useEffect(() => {
    if (me) setNickname(me.nickname ?? '');
  }, [me]);

  // 닉네임 저장 (Enter로 저장)
  const onSaveNickname = () => {
    const value = nickname.trim();
    if (!value) return;
    patchNickname(
      { nickname: value },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ['me'] });
        },
      },
    );
  };

  // 로그아웃
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

  // 계정 탈퇴
  const handleDeleteAccount = async () => {
    const ok = window.confirm(
      '정말 탈퇴하시겠어요?\n탈퇴 후 30일 뒤 계정 정보가 영구 삭제됩니다.',
    );
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

  const profileIconSrc = profile ? profileIconByColor[profile.characterColor] : profileBlue;

  // 버튼 스타일: 기본(미호버/미클릭) ↔ hover ↔ 클릭
  const actionBtnStyle = (hover: boolean, pressed: boolean): React.CSSProperties => {
    const text: React.CSSProperties = {
      color: '#FFF',
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
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'background-color 120ms ease, border-color 120ms ease',
      ...text,
    };

    if (pressed) {
      // 클릭된 상태
      return { ...base, background: '#423C35', border: 'none' };
    }
    if (hover) {
      // hover 상태
      return { ...base, background: '#423C35', border: '1px solid #423C35' };
    }
    // 기본
    return {
      ...base,
      background: 'linear-gradient(180deg, #000 0%, #231709 100%)',
      border: '1px solid #423C35',
    };
  };

  return (
    <div className="w-full flex justify-center pt-[50px]">
      <div className="w-[1080px] flex gap-[48px]">
        {/* ===== 왼쪽 박스: 이미지로 대체 ===== */}
        <aside
          className="w-[229px] h-[280px] flex-shrink-0 rounded-[15px] overflow-hidden"
          style={{
            backgroundImage: `url(${boxImage})`,
            backgroundSize: '100% 100%', // 박스크기와 동일하게 맞춤
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            paddingLeft: 33,
            paddingBottom: 33,
          }}
        >
          <nav className="flex flex-col">
            <button onClick={() => setTab('프로필')} className="text-left" style={{ marginTop: 32 }}>
              <span
                className={clsx(
                  'relative inline-block',
                  tab === '프로필' ? 'text-white' : 'text-white/50',
                )}
                style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 400, lineHeight: 'normal' }}
              >
                프로필
                <i
                  className={clsx(
                    'absolute left-0 -bottom-[2px] h-px bg-white',
                    tab === '프로필' ? 'w-full opacity-100' : 'w-0 opacity-0',
                  )}
                />
              </span>
            </button>

            <button onClick={() => setTab('계정')} className="text-left" style={{ marginTop: 30 }}>
              <span
                className={clsx(
                  'relative inline-block',
                  tab === '계정' ? 'text-white' : 'text-white/50',
                )}
                style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 400, lineHeight: 'normal' }}
              >
                계정
                <i
                  className={clsx(
                    'absolute left-0 -bottom-[2px] h-px bg-white',
                    tab === '계정' ? 'w-full opacity-100' : 'w-0 opacity-0',
                  )}
                />
              </span>
            </button>

            <a
              href="https://nook-app.help"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left"
              style={{ marginTop: 30 }}
            >
              <span
                className="inline-block text-white/50"
                style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 400, lineHeight: 'normal' }}
              >
                도움말
              </span>
            </a>

            <a href="/terms" className="text-left" style={{ marginTop: 30 }}>
              <span
                className="inline-block text-white/50"
                style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 400, lineHeight: 'normal' }}
              >
                이용약관
              </span>
            </a>

            <a href="/privacy" className="text-left" style={{ marginTop: 30, marginBottom: 33 }}>
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
        <section className="flex-1">
          {tab === '프로필' && (
            <div className="flex flex-col">
              {/* 색상별 프로필 아이콘 */}
              <img src={profileIconSrc} alt="profile" className="w-[80px] h-[80px] flex-shrink-0" />

              {/* 라벨 */}
              <p className="mt-[32px] text-white" style={{ fontFamily: 'Inter', fontSize: 16 }}>
                이름
              </p>

              {/* 입력 박스 (Enter로 저장) */}
              <div
                className="mt-[12px] flex h-[40px] items-center justify-between rounded-[4px] px-[12px]"
                style={{ background: 'rgba(66, 60, 53, 0.30)' }}
              >
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onSaveNickname();
                  }}
                  maxLength={30}
                  placeholder="이름을 입력하세요."
                  className="w-full bg-transparent outline-none text-white placeholder-white/50"
                  style={{
                    fontFamily: 'Pretendard',
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: '22px',
                  }}
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
            <div className="flex flex-col text-white">
              <div>
                <p className="text-white/70" style={{ fontFamily: 'Inter', fontSize: 16 }}>
                  내 계정
                </p>
                <p className="mt-[13px]" style={{ fontFamily: 'Inter', fontSize: 16 }}>
                  {me?.email ?? ''}
                </p>
              </div>

              {/* ───────── 구분선 1 (위/아래 24px) ───────── */}
              <div className="border-t border-white/20 my-[24px]" />

              {/* 로그아웃 행 (텍스트 중앙 맞춤) */}
              <div className="flex items-center justify-between min-h-[28px]">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-[#F1494B] disabled:opacity-60"
                  style={{ fontFamily: 'Inter', fontSize: 16, lineHeight: '24px' }}
                >
                  {isLoggingOut ? '로그 아웃 중…' : '로그 아웃'}
                </button>

                {/* 작은 버튼: hover 시 #423C35, 클릭 시 #423C35(border 없음) */}
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

              {/* ───────── 구분선 2 (위/아래 24px) ───────── */}
              <div className="border-t border-white/20 my-[24px]" />

              {/* 계정 탈퇴 행 (텍스트 중앙 맞춤) */}
              <div className="flex items-center justify-between min-h-[28px]">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="text-[#F1494B] disabled:opacity-60"
                  style={{ fontFamily: 'Inter', fontSize: 16, lineHeight: '24px' }}
                >
                  {isDeleting ? '탈퇴 처리 중…' : '계정 탈퇴'}
                </button>

                {/* 작은 버튼: hover 시 #423C35, 클릭 시 #423C35(border 없음) */}
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

              {/* ───────── 마지막 구분선 (필요 시 유지) ───────── */}
              <div className="border-t border-white/20 my-[24px]" />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
