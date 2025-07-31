import BookCategoryChart from '../components/BookCategoryChart';
import BookStatusBox from '../components/BookStatusBox';
import BookSummaryCard from '../components/Booksummary';
import CurrentlyReadingBox from '../components/CurrentlyReadingBox';
import MiddleNookie from '../components/MiddleNookie';
import ReadingRateChart from '../components/ReadingRateChart';
import RecentJournalBox from '../components/RecentJournalBox';
import RecentReadingRoomBox from '../components/RecentReadingRoomBox';

const Main = () => {
  return (
    <main className="w-full flex justify-center mt-[34px] ml-[200px]">
      {/* 내부 컨테이너: 1440px 고정 */}
      <div className="w-[1440px] flex gap-[10px]">
        
        {/* 왼쪽 섹션 */}
        <section className="w-[246px] flex flex-col gap-[10px]">
          <BookStatusBox hasRegisteredBooks={false} />
          <CurrentlyReadingBox />
          <RecentJournalBox />
          <RecentReadingRoomBox hasRoom={false} />
        </section>

        {/* 가운데 섹션: 중심 요소 */}
        <section className="flex-1 max-w-[528px]">
          <MiddleNookie />
        </section>

        {/* 오른쪽 섹션 */}
        <section className="w-[246px] flex flex-col gap-[10px]">
          <BookSummaryCard />
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
          <ReadingRateChart />
        </section>

      </div>
    </main>

  );
};
export default Main;