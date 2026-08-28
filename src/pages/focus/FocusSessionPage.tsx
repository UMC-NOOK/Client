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

  // 테마 선택 화면과 같은 키를 읽어 마지막으로 시작한 테마 배경을 이어서 보여준다.
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
  // 종료 시트가 열린 동안만 pausedAtMs를 기록한다.
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
    // TODO: 종료 API 연동 시 focusId, pageInput, isFinished를 mutation으로 전달한다.
    clearFocusSessionTimer();
    navigate("/focus", { state: { showFocusEndToast: true } });
  };

  return (
    // AppShell 전역 padding은 유지하고 배경형 세션 화면만 상단으로 확장한다.
    // margin box 높이는 기존 main 영역과 같아서 문서 전체 높이나 다른 라우트에는 영향을 주지 않는다.
    <div className="relative -mx-4 -mt-[calc(env(safe-area-inset-top)+8px)] h-[calc(100dvh-env(safe-area-inset-bottom))] overflow-hidden bg-gradient-background">
      {backgroundUrl && !imageError && (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <img
            src={backgroundUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
          {/* 상단 검은 바의 원인은 오버레이가 아니라 AppShell padding 노출이었다.
              rotate 시 자동 너비가 깨졌던 이력이 있어 w-full을 명시한다. */}
          <div className="absolute left-0 top-0 h-20 w-full rotate-180">
            <MaskGradient width="full" height="full" />
          </div>
          {/* 둥근 트레이 모서리 아래로 밝은 배경이 비치지 않도록 마스크를 16px 겹친다. */}
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

      {/* 이 바깥 wrapper엔 좌우 padding을 주지 않는다 — wrapper에 padding을 걸면 트레이의
          w-full이 그 padding만큼 좁아진 영역 기준 100%가 돼서 화면 끝까지 안 채워진다.
          여백이 필요한 요소(연필 버튼)에만 개별로 px-4를 준다. */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4">
        <div className="flex items-center justify-end px-4">
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
