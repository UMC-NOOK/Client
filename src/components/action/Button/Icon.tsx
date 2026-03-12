import type { HTMLAttributes, ReactNode } from "react";

type IconSize = "xs" | "s" | "m";

type IconFrameProps = {
  children: ReactNode; // 아이콘을 ReactNode로 받음
  size?: IconSize;
} & HTMLAttributes<HTMLSpanElement>;

const base = "items-center justify-center";

const sizeClassMap: Record<IconSize, string> = {
  xs: "inline-flex w-[18px] h-[18px] p-0.5",
  s: "inline-flex w-6 h-6 p-0.5",
  m: "inline-flex w-10 h-10 p-2",
};

export default function Icon({
  children,
  size = "s",
  ...props
}: IconFrameProps) {
  return (
    <span className={[sizeClassMap[size], base].join(" ")} {...props}>
      {children} {/* 이 부분에서 아이콘이 표시됨 */}
    </span>
  );
}