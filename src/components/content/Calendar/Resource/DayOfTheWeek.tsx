type Props = {
  text: string;
};

//white-space: nowrap; 줄바꿈되지 않고 한 줄로 유지
export default function DayOfTheWeek({
  text
}: Props) {
  return (
    <div className={["inline-flex min-h-[21px] items-center justify-center px-2 py-1"].join(" ")}>
      <span className="min-w-6 text-center text-label-13-r text-gray-60 whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}