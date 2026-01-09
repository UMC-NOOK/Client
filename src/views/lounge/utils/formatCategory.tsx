import React from "react";

/** "소설/시/희곡" → ["소설","시","희곡"] */
export function splitCategoryName(name: string | null | undefined): string[] {
  const raw = (name ?? "").trim();
  if (!raw) return [];
  return raw
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * 카테고리 이름을 렌더링:
 *  - "/"가 없으면 원문 그대로 반환
 *  - "/"가 있으면 "항목 | 항목 | 항목" 형태로 렌더하며, 파이프(|)는 별도 스타일 지정 가능
 */
export function renderCategoryName(
  name: string | null | undefined,
  opts?: { pipeClass?: string; itemClass?: string }
): React.ReactNode {
  const parts = splitCategoryName(name);
  if (parts.length <= 1) {
    // TS2869 회피: name을 명시적으로 string|undefined 로 취급
    const safe = (name ?? "") as string;
    return <>{safe}</>;
  }

  const pipeClass = opts?.pipeClass ?? "mx-2 text-[#555351]/70";
  const itemClass = opts?.itemClass ?? "";

  return (
    <>
      {parts.map((p, i) => (
        <React.Fragment key={`${p}-${i}`}>
          {i > 0 ? <span className={pipeClass}> | </span> : null}
          <span className={itemClass}>{p}</span>
        </React.Fragment>
      ))}
    </>
  );
}
