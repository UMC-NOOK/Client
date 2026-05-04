type Size = "s" | "m";
type Variant = "yellow" | "pink" | "green" | "blue" | "purple" | "red" | "none"; // 필요하면 "blue" | "mint" ... 이런 식으로 확장
export type EmotionKey =
  | "FUN"
  | "EMPATHIZING"
  | "USEFUL"
  | "SAD"
  | "COMPLICATED"
  | "UNCOMFORTABLE"
  | null;

type EmotionMeta = {
  variant: Variant;
  emoji: string;
  text: string;
};

const emotionMetaMap: Record<Exclude<EmotionKey, null>, EmotionMeta> = {
  FUN: {
    variant: "yellow",
    emoji: "(^_^)",
    text: "재밌어요",
  },
  EMPATHIZING: {
    variant: "pink",
    emoji: "(´･ᴗ･`)",
    text: "공감돼요",
  },
  USEFUL: {
    variant: "green",
    emoji: "(• o •)",
    text: "유익해요",
  },
  SAD: {
    variant: "blue",
    emoji: "(T_T)",
    text: "슬퍼요",
  },
  COMPLICATED: {
    variant: "purple",
    emoji: "(@_@)",
    text: "복잡해요",
  },
  UNCOMFORTABLE: {
    variant: "red",
    emoji: "(¬＿¬)",
    text: "불편해요",
  },
};

type BaseProps = {
  active: boolean; // default: true (활성)
  size: Size;
  emojiKey: EmotionKey; // default: "yellow"
  onClick?: () => void;
};

const base = "flex w-fit justify-center items-center select-none";

const sizeClassMap: Record<Size, string> = {
  s: "p-1 h-[20px] rounded-[4px] bg-gray-20 text-label-12-sb",
  m: "p-2 h-[30px] gap-2 rounded-[2px] bg-gray-30",
};

const variantColorClassMap: Record<Variant, string> = {
  yellow: "text-yellow-50",
  pink: "text-pink-60",
  green: "text-green-50",
  blue: "text-blue-1",
  purple: "text-purple-60",
  red: "text-red-60",
  none: "text-gray-70",
};

const sizeStyleMap: Record<Size, { emoji: string; text: string }> = {
  s: { emoji: "text-label-12-sb", text: "null" }, // s 사이즈일 때 emoji와 text 크기 동일
  m: { emoji: "text-label-14-sb", text: "text-label-12-sb" }, // m 사이즈일 때 emoji는 16px, text는 14px
};

export default function Emotion({
  active = false,
  size,
  emojiKey,
  onClick,
}: BaseProps) {
  if (emojiKey === null) {
    // render empty/inactive when no emotion is provided
    const inactive = variantColorClassMap["none"];
    if (size === "s") {
      return (
        <span className={[base, sizeClassMap.s, inactive].join(" ")}></span>
      );
    }
    return <span className={[base, sizeClassMap.m].join(" ")}></span>;
  }
  const emojiMeta = emotionMetaMap[emojiKey];
  const emojiFeature = emotionMetaMap[emojiKey].emoji;
  const color = variantColorClassMap[emojiMeta.variant];
  const inactive = variantColorClassMap["none"];

  const { emoji, text } = sizeStyleMap[size];

  if (size === "s") {
    return (
      <span
        className={[base, sizeClassMap.s, active ? color : inactive].join(" ")}
      >
        <span className={emoji}>{emojiFeature}</span>
      </span>
    );
  }

  return (
    <span className={[base, sizeClassMap.m].join(" ")} onClick={onClick}>
      <span className={`${emoji} ${active ? color : inactive}`}>
        {emojiFeature}
      </span>
      <span className={`${text} ${active ? color : inactive}`}>
        {" "}
        {/* text 크기 스타일 적용 */}
        {emojiMeta.text}
      </span>
    </span>
  );
}
