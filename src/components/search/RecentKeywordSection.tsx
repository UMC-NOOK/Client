// Client/src/components/search/RecentKeywordSection.tsx
import deleteIcon from "../../assets/search/button-icon-shape.svg";

export type RecentKeyword = { id: number; text: string };

type Props = {
  keywords: RecentKeyword[];
  onDelete?: (id: number) => void;
  onClickKeyword?: (text: string) => void;
};

export default function RecentKeywordSection({ keywords, onDelete, onClickKeyword }: Props) {
  return (
    <section className="w-full flex flex-col items-start gap-8 pt-8">
      <div className="w-full flex flex-col items-start gap-4">
        <span className="text-[#ECECEC] text-[13px] font-semibold leading-[13px] font-[SUIT Variable]">
          최근 검색어
        </span>

        {keywords.length > 0 ? (
          <div
            className="flex flex-wrap items-start content-start gap-x-[8px] gap-y-[8px] self-stretch overflow-hidden"
            style={{ maxHeight: 64 }} // 최근 검색어 버튼 최대 2줄 제한
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
                className="flex items-center rounded-[8px] bg-[#1B203B]"
                style={{
                  padding: "6px 12px",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  className="whitespace-nowrap"
                  style={{
                    color: "#ECECEC",
                    fontFamily: "SUIT",
                    fontSize: 14,
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "100%",
                  }}
                >
                  {k.text}
                </span>

                <button
                  type="button"
                  aria-label="최근 검색어 삭제"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(k.id);
                  }}
                  className="relative w-[14px] h-[14px]"
                  style={{
                    display: "flex",
                    padding: 2, 
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={deleteIcon}
                    alt=""
                    draggable={false}
                    className="absolute"
                    style={{
                      width: "10.208px",
                      height: "10.208px",
                      left: "1.896px",
                      top: "1.896px",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <span
            className="self-stretch"
            style={{
              color: "#A2A7C3",
              fontFamily: "SUIT",
              fontSize: 14,
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "150%",
            }}
          >
            최근 검색어가 없습니다.
          </span>
        )}
      </div>
    </section>
  );
}
