import React from "react";
import { HistoryInfoCard } from "../../components/content/List/HIstory";

export default function HistoryInfoCardTestPage() {
  return (
    <main className="min-h-screen bg-neutral-100 py-8">
      <section className="mx-auto flex w-full max-w-[375px] flex-col gap-4 rounded-[16px] bg-[#0B0F23] p-4">
        <p className="text-sm text-white/80">HistoryInfoCard Test</p>

        <HistoryInfoCard
          variant="history"
          time="2025.09.11"
        />

        <HistoryInfoCard
          variant="time"
          title="집중 시간"
          time="01:24:12"
        />

        <HistoryInfoCard
          variant="time"
          title="아주 긴 포커스 제목이 들어갔을 때 한 줄 말줄임이 잘 되는지 확인하는 테스트"
          time="12:59:59"
        />
      </section>
    </main>
  );
}