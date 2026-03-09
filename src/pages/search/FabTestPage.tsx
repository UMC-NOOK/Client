import React from "react";
import { FAB } from "../../components/action/Button/FAB";

// ✅ 프로젝트 아이콘 경로에 맞게 바꿔줘
import PlusIcon from "../../assets/icons/chevron_right.svg";

export default function FabTestPage() {
  return (
    <main className="min-h-dvh w-full bg-neutral-50 flex justify-center py-8">
      <section className="relative w-full max-w-[375px] px-4">
        {/* ✅ 스샷 느낌: 우측 하단 플로팅 */}
        <div className="fixed right-6 bottom-6">
           <FAB icon={<img src={PlusIcon}/>}/>
        </div>

        {/* ✅ 아래는 "컴포넌트 미리보기" 용 (선택) */}
        <div className="mt-6 rounded-[16px] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <FAB icon={<img src={PlusIcon} alt="사진" />}/>
          </div>
        </div>
      </section>
    </main>
  );
}