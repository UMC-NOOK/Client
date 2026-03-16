type Props = {
  current?: boolean;
};

export default function Dot({
  current = false,
}: Props) {
  return (
    <div
      className={[
        "h-[6px] w-[6px] rounded-full",
        current ? "bg-gray-80" : "bg-gray-35",
      ].join(" ")}
    />
  );
}