import CoachmarkArrow from "./CoachmarkArrow";
import finger from "../../assets/coachmark/finger.svg";
import reportSampleBookCover from "../../assets/coachmark/report-sample-book-cover.jpg";
import plusIcon from "../../assets/icons/plus.svg";
import { useCoachmark } from "../../hooks/useCoachmark";
import Report from "../content/card/Book/List/Report";
import CoachmarkOverlay, {
  CoachmarkText,
  type CoachmarkGeometry,
} from "./CoachmarkOverlay";

type ReportCoachmarkProps = {
  userId: number | undefined;
};

function appX(geometry: CoachmarkGeometry) {
  return geometry.anchor.left - geometry.app.left;
}

function AddReportStep({ open, onNext }: { open: boolean; onNext: () => void }) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="report-add"
      actionLabel="기록할 책 불러오기 안내 다음 단계"
      onAction={onNext}
      highlight={
        <div className="flex size-full items-center justify-center rounded-sm bg-gray-17">
          <img src={plusIcon} alt="" className="size-6" />
        </div>
      }
    >
      {(geometry) => {
        const textTop = Math.min(
          geometry.viewportHeight - 40,
          geometry.anchor.bottom + 69,
        );

        return (
          <>
            <CoachmarkArrow
              variant={2}
              className="absolute"
              style={{
                left: appX(geometry) + geometry.anchor.width - 15,
                top: geometry.anchor.bottom + 7,
              }}
            />
            <p
              className="absolute whitespace-nowrap text-body-14-b leading-none text-gray-90"
              style={{ right: 26, top: textTop }}
            >
              서재에서 기록을 남기고 싶은 책을 불러와요
            </p>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

function ReportCardStep({ open, onNext }: { open: boolean; onNext: () => void }) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="report-first-card"
      actionLabel="기록 코치마크 완료"
      onAction={onNext}
      highlight={
        <Report
          imageUrl={reportSampleBookCover}
          title="첫사랑의 침공"
          author="권혁일"
          recent="친구에게 추천받은 첫사랑의 침공이라는 책을 드디어 읽어 보았다. 여러 개의 단편 소설로 구성된 모음집이다."
          reviewNumber={9}
        />
      }
    >
      {(geometry) => {
        const roomBelow = geometry.viewportHeight - geometry.anchor.bottom;
        const placeBelow = roomBelow >= 105;
        const textTop = placeBelow
          ? geometry.anchor.bottom + 35
          : Math.max(16, geometry.anchor.top - 74);
        const arrowTop = placeBelow
          ? geometry.anchor.bottom + 1
          : geometry.anchor.top - 29;

        return (
          <>
            <CoachmarkArrow
              variant={1}
              className={`absolute ${placeBelow ? "-scale-x-100" : "-scale-100"}`}
              style={{ left: appX(geometry) + 16, top: arrowTop }}
            />
            <div
              className="absolute"
              style={{ left: appX(geometry) + 29, top: textTop }}
            >
              <CoachmarkText
                compact
                align="left"
                title="독서 기록"
                description="한 권의 책에 독서 기록을 여러 번 남길 수 있어요."
              />
            </div>
            <img
              src={finger}
              alt=""
              className="absolute h-11.75 w-11.25"
              style={{
                left: appX(geometry) + geometry.anchor.width - 61,
                top: geometry.anchor.bottom - 19,
              }}
            />
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

export default function ReportCoachmark({ userId }: ReportCoachmarkProps) {
  const { isOpen, step, advance } = useCoachmark({
    userId,
    screen: "record",
    stepCount: 2,
  });

  return (
    <>
      <AddReportStep open={isOpen && step === 0} onNext={advance} />
      <ReportCardStep open={isOpen && step === 1} onNext={advance} />
    </>
  );
}
