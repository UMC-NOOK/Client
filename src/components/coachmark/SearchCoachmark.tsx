import CoachmarkArrow from "./CoachmarkArrow";
import { useCoachmark } from "../../hooks/useCoachmark";
import CoachmarkOverlay from "./CoachmarkOverlay";

type SearchCoachmarkProps = {
  userId: number | undefined;
  /** 강조 대상인 '내 서재 검색' 탭이 선택된 상태에서만 안내를 띄운다. */
  isMyScope: boolean;
};

export default function SearchCoachmark({
  userId,
  isMyScope,
}: SearchCoachmarkProps) {
  const { isOpen, advance, dontShowAgain } = useCoachmark({
    userId,
    screen: "search",
    stepCount: 1,
  });

  return (
    <CoachmarkOverlay
      open={isOpen && isMyScope}
      dontShowAgain={dontShowAgain}
      anchorName="search-my-library"
      actionLabel="도서 검색 코치마크 완료"
      onAction={advance}
      scrollAnchorIntoView
      anchorViewportBottomInset={90}
      revealAnchor
      revealRadiusClassName="rounded-full"
    >
      {(geometry) => {
        return (
          <>
            <CoachmarkArrow
              variant={2}
              className="absolute"
              style={{
                left: geometry.app.width - 34,
                top: geometry.anchor.bottom,
              }}
            />
            <p
              className="absolute right-8.5 whitespace-nowrap text-body-14-b leading-none text-gray-90"
              style={{ top: geometry.anchor.bottom + 60 }}
            >
              <span className="text-mint-60">서재에 등록한 책</span>을 빠르게 찾을 수 있어요
            </p>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}
