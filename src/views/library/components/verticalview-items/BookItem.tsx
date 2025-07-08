import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegFileAlt } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import StarMaker from './bookitem-items/StarMaker';
import DeleteBtn from './bookitem-items/DeleteBtn';
import InfoBtn from './bookitem-items/InfoBtn';
import RecordBtn from './bookitem-items/RecordBtn';

interface BookItemProps {
  img: string;
  bookName: string;
  author: string;
  publisher: string;
  publication_date: string;
  star: number;
  openModal?: () => void;
}

interface VisibleOptionProps {
  visible_star: boolean;
  visible_deleteBtn: boolean;
}

type BookItemAllProps = BookItemProps & VisibleOptionProps;

const BookItem = ({
  img,
  bookName,
  author,
  publisher,
  publication_date,
  star,
  visible_star,
  visible_deleteBtn,
  openModal,
}: BookItemAllProps) => {
  const year = publication_date.split('-')[0];

  return (
    <div className="flex h-[21.3rem] py-8 border-b-1 border-[rgba(85,83,81,0.7)]">
      <div className="flex items-center mr-10">
        <div
          className="h-[17.02rem] w-[11.1rem] bg-cover bg-center bg-no-repeat rounded-[6px]"
          style={{ backgroundImage: `url(${img})` }}
        />
      </div>

      <div className="flex flex-1 justify-between py-2">
        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            <p className="text-md font-normal text-nook-100">{bookName}</p>
            <p className="text-sm font-normal text-nook-100">{author}</p>
            <p className="text-sm font-normal text-nook-100 flex items-center">
              {publisher}
              <span className="w-1 h-1 bg-nook-100 rounded-full mx-2" />
              {year}
            </p>
          </div>
          {visible_star && (
            <div className="space-y-1">
              <p className="text-xs font-normal text-nook-100 mb-3">내별점</p>
              <StarMaker star={star} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-end items-center gap-3">
          {visible_deleteBtn && (
            <button
              className="w-[12.1rem] h-20 text-red-500 border-1 border-red-500 rounded-[8px] hover:bg-nook-600"
              onClick={openModal}
            >
              <DeleteBtn />
            </button>
          )}
          <button className="w-[12.1rem] h-20  text-nook-100 border-1 border-[rgba(85,83,81,1)] rounded-[8px] hover:bg-nook-600">
            <InfoBtn />
          </button>
          <button className="w-[12.1rem] h-20 bg-nook-500 text-white rounded-[8px] hover:bg-nook-600">
            <RecordBtn />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
