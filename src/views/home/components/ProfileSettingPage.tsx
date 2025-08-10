// src/views/home/page/SettingsPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';

// data
import { useGetMe } from '../hooks/useQuery/useGetMe';
import { useUpdateNickname } from '../hooks/useMutation/useUpdateNickname';
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
  const { mutate: patchNickname, isPending: isSavingNickname } = useUpdateNickname();

  const [tab, setTab] = useState<'프로필' | '계정'>('프로필');
  const [nickname, setNickname] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 서버 데이터 → 입력 값 동기화
  useEffect(() => {
    if (me) setNickname(me.nickname ?? '');
  }, [me]);

  // 닉네임 저장
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
      await instance.post('/api/users/logout').catch(() => {}); // 서버 실패해도 클라이언트 정리 진행

      // 토큰/세션 정리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');

      // 캐시 정리
      qc.clear();

      // 이동
      navigate('/login', { replace: true });
    } catch (e) {
      console.error('logout failed', e);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // 계정 탈퇴
  const handleDeleteAccount = async () => {
    console.log(instance.defaults.baseURL)
    const ok = window.confirm(
      '정말 탈퇴하시겠어요?\n탈퇴 후 30일 뒤 계정 정보가 영구 삭제됩니다.',
    );
    if (!ok) return;

    try {
      setIsDeleting(true);
      await instance.delete('/api/users/me');

      // 토큰/세션 정리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');

      // 캐시 정리
      qc.clear();

      // 이동
      navigate('/login', { replace: true });
    } catch (e) {
      console.error('delete account failed', e);
      alert('탈퇴 처리에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full flex justify-center pt-[50px]">
      <div className="w-[1080px] flex gap-[48px]">
        {/* 왼쪽 사이드바 */}
        <aside className="w-[192px] flex-shrink-0">
          {/* 탭 버튼 */}
          <div className="flex flex-col gap-[8px]">
            {(['프로필', '계정'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={clsx(
                  'flex w-[192px] h-[38px] px-[10px] items-center gap-[10px] rounded-[6px]',
                  tab === t ? 'bg-[#434343] text-white' : 'bg-[#313131] text-white/80',
                )}
                style={{ fontFamily: 'AppleSDGothicNeoM00', fontSize: 14 }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* 링크 묶음 */}
          <div className="mt-[24px] flex flex-col gap-[6px]">
            {[
              { icon: helpIcon, label: '도움말', href: 'https://nook-app.help' },
              { icon: termsIcon, label: '이용약관', href: '/terms' },
              { icon: privacyIcon, label: '개인정보취급방침', href: '/privacy' },
            ].map((it) => (
              <a
                key={it.label}
                className="flex w-[192px] h-[38px] px-[10px] items-center gap-[6px] rounded-[6px] bg-[#313131] text-white/85 cursor-pointer"
                style={{ fontFamily: 'AppleSDGothicNeoR00', fontSize: 14 }}
                href={it.href}
                target={it.href.startsWith('http') ? '_blank' : undefined}
                rel={it.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <img src={it.icon} alt={it.label} className="w-[14px] h-[14px] flex-shrink-0" />
                {it.label}
              </a>
            ))}
          </div>
        </aside>

        {/* 오른쪽 콘텐츠 */}
        <section className="flex-1">
          {/* 프로필 탭 */}
          {tab === '프로필' && (
            <div className="flex flex-col">
              {/* 프로필 아이콘 */}
              <img src={profileIcon} alt="profile" className="w-[80px] h-[80px] flex-shrink-0" />

              {/* 라벨 */}
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

              {/* 입력 박스 */}
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

          {/* 계정 탭 */}
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

              {/* 계정 탈퇴 */}
              <div className="mt-[16px] flex items-center justify-between">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="text-[#FF6C6C] disabled:opacity-60"
                  style={{ fontFamily: 'AppleSDGothicNeoM00', fontSize: 14 }}
                >
                  {isDeleting ? '탈퇴 처리 중…' : '계정 탈퇴'}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="h-[28px] px-[10px] rounded-[4px] bg-[#6B6B6B] text-white/90 disabled:opacity-60"
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
