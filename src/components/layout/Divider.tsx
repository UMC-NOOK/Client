// <Divider width={36} />
// <Divider width={"full"} />

type DividerProps = {
  width: number | string;
};

export default function Divider({ width }: DividerProps) {
  return (
    <div
      className={`bg-gradient-divider flex w-${width} h-px justify-center items-center`}
    ></div>
  );
}
