import React from 'react';
import gridButton from '../../../../assets/button/library/Frame 25.png';
import hamburger from '../../../../assets/button/library/Frame 26.png';

interface TopBarProps {
  userName: string;
}

const TopBar = ({ userName }: TopBarProps) => {
  return (
    <div className="w-full h-[68px] bg-nook-600 text-nook-100 flex justify-between items-center px-[40px] rounded-[8px]">
      <div className="text-lg font-normal">
        프로 독자{' '}
        <span className="text-nook-secondaey text-lg font-normal">
          {userName}
        </span>{' '}
        님의 서재
      </div>
      <div className="flex gap-2">
        <button className="w-12 h-12 object-contain">
          <img src={gridButton} alt="그리드버튼" />
        </button>
        <button className="w-12 h-12 object-contain">
          <img src={hamburger} alt="햄버거버튼" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
