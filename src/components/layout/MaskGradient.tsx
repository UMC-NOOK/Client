type MaskGradientProps = {
  width: number | string;
  height: number | string;
  top?: number | string;
  left?: number | string;
  className?: string;
};

export default function MaskGradient({
  width,
  height,
  top,
  left,
  className,
}: MaskGradientProps) {
  return (
    <div
      className={`bg-gradient-mask absolute w-${width} h-${height} ${top !== undefined ? "top-0" : ""} ${left !== undefined ? "left-0" : ""} ${className || ""}`}
    ></div>
  );
}
