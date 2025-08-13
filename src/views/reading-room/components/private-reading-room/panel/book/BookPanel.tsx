import bookUnion from '../../../../../../assets/readingRoom/controll-icon/bookUnion.svg';
import useGetBookList from '../../../../hooks/private-reading-room/useQuery/useGetBookList';
import BookItem from './BookItem';

interface BookPanelActionProps {
  onChoose: (title: string) => void;
}

interface BookPanelProps {
  bookId: number;
  title: string;
}

function BookPanel({ onChoose }: BookPanelActionProps) {
  const { data, isLoading, isError, error, isSuccess, refetch } =
    useGetBookList();
  // console.log('bookpanel', data);

  // const books = (data as BookPanelProps[]) || [];
  const books: BookPanelProps[] = [
    { title: '살려줘', bookId: 12 },
    { title: '죽여줘', bookId: 13 },
    { title: '할래?', bookId: 14 },
    { title: '말래?', bookId: 15 },
    { title: '히이이이익', bookId: 16 },
    { title: '키이이이익', bookId: 17 },
    { title: '저리가', bookId: 18 },
  ];
  return (
    <div className="relative">
      <img src={bookUnion} alt="말풍선 배경" className="object-contain" />
      <div className="absolute top-0 left-0 right-0 w-full h-[95%] backdrop-blur-xl rounded-[12px]" />
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <div className="w-141 h-137 relative bottom-3 flex flex-col items-start gap-6">
          <span className="text-sm text-nook-100 font-semibold">
            무슨 책을 읽고 있나요?
          </span>
          <div
            className="flex flex-col w-full gap-5 overflow-y-auto h-full 
                scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent
                hover:scrollbar-thumb-white/20 scrollbar-thumb-rounded-full"
          >
            {books?.map((books) => (
              <BookItem
                key={books.bookId}
                bookId={books.bookId}
                title={books.title}
                onClick={onChoose}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPanel;
