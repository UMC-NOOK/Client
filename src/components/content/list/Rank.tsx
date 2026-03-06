import React from 'react';

type RankItemProps = {
  rank: number;
  title: string;
  className?: string;
};

export function Rank({ rank, title, className }: RankItemProps) {
  return (
    <div className={['flex w-full items-center gap-2 text-gray-100', className ?? ''].join(' ')}>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center">
        <span className="text-label-16-sb leading-[1.1]">{rank}</span>
      </div>

      <p className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-label-16-sb leading-[1.1]" title={title}>
        {title}
      </p>
    </div>
  );
}