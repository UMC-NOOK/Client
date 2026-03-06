import React from "react";

import BookIllust from "../../../../assets/icons/book_illust.svg"; //0
import BookIllust1to9 from "../../../../assets/icons/book_illust_1.svg"; //1-9
import BookIllust50to59 from "../../../../assets/icons/book_illust_50.svg"; //50-59
import BookIllust100 from "../../../../assets/icons/book_illust_100.svg"; //100

import bg from "../../../../assets/images/reading_goal.jpg" //bg

type ReadingGoal = "ZERO" | "PCT_1_9" | "PCT_50_59" | "PCT_100";

type Props = {
  /** 퍼센트 */
  percent: ReadingGoal;
  /** 본문 텍스트(파라미터) */
  message: string;
  /** (옵션) className 확장 */
  className?: string;
};

const ICON_BY_VARIANT: Record<ReadingGoal, string> = {
  ZERO: BookIllust,
  PCT_1_9: BookIllust1to9,
  PCT_50_59: BookIllust50to59,
  PCT_100: BookIllust100,
};

function splitByUntil(message: string) {
  const s = message.trim();
  const idx = s.indexOf("까지");
  if (idx === -1) return [s]; // '까지' 없으면 한 줄

  const cut = idx + "까지".length;
  const line1 = s.slice(0, cut).trim();   // ~까지
  const line2 = s.slice(cut).trim();      // 나머지

  return line2 ? [line1, line2] : [line1];
}

export function BookGoal({
  percent,
  message,
  className = "",
}: Props) {
  const lines = splitByUntil(message);

  return (
        <div
        className={[
            "flex w-full justify-between items-start p-4 rounded-[8px] bg-center bg-cover bg-no-repeat",
            className, ].join(" ")}
        style={{
            backgroundImage: `url(${bg})`,
        }}
        >
        {/* left text */}
        <div className="flex flex-col gap-2">
            <p
            className={[
                "text-label-12-sb text-gray-70", ].join(" ")}>
            독서 목표
            </p>

            <p className={["text-label-16-sb text-gray-90", ].join(" ")}>
                {lines.map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        {i !== lines.length - 1 ? <br /> : null}
                    </React.Fragment>
                ))}
            </p>
        </div>

        <div className="shrink-0">
            <img src={ICON_BY_VARIANT[percent]} alt="" />
        </div>
    </div>
  );
}