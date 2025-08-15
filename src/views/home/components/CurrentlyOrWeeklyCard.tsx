import React, { useMemo } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import CurrentlyReadingBox from './CurrentlyReadingBox';
import WeeklyRegisteredBooksCard from './WeeklyRegisteredBooksCard';
import NoRegisteredBooksBox from './NoRegisteredBooksBox';
import { useGetHomeReading } from '../hooks/useQuery/useGetHomeReading';
import useGetWeeklyBooks from '../hooks/useQuery/useGetWeeklyBooks';

export default function CurrentlyOrWeeklyCard() {
  const { data: nowReading } = useGetHomeReading(); // { bookId, title, thumbnailUrl } | undefined
  const { data: weekly = [], isLoading, isError } = useGetWeeklyBooks();

  const hasWeekly = (weekly ?? []).some(w => !!w?.bookInfo?.thumbnailUrl);

  if (nowReading) return <CurrentlyReadingBox />;

  if (isLoading) {
    return (
      <div className="w-[246px] h-[60px] bg-[#423C35]/10 rounded-[12px] flex items-center justify-center">
        <span className="text-white/70 text-sm">불러오는 중…</span>
      </div>
    );
  }

  if (isError) return <NoRegisteredBooksBox />;

  return hasWeekly ? <WeeklyRegisteredBooksCard /> : <NoRegisteredBooksBox />;
}
