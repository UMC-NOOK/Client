import type { ReactNode } from "react";

type Size = "12" | "14" | "18";

type Props = {
  children: ReactNode;
  size: Size;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

const baseLayout = "inline-flex justify-center items-center select-none";

const sizeClassMap: Record<Size, string> = {
  "12": "px-2 py-1 text-btn-12-sb", 
  "14": "px-2 py-1 text-btn-14-sb",
  "18": "h-10 px-4 text-btn-18-m", 
};

export default function Text({
  children,
  size,
  active = false,
  onClick,
  className = "",
}: Props) {
  const clickable = Boolean(onClick);

  const colorClass = active ? "text-gray-90" : "text-gray-40";

  return (
    <span
      onClick={onClick}
      tabIndex={clickable ? 0 : undefined}
      className={[
        baseLayout,
        sizeClassMap[size],
        colorClass,
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
