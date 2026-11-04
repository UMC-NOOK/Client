export type CoachmarkScreen =
  | "library"
  | "search"
  | "focus"
  | "record"
  | "record-detail"
  | "book-detail"
  | "reading-history";

// '다시 보지 않기'를 체크한 화면. 로그인과 무관하게 계속 유지한다.
const HIDDEN_PREFIX = "nook:coachmark:v2";
// 이번 로그인에서 이미 본 화면. 로그인할 때마다 초기화한다.
const SEEN_PREFIX = "nook:coachmark:seen";
const changeEvent = new EventTarget();

function getHiddenKey(userId: number, screen: CoachmarkScreen) {
  return `${HIDDEN_PREFIX}:${userId}:${screen}`;
}

function getSeenKey(userId: number, screen: CoachmarkScreen) {
  return `${SEEN_PREFIX}:${userId}:${screen}`;
}

function notify(userId: number, screen: CoachmarkScreen) {
  changeEvent.dispatchEvent(new Event(getHiddenKey(userId, screen)));
}

export function isCoachmarkDismissed(
  userId: number | undefined,
  screen: CoachmarkScreen,
) {
  if (userId === undefined || typeof window === "undefined") return false;

  return (
    localStorage.getItem(getHiddenKey(userId, screen)) === "hidden" ||
    localStorage.getItem(getSeenKey(userId, screen)) === "seen"
  );
}

export function hideCoachmark(userId: number, screen: CoachmarkScreen) {
  localStorage.setItem(getHiddenKey(userId, screen), "hidden");
  notify(userId, screen);
}

export function markCoachmarkSeen(userId: number, screen: CoachmarkScreen) {
  localStorage.setItem(getSeenKey(userId, screen), "seen");
  notify(userId, screen);
}

export function resetCoachmarkSeen() {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(`${SEEN_PREFIX}:`))
    .forEach((key) => localStorage.removeItem(key));
}

export function subscribeCoachmark(
  userId: number | undefined,
  screen: CoachmarkScreen,
  listener: () => void,
) {
  if (userId === undefined || typeof window === "undefined") return () => {};

  const keys = [getHiddenKey(userId, screen), getSeenKey(userId, screen)];
  const handleStorage = (event: StorageEvent) => {
    if (event.key && keys.includes(event.key)) listener();
  };

  window.addEventListener("storage", handleStorage);
  changeEvent.addEventListener(keys[0], listener);

  return () => {
    window.removeEventListener("storage", handleStorage);
    changeEvent.removeEventListener(keys[0], listener);
  };
}
