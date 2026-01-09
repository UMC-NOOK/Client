import DropDownBar from '../../library-items/list-items/filterbar-items/DropDownBar';
import { useTabStore } from '../../../../../store/library/useTabStore';

const FilterBar = () => {
  const selectedTab = useTabStore((state) => state.selectedTab);
  const setSelectedTab = useTabStore((state) => state.setSelectedTab);

  const tabs = ['독서 중', '완독', '찜'];

  const handleClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex justify-between border-b-1 border-[rgba(85,83,81,0.7)] pb-8 mb-0">
      <div className="flex justify-between w-[21.2rem]">
        {tabs.map((tab) => (
          <p
            key={tab}
            onClick={() => handleClick(tab)}
            className={`text-[16px] font-normal text-[rgba(211,211,211,0.5)] cursor-pointer pb-2 px-3 inline-block hover:text-nook-100 ${
              selectedTab === tab
                ? 'border-b-1 border-nook-200 text-nook-100 font-semibold'
                : ''
            }`}
          >
            {tab}
          </p>
        ))}
      </div>

      <DropDownBar />
    </div>
  );
};

export default FilterBar;
