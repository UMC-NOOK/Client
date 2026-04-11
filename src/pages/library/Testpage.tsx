import { useState } from "react";
import DropDown from "../../components/section/dropDown/DropDown";

export default function TestPage() {
  const [appliedValue, setAppliedValue] = useState<{
    year: number;
    month: number;
    yearMonth: string;
  } | null>(null);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6">
        <DropDown
          initialYear={2026}
          initialMonth={11}
          startYear={2025}
          endYear={2026}
          onApply={(value) => {
            setAppliedValue(value);
            console.log("적용된 값:", value);
          }}
        />

        <div className="w-[360px] rounded-[16px] p-4 text-white">
          <div className="text-sm opacity-70">적용된 값</div>
          <div className="mt-2 text-base font-semibold">
            {appliedValue
              ? `${appliedValue.year}년 ${appliedValue.month}월 (${appliedValue.yearMonth})`
              : "아직 적용된 값이 없습니다."}
          </div>
        </div>
      </div>
    </div>
  );
}