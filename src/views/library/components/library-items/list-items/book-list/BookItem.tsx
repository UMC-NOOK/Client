import StarMaker from './bookitem-items/StarMaker';
import DeleteBtn from './bookitem-items/DeleteBtn';
import InfoBtn from './bookitem-items/InfoBtn';
import RecordBtn from './bookitem-items/RecordBtn';

interface BookItemProps {
  coverImageUrl: string;
  title: string;
  author: string;
  publisher: string;
  publicationDate: string;
  myRating: number;
  bookId: number;
  isbn13: string;
  openModal?: () => void;
}

interface VisibleOptionProps {
  useOnLibrary: boolean;
  useOnSearch: boolean;
}

type BookItemAllProps = BookItemProps & VisibleOptionProps;

const BookItem = ({
  coverImageUrl,
  title,
  author,
  publisher,
  publicationDate,
  myRating,
  useOnLibrary,
  useOnSearch,
  bookId,
  isbn13,
  openModal,
}: BookItemAllProps) => {
  const year = publicationDate.split('-')[0];

  return (
    <div className="flex items-center h-[21.3rem] py-10 border-b-1 border-[rgba(85,83,81,0.7)]">
      <div className="flex items-center mr-10">
        <div
          className="h-[15rem] w-[10rem] bg-cover bg-center bg-no-repeat rounded-[6px]"
          style={{ backgroundImage: `url(${coverImageUrl})` }}
        />
      </div>

      <div className="flex flex-1 h-[15rem] justify-between">
        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            <p className="text-md font-normal text-nook-100 line-clamp-1">
              {title}
            </p>
            <p className="text-sm font-normal text-nook-100">{author}</p>
            <p className="text-sm font-normal text-nook-100 flex items-center">
              {publisher}
              <span className="w-1 h-1 bg-nook-100 rounded-full mx-2" />
              {year}
            </p>
          </div>
          {useOnLibrary && (
            <div className="space-y-1">
              <p className="text-[1.3rem] font-normal text-nook-100 mb-3">
                내 별점
              </p>
              <StarMaker star={myRating} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-end items-center gap-3">
          {useOnLibrary && (
            <>
              <button className="w-[10rem] h-18 text-nook-100 bg-[rgba(55,50,44,0.5)] rounded-[8px] hover:border-1 hover:border-[rgba(85,83,81,1)]">
                <InfoBtn isbn13={isbn13} />
              </button>
              <button className="w-[10rem] h-18 bg-nook-500 text-white rounded-[8px] hover:border-1 hover:border-[rgba(211,211,211,0.3)]">
                <RecordBtn text="내 기록" bookId={bookId} />
              </button>
              <button
                className="w-[10rem] h-18 text-red-500 rounded-[8px] bg-[rgba(241,73,75,0.2)] hover:border-1"
                onClick={openModal}
              >
                <DeleteBtn />
              </button>
            </>
          )}
          {useOnSearch && (
            <>
              <button className="w-[12.1rem] h-20  text-nook-100 border-1 border-[rgba(85,83,81,1)] rounded-[8px] hover:bg-[rgba(22,17,11,1)]">
                <InfoBtn isbn13={isbn13} />
              </button>
              <button
                className="w-[12.1rem] h-20 bg-nook-500 text-white rounded-[8px] hover:bg-[rgba(22,17, 1,1)]"
                onClick={openModal}
              >
                <RecordBtn text="서재 등록" bookId={bookId} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookItem;
