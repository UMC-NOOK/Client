import React from "react";
import InformationSection from "../../components/content/InformationText/InformationSection";

export default function InformationSectionTestPage() {
  return (
    <main className="min-h-screen bg-neutral-100 py-8">
      <section className="mx-auto flex w-full max-w-[375px] flex-col gap-10 rounded-[16px] bg-[#0B0F23] p-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-white/80">flow = vertical</p>
          <InformationSection
            flow="vertical"
            title="Text"
            description="세로형 설명 텍스트입니다."
            showCaret
            onClick={() => {
              console.log("vertical click");
            }}
            onToggle={(open) => {
              console.log("vertical toggle:", open);
            }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-white/80">flow = horizontal</p>
          <InformationSection
            flow="horizontal"
            title="Text"
            description="가로형 설명 텍스트입니다."
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-white/80">flow = vertical / long text</p>
          <InformationSection
            flow="vertical"
            title="긴 제목 테스트"
            description="이 설명은 세로형에서 여러 줄로 자연스럽게 내려오는지 확인하기 위한 긴 텍스트입니다."
            showCaret
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-white/80">flow = horizontal / long text</p>
          <InformationSection
            flow="horizontal"
            title="Text"
            description="이 설명은 가로형에서 오른쪽 영역을 차지하면서 자연스럽게 줄바꿈되는지 확인하기 위한 긴 텍스트입니다."
          />
        </div>
      </section>
    </main>
  );
}