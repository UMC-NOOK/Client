//Client\src\components\navigation\tabs\Text.tsx
export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (v: T) => void;

  className?: string;

  ariaLabel?: string;

  variant?: "fluid" | "fixed";

  buttonWidthPx?: number;
};

export default function Text<T extends string>({
  options,
  value,
  onChange,
  buttonWidthPx,
  className = "",
  ariaLabel = "segmented control",
}: Props<T>) {
  const containerStyle = buttonWidthPx
    ? { width: options.length * buttonWidthPx }
    : undefined;

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={containerStyle}
      className={[
        "rounded-[20px] bg-gray-17 flex relative",
        buttonWidthPx ? "" : "w-full",
        className,
      ].join(" ")}
    >
      {options.map((opt) => {
        const active = opt.value === value;

        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            style={buttonWidthPx ? { width: buttonWidthPx } : undefined}
            className={[
              "relative flex h-10 items-center justify-center rounded-[20px] z-10",
              buttonWidthPx ? "" : "flex-1", // 변동되는 w 부분 인자로 넘겨주면 변경 가능
              active ? "bg-gray-30" : "",
            ].join(" ")}
          >
            <span
              className={[
                "truncate text-label-16-sb",
                active ? "text-gray-90" : "text-gray-50",
              ].join(" ")}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
