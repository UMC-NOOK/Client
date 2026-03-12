// src/pages/search/HistoryRecordWithDateTestPage.tsx
import React from "react";

// ✅ 너 프로젝트 폴더 구조에 맞게 경로만 맞춰줘
// (VSCode에서 파일 우클릭 → Copy Relative Path 추천)
import { HistoryRecord } from "../../components/content/List/History/Record";
import { ResourceDate } from "../../components/content/List/Resource/Date";

export default function HistoryRecordWithDateTestPage() {
  return (
    <main className="min-h-screen bg-gradient-background">
      <section className="mx-auto w-full max-w-[375px] space-y-4">
        <header>
          <h1 className="text-title-20-b text-gray-100">History + Date Test</h1>
          <p className="mt-1 text-body-14-r text-gray-300">
            ResourceDate + HistoryRecord 조합 레이아웃 확인
          </p>
        </header>
        <div
            className="flex w-full flex-col gap-2 ">
            {/* ✅ 사진처럼: 왼쪽 Date(32px) + 오른쪽 카드(남은 폭) */}
            <div className="rounded-xl gap-2 shadow-elevation-20">
            <div className="flex items-start gap-2">
                {/* 왼쪽 날짜 */}
                <ResourceDate topText="01.12" bottomText="2026" />

                {/* 오른쪽 카드: 남은 영역 꽉 채우기 */}
                <div className="min-w-0 flex-1">
                <HistoryRecord time="고통을 피하지 않는 전진한 문장들 누군가의 가장 아..." />
                </div>
            </div>
            </div>

            {/* 추가 케이스: 텍스트 더 길게 */}
            <div className="flex items-start gap-2">
                <ResourceDate topText="12.31" bottomText="2026" />
                <div className="min-w-0 flex-1">
                <HistoryRecord time="텍스트가 아주 길어질 때 한 줄 말줄임(ellipsis)이 제대로 적용되는지 확인하는 테스트 문자열입니다." />
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}