/*
<Theme
  imageUrl=""
  select={select}
  onClick={() => setSelect(!select)}
/>
*/

import Dim from "../layout/Dim";

type ThemeProps = {
  imageUrl: string;
  select: boolean;
  onClick: () => void;
};

export default function Theme({ imageUrl, select, onClick }: ThemeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={select}
      className={
        "relative size-20 shrink-0 overflow-clip rounded-md shadow-elevation-20 " +
        (select ? "outline-1 outline-gray-90 outline-solid" : "")
      }
    >
      <img src={imageUrl} alt="Theme" className="size-full object-cover" />
      {/* width/height는 "full"만 사용 — Dim은 이 prop을 런타임 템플릿 리터럴로 클래스에
          끼워 넣어서 Tailwind가 정적 스캔을 못 하는 값(예: 20)은 실제 CSS가 생성되지 않는다.
          w-full/h-full은 이미 다른 곳에서 리터럴로 쓰여 안전하다. */}
      {!select && <Dim width="full" height="full" top={0} left={0} />}
    </button>
  );
}
