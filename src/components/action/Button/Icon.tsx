import type { HTMLAttributes, ReactNode } from "react";

type IconSize = "xs" | "s" | "m";

type IconFrameProps = {
  children: ReactNode; // 아이콘을 ReactNode로 받음
  size?: IconSize;
} & HTMLAttributes<HTMLSpanElement>;

/** SVG를 img로 넣을 때 파일마다 width/height가 달라도 프레임 안에 맞게 스케일 */
const base = [
  "box-border inline-grid shrink-0 place-items-center justify-center ",
  "[&_img]:block [&_img]:h-full [&_img]:w-full [&_img]:object-contain",
].join(" ");

const sizeClassMap: Record<IconSize, string> = {
  xs: "h-[18px] w-[18px] p-0.5",
  s: "h-6 w-6 p-0.5",
  m: "h-10 w-10 p-2",
};

export default function Icon({
  children,
  size = "xs",
  ...props
}: IconFrameProps) {
  return (
    <span className={[sizeClassMap[size], base].join(" ")} {...props}>
      {children} {/* 이 부분에서 아이콘이 표시됨 */}
    </span>
  );
}