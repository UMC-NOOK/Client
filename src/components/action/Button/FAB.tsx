import type { ButtonHTMLAttributes, ReactNode } from "react";

type FabSize = "m" | "l";
type FabVariant = "light" | "dark";

type Props = {
  icon: ReactNode;
  size?: FabSize;
  variant?: FabVariant;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const sizeClassMap: Record<FabSize, string> = {
  m: "h-10 w-10",
  l: "h-11 w-11",
};

const variantClassMap: Record<FabVariant, string> = {
  light: "bg-gray-90 shadow-elevation-20",
  dark: "bg-gray-25 shadow-elevation-20",
};

export default function FAB({
  icon,
  size = "m",
  variant = "light",
  className = "",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={[
        "inline-flex shrink-0 select-none items-center justify-center rounded-full",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizeClassMap[size],
        variantClassMap[variant],
        className,
      ].join(" ")}
      {...props}
    >
      <span className="flex h-6 w-6 justify-center items-center">{icon}</span>
    </button>
  );
}
