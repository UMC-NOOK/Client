import arrowLong from "../../assets/coachmark/arrow-long.png";
import arrowShort from "../../assets/coachmark/arrow-short.png";
import finger from "../../assets/coachmark/finger.svg";
import sampleBookCover from "../../assets/coachmark/sample-book-cover.png";
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
            <img
              src={arrowShort}
              alt=""
              className="absolute h-2 w-7 -rotate-90"
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
          geometry.anchor.bottom + 34,
        );

        return (
          <>
            <img
              src={arrowShort}
              alt=""
              className="absolute h-2 w-7 -rotate-90"
              style={{
                left: appX(geometry) + geometry.anchor.width - 20,
                top: geometry.anchor.bottom + 4,
              }}
            />
            <p
              className="absolute whitespace-nowrap text-body-14-b text-gray-90"
              style={{ right: 20, top: textTop }}
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
      scrollAnchorIntoView
      highlight={
        <FocusBookRow
          imageUrl={sampleBookCover}
          timeText="00:00:00"
          title="첫사랑의 침공"
          author="권혁일"
        />
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
                align="left"
                title="포커스 시작하기"
                description="원하는 책을 선택해 포커스를 진행해요"
              />
            </div>
            <img
              src={arrowLong}
              alt=""
              className={`absolute h-2.75 w-12.75 ${placeAbove ? "rotate-90" : "-rotate-90"}`}
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
                left: appX(geometry) + geometry.anchor.width * 0.68,
                top: geometry.anchor.bottom - 31,
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
