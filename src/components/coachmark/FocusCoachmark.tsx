import CoachmarkArrow from "./CoachmarkArrow";
import finger from "../../assets/coachmark/finger.svg";
import sampleBookCover from "../../assets/coachmark/sample-book-cover.png";
import happyBookCover from "../../assets/coachmark/sample-happy-book-cover.png";
import searchIcon from "../../assets/icons/search.svg";
import { useCoachmark } from "../../hooks/useCoachmark";
import Icon from "../action/Button/Icon";
import { Focus as FocusBookRow } from "../content/card/Book/List/Focus";
import SectionHeader from "../content/InformationText/SectionHeader";
import CoachmarkOverlay, {
  CoachmarkText,
  type CoachmarkGeometry,
} from "./CoachmarkOverlay";

type FocusCoachmarkProps = {
  userId: number | undefined;
};

function appX(geometry: CoachmarkGeometry) {
  return geometry.anchor.left - geometry.app.left;
}

function DailyTimeStep({ open, onNext }: { open: boolean; onNext: () => void }) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="focus-daily-time"
      actionLabel="오늘 포커스 시간 안내 다음 단계"
      onAction={onNext}
      scrollAnchorIntoView
      anchorViewportBottomInset={88}
      highlight={
        <div className="flex size-full flex-col items-center justify-center bg-gray-17">
          <p className="text-body-16-b text-gray-90">오늘 독서한 시간</p>
          <p className="text-title-40-b text-gray-90 tabular-nums">
            00 : 00 : 00
          </p>
        </div>
      }
    >
      {(geometry) => {
        const textTop = Math.min(
          geometry.viewportHeight - 72,
          geometry.anchor.bottom + 34,
        );

        return (
          <>
            <CoachmarkArrow
              variant={1}
              className="absolute -scale-x-100"
              style={{
                left: appX(geometry) + 60,
                top: geometry.anchor.bottom,
              }}
            />
            <div
              className="absolute"
              style={{ left: Math.max(16, appX(geometry) + 73), top: textTop }}
            >
              <CoachmarkText
                compact
                align="left"
                title="1일 포커스 시간"
                description="오늘 포커스한 시간의 총합이 떠요"
              />
            </div>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

function BookSearchStep({ open, onNext }: { open: boolean; onNext: () => void }) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="focus-book-search"
      actionLabel="포커스할 책 불러오기 안내 다음 단계"
      onAction={onNext}
      highlightInset={{ top: 9, bottom: 13 }}
      scrollAnchorIntoView
      anchorViewportBottomInset={70}
      highlight={
        <div className="flex size-full items-center justify-between bg-gray-17">
          <SectionHeader
            size="16"
            top="독서할 책 선택"
            bottom="책을 선택하고 포커스를 시작해주세요."
          />
          <Icon size="m">
            <img src={searchIcon} alt="" />
          </Icon>
        </div>
      }
    >
      {(geometry) => {
        const textTop = Math.min(
          geometry.viewportHeight - 40,
          geometry.anchor.bottom + 46,
        );

        return (
          <>
            <CoachmarkArrow
              variant={1}
              className="absolute"
              style={{
                left: appX(geometry) + geometry.anchor.width - 16,
                top: geometry.anchor.bottom + 13,
              }}
            />
            <p
              className="absolute whitespace-nowrap text-body-14-b leading-none text-gray-90"
              style={{ right: 35, top: textTop }}
            >
              서재에서 포커스하고 싶은 책을 불러와요
            </p>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

function StartFocusStep({ open, onNext }: { open: boolean; onNext: () => void }) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="focus-first-book"
      actionLabel="포커스 코치마크 완료"
      onAction={onNext}
      highlightInset={{ bottom: 106 }}
      highlight={
        <div className="flex flex-col gap-2.5">
          <div className="h-24">
            <FocusBookRow
              imageUrl={sampleBookCover}
              timeText="00:00:00"
              title="첫사랑의 침공"
              author="권혁일"
            />
          </div>
          <div className="h-24">
            <FocusBookRow
              imageUrl={happyBookCover}
              timeText="00:00:00"
              title="행복할 거야 이래도 되나 싶을 정도로"
              author="일홍"
            />
          </div>
        </div>
      }
    >
      {(geometry) => {
        const placeAbove = geometry.anchor.top > 142;
        const textTop = placeAbove
          ? Math.max(16, geometry.anchor.top - 105)
          : Math.min(geometry.viewportHeight - 72, geometry.anchor.bottom + 58);
        const arrowTop = placeAbove
          ? geometry.anchor.top - 50
          : geometry.anchor.bottom + 8;

        return (
          <>
            <div
              className="absolute"
              style={{ left: Math.max(16, geometry.app.width - 225), top: textTop }}
            >
              <CoachmarkText
                compact
                align="left"
                title="포커스 시작하기"
                description="원하는 책을 선택해 포커스를 진행해요"
              />
            </div>
            <CoachmarkArrow
              variant={2}
              className={`absolute ${placeAbove ? "-scale-y-100" : ""}`}
              style={{
                left: appX(geometry) + geometry.anchor.width - 37,
                top: arrowTop,
              }}
            />
            <img
              src={finger}
              alt=""
              className="absolute h-11.75 w-11.25"
              style={{
                left: appX(geometry) + geometry.anchor.width - 108,
                top: geometry.anchor.bottom - 32,
              }}
            />
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

export default function FocusCoachmark({ userId }: FocusCoachmarkProps) {
  const { isOpen, step, advance } = useCoachmark({
    userId,
    screen: "focus",
    stepCount: 3,
  });

  return (
    <>
      <DailyTimeStep open={isOpen && step === 0} onNext={advance} />
      <BookSearchStep open={isOpen && step === 1} onNext={advance} />
      <StartFocusStep open={isOpen && step === 2} onNext={advance} />
    </>
  );
}
