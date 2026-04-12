import Day from "./Day";

export type Count = "single" | "multiple";

type Props = {
  day: string;
  visible?: boolean;
  disable?: boolean;
  count?: Count;
  coverUrl?: string | null;
  bookNum?: number;
};

export default function BookSet({
  day,
  visible = false,
  disable = false,
  count = "single",
  coverUrl,
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

      {disable ? (
        <div className="h-16 w-11 shrink-0 rounded-[2px] bg-gray-10" />
      ) : (
        <div className="relative h-16 w-11 overflow-hidden rounded-[2px]">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`${day} book`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-10" />
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