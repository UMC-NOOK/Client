type DividerProps = {
  width: number;
  height: number;
};

export default function Divider({ width, height }: DividerProps) {
  return (
    <div
      className={`bg-gradient-divider flex w-${width} h-${height} justify-center items-center`}
    ></div>
  );
}
