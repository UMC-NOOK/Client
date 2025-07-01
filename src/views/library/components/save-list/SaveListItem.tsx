import React, { useState } from 'react';

interface SaveListProps {
  img: string;
  bookName: string;
  author: string;
}

const SaveListItem = ({ img, bookName, author }: SaveListProps) => {
  return (
    <div className="w-full h-[264px] bg-[rgba(66,60,53,0.2)] flex flex-col justify-start items-center gap-4 mt-5 rounded-xl">
      <div className="flex flex-col gap-3 mt-8">
        <div
          className="h-[188px] w-[130px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${img})` }}
        />
        <p className="text-sm text-nook-100">{bookName}</p>
        <p className="text-xs text-nook-100">{author}</p>
      </div>
    </div>
  );
};

export default SaveListItem;
