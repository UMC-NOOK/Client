import BookCategoryChart from '../components/BookCategoryChart';
import BookStatusBox from '../components/BookStatusBox';
import BookSummaryCard from '../components/Booksummary';
import CurrentlyReadingBox from '../components/CurrentlyReadingBox';
import MiddleNookie from '../components/MiddleNookie';
import ReadingRateChart from '../components/ReadingRateChart';
import RecentJournalBox from '../components/RecentJournalBox';
import RecentReadingRoomBox from '../components/RecentReadingRoomBox';
import WeeklyRegisteredBooksCard from '../components/WeeklyRegisteredBooksCard';


const Main = () => {
  return (
    <main className="w-full flex justify-center mt-[34px] ml-[200px]">
      {/* 내부 컨테이너: 1440px 고정 */}
      <div className="w-[1440px] flex gap-[10px]">

        {/* 왼쪽 섹션 */}
        <section className="w-[246px] flex flex-col gap-[10px]">
          <WeeklyRegisteredBooksCard />  
          <CurrentlyReadingBox />
          <RecentJournalBox />
          <RecentReadingRoomBox />
        </section>

        {/* 가운데 섹션: 중심 요소 */}
        <section className="flex-1 max-w-[528px]">
          <MiddleNookie />
        </section>

        {/* 오른쪽 섹션 */}
        <section className="w-[246px] flex flex-col gap-[10px]">
          <BookSummaryCard />
          <BookCategoryChart />
          <ReadingRateChart />
        </section>

      </div>
    </main>
  );
};

export default Main;