import playIcon from "../../../../../assets/icons/movement.svg";

type Props = {
  imageUrl: string;
  imageAlt?: string;
  timeText: string;
  title: string;
  author: string;
  /**
   * 재생 버튼만이 아니라 카드 전체가 터치 영역이다 — Figma 컴포넌트 코멘트에서 디자이너가
   * 명시적으로 확인함(2026-08-10): "터치 영역은 아이콘이 아닌 Card/Book/List/Focus 컴포넌트
   * 전체로 설정했습니다. 컴포넌트 선택 시 'focus : 테마 선택/이미지'로 이동합니다."
   */
  onClick?: () => void;
};

export function Focus({
  imageUrl,
  imageAlt = "thumbnail",
  timeText,
  title,
  author,
  onClick,
}: Props) {
  const clickable = Boolean(onClick);

  return (
    <div
      className="flex w-full h-full min-h-24 items-center rounded-[10px] bg-gray-15 p-4"
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div
        className="h-16 w-11 shrink-0 rounded-xs bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={imageAlt}
      />

      <div className="flex flex-1 flex-col min-w-0 min-h-[64px] justify-between pl-4 pr-2">
        <p className="text-label-13-sb text-gray-60">{timeText}</p>

        <div className="mt-auto flex min-w-0 flex-col gap-2">
          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-label-16-sb text-gray-90">
            {title}
          </p>

          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-label-14-sb text-gray-50">
            {author}
          </p>
        </div>
      </div>

      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center"
        aria-hidden="true"
      >
        <img src={playIcon} className="h-full w-full" />
      </span>
    </div>
  );
}