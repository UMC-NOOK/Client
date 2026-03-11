import { type ReactNode } from "react";

type Props = {
  icon: ReactNode; 
  onClick?: () => void;
};

export function FAB({
  icon,
  onClick,
}: Props) {
  const clickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      className={[
        "inline-flex items-center rounded-[32px] select-none p-2 bg-gray-90", //select-none : svg 가 파란색으로 선택되지 않도록 방지하는 용도
      ].join(" ")}
    >
        <span className="flex h-6 w-6 justify-center items-center">
                {icon}
        </span>
    </div>
  );
}