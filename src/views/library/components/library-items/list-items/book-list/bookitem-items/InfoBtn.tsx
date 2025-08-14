import { useNavigate } from 'react-router-dom';
import BookInfoImg from '../../../../../../../assets/button/library/myRecordImg.svg';
import { useTabStore } from '../../../../../../../store/library/useTabStore';

interface InfoBtnProps {
  isbn13: string;
}

const InfoBtn = ({ isbn13 }: InfoBtnProps) => {
  const selectecTab = useTabStore((state) => state.selectedTab);
  const navigate = useNavigate();

  const handleClick = () => {
    // console.log(bookId);
    navigate(`/lounge/book-info/${isbn13}`);
  };

  return (
    <div
      className="flex justify-center items-center gap-4"
      onClick={handleClick}
    >
      <img
        src={BookInfoImg}
        alt="책정보 아이콘"
        className="w-7 h-7 max-w-[14px] max-h-[14px] object-contain"
      />

      <span className="text-sm font-normal pt-0.1">책정보</span>
    </div>
  );
};

export default InfoBtn;
