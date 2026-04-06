import type { TimelineDetailResponse } from "../../types/bookInfo/history";

export const timelineDetailMockMap: Record<number, TimelineDetailResponse> = {
  2001: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2001,
      type: "FOCUS",
      occurredAt: "2026-12-27T23:10:00",
      detail: {
        timeText: "21:28 - 23:10 (102분)",
        page: 284,
      },
    },
  },
  2002: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2002,
      type: "RECORD",
      occurredAt: "2026-12-27T20:15:00",
      detail: {
        content:
          "문장을 따라가다 보니 생각보다 더 조용하고 깊게 스며드는 장면이었다. 인물의 말보다 멈춤과 망설임이 더 오래 남았다.",
        emotion: "EMPATHIZING",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2003: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2003,
      type: "STATUS",
      occurredAt: "2026-12-27T09:00:00",
      detail: {
        title: "독서 중",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2004: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2004,
      type: "REGISTER",
      occurredAt: "2026-12-20T10:12:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2005: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2005,
      type: "FOCUS",
      occurredAt: "2026-12-20T16:35:00",
      detail: {
        timeText: "15:39 - 16:35 (56분)",
        page: 112,
      },
    },
  },
  2006: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2006,
      type: "RECORD",
      occurredAt: "2026-12-20T22:41:00",
      detail: {
        content:
          "짧은 문장 안에 오래 머무르게 하는 힘이 있었다. 눈에 띄는 사건은 크지 않은데도 감정의 밀도가 꽤 높아서 계속 곱씹게 되었다.",
        emotion: "FUN",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2007: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2007,
      type: "FOCUS",
      occurredAt: "2026-12-09T23:15:00",
      detail: {
        timeText: "22:02 - 23:15 (73분)",
        page: 249,
      },
    },
  },
  2008: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2008,
      type: "FOCUS",
      occurredAt: "2026-12-09T16:50:00",
      detail: {
        timeText: "15:23 - 16:50 (87분)",
        page: 178,
      },
    },
  },
  2009: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2009,
      type: "RECORD",
      occurredAt: "2026-12-09T10:20:00",
      detail: {
        content:
          "어느 쪽의 이야기가 더 설득력 있는지보다 왜 그런 선택을 하게 되었는지가 더 오래 남았다. 읽고 나서도 한참 생각이 이어지는 문장이었다.",
        emotion: "USEFUL",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2010: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2010,
      type: "STATUS",
      occurredAt: "2026-12-09T08:40:00",
      detail: {
        title: "완독",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2011: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2011,
      type: "REGISTER",
      occurredAt: "2026-11-28T13:02:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2012: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2012,
      type: "FOCUS",
      occurredAt: "2026-11-28T22:14:00",
      detail: {
        timeText: "21:31 - 22:14 (43분)",
        page: 76,
      },
    },
  },
  2013: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2013,
      type: "STATUS",
      occurredAt: "2026-11-28T18:10:00",
      detail: {
        title: "잠시 멈춤",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2014: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2014,
      type: "RECORD",
      occurredAt: "2026-11-14T22:08:00",
      detail: {
        content:
          "감정을 직접 설명하지 않는데도 인물의 상태가 또렷하게 전해졌다. 그래서 오히려 더 조심스럽게 읽게 되는 대목이었다.",
        emotion: "EMPATHIZING",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2015: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2015,
      type: "FOCUS",
      occurredAt: "2026-11-14T20:00:00",
      detail: {
        timeText: "18:55 - 20:00 (65분)",
        page: 135,
      },
    },
  },
  2016: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2016,
      type: "RECORD",
      occurredAt: "2026-11-14T09:11:00",
      detail: {
        content:
          "성장이란 갑자기 완성되는 것이 아니라는 생각이 들었다. 무심하게 지나가는 순간들이 오히려 변화를 더 선명하게 만든다.",
        emotion: "COMPLICATED",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2017: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2017,
      type: "REGISTER",
      occurredAt: "2026-10-31T11:20:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2018: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2018,
      type: "STATUS",
      occurredAt: "2026-10-31T14:35:00",
      detail: {
        title: "독서 중",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2019: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2019,
      type: "FOCUS",
      occurredAt: "2026-10-31T23:02:00",
      detail: {
        timeText: "20:58 - 23:02 (124분)",
        page: 201,
      },
    },
  },
  2020: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2020,
      type: "RECORD",
      occurredAt: "2026-10-31T23:10:00",
      detail: {
        content:
          "평범한 공간에서 벌어지는 대화인데도 이상하게 오래 남는다. 익숙한 장소가 다른 의미로 보이기 시작하는 구간이었다.",
        emotion: "FUN",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2021: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2021,
      type: "FOCUS",
      occurredAt: "2026-09-18T07:55:00",
      detail: {
        timeText: "07:24 - 07:55 (31분)",
        page: 49,
      },
    },
  },
  2022: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2022,
      type: "STATUS",
      occurredAt: "2026-09-18T08:00:00",
      detail: {
        title: "읽고 싶어요",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2023: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2023,
      type: "REGISTER",
      occurredAt: "2026-09-18T12:40:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2024: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2024,
      type: "RECORD",
      occurredAt: "2026-08-03T21:44:00",
      detail: {
        content:
          "낯선 선택 하나가 주변의 공기를 다르게 만든다는 점이 인상적이었다. 작은 균열이 이야기를 끌고 가는 느낌이었다.",
        emotion: "USEFUL",
        imageUrls: [
          "https://cdn.example.com/record/2024/1",
          "https://cdn.example.com/record/2024/2",
        ],
      },
    },
  },
  2025: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2025,
      type: "FOCUS",
      occurredAt: "2026-08-03T22:30:00",
      detail: {
        timeText: "21:43 - 22:30 (47분)",
        page: 64,
      },
    },
  },
  2026: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2026,
      type: "STATUS",
      occurredAt: "2026-08-03T22:31:00",
      detail: {
        title: "독서 중",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2027: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2027,
      type: "REGISTER",
      occurredAt: "2026-07-11T09:30:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2028: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2028,
      type: "RECORD",
      occurredAt: "2026-07-11T23:12:00",
      detail: {
        content:
          "가족을 다루는 이야기인데 감정선이 과하지 않아서 더 좋았다. 인물 사이의 거리감이 오히려 깊이를 만들어주는 장면이었다.",
        emotion: "EMPATHIZING",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2029: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2029,
      type: "FOCUS",
      occurredAt: "2026-07-11T23:10:00",
      detail: {
        timeText: "21:51 - 23:10 (79분)",
        page: 94,
      },
    },
  },
  2030: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2030,
      type: "STATUS",
      occurredAt: "2026-06-22T08:13:00",
      detail: {
        title: "완독",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2031: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2031,
      type: "RECORD",
      occurredAt: "2026-06-22T20:44:00",
      detail: {
        content:
          "긴 시간을 따라가다 보니 장면 하나하나가 인물의 표정처럼 느껴졌다. 서사의 이동이 꽤 묵직하게 남는 문장이었다.",
        emotion: "COMPLICATED",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2032: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2032,
      type: "FOCUS",
      occurredAt: "2026-06-22T22:01:00",
      detail: {
        timeText: "20:53 - 22:01 (68분)",
        page: 321,
      },
    },
  },
  2033: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2033,
      type: "REGISTER",
      occurredAt: "2026-06-22T22:10:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2034: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2034,
      type: "REGISTER",
      occurredAt: "2025-12-18T18:30:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2035: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2035,
      type: "STATUS",
      occurredAt: "2025-12-18T18:31:00",
      detail: {
        title: "독서 중",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2036: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2036,
      type: "FOCUS",
      occurredAt: "2025-12-18T21:07:00",
      detail: {
        timeText: "20:28 - 21:07 (39분)",
        page: 58,
      },
    },
  },
  2037: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2037,
      type: "REGISTER",
      occurredAt: "2025-11-30T09:00:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2038: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2038,
      type: "RECORD",
      occurredAt: "2025-11-30T22:30:00",
      detail: {
        content:
          "가볍게 읽히는 듯한데 문장 사이사이에 미묘한 긴장이 숨어 있었다. 그래서 다음 장으로 계속 넘어가게 되는 느낌이 좋았다.",
        emotion: "FUN",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2039: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2039,
      type: "FOCUS",
      occurredAt: "2025-10-12T06:58:00",
      detail: {
        timeText: "06:34 - 06:58 (24분)",
        page: 27,
      },
    },
  },
  2040: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2040,
      type: "STATUS",
      occurredAt: "2025-10-12T07:00:00",
      detail: {
        title: "잠시 멈춤",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2041: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2041,
      type: "REGISTER",
      occurredAt: "2025-10-12T20:22:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2042: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2042,
      type: "RECORD",
      occurredAt: "2025-09-01T21:01:00",
      detail: {
        content:
          "평범한 대화와 장면인데도 쉽게 지나칠 수 없었다. 일상의 균열이 아주 잔잔하게 드러나는 방식이 특히 좋았다.",
        emotion: "SAD",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2043: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2043,
      type: "FOCUS",
      occurredAt: "2025-09-01T22:18:00",
      detail: {
        timeText: "21:16 - 22:18 (62분)",
        page: 148,
      },
    },
  },
  2044: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2044,
      type: "STATUS",
      occurredAt: "2025-09-01T22:19:00",
      detail: {
        title: "독서 중",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2045: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2045,
      type: "RECORD",
      occurredAt: "2025-09-01T22:25:00",
      detail: {
        content:
          "인물의 말보다 침묵이 더 크게 다가왔다. 설명이 많지 않은데도 마음속에서 계속 확장되는 문장이 있었다.",
        emotion: "EMPATHIZING",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2046: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2046,
      type: "REGISTER",
      occurredAt: "2025-07-26T11:11:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2047: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2047,
      type: "FOCUS",
      occurredAt: "2025-07-26T23:00:00",
      detail: {
        timeText: "21:26 - 23:00 (94분)",
        page: 55,
      },
    },
  },
  2048: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2048,
      type: "RECORD",
      occurredAt: "2025-07-26T23:05:00",
      detail: {
        content:
          "문장이 단단해서 천천히 읽게 된다. 한 문장 한 문장이 묵직해서 가볍게 넘기기 어려운 장면이었다.",
        emotion: "COMPLICATED",
        imageUrls: [
          "https://cdn.example.com/record/2048/1",
          "https://cdn.example.com/record/2048/2",
        ],
      },
    },
  },
  2049: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2049,
      type: "STATUS",
      occurredAt: "2025-05-03T10:00:00",
      detail: {
        title: "완독",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2050: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2050,
      type: "REGISTER",
      occurredAt: "2025-05-03T10:05:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2051: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2051,
      type: "FOCUS",
      occurredAt: "2025-05-03T22:49:00",
      detail: {
        timeText: "21:57 - 22:49 (52분)",
        page: 83,
      },
    },
  },
  2052: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2052,
      type: "REGISTER",
      occurredAt: "2024-12-24T14:12:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2053: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2053,
      type: "STATUS",
      occurredAt: "2024-12-24T14:13:00",
      detail: {
        title: "읽고 싶어요",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2054: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2054,
      type: "RECORD",
      occurredAt: "2024-12-24T21:49:00",
      detail: {
        content:
          "계절의 공기가 유난히 세밀하게 느껴졌다. 이야기보다 감각이 먼저 남아서 페이지를 덮고도 여운이 길었다.",
        emotion: "EMPATHIZING",
        imageUrls: [
          "https://cdn.example.com/record/2054/1",
          "https://cdn.example.com/record/2054/2",
        ],
      },
    },
  },
  2055: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2055,
      type: "FOCUS",
      occurredAt: "2024-10-10T07:20:00",
      detail: {
        timeText: "07:02 - 07:20 (18분)",
        page: 19,
      },
    },
  },
  2056: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2056,
      type: "REGISTER",
      occurredAt: "2024-10-10T19:10:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2057: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2057,
      type: "RECORD",
      occurredAt: "2024-10-10T23:01:00",
      detail: {
        content:
          "말보다 침묵이 더 많은 장면이었는데 그래서 더 강하게 느껴졌다. 한참 동안 문장만 계속 떠올리게 되는 부분이었다.",
        emotion: "SAD",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2058: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2058,
      type: "STATUS",
      occurredAt: "2024-10-10T23:02:00",
      detail: {
        title: "독서 중",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2059: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2059,
      type: "FOCUS",
      occurredAt: "2024-08-15T22:42:00",
      detail: {
        timeText: "21:31 - 22:42 (71분)",
        page: 144,
      },
    },
  },
  2060: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2060,
      type: "RECORD",
      occurredAt: "2024-08-15T22:43:00",
      detail: {
        content:
          "조용한 장면인데도 감정의 파장이 컸다. 크게 소리치지 않는데도 분명하게 흔들리는 느낌이 좋았다.",
        emotion: "USEFUL",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2061: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2061,
      type: "STATUS",
      occurredAt: "2024-08-15T22:45:00",
      detail: {
        title: "완독",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2062: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2062,
      type: "REGISTER",
      occurredAt: "2024-06-02T12:01:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2063: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2063,
      type: "FOCUS",
      occurredAt: "2024-06-02T15:25:00",
      detail: {
        timeText: "14:48 - 15:25 (37분)",
        page: 91,
      },
    },
  },
  2064: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2064,
      type: "RECORD",
      occurredAt: "2024-06-02T21:11:00",
      detail: {
        content:
          "익숙한 이야기처럼 보이지만 그래서 더 쉽게 흘려보낼 수 없었다. 현실감이 높아서 오래 남는 장면이었다.",
        emotion: "SAD",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
  2065: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2065,
      type: "STATUS",
      occurredAt: "2024-03-17T08:00:00",
      detail: {
        title: "읽고 싶어요",
        description: "독서 상태를 변경했어요.",
      },
    },
  },
  2066: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2066,
      type: "REGISTER",
      occurredAt: "2024-03-17T08:05:00",
      detail: {
        description: "서재에 등록했어요.",
      },
    },
  },
  2067: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2067,
      type: "FOCUS",
      occurredAt: "2024-03-17T23:30:00",
      detail: {
        timeText: "21:29 - 23:30 (121분)",
        page: 203,
      },
    },
  },
  2068: {
    isSuccess: true,
    code: "SUCCESS-200",
    message: "요청에 성공했습니다.",
    result: {
      timelineId: 2068,
      type: "RECORD",
      occurredAt: "2024-03-17T23:35:00",
      detail: {
        content:
          "사소한 장면이 이상할 만큼 오래 남는다. 특별한 사건보다도 작은 표정과 온도가 기억에 더 강하게 박혔다.",
        emotion: "COMPLICATED",
        imageUrls: [
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
          "https://i.pinimg.com/236x/34/ee/4d/34ee4d418a30e5ca3faf307386591fa7.jpg",
        ],
      },
    },
  },
};
