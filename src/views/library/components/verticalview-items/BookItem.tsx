import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegFileAlt } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import StarMaker from './bookitem-items/StarMaker';

interface BookItemProps {
  img: string;
  bookName: string;
  author: string;
  publisher: string;
  publication_date: string;
  star: number;
}

const BookItem = ({
  img,
  bookName,
  author,
  publisher,
  publication_date,
  star,
}: BookItemProps) => {
  return (
    <div className="flex h-[210px] py-8 border-b-1 border-[rgba(85,83,81,0.7)]">
      <div className="flex items-center mr-6">
        <div
          className="h-[170px] w-[120px] bg-cover bg-center bg-no-repeat rounded-[6px]"
          style={{ backgroundImage: `url(${img})` }}
        />
      </div>

      <div className="flex flex-1 justify-between py-2">
        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            <p className="text-md font-normal text-nook-100">{bookName}</p>
            <p className="text-sm text-nook-100">{author}</p>
            <p className="text-sm text-nook-100">
              {publisher}
              {publication_date}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-nook-100">내별점</p>
            <StarMaker star={star} />
          </div>
        </div>

        <div className="flex flex-col justify-end items-center gap-3">
          <button className="w-[120px] h-[40px] text-red-500 border-2 border-red-500 rounded-xl hover:bg-nook-600">
            <div className="flex justify-center items-center gap-3">
              <FaRegTrashAlt size={18} />
              <span className="text-sm pt-2">삭제</span>
            </div>
          </button>
          <button className="w-[120px] h-[40px]  text-nook-100 border-2 border-[rgba(85,83,81,1)] rounded-xl hover:bg-nook-600">
            <div className="flex justify-center items-center gap-3">
              <FaRegFileAlt size={20} />
              <span className="text-sm pt-2">책정보</span>
            </div>
          </button>
          <button className="w-[120px] h-[40px] bg-nook-500 text-white rounded-xl hover:bg-nook-600">
            <div className="flex justify-center items-center gap-3">
              <FiDownload size={20} />
              <span className="text-sm pt-2">내기록</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
