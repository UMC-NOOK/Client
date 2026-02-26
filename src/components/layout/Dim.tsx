type DimProps = {
  width: number | string;
  height: number | string;
};

export default function Dim({ width, height }: DimProps) {
  return <div className={`w-${width} h-${height} bg-black/50 absolute`} />;
}

// 해당 컴포넌트를 위에 쌓으려면 부모 요소에 relative를 주어야 함
