// src/components/input/TextField.tsx
import { useMemo, useRef } from "react";

// Text Field 기본 값_TextField
type TextFieldProps = {
  title: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
};

export function TextField({
  title,
  value,
  onChange,
  placeholder = "",
  inputMode,
  disabled = false,
}: TextFieldProps) {
  return (
    <div className="w-full flex flex-col items-start gap-3">
      <span className="text-gray-100 text-label-13-b">{title}</span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        disabled={disabled}
        className={[
          "w-full px-4 py-3 rounded-md bg-gray-900 outline-none",
          "text-gray-100 text-body-14-r placeholder:text-gray-500",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        ].join(" ")}
      />
    </div>
  );
}

// 강조 Text Field_TitleTextField

type TitleTextFieldProps = {
  title: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function TitleTextField({
  title,
  value,
  onChange,
  placeholder = "",
  disabled = false,
}: TitleTextFieldProps) {
  const hasValue = value.trim().length > 0;

  return (
    <div className="w-full flex flex-col items-start gap-3">
      {/* title */}
      <span className="text-gray-100 text-label-13-b">{title}</span>

      {/* input */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={[
          "w-full px-4 py-3 rounded-md bg-gray-900 outline-none",
          "overflow-hidden text-ellipsis whitespace-nowrap",
          "font-suit text-[20px] font-bold leading-[150%]",
          hasValue ? "text-gray-100" : "text-gray-300",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        ].join(" ")}
      />
    </div>
  );
}


// 3분할 텍스트 입력 필드_TripleTextField

type TripleParts<K1 extends string, K2 extends string, K3 extends string> = Record<
  K1 | K2 | K3,
  string
>;

type TripleFieldSpec<K extends string> = {
  key: K;
  placeholder: string;
  maxLen: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

type TripleTextFieldProps<K1 extends string, K2 extends string, K3 extends string> = {
  title: string;
  value: TripleParts<K1, K2, K3>;
  onChange: (v: TripleParts<K1, K2, K3>) => void;

  /** 3칸 정의(순서대로 3개) */
  fields: [TripleFieldSpec<K1>, TripleFieldSpec<K2>, TripleFieldSpec<K3>];

  /** 숫자만 입력 제한(날짜/코드용) */
  digitsOnly?: boolean;

  disabled?: boolean;
};

export function TripleTextField<K1 extends string, K2 extends string, K3 extends string>({
  title,
  value,
  onChange,
  fields,
  digitsOnly = true,
  disabled = false,
}: TripleTextFieldProps<K1, K2, K3>) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const normalize = (v: string) => (digitsOnly ? v.replace(/\D/g, "") : v);

  const setPartAndMove = (idx: number, raw: string) => {
    const { key, maxLen } = fields[idx];
    const nextIdx = idx + 1;

    const trimmed = normalize(raw).slice(0, maxLen);
    onChange({ ...value, [key]: trimmed });

    if (trimmed.length === maxLen) {
      refs.current[nextIdx]?.focus();
    }
  };

  const handleBackspace = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = fields[idx];
    const prevIdx = idx - 1;

    if (e.key === "Backspace" && value[key].length === 0) {
      refs.current[prevIdx]?.focus();
    }
  };

  const base = useMemo(
    () =>
      [
        "flex-1 min-w-0 px-4 py-3 rounded-md bg-gray-900 outline-none",
        "text-gray-100 text-body-14-r placeholder:text-gray-500",
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ].join(" "),
    [disabled]
  );

  return (
    <div className="w-full flex flex-col items-start gap-3">
      <span className="text-gray-100 text-label-13-b">{title}</span>

      <div className="w-full flex gap-2">
        {fields.map((f, idx) => (
          <input
            key={f.key}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            value={value[f.key]}
            onChange={(e) => setPartAndMove(idx, e.target.value)}
            onKeyDown={(e) => handleBackspace(idx, e)}
            placeholder={f.placeholder}
            inputMode={f.inputMode ?? (digitsOnly ? "numeric" : undefined)}
            disabled={disabled}
            className={base}
          />
        ))}
      </div>
    </div>
  );
}
