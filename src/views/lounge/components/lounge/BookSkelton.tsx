import React from 'react';

const BookSkeleton = () => {
  return (
    <div className="relative w-full h-[208px] rounded-lg animate-pulse">
      <div className={'bg-[#B8AFA5] w-full h-full rounded-lg'} />

      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 py-2 flex flex-col space-y-2">
        <div className="bg-[#B8AFA5] h-10 rounded-sm" />
        <div className="bg-[#B8AFA5] h-6 rounded-sm" />
      </div>
    </div>
  );
};

export default BookSkeleton;
