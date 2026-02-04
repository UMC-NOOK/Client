import type { ButtonHTMLAttributes, ReactNode } from "react";

type ChipVariant = "default" | "selected";

type ChipProps = {
  children: ReactNode;
  variant?: ChipVariant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base = "inline-flex items-center justify-center whitespace-nowrap py-3 px-4 rounded-[20px] text-sm ";

const variantClassMap: Record<ChipVariant, string> = {
  default: "bg-gray-900 text-gray-400",
  selected: "bg-mint text-gray-1000",
};

export default function ChipComponent({
  children,
  variant = "default",
  className = "",
  type = "button",
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      className={[base, variantClassMap[variant], className].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
