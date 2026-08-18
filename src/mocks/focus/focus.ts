import themeGrass from "../../assets/focus/themes/theme-grass-343x304.png";
import themeGrass80 from "../../assets/focus/themes/theme-grass-80x80.png";
import themeGrass684 from "../../assets/focus/themes/theme-grass-375x684.png";
import themeLibrary from "../../assets/focus/themes/theme-library-343x304.png";
import themeLibrary80 from "../../assets/focus/themes/theme-library-80x80.png";
import themeLibrary684 from "../../assets/focus/themes/theme-library-375x684.png";
import themeSpace from "../../assets/focus/themes/theme-space-343x304.png";
import themeSpace80 from "../../assets/focus/themes/theme-space-80x80.png";
import themeSpace684 from "../../assets/focus/themes/theme-space-375x684.png";
import mockBookCover from "../../assets/search/mock_bookcover.svg";
import type {
  FocusBookItem,
  FocusMainSummaryResponse,
  FocusTheme,
} from "../../types/focus/focus";

/**
 * 실제 API 계약(오늘/책별 누적 시간 조회 endpoint, 테마 목록)이 아직 없어 목업으로 대체.
 * docs/api/focus.md "구현 전 확인할 계약" 참고 — API 확정되면 이 파일 대신
 * src/hooks/queries/focus의 실제 query hook으로 교체.
 * 테마 이미지 원본: docs/피그마 화면/포커스 도메인_My/테마 png 모음 (343x304 버전만 우선 반영,
 * 80x80/375x684/375x812은 테마 선택·포커스 진입 화면 작업 시 추가)
 */

export const mockFocusThemes: FocusTheme[] = [
  { themeId: 1, name: "잔디", imageUrl: themeGrass },
  { themeId: 2, name: "우주", imageUrl: themeSpace },
  { themeId: 3, name: "서재", imageUrl: themeLibrary },
];

/**
 * 테마 선택 화면(focus/theme) 전용. 테마는 잔디/우주/서재 3종 고정(2026-08-18 디자이너 확인
 * — 4번째 "기본 테마" 타일 추가는 전날의 착오였고 원복됨). "선택 안 함"은 별도 타일이 아니라
 * 셋 중 아무것도 select 상태가 아닌 것으로 표현한다.
 */
export type FocusThemeSelectOption = {
  themeId: number;
  name: string;
  thumbnailUrl: string; // 80x80, 타일 썸네일
  backgroundUrl: string; // 375x684, 선택 시 화면 배경
};

export const mockFocusThemeSelectOptions: FocusThemeSelectOption[] = [
  { themeId: 1, name: "잔디", thumbnailUrl: themeGrass80, backgroundUrl: themeGrass684 },
  { themeId: 2, name: "우주", thumbnailUrl: themeSpace80, backgroundUrl: themeSpace684 },
  { themeId: 3, name: "서재", thumbnailUrl: themeLibrary80, backgroundUrl: themeLibrary684 },
];

const beforeBooks: FocusBookItem[] = [
  {
    libraryId: 5,
    bookId: 105,
    title: "말라붙은 잉크의 시간",
    author: "한도영",
    coverUrl: mockBookCover,
    status: "BEFORE",
    todayFocusSeconds: 0,
  },
  {
    libraryId: 6,
    bookId: 106,
    title: "느린 계절의 기록",
    author: "서은채",
    coverUrl: mockBookCover,
    status: "BEFORE",
    todayFocusSeconds: 0,
  },
];

const readingBooks: FocusBookItem[] = [
  {
    libraryId: 1,
    bookId: 101,
    title: "첫사랑의 침공",
    author: "권혁일",
    coverUrl: mockBookCover,
    status: "READING",
    todayFocusSeconds: 1812, // 00:30:12
  },
  {
    libraryId: 2,
    bookId: 102,
    title: "행복할 거야 이래도 되나 싶을 만큼",
    author: "일홍",
    coverUrl: mockBookCover,
    status: "READING",
    todayFocusSeconds: 1814, // 00:30:14
  },
  {
    libraryId: 3,
    bookId: 103,
    title: "비범한 평범",
    author: "조수용",
    coverUrl: mockBookCover,
    status: "READING",
    todayFocusSeconds: 2040, // 00:34:00
  },
  {
    libraryId: 4,
    bookId: 104,
    title: "괴테는 모든 것을 말했다",
    author: "스즈키 유이",
    coverUrl: mockBookCover,
    status: "READING",
    todayFocusSeconds: 1620, // 00:27:00
  },
];

const finishedBooks: FocusBookItem[] = [
  {
    libraryId: 7,
    bookId: 107,
    title: "완독한 어느 여름",
    author: "백주안",
    coverUrl: mockBookCover,
    status: "FINISHED",
    todayFocusSeconds: 0,
  },
];

const books = [...beforeBooks, ...readingBooks, ...finishedBooks];

const todayTotalFocusSeconds = books.reduce(
  (sum, book) => sum + book.todayFocusSeconds,
  0,
);

export const mockFocusMainSummaryResponse: FocusMainSummaryResponse = {
  isSuccess: true,
  code: "SUCCESS-200",
  message: "포커스 메인 조회에 성공했습니다.",
  result: {
    todayTotalFocusSeconds,
    // 메인 화면 기본 상태 = 테마 없음(fit.png 기준 단색 배경). 테마 이미지·Dim/MaskGradient
    // 처리는 mockFocusThemes[0] 등으로 바꿔서 언제든 확인 가능하도록 구현만 남겨둠.
    recentTheme: null,
    books,
  },
};
