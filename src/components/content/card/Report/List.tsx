import SectionHeader from "../../InformationText/SectionHeader";
import Emotion from "../../../action/Chip/Emotion";
import type { EmotionKey } from "../../../action/Chip/Emotion";

type Props = {
  date: string;
  emojiKey: EmotionKey;
  review: string;
  images?: string[];
  onClick?: () => void;
};

export default function ReportList({
  date,
  emojiKey,
  review,
  images = [],
  onClick,
}: Props) {
  const limitedImages = images.slice(0, 5);
  const clickable = Boolean(onClick);

  return (
    <div
      className="flex w-full min-w-[343px] flex-col items-start gap-2 rounded-[4px] bg-gray-15 px-3 py-4"
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <SectionHeader
        size="13"
        top={
          <div className="flex items-center gap-2">
            <span className="text-gray-50">{date}</span>
            <Emotion size="s" emojiKey={emojiKey} active />
          </div>
        }
        bottom={
          <p className="w-full min-w-0 whitespace-pre-wrap break-words text-gray-80">
            {review}
          </p>
        }
      />

      {limitedImages.length > 0 ? (
        <div className="flex items-start gap-1">
          {limitedImages.map((imageUrl, index) => (
            <div
              key={`${imageUrl}-${index}`}
              className="h-14 w-14 shrink-0 rounded-[2px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${imageUrl})` }}
              aria-label={`summary image ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
