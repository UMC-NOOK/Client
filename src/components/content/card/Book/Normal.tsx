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
      className={[ "inline-flex w-[100px] flex-col items-start gap-1", ].join(" ")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >

      <div
        className="flex w-[100px] h-36 items-center justify-center rounded-[2px] bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={imageAlt}
      />

    <div className="flex flex-col items-start self-stretch w-full">
        <p
          className="line-clamp-2 self-stretch overflow-hidden text-ellipsis text-gray-90 text-subtitle-14-sb">
          {title}
        </p>

        <p
          className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-gray-70 text-label-12-r">
            {author}
        </p>
      </div>
    </div>
  );
}
