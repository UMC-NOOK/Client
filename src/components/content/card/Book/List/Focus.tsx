import playIcon from "../../../../../assets/icons/movement.svg";

type Props = {
  imageUrl: string;
  imageAlt?: string;
  timeText: string;
  title: string;
  author: string;
  /** 카드 전체가 아니라 재생 버튼만 눌렀을 때 반응한다 (open-questions.md 17번) */
  onPlayClick?: () => void;
};

export function Focus({
  imageUrl,
  imageAlt = "thumbnail",
  timeText,
  title,
  author,
  onPlayClick,
}: Props) {
  return (
    <div className="flex w-full h-full min-h-24 items-center rounded-[10px] bg-gray-15 p-4">
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

      <button
        type="button"
        className="flex h-8 w-8 shrink-0 items-center justify-center"
        aria-label="play"
        onClick={onPlayClick}
      >
        <img src={playIcon} className="h-full w-full" />
      </button>
    </div>
  );
}