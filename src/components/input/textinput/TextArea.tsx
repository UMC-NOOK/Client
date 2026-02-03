// Client/src/components/input/textinput/TextArea.tsx
import { useEffect, useMemo, useRef } from "react";

type Props = {
  title?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
};

export default function TextArea({
  title,
  value,
  onChange,
  placeholder = "",
  maxLength,
  disabled = false,
}: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const trimmedValue = maxLength !== undefined ? value.slice(0, maxLength) : value;

  /** auto resize */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [trimmedValue]);

  const hasValue = useMemo(() => trimmedValue.trim().length > 0, [trimmedValue]);
  const count = trimmedValue.length;
  const counterColor = count === 0 ? "text-gray-500" : "text-gray-100";

  const handleChange = (v: string) => {
    const next = maxLength !== undefined ? v.slice(0, maxLength) : v;
    onChange(next);
  };

  return (
    <div className="w-full flex flex-col items-start gap-3">
      {title && <span className="text-gray-100 text-label-13-b">{title}</span>}

      <div className="w-full rounded-md bg-gray-900 px-4 py-3 flex flex-col gap-4">
        <textarea
          ref={ref}
          value={trimmedValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={[
            "w-full min-h-15.75",
            "bg-transparent outline-none resize-none overflow-hidden",
            "placeholder:text-gray-500",
            hasValue ? "text-body-14-b text-gray-100" : "text-body-14-r text-gray-100",
            disabled ? "opacity-50 cursor-not-allowed" : "",
          ].join(" ")}
        />

        {maxLength !== undefined && (
          <div
            className="
              max-w-full overflow-hidden text-ellipsis
              [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]
              text-label-13-b
            "
          >
            <span className={counterColor}>{count}</span>
            <span className="text-gray-500">/{maxLength}</span>
          </div>
        )}
      </div>
    </div>
  );
}
