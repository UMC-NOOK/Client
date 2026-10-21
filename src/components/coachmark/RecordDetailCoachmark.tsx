import CoachmarkArrow from "./CoachmarkArrow";
import finger from "../../assets/coachmark/finger.svg";
import plusIcon from "../../assets/icons/plus-gray-10.svg";
import { useCoachmark } from "../../hooks/useCoachmark";
import FAB from "../action/Button/FAB";
import Chip from "../action/Chip/Chip";
import Emotion, { type EmotionKey } from "../action/Chip/Emotion";
import ReportList from "../content/card/Report/List";
import CoachmarkOverlay, {
  CoachmarkText,
  type CoachmarkGeometry,
} from "./CoachmarkOverlay";

type RecordDetailCoachmarkProps = {
  userId: number | undefined;
};

const EMOTIONS: EmotionKey[] = [
  "FUN",
  "EMPATHIZING",
  "USEFUL",
  "SAD",
  "COMPLICATED",
  "UNCOMFORTABLE",
];

function appX(geometry: CoachmarkGeometry) {
  return geometry.anchor.left - geometry.app.left;
}

function EmotionStep({ open, onNext }: { open: boolean; onNext: () => void }) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="record-detail-emotions"
      actionLabel="감정 표현 안내 다음 단계"
      onAction={onNext}
      highlight={
        <div className="flex size-full gap-1 overflow-hidden">
          <Chip text="전체 0" variant="none" active />
          <Chip text="재밌어요 0" variant="none" />
          <Chip text="공감돼요 0" variant="none" />
          <Chip text="유익해요 0" variant="none" />
        </div>
      }
    >
      {(geometry) => {
        const emotionTop = Math.min(
          geometry.viewportHeight - 125,
          geometry.anchor.bottom + 37,
        );
        const textTop = Math.min(
          geometry.viewportHeight - 72,
          emotionTop + 51,
        );

        return (
          <>
            <CoachmarkArrow
              variant={1}
              className="absolute -scale-x-100"
              style={{
                left: appX(geometry) + 13,
                top: geometry.anchor.bottom,
              }}
            />
            <div
              className="absolute flex gap-1"
              style={{
                left: Math.max(16, (geometry.app.width - 324) / 2 + 0.5),
                top: emotionTop,
              }}
            >
              {EMOTIONS.map((emotion) => (
                <Emotion
                  key={emotion}
                  active
                  size="coachmark"
                  surface="strong"
                  emojiKey={emotion}
                />
              ))}
            </div>
            <div
              className="absolute"
              style={{ left: appX(geometry) + 10, top: textTop }}
            >
              <CoachmarkText
                compact
                align="left"
                title="감정 표현"
                description="책에 대한 감상을 이모지로 표현해요"
              />
            </div>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

function RecordStep({ open, onNext }: { open: boolean; onNext: () => void }) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="record-detail-first-record"
      actionLabel="기록 수정 안내 다음 단계"
      onAction={onNext}
      highlight={
        <ReportList
          date="26.12.11"
          emojiKey="FUN"
          review="친구에게 추천받은 첫사랑의 침공이라는 책을 드디어 읽어 보았다. 여러 개의 단편 소설로 구성된 모음집이다. 시간 가는 줄 모르고 읽었다."
        />
      }
    >
      {(geometry) => {
        const placeBelow = geometry.viewportHeight - geometry.anchor.bottom >= 72;
        const textTop = placeBelow
          ? geometry.anchor.bottom + 28
          : Math.max(16, geometry.anchor.top - 45);

        return (
          <>
            <CoachmarkArrow
              variant={1}
              className={`absolute ${placeBelow ? "-scale-x-100" : "-scale-100"}`}
              style={{
                left: appX(geometry) + 12,
                top: placeBelow
                  ? geometry.anchor.bottom
                  : geometry.anchor.top - 29,
              }}
            />
            <p
              className="absolute whitespace-nowrap text-body-14-b leading-none text-gray-90"
              style={{ left: appX(geometry) + 28, top: textTop }}
            >
              기록을 선택해 내용을 수정할 수 있어요
            </p>
            <img
              src={finger}
              alt=""
              className="absolute h-11.75 w-11.25"
              style={{
                left: appX(geometry) + geometry.anchor.width - 57,
                top: geometry.anchor.bottom - 16,
              }}
            />
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

function AddRecordStep({ open, onNext }: { open: boolean; onNext: () => void }) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="record-detail-add"
      actionLabel="상세 기록 코치마크 완료"
      onAction={onNext}
      highlightInset={{ top: 4, left: 4 }}
      highlight={
        <FAB
          size="l"
          aria-label="안내용 기록 작성"
          icon={<img src={plusIcon} alt="" />}
        />
      }
    >
      {(geometry) => {
        const highlightTop = geometry.anchor.top - 4;
        const textTop = Math.max(16, highlightTop - 120);

        return (
          <>
            <div
              className="absolute"
              style={{
                left: Math.max(16, appX(geometry) - 148),
                top: textTop,
              }}
            >
              <CoachmarkText
                compact
                align="left"
                title="기록 남기기 표현"
                description="이 책에 새로운 독서 기록을 남겨요"
              />
            </div>
            <CoachmarkArrow
              variant={2}
              className="absolute -scale-y-100"
              style={{
                left: appX(geometry) + geometry.anchor.width - 22,
                top: highlightTop - 66,
              }}
            />
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

export default function RecordDetailCoachmark({
  userId,
}: RecordDetailCoachmarkProps) {
  const { isOpen, step, advance } = useCoachmark({
    userId,
    screen: "record-detail",
    stepCount: 3,
  });

  return (
    <>
      <EmotionStep open={isOpen && step === 0} onNext={advance} />
      <RecordStep open={isOpen && step === 1} onNext={advance} />
      <AddRecordStep open={isOpen && step === 2} onNext={advance} />
    </>
  );
}
