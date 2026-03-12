import React from "react";
import SectionHeader from "../../components/content/InformationText/SectionHeader";

export default function SectionHeaderTestPage() {
  return (
    <main className="min-h-screen bg-neutral-100 py-8">
      <section className="mx-auto flex w-full max-w-[375px] flex-col gap-10 rounded-[16px] bg-[#0B0F23] p-6">
        <div className="flex flex-col gap-2">
          <p className="text-white/80 text-sm">size = 13</p>
          <SectionHeader
            size="13"
            title="Text"
            description="한 줄로 말줄임 처리되는 설명 텍스트입니다."
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white/80 text-sm">size = 14 / caret</p>
          <SectionHeader
            size="14"
            title="Text"
            onClick={() => {
              console.log("size 14 click");
            }}
            onToggle={(open) => {
              console.log("size 14 toggle:", open);
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white/80 text-sm">size = 16 / caret + description</p>
          <SectionHeader
            size="16"
            title="Text"
            description="한 줄로 잘리는 설명 텍스트입니다."
            onClick={() => {
              console.log("size 16 click");
            }}
            onToggle={(open) => {
              console.log("size 16 toggle:", open);
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white/80 text-sm">size = 20</p>
          <SectionHeader
            size="20"
            title="Text"
            description="조금 더 큰 제목 아래 설명 텍스트가 들어갑니다."
          />
        </div>
      </section>
    </main>
  );
}