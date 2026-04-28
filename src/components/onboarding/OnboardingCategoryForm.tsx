// Client/src/components/onboarding/OnboardingCategoryForm.tsx
type Props = {
  value: string[];
  onChange: (v: string[]) => void;
};

const SECTIONS = [
  {
    title: "문학",
    items: ["고전", "소설/시/희곡", "에세이"],
  },
  {
    title: "비즈니스/자기계발",
    items: ["경제경영", "자기계발"],
  },
  {
    title: "실용/생활",
    items: ["가정/요리/뷰티", "건강/취미/레저", "여행", "예술/문화", "좋은부모"],
  },
  {
    title: "아동/청소년",
    items: ["유아", "어린이", "청소년"],
  },
  {
    title: "인문/사회/역사",
    items: ["사회과학", "역사", "인문학", "종교/역학"],
  },
  {
    title: "학습/기술",
    items: ["과학", "외국어", "전문서적", "IT"],
  },
  {
    title: "만화",
    items: ["만화"],
  },
] as const;

export default function OnboardingCategoryForm({
  value,
  onChange,
}: Props) {
  const toggleItem = (item: string) => {
    const exists = value.includes(item);

    if (exists) {
      onChange(value.filter((v) => v !== item));
      return;
    }

    if (value.length >= 2) return;

    onChange([...value, item]);
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {SECTIONS.map((sec) => (
        <div key={sec.title} className="flex flex-col gap-4">
          <span className="text-[13px] font-semibold text-gray-90">
            {sec.title}
          </span>

          <div className="flex flex-wrap gap-2">
            {sec.items.map((item) => {
              const selected = value.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleItem(item)}
                  className={[
                    "flex items-center justify-center rounded-[20px] px-4 py-3",
                    selected ? "bg-[#7AD8D2]" : "bg-gray-17",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-suit text-[14px] font-semibold",
                      selected ? "text-[#13172A]" : "text-gray-60",
                    ].join(" ")}
                  >
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}