import Day from "./Day";
import Indicator, { type Percent } from "./Indicator";

type Props = {
  day: string;
  disable?: boolean;
  percent: Percent;
};

export default function IndicatorSet({
    day,
    disable=true,
    percent="none"
}: Props) {
  /** 월 앞 빈 칸 — 인디케이터(none/base.svg)를 그리지 않아 배경과 색 안 맞는 문제 방지 */
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
    <div className="flex w-10 flex-col items-center gap-1">
      <Day text={day} disable={disable} />
      <Indicator percent={percent} />
    </div>
  );
}