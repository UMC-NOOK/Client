// Client/src/components/search/RecentKeywordSection.tsx
import deleteIcon from "../../assets/search/button-icon-shape.svg";

export type RecentKeyword = { id: number; text: string };

type Props = {
  keywords: RecentKeyword[];
  onDelete?: (id: number) => void;
  onClickKeyword?: (text: string) => void;
};

export default function RecentKeywordSection({
  keywords,
  onDelete,
  onClickKeyword,
}: Props) {
  const hasKeywords = keywords.length > 0;

  return (
    <section className="w-full flex flex-col items-start gap-8 pt-8">
      <div className="w-full flex flex-col items-start gap-4">
        <span className="text-gray-100 text-label-13-sb">최근 검색어</span>

        {hasKeywords ? (
          <div
            className="
              flex flex-wrap items-start content-start
              gap-x-2 gap-y-2 self-stretch
              max-h-16 overflow-hidden
            "
          >
            {keywords.map((k) => (
              <div
                key={k.id}
                role="button"
                tabIndex={0}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onClickKeyword?.(k.text)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClickKeyword?.(k.text);
                  }
                }}
                className="
                  flex items-center gap-1
                  rounded-lg bg-gray-900
                  px-3 py-1.5
                "
              >
                {/* 키워드 텍스트: 14 / 400 / 100% */}
                <span className="whitespace-nowrap text-gray-100 text-btn-14-r">
                  {k.text}
                </span>

                {/* 삭제 버튼 */}
                <button
                  type="button"
                  aria-label="최근 검색어 삭제"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(k.id);
                  }}
                  className="
                    flex items-center justify-center
                    w-3.5 h-3.5
                    p-0.5
                  "
                >
                  <img
                    src={deleteIcon}
                    alt=""
                    draggable={false}
                    className="w-[10.208px] h-[10.208px]"
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* 없음 텍스트: 14 / 500 / 150% */
          <span className="self-stretch text-gray-300 text-body-14-m">
            최근 검색어가 없습니다.
          </span>
        )}
      </div>
    </section>
  );
}
