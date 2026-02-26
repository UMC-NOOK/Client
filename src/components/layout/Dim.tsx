type DimProps = {
  width: number;
  height: number;
};

export default function Dim({ width, height }: DimProps) {
  return <div className={`w-${width} h-${height} bg-black/50`} />;
}
