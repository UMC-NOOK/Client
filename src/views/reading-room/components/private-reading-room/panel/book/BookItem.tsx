import React from 'react';

interface BookItemProps {
  bookTitle: string;
}

function BookItem({ bookTitle }: BookItemProps) {
  return (
    <div className="w-127 flex items-center pl-7 h-20 rounded-[8px] bg-[rgba(66,60,53,1)] flex-shrink-0">
      <span className="font-normal text-sm text-nook-100">{bookTitle}</span>
    </div>
  );
}

export default BookItem;
