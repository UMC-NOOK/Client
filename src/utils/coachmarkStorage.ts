export type CoachmarkScreen =
  | "library"
  | "search"
  | "focus"
  | "record"
  | "record-detail"
  | "book-detail"
  | "reading-history";

const STORAGE_PREFIX = "nook:coachmark:v2";
const changeEvent = new EventTarget();

function getStorageKey(userId: number, screen: CoachmarkScreen) {
  return `${STORAGE_PREFIX}:${userId}:${screen}`;
}

export function isCoachmarkHidden(
  userId: number | undefined,
  screen: CoachmarkScreen,
) {
  if (userId === undefined || typeof window === "undefined") return false;

  return localStorage.getItem(getStorageKey(userId, screen)) === "hidden";
}

export function hideCoachmark(userId: number, screen: CoachmarkScreen) {
  localStorage.setItem(getStorageKey(userId, screen), "hidden");
  changeEvent.dispatchEvent(new Event(getStorageKey(userId, screen)));
}

export function subscribeCoachmark(
  userId: number | undefined,
  screen: CoachmarkScreen,
  listener: () => void,
) {
  if (userId === undefined || typeof window === "undefined") return () => {};

  const key = getStorageKey(userId, screen);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === key) listener();
  };

  window.addEventListener("storage", handleStorage);
  changeEvent.addEventListener(key, listener);

  return () => {
    window.removeEventListener("storage", handleStorage);
    changeEvent.removeEventListener(key, listener);
  };
}
