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
      className="flex w-full max-w-[343px] items-center gap-4 p-4"
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div
        className="flex h-[64px] w-[44px] shrink-0 items-center justify-center rounded-[2px] bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={imageAlt}
      />

      <div className="flex min-w-0 flex-1 flex-col self-stretch justify-between">
        <div className="flex min-w-0 items-baseline justify-between gap-3">
          <p className="shrink-0 text-gray-70 text-label-12-r">{timeText}</p>
          <p className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-90 text-label-16-b">
            {title}
          </p>
        </div>

        <p className="mt-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-gray-70 text-label-12-r">
          {author}
        </p>
      </div>

      <button
        type="button"
        className="grid h-12 w-12 shrink-0 place-items-center"
        aria-label="play"
      >
        <img src={playIcon} alt="" className="h-6 w-6" />
      </button>
    </div>
  );
}