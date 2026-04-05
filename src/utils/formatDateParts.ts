type DateFormatOptions = {
  year?: boolean;
  month?: boolean;
  day?: boolean;
};

/**
 * ISO 날짜 문자열을 받아 필요한 연/월/일만 조합해 반환합니다.
 *
 * @param dateString - 예: "2025-12-20T21:10:00"
 * @param options.year - true면 "25년" 표시
 * @param options.month - true면 "12월" 표시
 * @param options.day - true면 "20일" 표시
 *
 * @example
 * formatDateKorean("2025-12-20T21:10:00")
 * // "25년 12월 20일"
 *
 * @example
 * formatDateKorean("2025-12-20T21:10:00", { year: false, month: true, day: true })
 * // "12월 20일"
 */

export function formatDateKorean(
  dateString: string,
  options: DateFormatOptions = {
    year: true,
    month: true,
    day: true,
  },
) {
  const { year = true, month = true, day = true } = options;

  if (!dateString) return "";

  const datePart = dateString.split("T")[0];
  const [fullYear, monthValue, dayValue] = datePart.split("-");

  if (!fullYear || !monthValue || !dayValue) return "";

  const result: string[] = [];

  if (year) {
    result.push(`${fullYear.slice(2)}년`);
  }

  if (month) {
    result.push(`${monthValue}월`);
  }

  if (day) {
    result.push(`${dayValue}일`);
  }

  return result.join(" ");
}

/**
 * ISO 날짜 문자열을 받아 필요한 연/월/일만 조합해 반환합니다.
 *
 * @param dateString - 예: "2025-12-20T21:10:00"
 * @param options.year - true면 "25." 표시
 * @param options.month - true면 "12." 표시
 * @param options.day - true면 "20." 표시
 *
 * @example
 * formatDateKorean("2025-12-20T21:10:00")
 * // "25.12.20."
 *
 * @example
 * formatDateKorean("2025-12-20T21:10:00", { year: false, month: true, day: true })
 * // "12.20."
 */
export function formatDateDot(
  dateString: string,
  options: DateFormatOptions = {
    year: true,
    month: true,
    day: true,
  },
) {
  const { year = true, month = true, day = true } = options;

  if (!dateString) return "";

  const datePart = dateString.split("T")[0];
  const [fullYear, monthValue, dayValue] = datePart.split("-");

  if (!fullYear || !monthValue || !dayValue) return "";

  const result: string[] = [];

  if (year) {
    result.push(`${fullYear.slice(2)}`);
  }

  if (month) {
    result.push(`${monthValue}`);
  }

  if (day) {
    result.push(`${dayValue}`);
  }

  return result.join(".");
}
