type Size = "s" | "m" | "coachmark";
type Variant = "yellow" | "pink" | "green" | "blue" | "purple" | "red" | "none"; // 필요하면 "blue" | "mint" ... 이런 식으로 확장
export type EmotionKey =
  | "FUN"
  | "EMPATHIZING"
  | "USEFUL"
  | "SAD"
  | "COMPLICATED"
  | "UNCOMFORTABLE";

type EmotionMeta = {
  variant: Variant;
  emoji: string;
  text: string;
};

const emotionMetaMap: Record<Exclude<EmotionKey, "EMPTY">, EmotionMeta> = {
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
  surface?: "default" | "strong";
};

const base =
  "flex shrink-0 whitespace-nowrap justify-center items-center select-none";

const sizeClassMap: Record<Size, string> = {
  s: "w-fit h-5 rounded-sm p-1 text-label-12-sb",
  m: "w-fit h-7.5 gap-2 rounded-xs p-2",
  coachmark: "h-7 rounded-xs px-2 text-label-12-sb",
};

// 안내용 칩만 Figma의 고정 폭을 사용하고 일반 감정 칩은 내용에 맞춰 유지한다.
const coachmarkWidthClassMap: Record<EmotionKey, string> = {
  FUN: "w-11.5",
  EMPATHIZING: "w-13.25",
  USEFUL: "w-11.75",
  SAD: "w-12",
  COMPLICATED: "w-14.5",
  UNCOMFORTABLE: "w-13",
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
  coachmark: { emoji: "text-label-12-sb", text: "null" },
};

export default function Emotion({
  active = false,
  size,
  emojiKey,
  onClick,
  surface = "default",
}: BaseProps) {
  if (emojiKey === null) {
    // render empty/inactive when no emotion is provided
    const inactive = variantColorClassMap["none"];
    if (size !== "m") {
      return (
        <span className={[base, sizeClassMap[size], inactive].join(" ")}></span>
      );
    }
    return <span className={[base, sizeClassMap.m].join(" ")}></span>;
  }
  const emojiMeta = emotionMetaMap[emojiKey];
  const emojiFeature = emotionMetaMap[emojiKey].emoji;
  const color = variantColorClassMap[emojiMeta.variant];
  const inactive = variantColorClassMap["none"];
  const background = active ? "bg-gray-30" : "bg-gray-20";

  const { emoji, text } = sizeStyleMap[size];

  if (size !== "m") {
    return (
      <span
        className={[
          base,
          sizeClassMap[size],
          size === "coachmark" ? coachmarkWidthClassMap[emojiKey] : "",
          surface === "strong" ? "bg-gray-30" : "bg-gray-20",
          active ? color : inactive,
        ].join(" ")}
      >
        <span className={emoji}>{emojiFeature}</span>
      </span>
    );
  }

  return (
    <span
      className={[base, sizeClassMap.m, background].join(" ")}
      onClick={onClick}
    >
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
