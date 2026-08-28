// Client/src/components/action/Chip/Chip.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import Icon from "../Button/Icon";

type Variant = "none" | "icon";

type ChipProps = {
  text: string;
  variant: Variant;
  active?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  onIconClick?: () => void;
  iconAriaLabel?: string;
  textClassName?: string; // 타입 추가(비활성 글자색 오버라이드)
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "inline-flex items-center justify-center whitespace-nowrap text-sm gap-1 leading-[14px]";

const variantClassMap: Record<Variant, string> = {
  none: "py-3 px-4 rounded-[20px]",
  icon: "py-[6px] px-3 rounded-[8px]",
};

export default function Chip({
  text,
  variant,
  active = false,
  icon,
  onClick,
  onIconClick,
  iconAriaLabel = "삭제",
  textClassName,
  type = "button",
  ...props
}: ChipProps) {
  const colorClass = active
    ? "bg-mint-60 text-gray-10"
    : `bg-gray-17 ${textClassName ?? "text-gray-60"}`; // chip 기본색 gray-60 아닌 곳 -> textClassName

  return (
    <button
      type={type}
      onClick={onClick}
      className={[base, variantClassMap[variant], colorClass].join(" ")}
      {...props}
    >
      <span>{text}</span>

      {icon &&
        (onIconClick ? (
          <span
            role="button"
            tabIndex={0}
            aria-label={iconAriaLabel}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation();
              onIconClick();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onIconClick();
              }
            }}
            className="inline-flex items-center justify-center cursor-pointer"
          >
            <Icon size="xs">{icon}</Icon>
          </span>
        ) : (
          <Icon size="xs">{icon}</Icon>
        ))}
    </button>
  );
}
