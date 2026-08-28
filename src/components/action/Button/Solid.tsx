import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "disabled" | "alert";
type Size = "s" | "m";

type ButtonProps = {
  text: string;
  variant?: Variant;
  size?: Size;
  /** 가로폭을 부모에 꽉 채울지 여부. 기본은 꽉 채움. */
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base = "inline-flex items-center justify-center whitespace-nowrap";

const variantClassMap: Record<Variant, string> = {
  primary: "bg-mint-60 text-gray-10",
  secondary: "bg-gray-25 text-gray-70",
  disabled: "bg-gray-25 text-gray-50",
  alert: "bg-red-20 text-red-1",
};

const sizeClassMap: Record<Size, string> = {
  s: "h-9.5 text-btn-14-sb rounded-sm px-8 py-3",
  m: "h-12 text-btn-16-sb rounded-lg px-6 py-4",
};

export default function Solid({
  text,
  variant = "primary",
  size = "m",
  fullWidth = true,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        base,
        fullWidth ? "w-full" : "",
        variantClassMap[variant],
        sizeClassMap[size],
        className,
      ].join(" ")}
      {...props}
    >
      {text}
    </button>
  );
}
