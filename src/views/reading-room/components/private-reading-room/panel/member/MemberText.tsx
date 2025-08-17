import React, { useState } from 'react';
import userImg from '../../../../../../assets/button/book-info/usrImg.svg';
import clsx from 'clsx';

interface MemberTextProps {
  name: string;
  roll: string;
  isMe: boolean;
}

function MemberText({ name, roll, isMe }: MemberTextProps) {
  const [isOther, setIsOther] = useState(roll);
  return (
    <div
      className={clsx('flex w-138 justify-between items-center', {
        'mb-14': isMe === false,
      })}
    >
      <div className="flex items-center gap-3">
        {/* <img
          src={userImg}
          alt="사용자"
          className="w-10 h-10 rounded-full object-cover"
        /> */}
        <span className="text-nook-100 text-md font-semibold">{name}</span>
      </div>

      <span className="text-nook-100 text-sm font-normal">{roll}</span>
    </div>
  );
}

export default MemberText;
