import { useNavigate } from 'react-router-dom';
import download from '../../../../../../../assets/button/library/download.png';
import file2 from '../../../../../../../assets/button/library/file2.png';
import { useTabStore } from '../../../../../../../store/library/useTabStore';

type RecordBtnProps = {
  text: string;
  bookId: number;
};

const RecordBtn = ({ text, bookId }: RecordBtnProps) => {
  const selectedTab = useTabStore((state) => state.selectedTab);
  const navigate = useNavigate();
  const handleClick = () => {
    // console.log(bookId);
    navigate(`/library/${bookId}`);
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
