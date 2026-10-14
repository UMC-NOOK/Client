const DEFAULT_MAX_LENGTH = 16;
const ELLIPSIS = "...";

type Props = {
  text: string;
  maxLength?: number;
  className?: string;
};

export default function CharacterLimitedText({
  text,
  maxLength = DEFAULT_MAX_LENGTH,
  className = "",
}: Props) {
  const characters = Array.from(text);
  const content =
    characters.length > maxLength
      ? `${characters.slice(0, maxLength).join("").trimEnd()}${ELLIPSIS}`
      : text;

  return (
    <span
      className={`block w-full min-w-0 overflow-hidden whitespace-nowrap ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true">{content}</span>
    </span>
  );
}
