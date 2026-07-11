// src/components/navigation/tabs/TabBar.tsx
import type { ReactNode } from "react";

export type TabOption<T extends string = string> = {
  value: T;
  label: string;
};

type Variant = "default" | "underlineGradient";

type TabsProps<T extends string> = {
  options: readonly TabOption<T>[];
  value: T;
  onChange: (v: T) => void;

  /** ✅ 탭 하나당 고정 width (ex. 168) */
  buttonWidthPx?: number;

  variant?: Variant;
  className?: string;
};

type SlotProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  className?: string;
};

type Props<T extends string> = TabsProps<T> | SlotProps;

function isTabsProps<T extends string>(props: Props<T>): props is TabsProps<T> {
  return "options" in props;
}

export default function TabBar<T extends string>(props: Props<T>) {
  if (!isTabsProps(props)) {
    const { left, center, right, className = "" } = props;

    return (
      <header
        className={[
          "relative h-10 w-full flex items-center justify-center",
          className,
        ].join(" ")}
      >
        <div className="absolute left-0 flex items-center">{left}</div>
        <div className="flex items-center justify-center">{center}</div>
        <div className="absolute right-0 flex items-center">{right}</div>
      </header>
    );
  }

  const {
  options,
  value,
  onChange,
  buttonWidthPx,
  variant = "default",
  className = "",
  } = props;

  return (
    <nav
      className={["relative h-[38px] flex items-center", className].join(" ")}
    >
      {/* 항상 떠있는 divider */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-divider"
      />

      {options.map((opt) => {
        const selected = opt.value === value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-current={selected ? "page" : undefined}
            style={buttonWidthPx ? { width: buttonWidthPx } : undefined}
            className={[
              "h-10 relative flex items-center justify-center",
              buttonWidthPx ? "" : "flex-1",

              // underlineGradient 선택 시 배경
              variant === "underlineGradient" && selected
                ? "bg-[linear-gradient(180deg,rgba(31,39,81,0)_0%,#1F2751_100%)]"
                : "",
            ].join(" ")}
          >
            {/* underline */}
            <span
              aria-hidden
              className={[
                "absolute left-0 right-0 bottom-0 h-0.5",
                selected ? "bg-gray-90" : "bg-transparent",
              ].join(" ")}
            />

            {/* 텍스트 */}
            <span
              className={[
                "truncate text-center",
                variant === "default" ? "text-btn-16-sb" : "text-btn-14-sb",
                selected ? "text-gray-90" : "text-gray-50",
              ].join(" ")}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
