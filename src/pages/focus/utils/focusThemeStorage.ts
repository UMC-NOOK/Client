import { isFocusThemeId, type FocusThemeId } from "./focusThemes";

const RECENT_FOCUS_THEME_ID_KEY = "recentFocusThemeId";

export function readStoredFocusThemeId(): FocusThemeId | null {
  const raw = localStorage.getItem(RECENT_FOCUS_THEME_ID_KEY);
  if (raw === null) return null;

  const parsed = Number(raw);
  return Number.isInteger(parsed) && isFocusThemeId(parsed) ? parsed : null;
}

export function saveStoredFocusThemeId(themeId: FocusThemeId | null) {
  if (themeId === null) {
    localStorage.removeItem(RECENT_FOCUS_THEME_ID_KEY);
    return;
  }

  localStorage.setItem(RECENT_FOCUS_THEME_ID_KEY, String(themeId));
}
