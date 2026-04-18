/** `month`: 1~12 (1월 = 1). 해당 월의 말일 날짜(28~31) */
export function getDatesInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

/**
 * 해당 월 1일이 그리드에서 몇 번째 열인지 (헤더가 월~일일 때).
 * 0=월 … 6=일. (`(getDay()+6)%7` = JS 요일을 월요일 시작 열 인덱스로 변환)
 */
export function getStartDay(year: number, month: number) {
  const jsWeekday = new Date(year, month - 1, 1).getDay(); // 0=일 … 6=토
  return (jsWeekday + 6) % 7;
}
