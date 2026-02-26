type MaskGradientProps = {
  width: number | string;
  height: number | string;
};

export default function MaskGradient({ width, height }: MaskGradientProps) {
  return (
    <div className={`bg-gradient-mask absolute w-${width} h-${height}`}></div>
  );
}

// 해당 컴포넌트를 위에 쌓으려면 부모 요소에 relative를 주어야 함
