import type { ButtonHTMLAttributes } from "react";

type Variant = "default" | "dark" | "danger";

type ButtonProps = {
  text: string;
  variant?: Variant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "inline-flex h-12 items-center justify-center whitespace-nowrap px-6 py-4 rounded-lg ";

const variantClassMap: Record<Variant, string> = {
  default: "bg-mint text-black",
  dark: "bg-gray-25 text-[#A2A7C3]",
  danger: "bg-gray-10 text-red-1",
};

export default function Solid({
  text,
  variant = "default",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[base, variantClassMap[variant], className].join(" ")}
      {...props}
    >
      {text}
    </button>
  );
}
