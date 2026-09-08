import themeGrass80 from "../../../assets/focus/themes/theme-grass-80x80.png";
import themeGrass304 from "../../../assets/focus/themes/theme-grass-343x304.png";
import themeGrass684 from "../../../assets/focus/themes/theme-grass-375x684.png";
import themeGrass812 from "../../../assets/focus/themes/theme-grass-375x812.png";
import themeLibrary80 from "../../../assets/focus/themes/theme-library-80x80.png";
import themeLibrary304 from "../../../assets/focus/themes/theme-library-343x304.png";
import themeLibrary684 from "../../../assets/focus/themes/theme-library-375x684.png";
import themeLibrary812 from "../../../assets/focus/themes/theme-library-375x812.png";
import themeSpace80 from "../../../assets/focus/themes/theme-space-80x80.png";
import themeSpace304 from "../../../assets/focus/themes/theme-space-343x304.png";
import themeSpace684 from "../../../assets/focus/themes/theme-space-375x684.png";
import themeSpace812 from "../../../assets/focus/themes/theme-space-375x812.png";

export const FOCUS_THEMES = [
  {
    themeId: 1,
    name: "잔디",
    thumbnailUrl: themeGrass80,
    mainImageUrl: themeGrass304,
    selectBackgroundUrl: themeGrass684,
    sessionBackgroundUrl: themeGrass812,
  },
  {
    themeId: 2,
    name: "우주",
    thumbnailUrl: themeSpace80,
    mainImageUrl: themeSpace304,
    selectBackgroundUrl: themeSpace684,
    sessionBackgroundUrl: themeSpace812,
  },
  {
    themeId: 3,
    name: "서재",
    thumbnailUrl: themeLibrary80,
    mainImageUrl: themeLibrary304,
    selectBackgroundUrl: themeLibrary684,
    sessionBackgroundUrl: themeLibrary812,
  },
] as const;

export type FocusThemeId = (typeof FOCUS_THEMES)[number]["themeId"];

export function isFocusThemeId(value: number): value is FocusThemeId {
  return FOCUS_THEMES.some((theme) => theme.themeId === value);
}

export function findFocusTheme(themeId: FocusThemeId | null) {
  return FOCUS_THEMES.find((theme) => theme.themeId === themeId);
}
