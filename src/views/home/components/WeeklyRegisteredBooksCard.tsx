import React, { useMemo } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import useGetWeeklyBooks from '../hooks/useQuery/useGetWeeklyBooks';
import RegisteredBooksCalendarBox from '../components/RegisteredBooksCalendarBox';
import NoRegisteredBooksBox from '../components/NoRegisteredBooksBox';

type MonthlyDayBooks = {
  date: string; // 'YYYY-MM-DD'
  books: { bookId: number; thumbnailUrl: string }[];
};

const OFFSET_SUNDAY0 = 0; 

export default function WeeklyRegisteredBooksCard() {
  const { data = [], isLoading, isError } = useGetWeeklyBooks();

  // 이번 주 월요일 시작
  const weekStart = useMemo(() => startOfWeek(new Date(), { weekStartsOn: 1 }), []);
  const dates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => format(addDays(weekStart, i), 'yyyy-MM-dd')),
    [weekStart]
  );

  const monthly: MonthlyDayBooks[] = useMemo(() => {
    // 기본 빈 구조 생성
    const base: MonthlyDayBooks[] = dates.map(d => ({ date: d, books: [] }));

    for (const item of data) {
      if (item == null) continue;
      const idx = (item.day + OFFSET_SUNDAY0) % 7; // 서버 day 보정
      if (idx < 0 || idx > 6) continue;

      const dateStr = dates[idx];
      const thumb = item.bookInfo?.thumbnailUrl;
      const id = item.bookInfo?.bookId;

      if (dateStr && thumb && typeof id === 'number') {
        const target = base.find(b => b.date === dateStr);
        if (target) target.books.push({ bookId: id, thumbnailUrl: thumb });
      }
    }
    return base;
  }, [data, dates]);

  const hasAny = monthly.some(m => m.books.length > 0);

  if (isLoading) {
    return <NoRegisteredBooksBox />;
  }

  if (isError || !hasAny) {
    return <NoRegisteredBooksBox />;
  }

  return <RegisteredBooksCalendarBox monthly={monthly} />;
}