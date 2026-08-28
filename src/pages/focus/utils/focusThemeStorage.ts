const RECENT_FOCUS_THEME_ID_KEY = "recentFocusThemeId";

export function readStoredFocusThemeId(): number | null {
  const raw = localStorage.getItem(RECENT_FOCUS_THEME_ID_KEY);
  if (raw === null) return null;

  const parsed = Number(raw);
  return Number.isNaN(parsed) ? null : parsed;
}

export function saveStoredFocusThemeId(themeId: number | null) {
  if (themeId === null) {
    localStorage.removeItem(RECENT_FOCUS_THEME_ID_KEY);
    return;
  }

  localStorage.setItem(RECENT_FOCUS_THEME_ID_KEY, String(themeId));
}
