// src/views/lounge/hooks/useMutation/book-info-mutation/usePostBookRegistration.ts
import { useMutation } from '@tanstack/react-query';
import { bookRegistration } from '../../apis/bookRegistration';

export type ReadingStatus = 'READING' | 'FINISHED' | 'BOOKMARK';

const usePostBookRegistration = (bookId: number) => {
  return useMutation({
    mutationFn: ({
      date,
      readingStatus,
    }: {
      date: string;
      readingStatus: ReadingStatus; // ← string → 유니온 타입으로 변경
    }) => bookRegistration(bookId, date, readingStatus),
  });
};

export default usePostBookRegistration;
