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
  { name: 'stars', src: wallpaperStars },
  { name: 'drop', src: wallpaperDrop },
  { name: 'check', src: wallpaperCheck },
  { name: 'argyle', src: wallpaperArgyle },
];

const MyHomeTab: FC<MyHomeTabProps> = ({ selected, setSelected }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {wallpapers.map((wall) => (
        <img
          key={wall.name}
          src={wall.src}
          alt={wall.name}
          onClick={() => setSelected(wall.name)}
          className={`w-[168px] h-[168px] object-cover cursor-pointer transition rounded-[30px] 
            ${selected === wall.name ? 'ring-2 ring-[#7ABFC9]' : 'opacity-80 hover:opacity-100'}
          `}
        />
      ))}
    </div>
  );
};

export default MyHomeTab;
