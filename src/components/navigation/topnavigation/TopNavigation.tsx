//Client\src\components\navigation\topnavigation\TopNavigation.tsx
type TopNavigationProps = {
  left?: React.ReactNode; // 항상 버튼
  onClickLeft?: () => void; // 왼쪽 버튼 클릭 시 실행되는 함수
  center?: React.ReactNode; // 글씨 or 없음
  right?: React.ReactNode; // 버튼 or 글씨
  onClickRight?: () => void; // 오른쪽 버튼 클릭 시 실행되는 함수
  className?: string;
};

export default function TopNavigation({
  left,
  onClickLeft,
  center,
  right,
  onClickRight,
  className = "",
}: TopNavigationProps) {
  return (
    <header className={["w-full h-10 flex items-center", className].join(" ")}>
      {/* LEFT */}
      <div className="flex items-center justify-start w-10">
        {left && (
          <button onClick={onClickLeft} className="focus:outline-none">
            {left}
          </button>
        )}
      </div>

      {/* CENTER */}
      <div className="flex-1 flex items-center justify-center text-title-18-m text-gray-90">
        {center}
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end w-10">
        {onClickRight ? (
          <button onClick={onClickRight} className="focus:outline-none">
            {right}
          </button>
        ) : (
          <> {right}</>
        )}
      </div>
    </header>
  );
}
