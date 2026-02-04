// src/components/navigation/ProgressIndicator.tsx

type Props = {
  /** 현재 단계 (0부터 시작) */
  step: number;
  /** 총 단계 수 */
  total: number;
  /** 바 높이 */
  heightClassName?: string; // default: "h-1"
  /** 좌우 패딩  */
  wrapperClassName?: string; // default: "w-full px-1"
};

export default function ProgressBar({
  step,
  total,
  heightClassName = "h-1",
  wrapperClassName = "w-full px-1",
}: Props) {
  const safeTotal = Math.max(1, total);
  const maxIndex = safeTotal - 1;

  let percent = 0;

  if (maxIndex > 0) {
    const clampedStep = Math.min(Math.max(step - 1, 0), maxIndex);
    percent = (clampedStep / maxIndex) * 100;
  }

  return (
    <div className={wrapperClassName}>
      <div
        className={[
          "w-full",
          heightClassName,
          "rounded-[80px] bg-gray-800 relative overflow-hidden",
        ].join(" ")}
      >
        <div
          className="h-full bg-gray-100 rounded-[80px] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
