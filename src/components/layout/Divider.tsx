export default function Divider(width: number, height: number) {
  return (
    <div
      className={`bg-gradient-divider flex w-${width} h-${height} justify-center items-center`}
    ></div>
  );
}
