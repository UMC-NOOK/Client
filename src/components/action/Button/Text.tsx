import type { ReactNode } from "react";

type Size = "12" | "14" | "14r" | "18";

type Props = {
  children: ReactNode;
  size: Size;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  extraPadding?: boolean;
};

const baseLayout = "inline-flex justify-center items-center select-none";

const sizeClassMap: Record<Size, string> = {
  "12": "text-btn-12-sb",
  "14": "text-btn-14-sb",
  "14r": "text-btn-14-r",
  "18": "text-btn-18-m",
};

const paddingClassMap: Record<Size, string> = {
  "12": "px-2 py-1",
  "14": "px-2 py-1",
  "14r": "px-2 py-1",
  "18": "h-10 px-4",
};

export default function Text({
  children,
  size,
  active = false,
  onClick,
  className = "",
  extraPadding = false,
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
        extraPadding ? "" : paddingClassMap[size],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
