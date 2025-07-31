import { FC } from 'react';

import baseNookie from '../../../assets/button/home/base-nookie-c.png';
import orangeNookie from '../../../assets/button/home/orange-nookie-c.png';
import greenNookie from '../../../assets/button/home/green-nookie-c.png';
import blueNookie from '../../../assets/button/home/blue-nookie-c.png';

interface NookieTabProps {
  selected: string;
  setSelected: (value: string) => void;
}

const characters = [
  { name: 'base', src: baseNookie },
  { name: 'orange', src: orangeNookie },
  { name: 'green', src: greenNookie },
  { name: 'blue', src: blueNookie },
];

const NookieTab: FC<NookieTabProps> = ({ selected, setSelected }) => {
  return (
    <div className="w-full h-full text-white">
      <div className="grid grid-cols-2 gap-y-[20px] gap-x-[20px] rounded-[12px]">
        {characters.map((char) => (
          <div
            key={char.name}
            onClick={() => setSelected(char.name)}
            className={`w-[168px] h-[168px] rounded-[40px] flex items-center justify-center bg-[#373029] cursor-pointer
              ${selected === char.name ? 'outline outline-[#7ABFC9]' : ''}
            `}
          >
            <img
              src={char.src}
              alt={char.name}
              className="w-[168px] h-[168px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NookieTab;
