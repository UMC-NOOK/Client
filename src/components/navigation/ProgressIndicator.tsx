// src/components/navigation/ProgressIndicator.tsx

type Props = {
  /** 현재 단계 (1부터 시작) */
  step: number;
  /** 총 단계 수 */
  total: number;
  /** 바 높이 (tailwind class) */
  heightClassName?: string; // default: "h-1"
  /** 좌우 패딩 (레이아웃 맞추기용) */
  wrapperClassName?: string; // default: "w-full px-1"
};

export default function ProgressBar({
  step,
  total,
  heightClassName = "h-1",
  wrapperClassName = "w-full px-1",
}: Props) {
  // 안전장치: 0~total 범위로 clamp
  const safeTotal = Math.max(1, total);
  const safeStep = Math.min(Math.max(step, 0), safeTotal);

  const percent = (safeStep / safeTotal) * 100;

  return (
    <div className={wrapperClassName}>
      <div className={["w-full", heightClassName, "rounded-[80px] bg-gray-800 relative overflow-hidden"].join(" ")}>
        <div
          className="h-full bg-gray-100 rounded-[80px] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
