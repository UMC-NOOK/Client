import BookIllust from "../../../../assets/icons/book_illust.svg";
import BookIllust1to9 from "../../../../assets/icons/book_illust_1.svg";
import BookIllust10to19 from "../../../../assets/icons/book_illust_10.svg";
import BookIllust20to29 from "../../../../assets/icons/book_illust_20.svg";
import BookIllust30to39 from "../../../../assets/icons/book_illust_30.svg";
import BookIllust40to49 from "../../../../assets/icons/book_illust_40.svg";
import BookIllust50to59 from "../../../../assets/icons/book_illust_50.svg";
import BookIllust60to69 from "../../../../assets/icons/book_illust_60.svg";
import BookIllust70to79 from "../../../../assets/icons/book_illust_70.svg";
import BookIllust80to89 from "../../../../assets/icons/book_illust_80.svg";
import BookIllust90to99 from "../../../../assets/icons/book_illust_90.svg";
import BookIllust100 from "../../../../assets/icons/book_illust_100.svg";

import bg from "../../../../assets/images/reading_goal.jpg";

type ReadingGoal =
  | "ZERO"
  | "PCT_1_9"
  | "PCT_10_19"
  | "PCT_20_29"
  | "PCT_30_39"
  | "PCT_40_49"
  | "PCT_50_59"
  | "PCT_60_69"
  | "PCT_70_79"
  | "PCT_80_89"
  | "PCT_90_99"
  | "PCT_100";

type ZeroProps = {
  percent: "ZERO";
};

type NonZeroPercent = Exclude<ReadingGoal, "ZERO">;

type NonZeroProps = {
  percent: NonZeroPercent;
  message: string;
};

type Props = ZeroProps | NonZeroProps;

const ICON_BY_VARIANT: Record<ReadingGoal, string> = {
  ZERO: BookIllust,
  PCT_1_9: BookIllust1to9,
  PCT_10_19: BookIllust10to19,
  PCT_20_29: BookIllust20to29,
  PCT_30_39: BookIllust30to39,
  PCT_40_49: BookIllust40to49,
  PCT_50_59: BookIllust50to59,
  PCT_60_69: BookIllust60to69,
  PCT_70_79: BookIllust70to79,
  PCT_80_89: BookIllust80to89,
  PCT_90_99: BookIllust90to99,
  PCT_100: BookIllust100,
};

function splitByUntil(message: string) {
  const s = message.trim();
  const idx = s.indexOf("까지");

  if (idx === -1) return [s];

  const cut = idx + "까지".length;
  const line1 = s.slice(0, cut).trim();
  const line2 = s.slice(cut).trim();

  return line2 ? [line1, line2] : [line1];
}

function splitGoalText(text: string) {
  const match = text.match(/^(.+?까지)\s*(.+)$/);

  if (!match) {
    return [text];
  }

  return [match[1], match[2]];
}

export default function BookGoal(props: Props) {
  const { percent } = props;
  const resolvedMessage = percent === "ZERO" ? "독서 목표를 설정하세요!" : props.message;
  const lines = splitByUntil(resolvedMessage);

  return (
    <div
      className="flex w-full items-start justify-between rounded-[8px] bg-center bg-cover bg-no-repeat p-4"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="flex flex-col gap-1">
        <p className="text-label-12-sb text-gray-70">독서 목표</p>

        <div className="flex flex-col items-start text-label-16-sb text-gray-90 gap-2 pt-1">
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>

      <div className="shrink-0">
        <img src={ICON_BY_VARIANT[percent]} alt="" />
      </div>
    </div>
  );
}