import searchIcon from "../../assets/icons/search.svg";
import arrowRight from "../../assets/icons/arrow_right.svg";
import focusIcon from "../../assets/icons/focus.svg";
import bookIcon from "../../assets/icons/book_gray_40.svg";
import closeIcon from "../../assets/icons/close.svg";
import goalHalf from "../../assets/coachmark/library-goal-half.svg";
import finger from "../../assets/coachmark/finger.svg";
import sampleBookCover from "../../assets/coachmark/sample-book-cover.png";
import BookGoal from "../content/card/BookGoal/BookGoal";
import CoachmarkOverlay, {
  CoachmarkText,
  type CoachmarkGeometry,
} from "./CoachmarkOverlay";
import { useCoachmark } from "../../hooks/useCoachmark";
import CoachmarkArrow from "./CoachmarkArrow";

type LibraryCoachmarkProps = {
  userId: number | undefined;
  nickname: string;
};

function appX(geometry: CoachmarkGeometry) {
  return geometry.anchor.left - geometry.app.left;
}

function SearchStep({
  open,
  onNext,
}: {
  open: boolean;
  onNext: () => void;
}) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="library-search"
      actionLabel="도서 검색 안내 다음 단계"
      onAction={onNext}
      highlight={
        <div className="flex size-full items-center justify-center rounded-sm bg-gray-17 p-2">
          <img src={searchIcon} alt="" className="size-6" />
        </div>
      }
    >
      {(geometry) => {
        const x = Math.max(16, geometry.app.width - 173);
        const y = Math.min(
          geometry.viewportHeight - 74,
          geometry.anchor.bottom + 45,
        );

        return (
          <>
            <CoachmarkArrow
              variant={1}
              className="absolute"
              style={{
                left: appX(geometry) + geometry.anchor.width - 8,
                top: geometry.anchor.bottom + 10,
              }}
            />
            <div className="absolute" style={{ left: x, top: y }}>
              <CoachmarkText
                align="left"
                compact
                title="도서 검색"
                description="원하는 책을 서재에 등록해요"
              />
            </div>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

function LibrarySummaryStep({
  open,
  onNext,
  nickname,
}: {
  open: boolean;
  onNext: () => void;
  nickname: string;
}) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="library-summary"
      actionLabel="서재 전체 보기 안내 다음 단계"
      onAction={onNext}
      highlightInset={{ top: 11, right: 16, bottom: 22, left: 16 }}
      highlight={
        <div className="flex size-full flex-col bg-gray-17 px-4 pb-4 pt-2.75">
          <p className="text-title-20-b text-gray-90">{nickname}님의 서재에</p>
          <div className="flex items-center gap-1">
            <p className="text-title-20-b text-gray-90">
              <span className="text-yellow-70">0권</span>의 책이 있어요.
            </p>
            <img src={arrowRight} alt="" className="size-6" />
          </div>
        </div>
      }
    >
      {(geometry) => {
        const textTop = Math.min(
          geometry.viewportHeight - 73,
          geometry.anchor.top + 149,
        );
        const textLeft = Math.max(16, geometry.app.width - 221);

        return (
          <>
            <img
              src={finger}
              alt=""
              className="absolute"
              style={{
                left: appX(geometry) + geometry.anchor.width - 151,
                top: geometry.anchor.top + 51,
              }}
            />
            <CoachmarkArrow
              variant={2}
              className="absolute"
              style={{
                left: geometry.app.width - 112,
                top: geometry.anchor.top + 98,
              }}
            />
            <div className="absolute" style={{ left: textLeft, top: textTop }}>
              <CoachmarkText
                align="left"
                compact
                title="서재 전체 보기"
                description="화살표를 클릭해 내 서재로 이동해요"
              />
            </div>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

function GoalStep({ open, onNext }: { open: boolean; onNext: () => void }) {
  return (
    <CoachmarkOverlay
      open={open}
      anchorName="library-goal"
      actionLabel="독서 목표 안내 다음 단계"
      onAction={onNext}
      highlight={
        <div className="size-full pt-4">
          <BookGoal
            percent="ZERO"
            message="100권까지 100권 남았어요."
            variant="coachmark"
          />
        </div>
      }
    >
      {(geometry) => {
        const firstTextTop = geometry.anchor.bottom + 34;
        const booksTop = firstTextTop + 63;
        const secondTextTop = booksTop + 90;

        return (
          <>
            <img
              src={finger}
              alt=""
              className="absolute"
              style={{
                left: appX(geometry) + 122,
                top: geometry.anchor.bottom - 19,
              }}
            />
            <CoachmarkArrow
              variant={1}
              className="absolute -scale-x-100"
              style={{ left: appX(geometry) + 2.6, top: geometry.anchor.bottom }}
            />
            <div className="absolute left-4" style={{ top: firstTextTop }}>
              <CoachmarkText
                align="left"
                compact
                title="서재 전체 보기"
                description="화살표를 클릭해 내 서재로 이동해요"
              />
            </div>
            <CoachmarkArrow
              variant={3}
              className="absolute"
              style={{
                left: appX(geometry) + geometry.anchor.width - 24,
                top: geometry.anchor.bottom - 7,
              }}
            />
            <img
              src={goalHalf}
              alt=""
              className="absolute"
              style={{ left: geometry.app.width - 153, top: booksTop }}
            />
            <div
              className="absolute"
              style={{ left: Math.max(16, geometry.app.width - 221), top: secondTextTop }}
            >
              <CoachmarkText
                align="left"
                compact
                title="서재 전체 목표 달성률"
                description="완독할 때마다 책 게이지가 채워져요"
              />
            </div>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

function CalendarStep({ open, onNext }: { open: boolean; onNext: () => void }) {
  const sheetHeight = 210;

  return (
    <CoachmarkOverlay
      open={open}
      anchorName="library-calendar-view"
      actionLabel="서재 코치마크 완료"
      onAction={onNext}
      anchorViewportBottomInset={sheetHeight + 160}
      highlight={
        <div className="flex size-full items-center rounded-sm bg-gray-17">
          <span className="flex size-10 items-center justify-center">
            <img src={focusIcon} alt="" className="size-6" />
          </span>
          <span className="flex size-10 items-center justify-center">
            <img src={bookIcon} alt="" className="size-6" />
          </span>
        </div>
      }
      additionalActions={
        <button
          type="button"
          aria-label="하단 상세 정보 안내 완료"
          onClick={onNext}
          className="pointer-events-auto absolute inset-x-0 bottom-0 cursor-pointer bg-transparent"
          style={{ height: sheetHeight }}
        />
      }
    >
      {(geometry) => {
        const anchorX = appX(geometry);
        const sheetTop = geometry.viewportHeight - sheetHeight;

        return (
          <>
            <CoachmarkArrow
              variant={2}
              className="absolute"
              style={{ left: anchorX + 55, top: geometry.anchor.bottom + 5 }}
            />
            <CoachmarkArrow
              variant={1}
              className="absolute"
              style={{ left: anchorX + 20, top: geometry.anchor.bottom + 5 }}
            />
            <p
              className="absolute whitespace-nowrap text-body-14-b leading-none text-gray-90"
              style={{ right: geometry.app.width - anchorX - 16.5, top: geometry.anchor.bottom + 37 }}
            >
              일별 <span className="text-mint-60">포커스 시간</span>을 비교해요
            </p>
            <p
              className="absolute whitespace-nowrap text-body-14-b leading-none text-gray-90"
              style={{ right: geometry.app.width - anchorX - 55, top: geometry.anchor.bottom + 70 }}
            >
              독서한 <span className="text-mint-60">책의 표지</span>를 모아 봐요
            </p>

            <p
              className="absolute left-6 whitespace-nowrap text-body-14-b leading-none text-gray-90"
              style={{ top: sheetTop - 55 }}
            >
              날짜를 클릭하면 <span className="text-mint-60">상세 정보</span>가 떠요
            </p>
            <CoachmarkArrow
              variant={1}
              className="absolute rotate-180"
              style={{ left: 32.05, top: sheetTop - 28 }}
            />

            <div
              className="absolute bottom-0 left-0 flex w-full flex-col rounded-t-2xl bg-gray-15 px-4 pb-8 pt-4"
              style={{ height: sheetHeight }}
            >
              <div className="flex h-10 items-center justify-between">
                <span className="size-10" />
                <p className="text-title-18-m text-gray-90">12월 20일</p>
                <span className="flex size-10 items-center justify-center">
                  <img src={closeIcon} alt="" className="size-6" />
                </span>
              </div>
              <div className="relative mt-4 flex h-26.5 gap-3 py-3">
                <img
                  src={sampleBookCover}
                  alt=""
                  className="h-20.5 w-14 rounded-xs object-cover"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-label-14-sb leading-normal text-gray-90">첫사랑의 침공</p>
                  <p className="text-body-13-r text-gray-90">권혁일</p>
                  <p className="absolute left-17 top-19.5 flex items-center gap-1 text-label-13-sb text-gray-60">
                    <img src={focusIcon} alt="" className="size-4" />
                    01:00:30
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      }}
    </CoachmarkOverlay>
  );
}

export default function LibraryCoachmark({
  userId,
  nickname,
}: LibraryCoachmarkProps) {
  const { isOpen, step, advance } = useCoachmark({
    userId,
    screen: "library",
    stepCount: 4,
  });

  return (
    <>
      <SearchStep open={isOpen && step === 0} onNext={advance} />
      <LibrarySummaryStep
        open={isOpen && step === 1}
        onNext={advance}
        nickname={nickname || "누키"}
      />
      <GoalStep open={isOpen && step === 2} onNext={advance} />
      <CalendarStep open={isOpen && step === 3} onNext={advance} />
    </>
  );
}
