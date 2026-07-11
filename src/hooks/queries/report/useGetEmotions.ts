import { getEmotions } from "../../../api/record";
import { useQuery } from "@tanstack/react-query";

// 개발용
// import type { EmotionResponse } from "../../../types/report/emotions.type";

export function useGetEmotions(bookId: number) {
  return useQuery({
    queryKey: ["emotions", bookId],
    queryFn: () => getEmotions(bookId),
    // queryFn: () => getMockEmotions(bookId),
  });
}

// 개발용
// const dummyData: EmotionResponse = {
//   totalCount: 7,
//   emotionCounts: [
//     {
//       emotion: "FUN",
//       recordCount: 2,
//     },
//     {
//       emotion: "EMPATHIZING",
//       recordCount: 1,
//     },
//     {
//       emotion: "USEFUL",
//       recordCount: 1,
//     },
//     {
//       emotion: "SAD",
//       recordCount: 1,
//     },
//     {
//       emotion: "UNCOMFORTABLE",
//       recordCount: 1,
//     },
//     {
//       emotion: "COMPLICATED",
//       recordCount: 1,
//     },
//     {
//       emotion: "EMPTY",
//       recordCount: 0,
//     },
//   ],
// };

// const getMockEmotions = async (bookId: number): Promise<EmotionResponse> => {
//   return new Promise((resolve) => {
//     console.log(`Fetching emotions for bookId=${bookId}`);
//     setTimeout(() => {
//       resolve(dummyData);
//     }, 500); // 0.5초 지연 후 응답
//   });
// };
