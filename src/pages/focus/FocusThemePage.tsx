import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import closeIcon from "../../assets/icons/close.svg";
import Solid from "../../components/action/Button/Solid";
import Theme from "../../components/atomic/Theme";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
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
    // h-full은 부모(AppShell Outlet)가 block이라 안 먹는다. 스크롤 없이 잘리는 게 정책이라
    // min-height가 아닌 고정 높이 + overflow-hidden.
    <div className="relative -mx-4 h-[calc(100dvh-8px-env(safe-area-inset-top)-env(safe-area-inset-bottom))] overflow-hidden">
      <div className="relative bg-navy-1">
        <TopNavigation
          className="px-4"
          left={<img src={closeIcon} alt="닫기" className="h-6 w-6" />}
          onClickLeft={() => navigate(-1)}
        />
      </div>

      {/* aspect-ratio로 Figma 원본 비율(375:684) 유지 — 폭이 줄어도 비율 그대로 축소 */}
      <div className="relative w-full aspect-375/684 overflow-hidden">
        {selectedOption && !imageError && (
          <div aria-hidden>
            <img
              src={selectedOption.backgroundUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
            {/* MaskGradient는 width/height prop을 동적 조립해 Tailwind가 못 읽는다(design-system-in-code.md) — 높이는 이 래퍼가 담당 */}
            <div className="absolute inset-x-0 top-0 h-33 rotate-180">
              <MaskGradient width="full" height="full" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-33">
              <MaskGradient width="full" height="full" />
            </div>
          </div>
        )}

        {selectedOption && imageError && (
          // TODO: 디자인팀 미확정 임시 처리(텍스트 대체) — 정식 에러 화면 스펙 나오면 교체
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
            <p className="text-body-14-r text-gray-50">이미지를 불러오지 못했습니다</p>
          </div>
        )}

        <div className="absolute inset-x-0 top-10 px-4">
          <SectionHeader size="20" top="포커스 테마를 선택해주세요." />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5">
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
