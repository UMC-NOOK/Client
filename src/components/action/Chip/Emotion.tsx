type Size = "s" | "m";
type Variant = "yellow" | "pink" | "green" | "blue" | "red"| "none"; // 필요하면 "blue" | "mint" ... 이런 식으로 확장

type BaseProps = {
  active?: boolean; // default: true (활성)
  variant?: Variant; // default: "yellow"
};

type SizeSProps = BaseProps & {
  size: "s";
  emoji: string;
};

type SizeMProps = BaseProps & {
  size: "m";
  emoji: string;
  text: string;
};

type Props = SizeSProps | SizeMProps;

const base = "inline-flex justify-center items-center select-none";

const sizeClassMap: Record<Size, string> = {
  s: "p-1 rounded-[4px] bg-gray-20 text-label-12-sb",
  m: "p-2 gap-2 rounded-[2px] bg-gray-30",
};

const variantColorClassMap: Record<Variant, string> = {
    yellow: "text-yellow-50",
    pink: "text-pink-60",
    green : "text-green-50",
    blue: "text-blue-1",
    red: "text-red-60",
    none: "text-gray-70",
};

const sizeStyleMap: Record<Size, { emoji: string; text: string }> = {
  s: { emoji: "text-label-12-sb", text: "null" }, // s 사이즈일 때 emoji와 text 크기 동일
  m: { emoji: "text-label-14-sb", text: "text-label-12-sb" }, // m 사이즈일 때 emoji는 16px, text는 14px
};


export function Emotion({
  active = false,
  variant = "none",
  ...props
}: Props) {
    const color = variantColorClassMap[variant];
    const inactive = variantColorClassMap["none"];

    const { emoji, text } = sizeStyleMap[props.size]; 

    if (props.size === "s") {
        return (
        <span className={[base, sizeClassMap.s, active ? color : ""].join(" ")}>
         <span className={emoji}>{props.emoji}</span>
        </span>
        );
    }


    return (
       <span className={[base, sizeClassMap.m,].join(" ")}>
            <span className={`${emoji} ${active ? color : inactive}`}>
                {props.emoji}
            </span>
            <span className={`${text} ${active ? color : inactive}`}> {/* text 크기 스타일 적용 */}
                {props.text}
            </span>
        </span>
    );
}