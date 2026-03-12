type Size = "12" | "14" | "18";

type Props = {
  text: string;
  size: Size;
  active?: boolean;
  onClick?: () => void;
};

const baseLayout = "inline-flex justify-center items-center select-none";

const sizeClassMap: Record<Size, string> = {
  "12": "px-2 py-1 text-btn-12-sb", 
  "14": "px-2 py-1 text-btn-14-sb",
  "18": "h-10 px-4 text-btn-18-m", 
};

export function Text({
  text,
  size,
  active = false,
  onClick,
}: Props) {
  const clickable = Boolean(onClick);

  const colorClass = active ? "text-gray-90" : "text-gray-60";

  return (
    <span
      onClick={onClick}
      tabIndex={clickable ? 0 : undefined}
      className={[
        baseLayout,
        sizeClassMap[size],
        colorClass,
      ].join(" ")}
    >
      {text}
    </span>
  );
}