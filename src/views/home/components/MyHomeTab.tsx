import React, { FC } from 'react';

import wallpaperDefault from '../../../assets/button/home/default-wallpaper.png';
import wallpaperStripe from '../../../assets/button/home/stripe-wallpaper.png';
import wallpaperStars from '../../../assets/button/home/star-wallpaper.png';
import wallpaperDrop from '../../../assets/button/home/drop-wallpaper.png';
import wallpaperCheck from '../../../assets/button/home/check-wallpaper.png';
import wallpaperArgyle from '../../../assets/button/home/argyle-wallpaper.png';

export type PatternKey = 'default' | 'stripe' | 'stars' | 'drop' | 'check' | 'argyle';

interface MyHomeTabProps {
  selected: PatternKey;
  setSelected: React.Dispatch<React.SetStateAction<PatternKey>>;
}

const wallpapers: { name: PatternKey; src: string }[] = [
  { name: 'default', src: wallpaperDefault },
  { name: 'stripe', src: wallpaperStripe },
  { name: 'argyle', src: wallpaperArgyle },

  { name: 'drop', src: wallpaperDrop },
  { name: 'check', src: wallpaperCheck },
  { name: 'stars', src: wallpaperStars },

];

const MyHomeTab: FC<MyHomeTabProps> = ({ selected, setSelected }) => {
  return (
    <div className="grid grid-cols-2 mt-[21.41px] gap-y-[10px] gap-x-[20px] p-[2px]"> 
      {wallpapers.map((wall) => {
        const isActive = selected === wall.name;
        return (
          <button
            key={wall.name}
            onClick={() => setSelected(wall.name)}
            aria-pressed={isActive}
            className={[
              'w-[168px] h-[168px] rounded-[30px]',
              'relative select-none cursor-pointer',
              isActive ? 'ring-[1px] ring-[#7ABFC9]' : 'ring-0 hover:ring-[1px] hover:ring-[#FFFFFF33]',
              'ring-offset-0 ring-offset-transparent',
              'focus:outline-none outline-none',
              'transition-[box-shadow,transform] duration-150 ease-out active:scale-[0.98]',
            ].join(' ')}
          >
            {/* 안쪽 마스크 */}
            <div className="w-full h-full rounded-[30px] overflow-hidden bg-[#373029]">
              <img
                src={wall.src}
                alt={wall.name}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default MyHomeTab;