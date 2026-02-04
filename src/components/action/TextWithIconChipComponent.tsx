import type { ReactNode } from "react";
import IconButtonComponent from "./IconButtonComponent"; // 경로 맞춰줘

type TextWithIconButtonLikeProps = {
  text: ReactNode; // 텍스트만 props로 받음
  icon: ReactNode; // 아이콘(svg 컴포넌트/코드)
  onIconClick?: React.MouseEventHandler<HTMLSpanElement>; // 아이콘 클릭 필요할 때만
};

export default function TextWithIconChipComponent({
  text,
  icon,
  onIconClick,
}: TextWithIconButtonLikeProps) {
  return (
    <div className= "inline-flex items-center gap-1 h-[30px] py-1.5 px-3 rounded-lg text-[#ECECEC] bg-[#1B203B] text-sm whitespace-nowrap">
      <span>{text}</span>
      <IconButtonComponent size="xs" onClick={onIconClick}>
        {icon}
      </IconButtonComponent>
    </div>
  );
}
