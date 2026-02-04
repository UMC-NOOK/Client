type TopNavigationProps = {
  left?: React.ReactNode;     // 항상 버튼
  center?: React.ReactNode;   // 글씨 or 없음
  right?: React.ReactNode;    // 버튼 or 글씨

  className?: string;
};

export default function TopNavigation({
  left,
  center,
  right,
  className = "",
}: TopNavigationProps) {
  return (
    <header
      className={[
        "w-full h-10 flex items-center",
        className,
      ].join(" ")}
    >
      {/* LEFT */}
      <div className="flex items-center justify-start w-10">
        {left}
      </div>

      {/* CENTER */}
      <div className="flex-1 flex items-center justify-center">
        {center}
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end w-10">
        {right}
      </div>
    </header>
  );
}
