import { getEmotionRecords } from "../../../api/record";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { EmotionKey } from "../../../types/report/emotions.type";

export function useGetIndividueleRecords(
  bookId: number,
  size?: string,
  emotion?: EmotionKey,
) {
  return useInfiniteQuery({
    queryKey: ["individueleRecords", bookId, size, emotion],

    initialPageParam: undefined as number | undefined,

    queryFn: ({ pageParam }) =>
      getEmotionRecords({
        bookId,
        size,
        emotion,
        cursor: pageParam,
      }),

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) {
        return undefined;
      }

      return lastPage.nextCursor ?? undefined;
    },

    enabled: bookId > 0,
  });
}
