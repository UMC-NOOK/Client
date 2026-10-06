const ELLIPSIS = "...";
const MAX_LENGTH = 16;

type Props = {
  text: string;
  className?: string;
};

// 공백 포함 MAX_LENGTH자까지만 보여주고, 초과 시 끝 공백을 제외하고 `...`을 붙인다.
function truncateText(text: string) {
  const characters = Array.from(text);

  if (characters.length <= MAX_LENGTH) return text;

  return `${characters.slice(0, MAX_LENGTH).join("").trimEnd()}${ELLIPSIS}`;
}

export default function WidthAwareEllipsis({ text, className = "" }: Props) {
  return (
    <span
      className={`block w-full min-w-0 overflow-hidden whitespace-nowrap ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true">{truncateText(text)}</span>
    </span>
  );
}
