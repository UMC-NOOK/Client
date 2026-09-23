import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import pencilIcon from "../../assets/icons/pencil.svg";
import FAB from "../../components/action/Button/FAB";
import Solid from "../../components/action/Button/Solid";
import BookCover from "../../components/atomic/BookCover";
import MaskGradient from "../../components/layout/MaskGradient";
import { useEndFocus } from "../../hooks/mutations/focus/useEndFocus";
import { usePatchFocusBookStatus } from "../../hooks/mutations/focus/usePatchFocusBookStatus";
import { useGetBookDetailWithBookId } from "../../hooks/queries/bookInfo/useGetBookDetailWithBookId";
import { useGetBookTimeline } from "../../hooks/queries/bookInfo/useGetBookTimeline";
import type { FocusEndResult } from "../../types/focus/focus";
import FocusEndSheet from "./component/FocusEndSheet";
import { formatDurationHms } from "./utils/formatDurationHms";
import {
  clearFocusSession,
  readFocusSession,
} from "./utils/focusSessionStorage";
import { findFocusTheme } from "./utils/focusThemes";
import { readStoredFocusThemeId } from "./utils/focusThemeStorage";
import {
  clearFocusSessionTimer,
  getFocusElapsedSeconds,
  pauseFocusSessionTimer,
  readOrCreateFocusSessionTimer,
  resumeFocusSessionTimer,
  type FocusSessionTimerState,
} from "./utils/focusSessionTimer";

function getFocusEndErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null) {
    const response = error as {
      response?: { data?: { message?: unknown } };
    };
    if (typeof response.response?.data?.message === "string") {
      return response.response.data.message;
    }
  }

  return "포커스를 종료하지 못했어요. 다시 시도해주세요.";
}

