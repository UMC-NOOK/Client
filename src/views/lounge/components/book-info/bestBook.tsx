import { useNavigate } from 'react-router-dom';

import middle_point from '/src/assets/button/book-info/middlePoint.svg';

import type { BestBook } from '../../types/book-info/bookInfo';

const BestBook = ({ bestBook }: { bestBook: BestBook | undefined }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-start justify-center gap-3 w-full"
      onClick={() => {
        navigate(`/lounge/book-info/${bestBook?.isbn13}`);
      }}
    >
      <div className="w-70 h-102 rounded-lg">
        <img
          src={bestBook?.coverImageUrl}
          alt="Best Book Cover"
          className="rounded-lg w-full h-full object-cover"
        />
      </div>
      <span className="self-stretch justify-center text-white text-base font-semibold text-ellipsis overflow-hidden whitespace-nowrap w-70">
        {bestBook?.title}
      </span>
      <div className="flex items-center justify-start gap-3 justify-center text-white text-xs font-normal ">
        <span className="max-w-[64px] text-ellipsis overflow-hidden whitespace-nowrap">
          {bestBook?.author}
        </span>
        <div className="w-[2px] h-[2px]">
          <img src={middle_point} alt="" />
        </div>

        <span className="max-w-[64px] text-ellipsis overflow-hidden whitespace-nowrap">
          {bestBook?.publisher}
        </span>
      </div>
    </div>
  );
};

export default BestBook;
