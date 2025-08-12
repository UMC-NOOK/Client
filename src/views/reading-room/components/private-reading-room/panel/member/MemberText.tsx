import React from 'react';
import userImg from '../../../../../../assets/button/book-info/usrImg.svg';

interface MemberTextProps {
  name: string;
  roll: string;
}

function MemberText({ name, roll }: MemberTextProps) {
  return (
    <div className="flex w-138 justify-between items-center">
      <div className="flex items-center gap-3">
        <img
          src={userImg}
          alt="사용자"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-nook-100 text-md font-semibold">{name}</span>
      </div>

      <span className="text-nook-100 text-sm font-normal">{roll}</span>
    </div>
  );
}

export default MemberText;
