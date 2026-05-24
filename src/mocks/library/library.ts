import type {
    BookStatusType,
    LibraryBookNumResponse,
    LibraryBookGoalResponse,
    LibraryFocusTimeResponse,
    LibraryBookGoalPatchResponse,
    LibraryDateFocusResponse,
    LibraryStatusBook,
    LibraryStatusBookResponse,
  } from "../../types/libraryInfo/library";
  
  /**
   * 서재 전체 도서 수 조회
   */
  export const mockLibraryBookNumResponse: LibraryBookNumResponse = {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "서재 전체 도서 수 조회에 성공했습니다.",
    result: {
      totalBookNum: 126,
    },
  };
  
  /**
   * 서재 독서 목표 조회
   */
  export const mockLibraryBookGoalResponse: LibraryBookGoalResponse = {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "서재 독서 목표 조회에 성공했습니다.",
    result: {
      goal: 100,
      remainingCount: 0,
      progressPercent: 100,
    },
  };
  
  /**
   * 월별 포커스 시간 조회
   */
  export const mockLibraryFocusTimeResponse: LibraryFocusTimeResponse = {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "월별 포커스 시간 조회에 성공했습니다.",
    result: {
      yearMonth: "2026-04",
      totalFocusMin: 3137, // 52시간 17분
      focusBookItems: [
        { date: "2026-04-01", timeSlot: "FOCUS_02" },
        { date: "2026-04-02", timeSlot: "FOCUS_01" },
        { date: "2026-04-03", timeSlot: "FOCUS_04" },
        { date: "2026-04-04", timeSlot: "FOCUS_03" },
        { date: "2026-04-06", timeSlot: "FOCUS_02" },
        { date: "2026-04-07", timeSlot: "FOCUS_02" },
        { date: "2026-04-08", timeSlot: "FOCUS_01" },
        { date: "2026-04-09", timeSlot: "FOCUS_03" },
        { date: "2026-04-10", timeSlot: "FOCUS_02" },
        { date: "2026-04-11", timeSlot: "FOCUS_04" },
        { date: "2026-04-12", timeSlot: "FOCUS_01" },
        { date: "2026-04-15", timeSlot: "FOCUS_03" },
        { date: "2026-04-18", timeSlot: "FOCUS_04" },
        { date: "2026-04-20", timeSlot: "FOCUS_02" },
        { date: "2026-04-21", timeSlot: "FOCUS_01" },
        { date: "2026-04-22", timeSlot: "FOCUS_02" },
        { date: "2026-04-24", timeSlot: "FOCUS_03" },
        { date: "2026-04-26", timeSlot: "FOCUS_01" },
        { date: "2026-04-28", timeSlot: "FOCUS_02" },
      ],
    },
  };
  
  /**
   * 독서 목표 수정
   */
  export const mockLibraryBookGoalPatchResponse: LibraryBookGoalPatchResponse = {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "독서 목표 수정에 성공했습니다.",
    result: {
      goal: 120,
    },
  };
  
  /**
   * 날짜별 포커스 도서 조회
   */
  export const mockLibraryDateFocusResponse: LibraryDateFocusResponse = {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "날짜별 포커스 도서 조회에 성공했습니다.",
    result: {
      items: [
        {
          bookId: 1,
          title: "[국내도서] 혼모노",
          author: "성해나",
          focusSec: 3630,
          coverUrl:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
        },
        {
          bookId: 2,
          title: "[국내도서] 클라우드 쿠쿠 랜드",
          author: "이소영",
          focusSec: 1800,
          coverUrl:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
        },
        {
          bookId: 3,
          title: "[해외도서] Atomic Habits",
          author: "James Clear",
          focusSec: 2400,
          coverUrl:
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400&auto=format&fit=crop",
        },
      ],
      nextCursor: 3,
      hasNext: true,
    },
  };
  
  /**
   * 상태별 책 조회 - BEFORE
   */
  export const mockLibraryStatusBeforeResponse: LibraryStatusBookResponse<"BEFORE"> =
    {
      isSuccess: true,
      code: "SUCCESS-200",
      message: "읽기 전 도서 조회에 성공했습니다.",
      result: {
        readingStatus: "BEFORE",
        totalBookNum: 12,
        bookItems: {
          items: [
            {
              bookId: 11,
              title: "도둑맞은 집중력",
              author: "요한 하리",
              coverUrl:
                "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
            },
            {
              bookId: 12,
              title: "불편한 편의점",
              author: "김호연",
              coverUrl:
                "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop",
            },
            {
              bookId: 13,
              title: "아주 작은 습관의 힘",
              author: "James Clear",
              coverUrl:
                "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400&auto=format&fit=crop",
            },
            {
              bookId: 14,
              title: "미움받을 용기",
              author: "기시미 이치로",
              coverUrl:
                "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
            },
            {
              bookId: 15,
              title: "1984",
              author: "조지 오웰",
              coverUrl:
                "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop",
            },
            {
              bookId: 16,
              title: "데미안",
              author: "헤르만 헤세",
              coverUrl:
                "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400&auto=format&fit=crop",
            },
          ],
          nextCursor: 5,
          hasNext: true,
        },
      },
    };
  
  /**
   * 상태별 책 조회 - READING
   */
  export const mockLibraryStatusReadingResponse: LibraryStatusBookResponse<"READING"> =
    {
      isSuccess: true,
      code: "SUCCESS-200",
      message: "읽는 중 도서 조회에 성공했습니다.",
      result: {
        readingStatus: "READING",
        totalBookNum: 5,
        bookItems: {
          items: [
            {
              bookId: 21,
              title: "혼모노",
              author: "성해나",
              coverUrl:
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
              startedAt: "2026-04-10T09:00:00",
            },
            {
              bookId: 22,
              title: "클라우드 쿠쿠 랜드",
              author: "이소영",
              coverUrl:
                "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
              startedAt: "2026-04-18T20:30:00",
            },
          ],
          nextCursor: null,
          hasNext: null,
        },
      },
    };
  
  /**
   * 상태별 책 조회 - FINISHED
   */
  export const mockLibraryStatusFinishedResponse: LibraryStatusBookResponse<"FINISHED"> =
    {
      isSuccess: true,
      code: "SUCCESS-200",
      message: "완독 도서 조회에 성공했습니다.",
      result: {
        readingStatus: "FINISHED",
        totalBookNum: 27,
        bookItems: {
          items: [
            {
              bookId: 31,
              title: "트렌드 코리아 2026",
              author: "김난도 외",
              coverUrl:
                "https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=400&auto=format&fit=crop",
              startedAt: "2026-03-01T10:00:00",
              endedAt: "2026-03-07T21:10:00",
            },
            {
              bookId: 32,
              title: "세이노의 가르침",
              author: "세이노",
              coverUrl:
                "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=400&auto=format&fit=crop",
              startedAt: "2026-03-10T08:30:00",
              endedAt: "2026-03-19T23:40:00",
            },
          ],
          nextCursor: 32,
          hasNext: true,
        },
      },
    };
  
  /**
   * 빈 상태 예시
   */
  export const mockLibraryStatusEmptyResponse: LibraryStatusBookResponse<"BEFORE"> = {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "읽기 전 도서가 없습니다.",
    result: {
      readingStatus: "BEFORE",
      totalBookNum: 0,
      bookItems: {
        items: [],
        nextCursor: null,
        hasNext: null,
      },
    },
  };

  export const MOCK_SPECIFIC_DATE_BOOK_ITEMS = [
    {
      bookId: 1,
      title: "[국내도서] 혼모노",
      author: "성해나",
      focusTime: "01:00:00",
      coverUrl:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
    },
    {
      bookId: 2,
      title: "[국내도서] 데미안",
      author: "헤르만 헤세",
      focusTime: "00:42:00",
      coverUrl:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
    },
    {
      bookId: 3,
      title: "[국내도서] 어린 왕자",
      author: "생텍쥐페리",
      focusTime: "00:25:00",
      coverUrl:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400&auto=format&fit=crop",
    },
    {
      bookId: 4,
      title: "[국내도서] 아몬드",
      author: "손원평",
      focusTime: "00:33:00",
      coverUrl:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
    },
    {
      bookId: 5,
      title: "[국내도서] 달러구트 꿈 백화점",
      author: "이미예",
      focusTime: "00:18:00",
      coverUrl:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop",
    },
  ];

  export const mockLibraryBooksMonthlyResponse = {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "월별 독서 책 조회에 성공했습니다.",
    result: {
      yearMonth: "2026-04",
      totalBookCount: 11,
      days: [
        {
          date: "2026-04-01",
          bookCount: 1,
          topBook: {
            bookId: 101,
            coverUrl:
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
          },
        },
        {
          date: "2026-04-03",
          bookCount: 2,
          topBook: {
            bookId: 102,
            coverUrl:
              "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
          },
        },
        {
          date: "2026-04-07",
          bookCount: 1,
          topBook: {
            bookId: 103,
            coverUrl:
              "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400&auto=format&fit=crop",
          },
        },
        {
          date: "2026-04-11",
          bookCount: 3,
          topBook: {
            bookId: 104,
            coverUrl:
              "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
          },
        },
        {
          date: "2026-04-16",
          bookCount: 1,
          topBook: {
            bookId: 105,
            coverUrl:
              "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop",
          },
        },
        {
          date: "2026-04-20",
          bookCount: 1,
          topBook: {
            bookId: 106,
            coverUrl:
              "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400&auto=format&fit=crop",
          },
        },
        {
          date: "2026-04-24",
          bookCount: 2,
          topBook: {
            bookId: 107,
            coverUrl:
              "https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=400&auto=format&fit=crop",
          },
        },
      ],
    },
  };
/**
 * GET /library/books mock — cursor·size는 목록 배열 기준 offset·limit.
 */
export function getMockLibraryStatusBooksPage<T extends BookStatusType>(
    status: T,
    cursor: number | null,
    size: number,
): LibraryStatusBook<T> {
    const base =
        status === "BEFORE"
            ? mockLibraryStatusBeforeResponse.result
            : status === "READING"
              ? mockLibraryStatusReadingResponse.result
              : mockLibraryStatusFinishedResponse.result;

    const full = [...base.bookItems.items];
    const offset = cursor ?? 0;
    const items = full.slice(offset, offset + size);
    const deliveredEnd = offset + items.length;
    const hasNext = deliveredEnd < full.length;

    return {
        readingStatus: status,
        totalBookNum: base.totalBookNum,
        bookItems: {
            items,
            nextCursor: hasNext ? deliveredEnd : null,
            hasNext: hasNext ? true : null,
        },
    } as LibraryStatusBook<T>;
}