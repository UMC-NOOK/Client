import { useState } from 'react';
import SaveListItem from './SaveListItem';
import tempBookData from '../../../../mock/library/bookData';
import leftButton from '../../../../assets/button/library/chevron-left.png';

interface SaveListProps {
  onClick: () => void;
}

const SaveListView = ({ onClick }: SaveListProps) => {
  const [bookData, setBookData] = useState(tempBookData);

  return (
    <div>
      <div
        className="flex items-baseline gap-9 cursor-pointer group border-b-transparent hover:border-nook-300 mb-9"
        onClick={onClick}
      >
        <button className="w-10 h-10 flex items-center justify-center translate-y-[2px]">
          <img
            src={leftButton}
            alt="왼쪽버튼"
            className="w-full h-full object-contain rotate-180"
          />
        </button>
        <span className="text-[2rem] text-nook-100 group-hover:text-nook-300">
          찜
        </span>
      </div>
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 auto-rows-max">
        {bookData.map((data, idx) => (
          <SaveListItem key={idx} {...data} />
        ))}
      </div>
    </div>
  );
};

export default SaveListView;
