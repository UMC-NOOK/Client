// <Dim width={360} height={200} />
// <Dim width={"full"} height={200} />
// 해당 컴포넌트를 사용하려면 부모 요소에 relative를 주어야 함

type DimProps = {
  width: number | string;
  height: number | string;
  top?: number | string;
  left?: number | string;
};

export default function Dim({ width, height, top, left }: DimProps) {
  return (
    <div
      className={`w-${width} h-${height} bg-black/50 absolute ${top !== undefined ? "top-0" : ""} ${left !== undefined ? "left-0" : ""}`}
    />
  );
}
