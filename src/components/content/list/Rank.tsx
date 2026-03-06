import React from 'react';

type RankItemProps = {
  rank: number;      // 백엔드에서 내려주는 순위
  title: string;     // 백엔드에서 내려주는 책 제목
  className?: string;
};

export function RankListComponent({ rank, title, className }: RankItemProps) {
  return (
    <div
      className={[
        // layout
        'flex items-center gap-2 py-1',
        // width: 343px
        'w-[343px]',
        // text color: Gray/gray-100
        'text-gray-100',
        className ?? '',
      ].join(' ')}
    >
      {/* Rank */}
      <div
        className={[
          'flex items-center justify-center',
          'w-7 h-7', // 28px
          'shrink-0',
          // (명시된 padding: 1px 10px는 w/h 고정과 충돌 가능해서,
          //  실제 UI는 중앙정렬로 맞추는 게 더 안전함)
        ].join(' ')}
      >
        <span className="text-label-16-sb leading-none">{rank}</span>
      </div>

      {/* Title */}
      <p
        className={[
          'flex-1',
          'overflow-hidden text-ellipsis',
          'text-label-16-sb',
        ].join(' ')}
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1,
        }}
        title={title} // hover 시 전체 제목 확인용(선택)
      >
        {title}
      </p>
    </div>
  );
}