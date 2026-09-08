import mockBookCover from "../../assets/search/mock_bookcover.svg";
import type {
  ActiveFocusSession,
  FocusBookItem,
  FocusLibraryBookItem,
} from "../../types/focus/focus";

/**
 * 실제 API 계약(오늘/책별 누적 시간 조회 endpoint, 테마 목록)이 아직 없어 목업으로 대체했다.
 * API가 확정되면 이 파일 대신 src/hooks/queries/focus의 실제 query hook으로 교체한다.
 */

// 도서 선택부터 세션까지 libraryId 전달이 연결되면 실제 세션 데이터로 교체한다.
export const mockActiveFocusSession: ActiveFocusSession = {
  focusId: 9001,
  libraryId: 1,
  bookId: 101,
  bookTitle: "첫사랑의 침공",
  author: "권혁일",
  coverUrl: mockBookCover,
};

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

/**
 * 도서 선택(focus/select) 화면 전용. 메인과 같은 서재 책 7권을 그대로 재사용하고
 * 정렬(최근 포커스/기록 많은/기록 적은 순)에 필요한 값만 추가했다.
 */
export const mockFocusLibraryBooks: FocusLibraryBookItem[] = [
  { ...readingBooks[2], recentFocusedAt: "2026-08-26T21:40:00", focusRecordCount: 12 },
  { ...readingBooks[1], recentFocusedAt: "2026-08-26T13:05:00", focusRecordCount: 9 },
  { ...readingBooks[0], recentFocusedAt: "2026-08-25T22:10:00", focusRecordCount: 6 },
  { ...readingBooks[3], recentFocusedAt: "2026-08-24T19:30:00", focusRecordCount: 4 },
  { ...finishedBooks[0], recentFocusedAt: "2026-08-20T10:00:00", focusRecordCount: 15 },
  { ...beforeBooks[0], recentFocusedAt: null, focusRecordCount: 0 },
  { ...beforeBooks[1], recentFocusedAt: null, focusRecordCount: 0 },
];
