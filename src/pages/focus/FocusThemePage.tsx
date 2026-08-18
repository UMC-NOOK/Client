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

  // open-questions.md 31번(2026-08-10 오경민 PM 확인, Figma 코멘트): 진입 시 최근 선택 테마를 이어받는다.
  // 30번: 저장 위치는 로컬(localStorage) — 백엔드 API 미구현, 기기 간 연동 불필요(이지원 확인).
  // 미선택 상태는 null이며 별도 타일이 아니다(2026-08-18 디자이너 확인 — "선택하지 않을 시
  // 미선택 테마로 아무 배경없이 포커스를 시작").
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(
    readStoredThemeId,
  );

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
    // TODO(담당자): POST /api/v1/focuses/start 연동. 선택한 책(libraryId)이 포커스 메인/도서
    // 선택 화면에서 아직 이 화면으로 전달되지 않아, 현재는 화면 이동만 처리한다.
    navigate("/focus/session");
  }, [navigate, selectedThemeId]);

  return (
    // AppShell의 Outlet 래퍼는 flex-1로 높이를 갖지만 display:block이라
    // 퍼센트 높이(h-full)가 자식까지 내려오지 않는다. AppShell을 공용으로 건드리지
    // 않기 위해, 같은 계산식을 여기서 직접 재현해 min-height로 확보한다
    // (safe-area 상단 pt-[8px] + safe-area 하단, footer는 이 라우트에서 숨김).
    <div className="relative -mx-4 flex min-h-[calc(100dvh-8px-env(safe-area-inset-top)-env(safe-area-inset-bottom))] flex-col justify-between">
      {selectedOption && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <img
            src={selectedOption.backgroundUrl}
            alt=""
            className="h-full w-full object-cover"
          />
          <Dim width="full" height="full" top={0} left={0} />
          {/* MaskGradient도 Dim과 같은 이유로 width/height엔 "full"만 쓰고, 실제 80px
              높이는 안전한 리터럴 클래스(h-20)를 가진 래퍼가 담당한다. */}
          <div className="absolute inset-x-0 top-0 h-20 rotate-180">
            <MaskGradient width="full" height="full" />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-20">
            <MaskGradient width="full" height="full" />
          </div>
        </div>
      )}

      <div className="relative flex flex-col gap-10 px-4">
        <TopNavigation
          left={<img src={closeIcon} alt="닫기" className="h-6 w-6" />}
          onClickLeft={() => navigate(-1)}
        />
        <SectionHeader size="20" top="포커스 테마를 선택해주세요." />
      </div>

      <div className="relative flex flex-col items-center gap-5">
        {selectedThemeId !== null && (
          <Solid
            text="테마 해제하기"
            variant="secondary"
            size="s"
            fullWidth={false}
            onClick={() => setSelectedThemeId(null)}
          />
        )}

        <div className="flex w-full items-center justify-center gap-4 px-12">
          {mockFocusThemeSelectOptions.map((option) => (
            <Theme
              key={option.themeId}
              imageUrl={option.thumbnailUrl}
              select={option.themeId === selectedThemeId}
              onClick={() => setSelectedThemeId(option.themeId)}
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
