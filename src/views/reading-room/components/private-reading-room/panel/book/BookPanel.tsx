import bookUnion from '../../../../../../assets/readingRoom/controll-icon/bookUnion.svg';
import BookItem from './BookItem';

function BookPanel() {
  const mockData = [
    { title: '키에에엣' },
    { title: '키에에엣' },
    { title: '키에에엣' },
    { title: '키에에엣' },
    { title: '키에에엣' },
    { title: '키에에엣' },
    { title: '키에에엣' },
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
            {mockData.map((data) => (
              <BookItem bookTitle={data.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPanel;
