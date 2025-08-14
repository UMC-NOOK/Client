// useGetCalendar.ts
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { calendarFetch } from '../../../apis/book-info/calendar';
import { YMD } from '../../../types/book-info/calendar';

const useGetCalendar = (yearMonth: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['calendar', yearMonth],
    queryFn: () => calendarFetch(yearMonth),
    enabled: !!yearMonth,
  });

  // 서버 응답: { result: { dates: [[2025,8,10], ...] } }
  const disabledDateSet = useMemo(() => {
    const tuples: YMD[] = data?.result?.dates ?? [];
    const dayList = tuples.map((tuple) => {
      const [year, month, day] = tuple;
      return new Date(year, month - 1, day); // month is 0-indexed in Date
    });
    return new Set(dayList.map((date) => date.toISOString().split('T')[0]));
  }, [data]);

  return { data, disabledDateSet, ...rest };
};

export default useGetCalendar;
