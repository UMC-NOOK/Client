import BookCategoryChart from '../../../components/home/BookCategoryChart';
import BookStatusBox from '../../../components/home/BookStatusBox';
import BookSummaryCard from '../../../components/home/Booksummary';
import CurrentlyReadingBox from '../../../components/home/CurrentlyReadingBox';
import MiddleNookie from '../../../components/home/MiddleNookie';
import RecentJournalBox from '../../../components/home/RecentJournalBox';
import RecentReadingRoomBox from '../../../components/home/RecentReadingRoomBox';

const Main = () => {
  return (
    <main className="mt-[34px] px-[200px] flex gap-[10px]">
      <section className="w-[246px] flex flex-col gap-[10px]">
        <BookStatusBox hasRegisteredBooks={false} />
        <CurrentlyReadingBox />
        <RecentJournalBox/>
        <RecentReadingRoomBox hasRoom={false} />
        {/* ... */} 
      </section>
      <section>
      <MiddleNookie/>
      </section>
      <section className="w-[246px] flex flex-col gap-[10px]">
        <BookSummaryCard/>
        <BookCategoryChart categories={[]} />
        <BookCategoryChart
          categories={[
        { name: '에세이', count: 10, latestTimestamp: Date.parse('2025-07-25T10:00:00Z') },
        { name: '자기계발', count: 8, latestTimestamp: Date.parse('2025-07-24T15:00:00Z') },
        { name: '소설', count: 6, latestTimestamp: Date.parse('2025-07-23T09:30:00Z') },
        { name: '시', count: 4, latestTimestamp: Date.parse('2025-07-22T08:10:00Z') },
        { name: '과학', count: 2, latestTimestamp: Date.parse('2025-07-21T12:40:00Z') },
        { name: '역사', count: 1, latestTimestamp: Date.parse('2025-07-20T11:20:00Z') },
          ]}
        />
      </section>
    </main>
  );
};


export default Main;



