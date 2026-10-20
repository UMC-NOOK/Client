import arrowLong from "../../assets/coachmark/arrow-long.png";
import { useCoachmark } from "../../hooks/useCoachmark";
import CoachmarkOverlay from "./CoachmarkOverlay";

type SearchCoachmarkProps = {
  userId: number | undefined;
};

export default function SearchCoachmark({ userId }: SearchCoachmarkProps) {
  const { isOpen, advance } = useCoachmark({
    userId,
    screen: "search",
    stepCount: 1,
  });

  return (
    <CoachmarkOverlay
      open={isOpen}
      anchorName="search-my-library"
      actionLabel="도서 검색 코치마크 완료"
      onAction={advance}
      highlight={
        <div className="flex size-full items-center justify-center rounded-full bg-gray-30">
          <span className="text-label-16-sb text-gray-90">내 서재 검색</span>
        </div>
      }
    >
      {(geometry) => {
        const anchorX = geometry.anchor.left - geometry.app.left;

        return (
          <>
            <img
              src={arrowLong}
              alt=""
              className="absolute h-2.75 w-12.75 rotate-90"
              style={{
                left: anchorX + geometry.anchor.width - 20,
                top: geometry.anchor.bottom + 18,
              }}
            />
            <p
              className="absolute right-4 whitespace-nowrap text-body-14-b text-gray-90"
              style={{ top: geometry.anchor.bottom + 59 }}
            >
              <span className="text-mint-60">서재에 등록한 책</span>을 빠르게 찾을 수 있어요
            </p>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}
