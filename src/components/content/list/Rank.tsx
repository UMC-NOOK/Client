type RankItemProps = {
  rank: number;
  title: string;
};

export function Rank({ rank, title }: RankItemProps) {
  return (
    <div className={['flex w-full items-center gap-2 bg-transparent text-gray-90 py-1'].join(' ')}>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center">
        <span className="text-label-16-sb leading-[1.1]">{rank}</span>
      </div>

      <p className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-label-16-sb leading-[1.1]" title={title}>
        {title}
      </p>
    </div>
  );
}