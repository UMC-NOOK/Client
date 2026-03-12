type DateBadgeProps = {
  topText: string;     // 예: "MM.DD"
  bottomText: string;  // 예: "YYYY"
};

export function ResourceDate({ topText, bottomText}: DateBadgeProps) {
  return (
    <div
      className={[
        "flex shrink-0 basis-8 flex-col items-center justify-center gap-1 pt-2",
      ].join(" ")}
    >
      <p className="text-center text-label-12-sb text-gray-80">{topText}</p>
      <p className="text-center text-label-12-sb text-gray-50">{bottomText}</p>
    </div>
  );
}