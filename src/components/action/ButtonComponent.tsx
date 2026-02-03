import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex h-12 items-center justify-center",
        "px-6 py-4 rounded-lg",
        "bg-[#3E1C26] text-white",
        "transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
