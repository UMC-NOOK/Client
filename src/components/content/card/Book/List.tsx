import searchIcon from "../../../../assets/icons/book_shelf.svg";
import libraryIcon from "../../../../assets/icons/focus-gray-60.svg";
import Icon from "../../../action/Button/Icon";

type BookListType = "SEARCH" | "BEFORE" | "READINGORDONE" | "REPORT";

type TypeMeta = {
  iconSrc: string | null;
};

type Props = {
  imageUrl: string;
  title: string;
  author: string;
  type: BookListType;
  typeLabel?: string | null; //독서중인지 아닌지에 대해
  imageAlt?: string;
  onClick?: () => void;
};

const TYPE_META: Record<BookListType, TypeMeta> = {
  SEARCH: { iconSrc: searchIcon }, //전체 검색
  BEFORE: { iconSrc: null }, //서재에서 전체보기했을 때 아이콘이 없는 경우
  READINGORDONE: { iconSrc: libraryIcon }, //서제에서 타이머 icon
  REPORT: { iconSrc: null }, //기록에서 도서 선택
};

export default function BookList({
  imageUrl,
  title,
  author,
  type,
  typeLabel = null,
  imageAlt = "book cover",
  onClick,
}: Props) {
  const meta = TYPE_META[type];
  const showBottomRow = Boolean(meta.iconSrc || typeLabel);

  return (
    <div
      className={[
        "flex w-full min-h-[106px] items-start gap-3 py-3"
      ].join(" ")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div
        className="flex w-14 self-stretch shrink-0 items-center justify-center rounded-[2px] bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={imageAlt}
      />

      <div className="flex flex-1 min-w-0 flex-col min-h-20.5 justify-between items-start">
        <div className="flex flex-col gap-0.5 min-w-0 self-stretch">
          <p className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-gray-90 text-subtitle-14-sb">
            {title}
          </p>
          <p className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-gray-90 text-body-13-r">
            {author}
          </p>
        </div>

        {showBottomRow ? (
          <div className="flex h-[clamp(16px,4.267vw,20px)] items-center gap-1">
            {meta.iconSrc ? (
              <Icon
                size="xs"
                className="inline-grid h-[clamp(16px,4.267vw,20px)] w-[clamp(16px,4.267vw,20px)] shrink-0 place-items-center p-0 [&_img]:block [&_img]:h-[83.333%] [&_img]:w-[83.333%] [&_img]:object-contain"
                aria-hidden="true"
              >
                <img src={meta.iconSrc} alt="" />
              </Icon>
            ) : null}

            {typeLabel ? (
              <span className="flex h-full items-center text-gray-60 text-label-13-r leading-none">
                {typeLabel}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
