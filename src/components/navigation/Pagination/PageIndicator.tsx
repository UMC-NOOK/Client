import Dot from "../Pagination/PageIndicator/Resource/Dot";

type Props = {
  cur: number;
  total: number;
};

export default function PageIndicator({
  cur,
  total,
}: Props) {
  return (
    <div className="inline-flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, idx) => (
        <Dot key={idx} current={idx === cur} />
      ))}
    </div>
  );
}