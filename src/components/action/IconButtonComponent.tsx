import type { HTMLAttributes, ReactNode } from "react";

type IconSize = "xs" | "s" | "m";

type IconFrameProps = {
  children: ReactNode; //화면에 렌더링할 수 있는 모든 것(문자 등등등...)
  size?: IconSize;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>;

const base = "items-center justify-center";

const sizeClassMap: Record<IconSize, string> = {
  xs: "inline-flex w-[18px] h-[18px] p-0.5",
  s: "inline-flex w-6 h-6 p-0.5",
  m: "inline-flex w-10 h-10 p-2",
};

export default function IconButtonComponent({
  children,
  size = "s",
  className = "",
  ...props
}: IconFrameProps) {
  return (
    <span className={[sizeClassMap[size], base, className].join(" ")} {...props}>
      {children}
    </span>
  );
}
