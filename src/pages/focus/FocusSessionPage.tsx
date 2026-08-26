import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import pencilIcon from "../../assets/icons/pencil.svg";
import FAB from "../../components/action/Button/FAB";
import Solid from "../../components/action/Button/Solid";
import BookCover from "../../components/atomic/BookCover";
import MaskGradient from "../../components/layout/MaskGradient";
import {
  mockActiveFocusSession,
  mockFocusSessionBackgroundByThemeId,
} from "../../mocks/focus/focus";
import FocusEndSheet from "./component/FocusEndSheet";
import { formatDurationHms } from "./utils/formatDurationHms";
import { readStoredFocusThemeId } from "./utils/focusThemeStorage";
import {
  clearFocusSessionTimer,
  getFocusElapsedSeconds,
  pauseFocusSessionTimer,
  readOrCreateFocusSessionTimer,
  resumeFocusSessionTimer,
  type FocusSessionTimerState,
} from "./utils/focusSessionTimer";

export default function FocusSessionPage() {
  const navigate = useNavigate();
  const session = mockActiveFocusSession;

  // #335(테마 선택 화면)와 같은 키를 읽어 마지막으로 시작한 테마 배경을 이어서 보여준다.
  const [themeId] = useState<number | null>(readStoredFocusThemeId);
  const [imageError, setImageError] = useState(false);

  const [timerState, setTimerState] = useState<FocusSessionTimerState>(
    readOrCreateFocusSessionTimer,
  );
  const [elapsedSeconds, setElapsedSeconds] = useState(() =>
    getFocusElapsedSeconds(timerState),
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pageInput, setPageInput] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  // setInterval 횟수가 아니라 저장한 시작 시각과 현재 시각의 차이로 계산한다.
  // 따라서 기록 작성 화면으로 이동해 컴포넌트가 unmount되어도 포커스 시간은 계속 흐른다.
  // 종료 시트에서만 pausedAtMs를 기록해 기존 정책대로 일시정지한다.
  useEffect(() => {
    if (timerState.pausedAtMs !== null) return;

    const timerId = window.setInterval(() => {
      setElapsedSeconds(getFocusElapsedSeconds(timerState));
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [timerState]);

  const backgroundUrl =
    themeId !== null ? mockFocusSessionBackgroundByThemeId[themeId] : undefined;

  const handleCloseSheet = () => {
    const resumedTimer = resumeFocusSessionTimer(timerState);
    setTimerState(resumedTimer);
    setElapsedSeconds(getFocusElapsedSeconds(resumedTimer));
    setSheetOpen(false);
  };

  const handleOpenSheet = () => {
    const pausedTimer = pauseFocusSessionTimer(timerState);
    setTimerState(pausedTimer);
    setElapsedSeconds(getFocusElapsedSeconds(pausedTimer));
    setSheetOpen(true);
  };

  const handleSubmitEnd = () => {
    // TODO(포커스 API 연동 이슈): 시작 API 응답의 실제 focusId와 현재
    // page/isFinished를 종료 mutation으로 전송한다. 퍼블리싱 단계에서는 서버를 호출하지 않는다.
    // 정상 종료 시 메인으로 먼저 이동하고, 이동된 화면에서 완료 Toast를 4초 노출한다.
    clearFocusSessionTimer();
    navigate("/focus", { state: { showFocusEndToast: true } });
  };

  return (
    // AppShell의 전역 safe area는 유지하되, 배경형 진행 화면만 그 padding만큼 위로 확장한다.
    // margin box 높이는 기존 main 영역과 같아서 문서 전체 높이나 다른 라우트에는 영향을 주지 않는다.
    <div className="relative -mx-4 -mt-[calc(env(safe-area-inset-top)+8px)] h-[calc(100dvh-env(safe-area-inset-bottom))] overflow-hidden bg-gradient-background">
      {/* 배경 이미지는 화면 전체(375×812)를 채운다. Figma node 2759:8673 기준으로
          상하단 각각 80px의 MaskGradient(투명→#181d34)를 적용한다. */}
      {backgroundUrl && !imageError && (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <img
            src={backgroundUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
          {/* 상단 검은 바의 원인은 오버레이가 아니라 AppShell padding 노출이었다. 페이지 위치를
              보정한 뒤에는 디버깅용 45% 오버레이 대신 Figma의 원래 강도로 복원한다. 상단 wrapper는
              rotate 시 자동 너비가 깨졌던 이력을 고려해 w-full을 명시한다. */}
          <div className="absolute left-0 top-0 h-20 w-full rotate-180">
            <MaskGradient width="full" height="full" />
          </div>
          {/* 하단 트레이는 96px(16 + 48 + 32), 상단 radius는 16px다. 마스크가 트레이
              바로 위에서 끝나면 둥근 모서리 아래로 밝은 이미지가 다시 노출되므로, 마스크 끝점을
              트레이 안쪽 16px(bottom-20)까지 겹쳐 Figma처럼 어두운 배경이 이어지게 한다. */}
          <div className="absolute bottom-20 left-0 h-20 w-full">
            <MaskGradient width="full" height="full" />
          </div>
        </div>
      )}
      {backgroundUrl && imageError && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
          <p className="text-body-14-r text-gray-50">이미지를 불러오지 못했습니다</p>
        </div>
      )}

      <div className="absolute inset-x-0 top-49 flex flex-col items-center">
        <div className="flex flex-col items-center gap-3 py-3">
          <BookCover imageUrl={session.coverUrl} size="S" type="Image" />
          <div className="flex flex-col items-center gap-0.5 text-center">
            <p className="text-subtitle-14-sb text-gray-90">{session.bookTitle}</p>
            <p className="text-body-13-r text-gray-90">{session.author}</p>
          </div>
        </div>
        <p className="text-title-40-b tabular-nums text-gray-90">
          {formatDurationHms(elapsedSeconds)}
        </p>
      </div>

      {/* 이 바깥 wrapper엔 좌우 padding을 주지 않는다 — 아래 트레이가 화면 끝까지 꽉 차야 해서
          (테마 선택 화면 FocusThemePage와 동일 패턴). 여백이 필요한 요소(연필 버튼)에만 개별로
          px-4를 준다. wrapper에 padding을 걸어버리면 트레이의 w-full이 그 padding만큼 좁아진
          영역 기준 100%가 돼서 화면 끝까지 안 채워진다(2026-08-25 사용자 스크린샷으로 확인). */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4">
        {/* 그룹 버튼은 런칭 이후 확장 기능이라 이번 퍼블리싱 범위에서 제외(2026-08-24 사용자 확인) */}
        <div className="flex items-center justify-end px-4">
          {/* 포커스 시작 시각은 sessionStorage에 보존하므로 기록 화면에서도 타이머가 계속 흐른다.
              실제 API 연동 시에는 start 응답의 startedAt을 기준값으로 교체한다. */}
          <FAB
            aria-label="기록 작성"
            size="l"
            variant="dark"
            icon={<img src={pencilIcon} alt="" className="h-6 w-6" />}
            onClick={() =>
              navigate(`/report/${session.bookId}/create`, {
                state: { bookTitle: session.bookTitle, bookId: session.bookId },
              })
            }
          />
        </div>

        <div className="w-full rounded-t-2xl bg-gray-15 px-4 pt-4 pb-8">
          <Solid
            text="포커스 종료하기"
            variant="secondary"
            onClick={handleOpenSheet}
          />
        </div>
      </div>

      <FocusEndSheet
        open={sheetOpen}
        elapsedSeconds={elapsedSeconds}
        pageInput={pageInput}
        isFinished={isFinished}
        onPageInputChange={setPageInput}
        onFinishedChange={setIsFinished}
        onClose={handleCloseSheet}
        onSubmit={handleSubmitEnd}
      />
    </div>
  );
}
