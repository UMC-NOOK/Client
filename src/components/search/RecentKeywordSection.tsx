// Client/src/components/search/RecentKeywordSection.tsx
import Chip from "../action/Chip/Chip";
import deleteIcon from "../../assets/search/button-icon-shape.svg";

export type RecentKeyword = { id: number; text: string };

type Props = {
  keywords: RecentKeyword[];
  onDelete?: (id: number) => void;
  onClickKeyword?: (text: string) => void;
  // 지정하면 이 글자수(공백 포함) 이상인 검색어를 (maxLength-1)자 + "…"로 잘라서 보여준다.
  // 예: maxLength=7이면 7자 이상부터 6자+…로 자름(잘린 부분이 있다는 뜻의 …가 실제로 뭔가 자른 경우에만 붙게).
  // 클릭/삭제는 원본 text 그대로 동작.
  maxTextLength?: number;
};

function truncateKeyword(text: string, maxLength?: number) {
  if (!maxLength || text.length < maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}

export default function RecentKeywordSection({
  keywords,
  onDelete,
  onClickKeyword,
  maxTextLength,
}: Props) {
  const hasKeywords = keywords.length > 0;

  return (
    <section className="w-full flex flex-col items-start gap-8 pt-8">
      <div className="w-full flex flex-col items-start gap-4">
        <span className="text-gray-90 text-label-13-sb">최근 검색어</span>

        {hasKeywords ? (
          <div className="flex flex-wrap items-start content-start gap-x-2 gap-y-2 self-stretch max-h-19 overflow-hidden">
            {keywords.map((k) => (
              <Chip
                key={k.id}
                text={truncateKeyword(k.text, maxTextLength)}
                variant="icon"
                active={false}
                textClassName="text-gray-90"   
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