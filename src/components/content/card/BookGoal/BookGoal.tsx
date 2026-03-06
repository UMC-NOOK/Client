import React from "react";

// ✅ 프로젝트에서 실제 SVG 컴포넌트 경로로 바꿔줘
import BookIllust from "../../../../assets/icons/book_illust.svg"; //0
import BookIllust1to9 from "../../../../assets/icons/Book Illust_1.svg"; //1-9
import BookIllust50to59 from "../../../../assets/icons/Book Illust_50.svg"; //50-59
import BookIllust100 from "../../../../assets/icons/Book Illust_100.svg"; //100

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

const ICON_BY_VARIANT: Record<ReadingGoal, React.ReactNode> = {
  ZERO: <BookIllust />,
  PCT_1_9: <BookIllust1to9 />,
  PCT_50_59: <BookIllust50to59 />,
  PCT_100: <BookIllust100 />,
};

/**
 * 요구사항:
 * - message는 "띄워쓰기" 기준으로 줄바꿈해서 표시
 */
function splitBySpaceToLines(message: string) {
  return message
    .trim()
    .split(/\s+/g)
    .filter(Boolean);
}

export default function ReadingGoalCard({
  percent,
  message,
  className = "",
}: Props) {
  const lines = splitBySpaceToLines(message);

  return (
    <div
      className={[
        "flex w-full justify-between items-start p-[16px] rounded-[8px] bg-center bg-cover bg-no-repeat",
        className, ].join(" ")}
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* left text */}
      <div className="flex flex-col gap-[8px]">
        <p
          className={[
            "text-label-12-sb text-gray-70", // Gray-70
          ].join(" ")}
          style={{ fontFamily: "SUIT" }}
        >
          독서 목표
        </p>

        <p
          className={[
            "text-[16px] font-bold leading-[150%]",
            "text-[#ECECEC]", // Gray-90
          ].join(" ")}
          style={{ fontFamily: "SUIT" }}
        >
          {lines.map((word, idx) => (
            <React.Fragment key={`${word}-${idx}`}>
              {word}
              {idx !== lines.length - 1 ? <br /> : null}
            </React.Fragment>
          ))}
        </p>
      </div>

      {/* right svg */}
      <div className="shrink-0">{ICON_BY_VARIANT[variant]}</div>
    </div>
  );
}