import mockBookCover from "../../assets/search/mock_bookcover.svg";
import type { ActiveFocusSession } from "../../types/focus/focus";

/**
 * 포커스 세션 시작 응답을 아직 연동하지 않아 목업으로 대체했다.
 * API가 확정되면 이 파일 대신 src/hooks/mutations/focus의 실제 mutation hook으로 교체한다.
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
