import React from 'react';
import { format } from 'date-fns';
import RegisteredBooksCalendarBox from './RegisteredBooksCalendarBox';
import NoRegisteredBooksBox from './NoRegisteredBooksBox';
import { useGetHomeMonthlyBooks } from '../hooks/useQuery/useGetHomeMonthlyBooks';

const BookStatusBox = () => {
  const ym = format(new Date(), 'yyyy-MM');
  const { data, isLoading } = useGetHomeMonthlyBooks(ym); // MonthlyDayBooks[]

  const hasRegisteredBooks = (data?.length ?? 0) > 0;

  if (isLoading)
    return (
      <div className="w-[246px] h-[157px] bg-[#423C35]/10 rounded-[12px] px-[12px] pt-[12px] pb-[14px] flex items-center justify-center text-white/70">
        로딩…
      </div>
    );

  return hasRegisteredBooks ? (
    <RegisteredBooksCalendarBox monthly={data!} />
  ) : (
    <NoRegisteredBooksBox />
  );
};

export default BookStatusBox;
