import Solid from "../action/Button/Solid";

type Props = {
  width: number;
  onWidthChange: (width: number) => void;
};

export default function DevLayoutWidthControl({ width, onWidthChange }: Props) {
  if (!import.meta.env.DEV) return null;

  return (
    <aside
      aria-label="개발용 앱 너비 선택"
      className="fixed top-4 left-4 z-100 hidden w-48 flex-col gap-2 rounded-lg bg-gray-17 p-3 shadow-elevation-20 lg:flex"
    >
      <p className="text-label-14-sb text-gray-90">앱 너비 미리보기</p>
      <div role="group" aria-label="앱 최대 너비" className="flex flex-col gap-2">
        {[480, 375, 320].map((size) => (
          <Solid
            key={size}
            text={`${size}px`}
            size="s"
            variant={width === size ? "primary" : "secondary"}
            aria-pressed={width === size}
            onClick={() => onWidthChange(size)}
          />
        ))}
      </div>
      <p className="text-body-12-r text-gray-70">
        AppShell 최대 너비를 변경합니다. 브라우저 화면 크기는 유지됩니다.
        미디어 쿼리·고정 요소는 브라우저 기기 모드로 확인해주세요.
      </p>
    </aside>
  );
}
