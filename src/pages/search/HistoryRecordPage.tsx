// src/pages/search/HistoryTimeTestPage.tsx
import React from "react";
import { HistoryRecord } from "../../components/content/list/HistoryRecord"; 
// ↑ 경로는 네 실제 파일 위치에 맞게 조정!
// (예: HistoryTime.tsx가 src/components/content/list/HistoryTime.tsx 라고 가정)

const MOCK = [
  {
    time: "2026.03.06 14:22",
  },
  {
    time: "2026.03.06 14:22 — 이것도 길어지면 말줄임 처리되어야 함 (ellipsis)",
  },
  {
    time: "2026.03.06 09:10",
  },
];

export default function HistoryRecordTestPage() {
  return (
    <main className="min-h-screen bg-gradient-background p-4">
      {/* '칸' (padding 16px) */}
      <section className="mx-auto w-full max-w-[375px] space-y-4">
        <header>
          <h1 className="text-title-20-b text-gray-100">HistoryTime Test</h1>
          <p className="mt-1 text-body-14-r text-gray-300">
            padding 16px(부모) + 내부 padding 12px(컴포넌트) 확인
          </p>
        </header>

        <div className="rounded-xl bg-gray-950 p-4 shadow-elevation-20">
          <div className="space-y-3">
            {MOCK.map((item, idx) => (
              <HistoryRecord key={idx} time={item.time} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}