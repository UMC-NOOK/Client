type Props = {
  imageUrl: string;
  title: string;
  author: string;
  imageAlt?: string;
  onClick?: () => void;
};

export function Normal({
  imageUrl,
  title,
  author,
  imageAlt = "card thumbnail",
  onClick,
}: Props) {
  return (
    <div
      className={[ "inline-flex w-[clamp(80px,26.667vw,100px)] flex-col items-start gap-1.5", ].join(" ")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >

      <div
        className="flex aspect-[25/36] h-auto w-full items-center justify-center rounded-[2px] bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={imageAlt}
      />

    <div className="flex flex-col items-start self-stretch w-full">
        <p
          className="line-clamp-2 self-stretch overflow-hidden text-ellipsis text-gray-90 text-subtitle-14-sb">
          {title}
        </p>

        <p
          className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-gray-70 text-body-12-r">
            {author}
        </p>
      </div>
    </div>
  );
}
