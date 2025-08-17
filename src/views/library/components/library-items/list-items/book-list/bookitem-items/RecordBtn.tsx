import { useNavigate } from 'react-router-dom';
import download from '../../../../../../../assets/button/library/bookInfoImg.svg';
import { useTabStore } from '../../../../../../../store/library/useTabStore';

type RecordBtnProps = {
  text: string;
  bookId: number;
  coverImageUrl: string;
  title: string;
  author: string;
};

const RecordBtn = ({
  text,
  bookId,
  coverImageUrl,
  title,
  author,
}: RecordBtnProps) => {
  const selectedTab = useTabStore((state) => state.selectedTab);
  const navigate = useNavigate();
  const handleClick = () => {
    // console.log(bookId);
    navigate(`/library/${bookId}`, {
      state: {
        bookId,
        coverImageUrl,
        title,
        author,
      },
    });
  };
  return (
    <div
      className="flex justify-center items-center gap-4"
      onClick={handleClick}
    >
      <img
        src={download}
        alt="내 기록 버튼"
        className="w-7 h-7 max-w-[14px] max-h-[14px] object-contain"
      />

      <span className="text-sm font-normal pt-0.1">{text}</span>
    </div>
  );
};

export default RecordBtn;
