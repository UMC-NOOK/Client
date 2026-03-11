import type { ButtonHTMLAttributes, ReactNode, SVGProps } from "react";
import Icon from "../Button/Icon"; // 경로 맞추기
import React from "react";

type Variant = "none" | "icon";

type ChipProps = {
  text: string;
  variant: Variant;
  active: boolean;  // 활성화 상태를 나타내는 props (default: false)
  icon?: ReactNode;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "inline-flex items-center justify-center whitespace-nowrap text-sm gap-1";

const variantClassMap: Record<Variant, string> = {
  none: "py-3 px-4 rounded-[20px]",
  icon: "py-[6px] px-3 rounded-[8px]"
};

export default function Chip({
  text,
  variant,
  active = false,  // 기본값은 false로 설정
  icon,
  onClick,
  type = "button",
  ...props
}: ChipProps) {
  const colorClass = active ? "bg-mint-60 text-gray-10" : "bg-gray-17 text-gray-60";

  return (
    <button
      type={type}
      onClick={onClick}
      className={[base, variantClassMap[variant], colorClass].join(" ")} // 배열을 문자열로 변경하기 위함
      {...props}
    >
      <span>{text}</span>
      {icon && (
        <Icon size="xs">
          {icon}
        </Icon>
      )}
    </button>
  );
}