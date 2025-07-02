import React, { useState } from 'react';
import leftButton from '../../../../assets/button/library/chevron-left.png';
import SaveListItem from './SaveListItem';
import tempBookData from '../../../../mock/library/bookData';

interface SaveListProps {
  onClick: () => void;
}

const SaveList = ({ onClick }: SaveListProps) => {
  const [bookData, setBookData] = useState(tempBookData);

  const displayData = bookData.slice(0, 3);

  return (
    <div>
      <div
        className="flex items-baseline gap-2 cursor-pointer group border-b-transparent hover:border-nook-300 hover:border-b-2"
        onClick={onClick}
      >
        <span className="text-2xl text-nook-100 group-hover:text-nook-300">
          찜
        </span>
        <button className="w-10 h-10 flex items-center justify-center translate-y-[2px]">
          <img
            src={leftButton}
            alt="왼쪽버튼"
            className="w-full h-full object-contain"
          />
        </button>
      </div>
      <p className="text-sm text-nook-100 font-light mt-5 mb-5">
        내가 찜한 책을 확인해보세요
      </p>
      <div className="flex flex-col items-center gap-5">
        {displayData.map((data, idx) => (
          <SaveListItem key={idx} {...data} />
        ))}
        {bookData.length > 3 && (
          <div className="text-center py-4 text-[rgba(66,60,53,1)] text-9xl">
            ⋮
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveList;
