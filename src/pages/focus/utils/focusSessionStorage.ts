import type { FocusStartResult } from "../../../types/focus/focus";

const FOCUS_SESSION_KEY = "focusSession";

function isFocusStartResult(value: unknown): value is FocusStartResult {
  if (typeof value !== "object" || value === null) return false;

  const session = value as Partial<FocusStartResult>;
  return (
    typeof session.focusId === "number" &&
    typeof session.bookId === "number" &&
    typeof session.bookTitle === "string" &&
    typeof session.author === "string" &&
    typeof session.startedAt === "string"
  );
}

export function saveFocusSession(session: FocusStartResult) {
  sessionStorage.setItem(FOCUS_SESSION_KEY, JSON.stringify(session));
  return session;
}

export function readFocusSession(): FocusStartResult | null {
  const stored = sessionStorage.getItem(FOCUS_SESSION_KEY);
  if (stored === null) return null;

  try {
    const parsed: unknown = JSON.parse(stored);
    return isFocusStartResult(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearFocusSession() {
  sessionStorage.removeItem(FOCUS_SESSION_KEY);
}
