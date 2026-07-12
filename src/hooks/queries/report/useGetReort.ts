import { useQuery } from "@tanstack/react-query";

// api
import { getRecords } from "../../../api/record";
import type { SortOption } from "../../../types/report/sortOption.type";

// 개발용
// import type {
//   RecordResponse,
//   RecordRequest,
// } from "../../../types/report/record.type";

export function useGetReport(size: string, sortOption: SortOption) {
  return useQuery({
    queryKey: ["records", sortOption],
    queryFn: () =>
      getRecords({
        size: size,
        order: sortOption,
      }),
    //   queryFn: () =>
    //     getMockReport({
    //       size: size,
    //       order: sortOption,
    //     }), // 개발용
  });
}

// 개발용
// const mockReportData = {
//   items: [
//     {
//       bookId: 101,
//       title: "작별하지 않는다",
//       author: "한강",
//       recordContent: "가장 오래 남았던 문장을 기록한 독서 메모입니다.",
//       coverImageUrl:
//         "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FA63nA%2FbtsFqKitYc4%2FAAAAAAAAAAAAAAAAAAAAAKUGtE-rV1MNFhMn5XNnw1bxEgBggGOxwdRzsu3XHcdD%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3Ds3s6yuo6E8Qa4sVG%252FjRIQEV12jA%253D",
//       recordCount: 4,
//       lastRecordDate: "2026-05-01", // 최신/과거 정렬 테스트용 가짜 데이터
//     },
//     {
//       bookId: 99,
//       title: "소년이 온다",
//       author: "한강",
//       recordContent: "감정이 크게 남은 부분을 짧게 정리한 기록입니다.",
//       coverImageUrl:
//         "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbPz6QM%2FbtsFm0GA4WY%2FAAAAAAAAAAAAAAAAAAAAADt7715qbAHxp6NPPLfY-0Z9m3jPraCk2sDQrSAblEhK%2Fimg.jpg%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3DE6ifvpq2kHb2bLJwKR2Ofrv2Bzc%253D",
//       recordCount: 2,
//       lastRecordDate: "2026-04-15", // 최신/과거 정렬 테스트용 가짜 데이터
//     },
//   ],
//   nextCursor: "fDk5fDIwMjYtMDQtMDFUMDk6MzA",
//   hasNext: true,
// };

// const getMockReport = async (
//   params: RecordRequest,
// ): Promise<RecordResponse> => {
//   // 실제 사용 시 Promise<RecordResponse> 로 타입 지정
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // 1. 원본 데이터를 훼손하지 않기 위해 얕은 복사본 생성
//       let processedItems = [...mockReportData.items];

//       // 2. 정렬(Sort) 옵션 적용
//       if (params.order) {
//         processedItems.sort((a, b) => {
//           switch (params.order) {
//             case "RECORD_COUNT_DESC": // 기록 많은 순
//               return b.recordCount - a.recordCount;
//             case "RECORD_COUNT_ASC": // 기록 적은 순
//               return a.recordCount - b.recordCount;
//             case "RECENT_RECORDED": // 최근 기록순 (내림차순)
//               return (
//                 new Date(b.lastRecordDate).getTime() -
//                 new Date(a.lastRecordDate).getTime()
//               );
//             case "OLDEST_RECORDED": // 오래된 기록순 (오름차순)
//               return (
//                 new Date(a.lastRecordDate).getTime() -
//                 new Date(b.lastRecordDate).getTime()
//               );
//             default:
//               return 0;
//           }
//         });
//       }

//       // 3. 사이즈(size) 자르기
//       if (params.size) {
//         const limit = parseInt(params.size, 10);
//         processedItems = processedItems.slice(0, limit);
//       }

//       // 4. API 응답 포맷에 맞춰 반환
//       resolve({
//         items: processedItems,
//         nextCursor: mockReportData.nextCursor,
//         hasNext: mockReportData.hasNext,
//       });
//     }, 500); // 로딩 스피너/스켈레톤 UI 테스트용 0.5초 딜레이
//   });
// };
