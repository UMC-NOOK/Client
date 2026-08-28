import type { HTMLAttributes } from "react";

type Props = {
  text: string;
  active?: boolean; // default: false (비활성)
  danger?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function ContainerText({
  text,
  active = false,
  danger = false,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={[
        "flex w-full items-center py-4 text-btn-16-sb",
        danger ? "text-red-60" : active ? "text-gray-90" : "text-gray-70",
      ].join(" ")}
    >
      {text}
    </div>
  );
}
