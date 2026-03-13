import playIcon from "../../../../../assets/icons/movement.svg";

type Props = {
  imageUrl: string;
  imageAlt?: string;
  timeText: string;
  title: string;
  author: string;
  onClick?: () => void;
};

export function MediaInfoCard({
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
      className="flex w-full h-full min-h-[96px] items-center p-4"
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div
        className="h-[64px] w-[44px] shrink-0 rounded-[2px] bg-cover bg-center bg-no-repeat"
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
      >
        <img src={playIcon} className="h-full w-full" />
      </button>
    </div>
  );
}