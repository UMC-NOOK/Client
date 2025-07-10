import gridButton from '../../../../assets/button/library/Frame 25.png';
import hamburger from '../../../../assets/button/library/Frame 26.png';

interface TopBarProps {
  userName: string;
  onChangeGrid: () => void;
  onChangeVertical: () => void;
  activeView: 'grid' | 'vertical';
}

const TopBar = ({
  userName,
  onChangeGrid,
  onChangeVertical,
  activeView,
}: TopBarProps) => {
  return (
    <div className="w-full h-34 bg-[rgba(66,60,53,0.2)] text-nook-100 flex justify-between items-center px-20 rounded-[8px]">
      <div className="text-lg font-normal">
        프로 독자&nbsp;
        <span className="text-nook-secondaey text-lg font-normal">
          {userName}
        </span>
        &nbsp;님의 서재
      </div>
      <div className="flex gap-2">
        <button
          className={`w-14 h-14 object-contain rounded-md  ${
            activeView === 'grid' ? 'bg-[rgba(66,60,53,1)]' : 'bg-transparent'
          }`}
          onClick={onChangeGrid}
        >
          <img src={gridButton} alt="그리드버튼" />
        </button>
        <button
          className={`w-14 h-14 object-contain rounded-md  ${
            activeView === 'vertical'
              ? 'bg-[rgba(66,60,53,1)]'
              : 'bg-transparent'
          }`}
          onClick={onChangeVertical}
        >
          <img src={hamburger} alt="햄버거버튼" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
