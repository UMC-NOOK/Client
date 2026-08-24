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
      {/* Dim의 width/height prop은 동적으로 조립돼 Tailwind가 못 읽는다. "full"만 안전하다. */}
      {!select && <Dim width="full" height="full" top={0} left={0} />}
    </button>
  );
}
