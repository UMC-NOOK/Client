import { useNavigate } from 'react-router-dom';

import middle_point from '/src/assets/button/book-info/middlePoint.svg';

import type { BestBook } from '../../types/book-info/bookInfo';

const BestBook = ({ bestBook }: { bestBook: BestBook | undefined }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-start justify-center gap-3 w-full"
      onClick={() => {
        navigate(`/lounge/${bestBook?.isbn13}`);
      }}
    >
      <div className="w-70 h-102 rounded-lg">
        <img
          src={bestBook?.coverImageUrl}
          alt="Best Book Cover"
          className="rounded-lg w-full h-full object-cover"
        />
      </div>
      <span className="self-stretch justify-center text-white text-base font-semibold  ">
        {bestBook?.title}
      </span>
      <div className="flex items-center justify-start gap-3  justify-center text-white text-xs font-normal  ">
        <span>{bestBook?.author}</span>
        <div className="w-[1px] h-[1px]">
          <img src={middle_point} alt="" />
        </div>

        <span>{bestBook?.publisher}</span>
      </div>
    </div>
  );
};

export default BestBook;
