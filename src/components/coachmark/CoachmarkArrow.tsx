import type { CSSProperties } from "react";
import arrow1 from "../../assets/coachmark/arrow-1.svg";
import arrow2 from "../../assets/coachmark/arrow-2.svg";
import arrow3 from "../../assets/coachmark/arrow-3.svg";

type CoachmarkArrowProps = {
  variant: 1 | 2 | 3;
  layout?: "native" | "horizontal";
  className?: string;
  style?: CSSProperties;
};

const ARROWS = { 1: arrow1, 2: arrow2, 3: arrow3 };

export default function CoachmarkArrow({
  variant,
  layout = "native",
  className,
  style,
}: CoachmarkArrowProps) {
  if (layout === "horizontal") {
    // 가로형 배치의 중심을 유지하면서 원본 세로 SVG를 회전한다.
    return (
      <span aria-hidden="true" className={className} style={style}>
        <img
          src={ARROWS[variant]}
          alt=""
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 ${variant === 1 ? "-scale-x-100" : ""}`}
        />
      </span>
    );
  }

  return <img src={ARROWS[variant]} alt="" className={className} style={style} />;
}
