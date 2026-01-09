import React, { useState } from 'react';
import userImg from '../../../../../../assets/button/book-info/usrImg.svg';
import clsx from 'clsx';

interface MemberTextProps {
  name: string;
  roll: string;
  isMe: boolean;
  isOnline?: boolean;
}

function MemberText({ name, roll, isMe, isOnline }: MemberTextProps) {
  const [isOther, setIsOther] = useState(roll);

  return (
    <div
      className={clsx('flex w-138 justify-between items-center', {
        'mb-14': isMe === false,
        'opacity-50': !isOnline, // 접속 중이 아닐 때 투명도 낮춤
        'opacity-100': isOnline, // 접속 중일 때 완전 불투명
      })}
    >
      <div className="flex items-center gap-3">
        <span className="text-nook-100 text-md font-semibold">{name}</span>
      </div>

      <span className="text-nook-100 text-sm font-normal">{roll}</span>
    </div>
  );
}

export default MemberText;
