import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';

// data
import { useGetMe } from '../hooks/useQuery/useGetMe';
import { usePatchNickname } from '../hooks/useMutation/usePatchNickname';
import instance from '../../../apis/instance';

// icons
import profileIcon from '../../../assets/button/profile/Subtract.png';   
import helpIcon from '../../../assets/button/profile/Vector.png';
import termsIcon from '../../../assets/button/profile/Vector.png';
import privacyIcon from '../../../assets/button/profile/Vector.png';

const SettingsPage = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: me } = useGetMe();
  const { mutate: patchNickname, isPending: isSavingNickname } = usePatchNickname();

  const [tab, setTab] = useState<'프로필' | '계정'>('프로필');
  const [nickname, setNickname] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (me) setNickname(me.nickname ?? '');
  }, [me]);

  const onSaveNickname = () => {
    const value = nickname.trim();
    if (!value) return;
    patchNickname(
      { nickname: value },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: ['me'] });
        },
      }
    );
  };

  // useLogout 훅 없이 직접 처리
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await instance.post('/api/users/logout');

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      qc.clear();

      // 로그인 페이지로 이동 (필요 시 하드 리로드)
      navigate('/login', { replace: true });
    } catch (e) {
      console.error('logout failed', e);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-full flex justify-center pt-[50px]">
      <div className="w-[1080px] flex gap-[48px]">
        <aside className="w-[192px] flex-shrink-0">
          {/* 탭 버튼 */}
          <div className="flex flex-col gap-[8px]">
            {(['프로필', '계정'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={clsx(
                  'flex w-[192px] h-[38px] px-[10px] items-center gap-[10px] rounded-[6px]',
                  tab === t ? 'bg-[#434343] text-white' : 'bg-[#313131] text-white/80'
                )}
                style={{ fontFamily: 'AppleSDGothicNeoM00', fontSize: 14 }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Links: 도움말/이용약관/개인정보취급방침 */}
          <div className="mt-[24px] flex flex-col gap-[6px]">
            {[
              { icon: helpIcon, label: '도움말' },
              { icon: termsIcon, label: '이용약관' },
              { icon: privacyIcon, label: '개인정보취급방침' },
            ].map((it) => (
              <a
                key={it.label}
                className="flex w-[192px] h-[38px] px-[10px] items-center gap-[6px] rounded-[6px] bg-[#313131] text-white/85 cursor-pointer"
                style={{ fontFamily: 'AppleSDGothicNeoR00', fontSize: 14 }}
              >
                <img
                  src={it.icon}
                  alt={it.label}
                  className="w-[14px] h-[14px] flex-shrink-0"
                />
                {it.label}
              </a>
            ))}
          </div>
        </aside>

        <section className="flex-1">
          {/* ---------- 프로필 탭 ---------- */}
          {tab === '프로필' && (
            <div className="flex flex-col">
              {/* 프로필 아이콘 */}
              <img
                src={profileIcon}
                alt="profile"
                className="w-[80px] h-[80px] flex-shrink-0"
              />

              <p
                className="mt-[30px] text-white"
                style={{
                  fontFamily: 'AppleSDGothicNeoM00',
                  fontSize: 14,
                  lineHeight: 'normal',
                  fontWeight: 400,
                }}
              >
                이름
              </p>

              <div className="mt-[12px] flex h-[40px] items-center justify-between rounded-[6px] bg-[#6E6E6E] px-[12px]">
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={30}
                  placeholder="이름을 입력하세요."
                  className="w-full bg-transparent outline-none text-white placeholder-[#D3D3D3]"
                  style={{
                    fontFamily: 'AppleSDGothicNeoR00',
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 'normal',
                  }}
                />
                <span
                  className="ml-[8px] text-[#D3D3D3]"
                  style={{ fontFamily: 'AppleSDGothicNeoR00', fontSize: 14 }}
                >
                  ({nickname.length}/30)
                </span>
              </div>

              {/* 저장 버튼 */}
              <div className="mt-[20px]">
                <button
                  onClick={onSaveNickname}
                  disabled={isSavingNickname || !nickname.trim()}
                  className="px-[16px] py-[10px] rounded-[6px] bg-[#423C35] text-white disabled:opacity-60"
                  style={{ fontFamily: 'AppleSDGothicNeoM00', fontSize: 14 }}
                >
                  {isSavingNickname ? '저장 중…' : '저장'}
                </button>
              </div>
            </div>
          )}

          {tab === '계정' && (
            <div className="flex flex-col text-white">
              <div>
                <p
                  className="text-white/70"
                  style={{ fontFamily: 'AppleSDGothicNeoR00', fontSize: 14 }}
                >
                  내 계정
                </p>
                <p
                  className="mt-[8px]"
                  style={{ fontFamily: 'AppleSDGothicNeoM00', fontSize: 14 }}
                >
                  {me?.email ?? ''}
                </p>
              </div>

              <div className="mt-[20px] border-t border-white/20" />

              {/* 로그아웃 */}
              <div className="mt-[16px] flex items-center justify-between">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-[#FF6C6C] disabled:opacity-60"
                  style={{ fontFamily: 'AppleSDGothicNeoM00', fontSize: 14 }}
                >
                  {isLoggingOut ? '로그 아웃 중…' : '로그 아웃'}
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="h-[28px] px-[10px] rounded-[4px] bg-[#6B6B6B] text-white/90 disabled:opacity-60"
                  style={{ fontFamily: 'AppleSDGothicNeoM00', fontSize: 12 }}
                >
                  선택해 로그 아웃
                </button>
              </div>

              <div className="mt-[16px] border-t border-white/20" />

              {/* 계정 탈퇴 (API 준비되면 연결 예정) */}
              <div className="mt-[16px] flex items-center justify-between">
                <button
                  className="text-[#FF6C6C]"
                  style={{ fontFamily: 'AppleSDGothicNeoM00', fontSize: 14 }}
                >
                  계정 탈퇴
                </button>
                <button
                  className="h-[28px] px-[10px] rounded-[4px] bg-[#6B6B6B] text-white/90"
                  style={{ fontFamily: 'AppleSDGothicNeoM00', fontSize: 12 }}
                >
                  선택해 계정 탈퇴
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
