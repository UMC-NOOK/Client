import React, { useState } from 'react';
import leftButton from '../../../../assets/button/library/chevron-left.png';

const FilterBar = () => {
  const [selectedTab, setSelectedTab] = useState('독서중');

  const tabs = ['독서중', '완독', '찜'];

  const handleClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex justify-between border-b-1 border-[rgba(85,83,81,0.7)] pb-7 px-5 mb-3">
      <div className="flex justify-between w-[212px]">
        {tabs.map((tab) => (
          <p
            key={tab}
            onClick={() => handleClick(tab)}
            className={`text-md text-[rgba(211,211,211,0.5)] cursor-pointer pb-2 px-3 inline-block hover:text-nook-100 ${
              selectedTab === tab
                ? 'border-b-1 border-nook-200 text-nook-100'
                : ''
            }`}
          >
            {tab}
          </p>
        ))}
      </div>
      <div className="flex gap-4">
        <p className="text-md text-nook-100">최근등록순</p>
        <button className="w-10 h-10 flex items-center justify-center translate-y-[2px]">
          <img
            src={leftButton}
            alt="왼쪽버튼"
            className="w-full h-full object-contain rotate-90"
          />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
