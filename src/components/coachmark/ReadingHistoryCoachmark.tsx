import closeIcon from "../../assets/icons/close.svg";
import finger from "../../assets/coachmark/finger.svg";
import { useCoachmark } from "../../hooks/useCoachmark";
import Solid from "../action/Button/Solid";
import Emotion from "../action/Chip/Emotion";
import HistoryInfoCard from "../content/list/History";
import ResourceDate from "../content/list/Resource/Date";
import CoachmarkArrow from "./CoachmarkArrow";
import CoachmarkOverlay, { CoachmarkText } from "./CoachmarkOverlay";

export default function ReadingHistoryCoachmark({
  userId,
}: {
  userId: number | undefined;
}) {
  const { isOpen, advance } = useCoachmark({
    userId,
    screen: "reading-history",
    stepCount: 1,
  });

  return (
    <CoachmarkOverlay
      open={isOpen}
      anchorName="reading-history-record"
      actionLabel="독서 히스토리 코치마크 완료"
      onAction={advance}
      highlightInset={{ left: 40 }}
      additionalActions={({ anchor, app }) => (
        <button
          type="button"
          aria-label="손가락을 눌러 독서 히스토리 안내 완료"
          onClick={advance}
          className="pointer-events-auto absolute h-11.75 w-11.25 cursor-pointer bg-transparent"
          style={{ left: anchor.right - app.left - 77, top: anchor.bottom - 8 }}
        />
      )}
      highlight={
        <div className="flex size-full items-start gap-2">
          {/* 불투명 바탕과 DIM을 합성해 실제 날짜·연도를 스티커처럼 가린다. */}
          <div className="relative w-8 shrink-0 self-stretch bg-gradient-background">
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative">
              <ResourceDate topText="12.11" bottomText="" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <HistoryInfoCard
              variant="history"
              time="친구에게 추천받은 첫사랑의 침공이라는 책을 드디어 읽어 보았다. 여러 개의 단편 소설로 구성된 모음집이다. 시간 가는 줄 모르고 읽었다."
            />
          </div>
        </div>
      }
    >
      {({ anchor, app, viewportHeight }) => {
        const sheetHeight = Math.min(302, Math.max(240, viewportHeight * 0.55));
        const sheetTop = viewportHeight - sheetHeight;
        const textTop = sheetTop - anchor.bottom >= 82
          ? sheetTop - 82
          : Math.max(16, anchor.top - 78);

        return (
          <>
            <img
              src={finger}
              alt=""
              className="absolute h-11.75 w-11.25"
              style={{ left: anchor.right - app.left - 77, top: anchor.bottom - 8 }}
            />
            <div
              className="absolute"
              style={{ left: Math.max(16, (app.width - 210) / 2), top: textTop }}
            >
              <CoachmarkText
                compact
                align="left"
                title="독서 기록 미리보기"
                description="기록을 선택해 상세 내용을 볼 수 있어요"
              />
            </div>
            <CoachmarkArrow
              variant={1}
              className="absolute -scale-y-100"
              style={{ left: app.width - 93, top: sheetTop - 36 }}
            />
            <div
              className="absolute inset-x-0 bottom-0 flex flex-col gap-8 rounded-t-2xl bg-gray-15 px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-4"
              style={{ height: sheetHeight }}
            >
              <div className="min-h-0 flex-1 overflow-hidden">
                <div className="flex h-10 items-center justify-between">
                  <span className="size-10" />
                  <p className="text-title-18-m text-gray-90">12월 11일</p>
                  <span className="flex size-10 items-center justify-center">
                    <img src={closeIcon} alt="" className="size-6" />
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-label-14-sb text-gray-80">12.11</p>
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-body-16-r text-gray-70">
                      친구에게 추천받은 첫사랑의 침공이라는 책을 드디어 대여했다.
                      여러 개의 단편 소설로 구성되어 있어 하루에 1개의 이야기를 읽었다.
                    </p>
                    <Emotion active size="s" emojiKey="FUN" />
                  </div>
                </div>
              </div>
              <Solid text="기록 상세 보기" className="shrink-0" />
            </div>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}