export default function FocusSessionPage() {
  const navigate = useNavigate();
  const [session] = useState(readFocusSession);
  const { mutateAsync: endFocus, isPending: isEndPending } = useEndFocus();
  const { mutateAsync: patchFocusBookStatus, isPending: isStatusPending } =
    usePatchFocusBookStatus();
  const { data: bookDetail } = useGetBookDetailWithBookId(
    session?.bookId ?? null,
    session !== null,
  );
  const { data: bookTimeline } = useGetBookTimeline(bookDetail?.libraryId);

  // 테마 선택 화면과 같은 키를 읽어 마지막으로 시작한 테마 배경을 이어서 보여준다.
  const [themeId] = useState(readStoredFocusThemeId);
  const [imageError, setImageError] = useState(false);

  const [timerState, setTimerState] = useState<FocusSessionTimerState>(
    () =>
      readOrCreateFocusSessionTimer(
        session ? new Date(session.startedAt).getTime() : undefined,
      ),
  );
  const [elapsedSeconds, setElapsedSeconds] = useState(() =>
    getFocusElapsedSeconds(timerState),
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pageInputDraft, setPageInputDraft] = useState<string | null>(null);
  const [isFinishedDraft, setIsFinishedDraft] = useState<boolean | null>(null);
  const [completedEndResult, setCompletedEndResult] =
    useState<FocusEndResult | null>(null);
  const [submitError, setSubmitError] = useState<string>();

  // 임시 정책(PM 미확정): 완독 책으로 다시 포커스하면 종료 시트를 체크 상태로 열고,
  // 체크를 풀어 종료할 때 READING으로 되돌린다. 정책이 확정되거나 철회되면
  // 이 초기값과 handleSubmitEnd의 상태 보정 PATCH를 함께 재검토해야 한다.
  const isFinished =
    isFinishedDraft ?? bookDetail?.readingStatus === "FINISHED";
  const lastReadPage = bookTimeline?.focusSummary.page;

  // 임시 정책(PM 미확정): 종료 시트에는 이 책의 서버 타임라인에 저장된 마지막 페이지를
  // 기본값으로 보여주고, 취소한 입력은 저장하지 않는다. 정책 철회 시 이 조회·파생값과
  // handleCloseSheet의 pageInputDraft 초기화를 함께 제거하면 된다.
  const pageInput =
    pageInputDraft ??
    (typeof lastReadPage === "number" &&
    Number.isSafeInteger(lastReadPage) &&
    lastReadPage > 0
      ? String(lastReadPage)
      : "");
  const isSubmitting = isEndPending || isStatusPending;

  // setInterval 횟수가 아니라 저장한 시작 시각과 현재 시각의 차이로 계산한다.
  // 따라서 기록 작성 화면으로 이동해 컴포넌트가 unmount되어도 포커스 시간은 계속 흐른다.
  // 종료 시트가 열린 동안만 pausedAtMs를 기록한다.
  useEffect(() => {
    if (session === null) return;
    if (timerState.pausedAtMs !== null) return;

    const timerId = window.setInterval(() => {
      setElapsedSeconds(getFocusElapsedSeconds(timerState));
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [session, timerState]);

  const backgroundUrl = findFocusTheme(themeId)?.sessionBackgroundUrl;

  const handleCloseSheet = () => {
    if (completedEndResult !== null) return;

    const resumedTimer = resumeFocusSessionTimer(timerState);
    setTimerState(resumedTimer);
    setElapsedSeconds(getFocusElapsedSeconds(resumedTimer));
    setPageInputDraft(null);
    setIsFinishedDraft(null);
    setSubmitError(undefined);
    setSheetOpen(false);
  };

  const handleOpenSheet = () => {
    const pausedTimer = pauseFocusSessionTimer(timerState);
    setTimerState(pausedTimer);
    setElapsedSeconds(getFocusElapsedSeconds(pausedTimer));
    setSheetOpen(true);
  };

  const handleSubmitEnd = () => {
    if (session === null || isSubmitting) return;

    const page = pageInput ? Number(pageInput) : undefined;
    if (page !== undefined && !Number.isSafeInteger(page)) return;

    setSubmitError(undefined);

    void (async () => {
      let endWasCompleted = completedEndResult !== null;

      try {
        // 종료 성공 후 상태 변경만 실패한 경우 FOCUS-003을 만들지 않도록
        // 저장해둔 종료 결과를 재사용하고 상태 변경만 다시 시도한다.
        const endResult =
          completedEndResult ??
          (await endFocus({
            focusId: session.focusId,
            ...(page === undefined ? {} : { page }),
            isFinished,
          }));

        if (completedEndResult === null) {
          setCompletedEndResult(endResult);
          endWasCompleted = true;
        }

        const desiredStatus = isFinished ? "FINISHED" : "READING";

        if (endResult.readingStatus !== desiredStatus) {
          await patchFocusBookStatus({
            bookId: session.bookId,
            readingStatus: desiredStatus,
          });
        }

        clearFocusSessionTimer();
        clearFocusSession();
        navigate("/focus", { state: { showFocusEndToast: true } });
      } catch (error) {
        setSubmitError(
          endWasCompleted
            ? "포커스는 종료했지만 독서 상태를 변경하지 못했어요. 다시 시도해주세요."
            : getFocusEndErrorMessage(error),
        );
      }
    })();
  };

  if (session === null) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="flex flex-col gap-1">
          <p className="text-body-16-b text-gray-90">
            진행 중인 포커스 정보가 없어요.
          </p>
          <p className="text-body-14-r text-gray-50">
            책을 선택하고 포커스를 시작해주세요.
          </p>
        </div>
        <Solid text="포커스 홈으로" onClick={() => navigate("/focus")} />
      </div>
    );
  }

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
          <BookCover
            size="S"
            type="Image"
            imageUrl={bookDetail?.coverImageUrl}
          />
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
        isSubmitting={isSubmitting}
        isEndCompleted={completedEndResult !== null}
        submitError={submitError}
        onPageInputChange={setPageInputDraft}
        onFinishedChange={setIsFinishedDraft}
        onClose={handleCloseSheet}
        onSubmit={handleSubmitEnd}
      />
    </div>
  );
}
