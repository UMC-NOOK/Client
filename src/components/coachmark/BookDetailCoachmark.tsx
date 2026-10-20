import arrowLong from "../../assets/coachmark/arrow-long.png";
import arrowShort from "../../assets/coachmark/arrow-short.png";
import finger from "../../assets/coachmark/finger.svg";
import closeIcon from "../../assets/icons/close.svg";
import { useCoachmark } from "../../hooks/useCoachmark";
import HistoryInfoCard from "../content/list/History";
import TabBar from "../navigation/tabs/TabBar";
import CoachmarkOverlay, {
  CoachmarkText,
  type CoachmarkGeometry,
} from "./CoachmarkOverlay";

type BookDetailCoachmarkProps = {
  userId: number | undefined;
  onShowReadingHistory: () => void;
};

const DETAIL_TABS = [
  { value: "info", label: "도서 정보" },
  { value: "log", label: "독서 이력" },
] as const;

function appX(geometry: CoachmarkGeometry) {
  return geometry.anchor.left - geometry.app.left;
}

function ReadingHistoryStep({
  open,
  onNext,
}: {
  open: boolean;
  onNext: () => void;
}) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="book-detail-tabs"
      actionLabel="독서 이력 안내 다음 단계"
      onAction={onNext}
      highlight={
        <TabBar
          options={DETAIL_TABS}
          value="log"
          onChange={() => {}}
          variant="underlineGradient"
        />
      }
    >
      {(geometry) => {
        const textTop = Math.min(
          geometry.viewportHeight - 72,
          geometry.anchor.bottom + 73,
        );

        return (
          <>
            <img
              src={finger}
              alt=""
              className="absolute h-11.75 w-11.25"
              style={{
                left: appX(geometry) + geometry.anchor.width - 45,
                top: geometry.anchor.bottom - 12,
              }}
            />
            <img
              src={arrowShort}
              alt=""
              className="absolute h-2 w-7 -rotate-90"
              style={{
                left: appX(geometry) + geometry.anchor.width - 9,
                top: geometry.anchor.bottom + 40,
              }}
            />
            <div
              className="absolute"
              style={{
                left: Math.max(16, geometry.app.width - 212),
                top: textTop,
              }}
            >
              <CoachmarkText
                align="left"
                title="독서 이력"
                description="지금까지의 독서 활동을 모아 봐요"
              />
            </div>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

function HistoryPreviewStep({
  open,
  onNext,
}: {
  open: boolean;
  onNext: () => void;
}) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="book-detail-history-record"
      actionLabel="책 상세 코치마크 완료"
      onAction={onNext}
      scrollAnchorIntoView
      scrollAnchorBlock="start"
      highlight={
        <HistoryInfoCard
          variant="history"
          title="독서 기록"
          time="친구에게 추천받은 첫사랑의 침공이라는 책을 드디어 읽어 보았다."
        />
      }
    >
      {(geometry) => {
        const sheetHeight = Math.min(
          302,
          Math.max(240, geometry.viewportHeight * 0.55),
        );
        const sheetTop = geometry.viewportHeight - sheetHeight;
        const placeTextBelow = sheetTop - geometry.anchor.bottom >= 82;
        const textTop = placeTextBelow
          ? sheetTop - 82
          : Math.max(16, geometry.anchor.top - 78);

        return (
          <>
            <img
              src={finger}
              alt=""
              className="absolute h-11.75 w-11.25"
              style={{
                left: appX(geometry) + geometry.anchor.width - 77,
                top: geometry.anchor.bottom - 8,
              }}
            />
            <div
              className="absolute"
              style={{
                left: Math.max(16, (geometry.app.width - 210) / 2),
                top: textTop,
              }}
            >
              <CoachmarkText
                align="left"
                title="독서 기록 미리보기"
                description="기록을 선택해 상세 내용을 볼 수 있어요"
              />
            </div>
            <img
              src={arrowLong}
              alt=""
              className="absolute h-2.75 w-12.75 -rotate-90"
              style={{
                left: geometry.app.width - 93,
                top: sheetTop - 36,
              }}
            />

            <div
              className="absolute inset-x-0 bottom-0 flex flex-col rounded-t-2xl bg-gray-15 px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-4"
              style={{ height: sheetHeight }}
            >
              <div className="flex h-10 items-center justify-between">
                <span className="size-10" />
                <p className="text-title-18-m text-gray-90">12월 11일</p>
                <span className="flex size-10 items-center justify-center">
                  <img src={closeIcon} alt="" className="size-6" />
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-label-14-sb text-gray-80">12.11</p>
                <p className="text-body-16-r text-gray-70">
                  친구에게 추천받은 첫사랑의 침공이라는 책을 드디어 대여했다.
                  여러 개의 단편 소설로 구성되어 있어 하루에 1개의 이야기를 읽었다.
                </p>
                <p className="w-fit rounded-sm bg-gray-20 p-1 text-label-12-sb text-yellow-50">
                  (^_^)
                </p>
              </div>
              <div className="mt-8 flex h-12 items-center justify-center rounded-lg bg-mint-60 text-btn-16-sb text-gray-10">
                기록 상세 보기
              </div>
            </div>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

export default function BookDetailCoachmark({
  userId,
  onShowReadingHistory,
}: BookDetailCoachmarkProps) {
  const { isOpen, step, advance } = useCoachmark({
    userId,
    screen: "book-detail",
    stepCount: 2,
  });

  const handleFirstStep = () => {
    onShowReadingHistory();
    advance();
  };

  return (
    <>
      {isOpen && step === 1 && (
        <div aria-hidden="true" className="pointer-events-none h-76" />
      )}
      <ReadingHistoryStep
        open={isOpen && step === 0}
        onNext={handleFirstStep}
      />
      <HistoryPreviewStep open={isOpen && step === 1} onNext={advance} />
    </>
  );
}
