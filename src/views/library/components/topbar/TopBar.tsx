import React from 'react';
import gridButton from '../../../../assets/button/library/Frame 25.png';
import hamburger from '../../../../assets/button/library/Frame 26.png';

interface TopBarProps {
  userName: string;
  onChangeGrid: () => void;
  onChangeVertical: () => void;
  activeView: 'grid' | 'vertical'; // 현재 활성화된 뷰를 나타내는 prop 추가
}

const TopBar = ({
  userName,
  onChangeGrid,
  onChangeVertical,
  activeView,
}: TopBarProps) => {
  return (
    <div className="w-full h-[68px] bg-nook-600 text-nook-100 flex justify-between items-center px-[40px] rounded-[8px]">
      <div className="text-lg font-normal">
        프로 독자
        <span className="text-nook-secondaey text-lg font-normal">
          {userName}
        </span>
        님의 서재
      </div>
      <div className="flex gap-2">
        <button
          className={`w-12 h-12 object-contain rounded-md p-1 ${
            activeView === 'grid' ? 'bg-nook-400' : 'bg-transparent'
          }`}
          onClick={onChangeGrid} // 부모로부터 받은 함수를 직접 연결
        >
          <img src={gridButton} alt="그리드버튼" />
        </button>
        <button
          className={`w-12 h-12 object-contain rounded-md p-1 ${
            activeView === 'vertical' ? 'bg-nook-400' : 'bg-transparent'
          }`}
          onClick={onChangeVertical} // 부모로부터 받은 함수를 직접 연결
        >
          <img src={hamburger} alt="햄버거버튼" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
