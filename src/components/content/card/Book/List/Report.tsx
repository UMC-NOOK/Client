type Props = {
  imageUrl: string;
  title: string;
  author: string;
  recent: string;
  reviewNumber: number;
  imageAlt?: string;
  onClick?: () => void;
};

import reportIcon from "../../../../../assets/icons/report.svg";

export default function Report({
  imageUrl,
  title,
  author,
  recent,
  reviewNumber,
  imageAlt = "report cover",
  onClick,
}: Props) {
  const clickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      className="flex w-full  items-start gap-3 rounded-[4px] bg-gray-15 p-4"
    >
      <div
        className="flex w-14 self-stretch shrink-0 items-center justify-center rounded-[2px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={imageAlt}
      />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-2 self-stretch">
        <div className="flex w-full items-start justify-between gap-3">
          <p className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-label-14-sb text-gray-90">
            {title}
          </p>

          <div className="flex shrink-0 items-center gap-1">
            <img
              src={reportIcon}
              alt="icon"
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            />
            <span className="text-label-13-sb text-gray-80"> {reviewNumber} </span>
          </div>
        </div>

        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-label-13-r text-gray-60">
          {author}
        </p>

        <p className="line-clamp-2 min-h-[37px] w-full overflow-hidden text-body-12-r text-gray-80">
          {recent}
        </p>
      </div>
    </div>
  );
}