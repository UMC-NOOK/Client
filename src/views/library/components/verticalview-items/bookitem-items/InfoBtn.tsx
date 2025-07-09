import BookInfoImg from '../../../../../assets/button/library/file.png';
import BookInfoImg2 from '../../../../../assets/button/library/reading.png';
import { useTabStore } from '../../../../../store/library/useTabStore';

const InfoBtn = () => {
  const selectecTab = useTabStore((state) => state.selectedTab);

  return (
    <div className="flex justify-center items-center gap-4">
      {selectecTab === '찜' ? (
        <img
          src={BookInfoImg2}
          alt="책정보 아이콘(찜)"
          className="w-9 h-9 max-w-[18px] max-h-[18px] object-contain"
        />
      ) : (
        <img
          src={BookInfoImg}
          alt="책정보 아이콘"
          className="w-9 h-9 max-w-[18px] max-h-[18px] object-contain"
        />
      )}
      <span className="text-[1.6rem] font-normal pt-0.1">책정보</span>
    </div>
  );
};

export default InfoBtn;
