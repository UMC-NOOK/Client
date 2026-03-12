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
      className={[ "inline-flex flex-col items-start gap-1", ].join(" ")}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Image */}
      <div
        className="flex w-25 h-36 items-center justify-center rounded-[2px] bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={imageAlt}
      />

      {/* Texts */}
      <div className="flex flex-col items-start gap-1 self-stretch w-full">
        {/* Title: 2 lines clamp */}
        <p
          className="line-clamp-2 self-stretch overflow-hidden text-ellipsis text-gray-90 text-label-14-sb"
        //   style={
        //     display: "-webkit-box",
        //     WebkitBoxOrient: "vertical",
        //     WebkitLineClamp: 2,
        //   }}
        >
          {title}
        </p>

        {/* Subtitle: 1 line clamp */}
        <p
          className="line-clamp-2 self-stretch overflow-hidden text-ellipsis text-gray-70 text-label-12-r"
        //   style={{
        //     display: "-webkit-box",
        //     WebkitBoxOrient: "vertical",
        //     WebkitLineClamp: 1,
        //   }}
        >
            {author}
        </p>
      </div>
    </div>
  );
}