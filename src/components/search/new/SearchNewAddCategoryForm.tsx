type Props = {
  value: string[];
  onChange: (v: string[]) => void;
  max?: number;
};

const SECTIONS = [
  {
    title: "문학",
    items: [
      "소설/시/희곡",
      "라이트 노벨",
      "판타지/무협",
      "에세이",
      "고전",
      "로맨스",
    ],
  },
  {
    title: "인문사회",
    items: [
      "인문/사회",
      "언어학",
      "역사",
      "인물/평전",
      "종교/역학",
      "사회과학",
      "법률",
      "외국어",
      "전기/자서전",
    ],
  },
  { title: "경제경영", items: ["경제경영"] },
  { title: "자기계발", items: ["자기계발"] },
  {
    title: "과학기술",
    items: ["과학", "자연과학", "의학", "컴퓨터/모바일", "기술공학"],
  },
  { title: "문화예술", items: ["예술/대중문화", "건축/디자인"] },
  {
    title: "생활/가족",
    items: [
      "가정/요리/뷰티",
      "건강/취미/레저",
      "여행",
      "육아",
      "어린이",
      "유머",
      "요리",
      "가정/원예/인테리어",
      "청소년",
      "좋은부모",
      "건강/스포츠",
      "가족/관계",
    ],
  },
  { title: "만화", items: ["만화"] },
] as const;

export default function SearchNewAddCategoryForm({
  value,
  onChange,
  max = 2,
}: Props) {
  const toggle = (item: string) => {
    const selected = value.includes(item);

    if (selected) {
      onChange(value.filter((x) => x !== item));
      return;
    }

    if (value.length >= max) return;
    onChange([...value, item]);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {SECTIONS.map((sec) => (
        <div key={sec.title} className="flex flex-col gap-2">
          {/* (3) 카테고리명 */}
          <span className="text-gray-100 text-[13px] font-semibold leading-3.25">
            {sec.title}
          </span>

          {/* (5) 설명 문구 */}
          <span className="text-gray-500 text-[14px] font-medium leading-5.25 pb-2">
            복수 선택이 가능합니다.
          </span>

          {/* (7)(8) 버튼 그룹 */}
          <div className="flex flex-wrap gap-2">
            {sec.items.map((item) => {
              const selected = value.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggle(item)}
                  className={[
                    "flex items-center justify-center px-4 py-3 rounded-full",
                    selected ? "bg-mint" : "bg-gray-900",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "text-[14px] font-semibold leading-[14px]",
                      selected ? "text-gray-1000" : "text-gray-400",
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
