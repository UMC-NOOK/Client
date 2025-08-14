import React, { FC } from 'react';

import baseNookie from '../../../assets/button/home/base-nookie-c.png';
import orangeNookie from '../../../assets/button/home/orange-nookie-c.png';
import greenNookie from '../../../assets/button/home/green-nookie-c.png';
import blueNookie from '../../../assets/button/home/blue-nookie-c.png';

export type LampKey = 'base' | 'orange' | 'green' | 'blue';

interface NookieTabProps {
  selected: LampKey;
  setSelected: React.Dispatch<React.SetStateAction<LampKey>>;
}

const characters: { name: LampKey; src: string }[] = [
  { name: 'base', src: baseNookie },
  { name: 'orange', src: orangeNookie },
  { name: 'green', src: greenNookie },
  { name: 'blue', src: blueNookie },
];

const NookieTab: FC<NookieTabProps> = ({ selected, setSelected }) => {
  return (
    <div className="w-full h-full text-white">
      {/* padding을 추가하여 ring이 잘리지 않도록 함 */}
      <div className="grid grid-cols-2 gap-x-[20px] gap-y-[10px] rounded-[12px] p-[2px]">
        {characters.map((char) => {
          const isActive = selected === char.name;
          return (
            <button
              key={char.name}
              onClick={() => setSelected(char.name)}
              aria-pressed={isActive}
              className={[
                'w-[168px] h-[168px] rounded-[30px]',
                'relative select-none cursor-pointer',
                isActive ? 'ring-[1px] ring-[#7ABFC9]' : 'ring-0 hover:ring-[1px]',
                'ring-offset-0 ring-offset-transparent',
                'focus:outline-none outline-none',
                'transition-[box-shadow,transform] duration-150 ease-out active:scale-[0.98]',
              ].join(' ')}
            >
              {/* 안쪽 마스크: 이미지 튀어나옴 방지 */}
              <div className="w-full h-full rounded-[30px] overflow-hidden bg-[#373029]">
                <img
                  src={char.src}
                  alt={char.name}
                  className="w-full h-full object-contain pointer-events-none"
                  draggable={false}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NookieTab;