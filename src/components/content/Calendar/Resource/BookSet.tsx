import Day from "./Day";

type Count = "single" | "multiple";

type Props = {
  day: string;
  visible?: boolean;
  disable?: boolean;
  count?: Count;
  imageUrl?: string;
  bookNum?: number;
};

export default function BookSet({
  day,
  visible = false,
  disable = false,
  count = "single",
  imageUrl,
  bookNum = 0,
}: Props) {
  if (!visible) {
    return (
      <div className="flex w-11 h-[89px] flex-col items-start gap-1"/>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Day text={day} disable={disable} />

      {disable ?(
        <div className="h-16" aria-hidden />
        ): (
        <div className="relative w-11 h-16 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${day} book`}
              className="h-full w-full object-cover rounded-[2px]"
            />
          ) : (
            <div className="w-11 h-full w-full" aria-hidden />
          )}

          {count === "multiple" ? (
            <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-gray-17">
              <span className="absolute inset-0 flex items-center justify-center text-label-12-b leading-none text-gray-70">
                {bookNum}
              </span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}