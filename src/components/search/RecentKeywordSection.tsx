// Client/src/components/search/RecentKeywordSection.tsx
import Chip from "../action/Chip/Chip";
import deleteIcon from "../../assets/search/button-icon-shape.svg";

export type RecentKeyword = { id: number; text: string };

type Props = {
  keywords: RecentKeyword[];
  onDelete?: (id: number) => void;
  onClickKeyword?: (text: string) => void;
  maxTextLength?: number; // 지정하면 이 글자수부터 말줄임 표시. 클릭·삭제는 원본 text로 동작
  showAllKeywords?: boolean;
};

// "…"는 잘렸다는 뜻이므로 maxLength-1자까지만 보여주고 붙인다(maxLength자를 다 보여주면 안 잘린 것처럼 보인다).
function truncateKeyword(text: string, maxLength?: number) {
  if (!maxLength || text.length < maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}

export default function RecentKeywordSection({
  keywords,
  onDelete,
  onClickKeyword,
  maxTextLength,
  showAllKeywords = false,
}: Props) {
  const hasKeywords = keywords.length > 0;

  return (
    <section className="w-full flex flex-col items-start gap-8 pt-8">
      <div className="w-full flex flex-col items-start gap-4">
        <span className="text-gray-90 text-label-13-sb">최근 검색어</span>

        {hasKeywords ? (
          <div
            className={`flex flex-wrap items-start content-start gap-x-2 gap-y-2 self-stretch ${
              showAllKeywords ? "" : "max-h-19 overflow-hidden"
            }`}
          >
            {keywords.map((k) => (
              <Chip
                key={k.id}
                text={truncateKeyword(k.text, maxTextLength)}
                variant="icon"
                active={false}
                textClassName="text-gray-90"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onClickKeyword?.(k.text)}
                onIconClick={() => onDelete?.(k.id)}
                iconAriaLabel="최근 검색어 삭제"
                icon={
                  <img
                    src={deleteIcon}
                    alt=""
                    draggable={false}
                    className="w-[10.208px] h-[10.208px]"
                  />
                }
              />
            ))}
          </div>
        ) : (
          <span className="self-stretch text-gray-70 text-body-14-m">
            최근 검색어가 없습니다.
          </span>
        )}
      </div>
    </section>
  );
}
