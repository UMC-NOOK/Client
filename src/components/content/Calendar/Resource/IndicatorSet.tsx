import Day from "../../Calendar/Resource/Day";
import Indicator, { type Percent } from "../Resource/Indicator";

type Props = {
  day: string;
  disable?: boolean;
  percent?: Percent;
};

export default function IndicatorSet({
    day,
    disable=true,
    percent="none"
}: Props) {

  return (
    <div className="flex w-10 flex-col items-start gap-1">
      <Day text={day} disable={disable} />

      <Indicator percent={percent} />
    </div>
  );
}