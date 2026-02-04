type Props = {
  label: string;
  active: boolean;
  onClick: () => void;

  widthPx?: number;

  disabled?: boolean;
};

export default function SegmentedButton({
  label,
  active,
  onClick,
  widthPx,
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      disabled={disabled}
      style={widthPx ? { width: widthPx } : undefined}
      className={[
        "flex items-center justify-center gap-2",
        "h-10 px-4 py-3",
        "rounded-[20px]",
        "overflow-hidden text-ellipsis whitespace-nowrap",

        // 폭: widthPx 없으면 flex-1로 가변
        widthPx ? "" : "flex-1",

        active ? "bg-gray-700" : "bg-gray-900",

        active ? "text-gray-100" : "text-gray-500",

        "text-label-16-sb",

        disabled ? "opacity-50 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
