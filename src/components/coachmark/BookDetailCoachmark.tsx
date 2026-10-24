import CoachmarkArrow from "./CoachmarkArrow";
import finger from "../../assets/coachmark/finger.svg";
import { useCoachmark } from "../../hooks/useCoachmark";
import TabBar from "../navigation/tabs/TabBar";
import CoachmarkOverlay, { CoachmarkText } from "./CoachmarkOverlay";

const DETAIL_TABS = [
  { value: "info", label: "도서 정보" },
  { value: "log", label: "독서 이력" },
] as const;

export default function BookDetailCoachmark({
  userId,
}: {
  userId: number | undefined;
}) {
  const { isOpen, advance } = useCoachmark({
    userId,
    screen: "book-detail",
    stepCount: 1,
  });

  return (
    <CoachmarkOverlay
      open={isOpen}
      anchorName="book-detail-tabs"
      actionLabel="책 상세 코치마크 완료"
      onAction={advance}
      additionalActions={({ anchor, app }) => (
        <button
          type="button"
          aria-label="손가락을 눌러 책 상세 안내 완료"
          onClick={advance}
          className="pointer-events-auto absolute h-11.75 w-11.25 cursor-pointer bg-transparent"
          style={{ left: anchor.right - app.left - 45, top: anchor.bottom - 12 }}
        />
      )}
      highlight={
        <TabBar
          options={DETAIL_TABS}
          value="log"
          onChange={() => {}}
          variant="underlineGradient"
        />
      }
    >
      {({ anchor, app, viewportHeight }) => (
        <>
          <img
            src={finger}
            alt=""
            className="absolute h-11.75 w-11.25"
            style={{ left: anchor.right - app.left - 45, top: anchor.bottom - 12 }}
          />
          <CoachmarkArrow
            variant={1}
            className="absolute"
            style={{ left: anchor.right - app.left - 9, top: anchor.bottom + 40 }}
          />
          <div
            className="absolute"
            style={{
              left: Math.max(16, app.width - 212),
              top: Math.min(viewportHeight - 54, anchor.bottom + 73),
            }}
          >
            <CoachmarkText
              compact
              align="left"
              title="독서 이력"
              description="지금까지의 독서 활동을 모아 봐요"
            />
          </div>
        </>
      )}
    </CoachmarkOverlay>
  );
}
