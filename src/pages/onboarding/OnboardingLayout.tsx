// src/components/layout/OnboardingLayout.tsx
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import ProgressIndicator from "../../components/navigation/ProgressIndicator";

type Props = {
  step: number;
  total?: number;
  left?: React.ReactNode;
  onClickLeft?: () => void;
  right?: React.ReactNode;
  onClickRight?: () => void;
  children: React.ReactNode;
};

export default function OnboardingLayout({
  step,
  total = 3,
  left,
  onClickLeft,
  right,
  onClickRight,
  children,
}: Props) {
  return (
    <div className="w-full pt-0">
      {/*  padding 없음 */}
      <TopNavigation
        left={left}
        onClickLeft={onClickLeft}
        right={right}
        onClickRight={onClickRight}
        className="mb-4"
      />

      <ProgressIndicator step={step} total={total} />

      {/*  padding */}
      <div className="px-4 mt-12">{children}</div>
    </div>
  );
}