// <MaskGradient width={360} height={200} />
// <MaskGradient width={"full"} height={200} />
// 해당 컴포넌트를 사용하려면 부모 요소에 relative를 주어야 함

type MaskGradientProps = {
  width: number | string;
  height: number | string;
  top?: number | string;
  left?: number | string;
};

export default function MaskGradient({
  width,
  height,
  top,
  left,
}: MaskGradientProps) {
  return (
    <div
      className={`bg-gradient-mask absolute w-${width} h-${height} ${top !== undefined ? "top-0" : ""} ${left !== undefined ? "left-0" : ""}`}
    ></div>
  );
}
