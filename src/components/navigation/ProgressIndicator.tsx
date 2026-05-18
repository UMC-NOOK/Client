import { useEffect, useState } from "react";

type Props = {
  step: number;
  total: number;
  heightClassName?: string;
  wrapperClassName?: string;
};

export default function ProgressIndicator({
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
    percent = clampedStep / maxIndex;
  }

  // 🔥 핵심: mount 애니메이션용 state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={wrapperClassName}>
      <div
        className={[
          "w-full",
          heightClassName,
          "rounded-[80px] bg-gray-25 relative overflow-hidden",
        ].join(" ")}
      >
        <div
          className="h-full bg-gray-90 rounded-[80px] origin-left transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: `scaleX(${mounted ? percent : 0})`,
          }}
        />
      </div>
    </div>
  );
}