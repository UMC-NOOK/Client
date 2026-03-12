// src/pages/RankListTestPage.tsx
import React from 'react';
import { Rank } from '../../components/content/List/Rank';

const MOCK_RANKS = [
  { rank: 0, title: 'The Pragmatic Programmer' },
  { rank: 1, title: 'Clean Code: A Handbook of Agile Software Craftsmanship' },
  { rank: 2, title: 'Refactoring: Improving the Design of Existing Code' },
  {
    rank: 3,
    title: '아주아주아주 긴 제목 테스트용 — 한 줄 말줄임이 제대로 적용되는지 확인하는 텍스트입니다',
  },
];

export default function RankListTestPage() {
  return (
    <main className="min-h-screen bg-gradient-background px-4 py-8">
      <section className="mx-auto w-full max-w-[375px]">
        {/* 헤더 */}
        <header className="mb-4">
          <h1 className="text-title-20-b text-gray-100">RankList Test</h1>
          <p className="mt-1 text-body-14-r text-gray-300">
            RankListComponent 렌더링 확인 페이지
          </p>
        </header>

        {/* 리스트 영역 */}
        <div className="rounded-xl bg-gray-950 p-4 shadow-elevation-20">
          <div className="space-y-3">
            {MOCK_RANKS.map((item) => (
              <Rank
                key={item.rank}
                rank={item.rank}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}