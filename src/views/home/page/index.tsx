import BookStatusBox from '../../../components/home/BookStatusBox';
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
    </main>
  );
};


export default Main;



