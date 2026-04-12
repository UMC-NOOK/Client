import Day from "./Day";
import Indicator, { type Percent } from "./Indicator";

type Props = {
  day: string;
  disable?: boolean;
  percent: Percent;
  onClick?: () => void;
};

export default function IndicatorSet({
  day,
  disable = true,
  percent = "none",
  onClick,
}: Props) {
  const isPaddingCell = day.trim() === "";

  if (isPaddingCell) {
    return (
      <div className="flex w-10 flex-col items-center gap-1">
        <Day text={day} disable={disable} />
        <div className="h-10 w-10 shrink-0" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-10 flex-col items-center gap-1"
    >
      <Day text={day} disable={disable} />
      <Indicator percent={percent} />
    </button>
  );
}