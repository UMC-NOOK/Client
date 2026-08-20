import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import closeIcon from "../../assets/icons/close.svg";
import Solid from "../../components/action/Button/Solid";
import Theme from "../../components/atomic/Theme";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import Dim from "../../components/layout/Dim";
import MaskGradient from "../../components/layout/MaskGradient";
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import { mockFocusThemeSelectOptions } from "../../mocks/focus/focus";

const RECENT_FOCUS_THEME_ID_KEY = "recentFocusThemeId";

function readStoredThemeId(): number | null {
  const raw = localStorage.getItem(RECENT_FOCUS_THEME_ID_KEY);
  if (raw === null) return null;
  const parsed = Number(raw);
  return Number.isNaN(parsed) ? null : parsed;
}

export default function FocusThemePage() {
  const navigate = useNavigate();

  // 최근 선택한 테마를 로컬(localStorage)에서 읽어와 기본 선택한다. 서버에는 저장하지 않는다.
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(
    readStoredThemeId,
  );
  const [imageError, setImageError] = useState(false);

  const selectTheme = useCallback((themeId: number | null) => {
    setSelectedThemeId(themeId);
    setImageError(false);
  }, []);

  const selectedOption = useMemo(
    () =>
      mockFocusThemeSelectOptions.find(
        (option) => option.themeId === selectedThemeId,
      ),
    [selectedThemeId],
  );

  const handleStart = useCallback(() => {
    if (selectedThemeId === null) {
      localStorage.removeItem(RECENT_FOCUS_THEME_ID_KEY);
    } else {
      localStorage.setItem(RECENT_FOCUS_THEME_ID_KEY, String(selectedThemeId));
    }
    // TODO: POST /api/v1/focuses/start 연동. 선택한 책(libraryId)이 아직 이 화면까지 전달되지 않아 이동만 처리.
    navigate("/focus/session");
  }, [navigate, selectedThemeId]);

  return (
    // 부모(AppShell Outlet)가 display:block이라 h-full(퍼센트 높이)이 안 먹어서 같은 높이를 직접 계산한다.
    <div className="relative -mx-4 flex min-h-[calc(100dvh-8px-env(safe-area-inset-top)-env(safe-area-inset-bottom))] flex-col justify-between">
      {/* TODO: 디자인팀 미확정 임시 처리(텍스트 대체) — 정식 에러 화면 스펙 나오면 교체 */}
      {selectedOption && imageError && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="text-body-14-r text-gray-50">이미지를 불러오지 못했습니다</p>
        </div>
      )}

      {selectedOption && !imageError && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <img
            src={selectedOption.backgroundUrl}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
          <Dim width="full" height="full" top={0} left={0} />
          {/* MaskGradient의 width/height prop은 동적으로 조립돼 Tailwind가 못 읽는다. 실제 높이는 이 래퍼의 h-20이 담당. */}
          <div className="absolute inset-x-0 top-0 h-20 rotate-180">
            <MaskGradient width="full" height="full" />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-20">
            <MaskGradient width="full" height="full" />
          </div>
        </div>
      )}

      <div className="relative flex flex-col gap-10">
        {/* 이 레벨은 이미 페이지 루트에서 -mx-4로 꽉 찬 상태라, 배경색은 그대로 두고
            아이콘만 px-4로 들여쓴다 */}
        <div className="relative bg-navy-1">
          <TopNavigation
            className="px-4"
            left={<img src={closeIcon} alt="닫기" className="h-6 w-6" />}
            onClickLeft={() => navigate(-1)}
          />
        </div>
        <div className="px-4">
          <SectionHeader size="20" top="포커스 테마를 선택해주세요." />
        </div>
      </div>

      <div className="relative flex flex-col items-center gap-5">
        {selectedThemeId !== null && (
          <Solid
            text="테마 해제하기"
            variant="secondary"
            size="s"
            fullWidth={false}
            onClick={() => selectTheme(null)}
          />
        )}

        <div className="flex w-full items-center justify-center gap-4 px-12">
          {mockFocusThemeSelectOptions.map((option) => (
            <Theme
              key={option.themeId}
              imageUrl={option.thumbnailUrl}
              select={option.themeId === selectedThemeId}
              onClick={() => selectTheme(option.themeId)}
            />
          ))}
        </div>

        <div className="w-full rounded-t-2xl bg-gray-15 px-4 pt-4 pb-8">
          <Solid
            text="포커스 시작하기"
            variant="primary"
            onClick={handleStart}
          />
        </div>
      </div>
    </div>
  );
}
