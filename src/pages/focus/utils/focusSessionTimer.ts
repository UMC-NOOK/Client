export type FocusSessionTimerState = {
  startedAtMs: number;
  pausedAtMs: number | null;
  totalPausedMs: number;
};

const FOCUS_SESSION_TIMER_KEY = "focusSessionTimer";

function saveFocusSessionTimer(state: FocusSessionTimerState) {
  sessionStorage.setItem(FOCUS_SESSION_TIMER_KEY, JSON.stringify(state));
  return state;
}

function isFocusSessionTimerState(
  value: unknown,
): value is FocusSessionTimerState {
  if (typeof value !== "object" || value === null) return false;

  const state = value as Partial<FocusSessionTimerState>;
  return (
    typeof state.startedAtMs === "number" &&
    (state.pausedAtMs === null || typeof state.pausedAtMs === "number") &&
    typeof state.totalPausedMs === "number"
  );
}

export function resetFocusSessionTimer(now = Date.now()) {
  return saveFocusSessionTimer({
    startedAtMs: now,
    pausedAtMs: null,
    totalPausedMs: 0,
  });
}

export function readOrCreateFocusSessionTimer() {
  const stored = sessionStorage.getItem(FOCUS_SESSION_TIMER_KEY);

  if (stored !== null) {
    try {
      const parsed: unknown = JSON.parse(stored);
      if (isFocusSessionTimerState(parsed)) return parsed;
    } catch {
      // 잘못된 임시 값은 새 세션으로 교체한다.
    }
  }

  return resetFocusSessionTimer();
}

export function pauseFocusSessionTimer(
  state: FocusSessionTimerState,
  now = Date.now(),
) {
  if (state.pausedAtMs !== null) return state;
  return saveFocusSessionTimer({ ...state, pausedAtMs: now });
}

export function resumeFocusSessionTimer(
  state: FocusSessionTimerState,
  now = Date.now(),
) {
  if (state.pausedAtMs === null) return state;

  return saveFocusSessionTimer({
    ...state,
    pausedAtMs: null,
    totalPausedMs:
      state.totalPausedMs + Math.max(0, now - state.pausedAtMs),
  });
}

export function getFocusElapsedSeconds(
  state: FocusSessionTimerState,
  now = Date.now(),
) {
  const endAtMs = state.pausedAtMs ?? now;
  const elapsedMs = endAtMs - state.startedAtMs - state.totalPausedMs;
  return Math.max(0, Math.floor(elapsedMs / 1000));
}

export function clearFocusSessionTimer() {
  sessionStorage.removeItem(FOCUS_SESSION_TIMER_KEY);
}
