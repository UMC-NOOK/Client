// src/pages/search/HistoryTimeTestPage.tsx
import React from "react";
import { HistoryTime } from "../../components/content/list/History/Time"; 
// ↑ 경로는 네 실제 파일 위치에 맞게 조정!
// (예: HistoryTime.tsx가 src/components/content/list/HistoryTime.tsx 라고 가정)

const MOCK = [
  {
    focus: "집중 모드",
    time: "2026.03.06 14:22",
  },
  {
    focus: "아주아주 긴 Focus 텍스트 테스트 — 한 줄 말줄임 처리 확인용",
    time: "2026.03.06 14:22 — 이것도 길어지면 말줄임 처리되어야 함 (ellipsis)",
  },
  {
    focus: "독서 기록",
    time: "2026.03.06 09:10",
  },
];

export default function HistoryTimeTestPage() {
  return (
    <main className="min-h-screen p-4">
      {/* '칸' (padding 16px) */}
      <section className="mx-auto w-full max-w-[375px] space-y-4">
        <header>
          <h1 className="text-title-20-b text-gray-100">HistoryTime Test</h1>
          <p className="mt-1 text-body-14-r text-gray-300">
            padding 16px(부모) + 내부 padding 12px(컴포넌트) 확인
          </p>
        </header>

        <div className="rounded-xl p-4 shadow-elevation-20">
          <div className="space-y-3">
            {MOCK.map((item, idx) => (
              <HistoryTime key={idx} focus={item.focus} time={item.time} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}