import React, { useState } from 'react';
import leftButton from '../../../../../assets/button/library/chevron-left.png';
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
      <p className="text-md text-nook-100">{selectMenu}</p>
      <button className="w-6 h-6 flex items-center justify-center">
        <img
          src={leftButton}
          alt="드롭다운 화살표"
          className={clsx(
            'w-full h-full object-contain transition-transform duration-200',
            {
              'rotate-270': isOpen,
              'rotate-90': !isOpen,
            }
          )}
        />
      </button>
      <ul
        className={clsx(
          'absolute top-full left-0 mt-2 w-[130px] h-auto bg-nook-600 rounded-md shadow-lg z-10',
          {
            hidden: !isOpen,
            block: isOpen,
          }
        )}
      >
        {menu.map((item, index) => (
          <li
            key={index}
            className={clsx(
              'text-nook-100 px-4 py-6 text-sm cursor-pointer', // px-4는 좌우 패딩, py-2는 상하 패딩, text-sm은 글자 크기
              'hover:bg-nook-500', // 호버 시 배경색 변경 (Tailwind config에 nook-500 정의 필요)
              {
                'border-b border-[rgba(85,83,81,0.7)]': index < menu.length - 1, // 마지막 항목을 제외하고 하단 보더 추가
              }
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
