import download from '../../../../../../../assets/button/library/download.png';
import file2 from '../../../../../../../assets/button/library/file2.png';
import { useTabStore } from '../../../../../../../store/library/useTabStore';

type RecordBtnProps = {
  text: string;
};

const RecordBtn = ({ text }: RecordBtnProps) => {
  const selectedTab = useTabStore((state) => state.selectedTab);
  return (
    <div className="flex justify-center items-center gap-4">
      {selectedTab === '찜' ? (
        <img
          src={file2}
          alt="내 기록 버튼"
          className="w-7 h-7 max-w-[14px] max-h-[14px] object-contain"
        />
      ) : (
        <img
          src={download}
          alt="내 기록 버튼"
          className="w-7 h-7 max-w-[14px] max-h-[14px] object-contain"
        />
      )}
      <span className="text-sm font-normal pt-0.1">{text}</span>
    </div>
  );
};

export default RecordBtn;
