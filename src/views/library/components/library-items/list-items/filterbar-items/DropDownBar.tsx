import { useState } from 'react';
import leftButton from '../../../../../../assets/button/library/chevron-left.png';
import clsx from 'clsx';

const DropDownBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectMenu, setSelectMenu] = useState<string>('최근 등록순');
  const menu = ['제목순', '최근 등록순', '최근 기록순', '내가 준 별점순'];

  const handleClick = (item: string) => {
    setSelectMenu(item);
  };

  return (
    <div
      className="flex gap-4 cursor-pointer relative items-center"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <p className="text-sm font-normal text-nook-100">{selectMenu}</p>
      <button className="w-6 h-6 flex items-center justify-center">
        <img
          src={leftButton}
          alt="드롭다운 화살표"
          className={clsx(
            'w-full h-full object-contain transition-transform duration-200',
            {
              'rotate-270': isOpen,
              'rotate-90': !isOpen,
            },
          )}
        />
      </button>
      <ul
        className={clsx(
          'absolute flex flex-col justify-center top-full -right-5 mt-4 w-[13.2rem] h-[21.2rem] bg-nook-600 rounded-[8px] shadow-lg z-10 overflow-hidden',
          {
            hidden: !isOpen,
            block: isOpen,
          },
        )}
      >
        {menu.map((item, index) => (
          <li
            key={index}
            className={clsx(
              'text-nook-100 px-4 py-8 text-sm cursor-pointer hover:bg-nook-500 relative',
              {
                'hover:rounded-t-[8px]': index === 0,
                'hover:rounded-b-[8px]': index === menu.length - 1,
                'after:content-[""] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-[rgba(85,83,81,0.7)]':
                  index < menu.length - 1,
              },
            )}
            onClick={() => handleClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownBar;
