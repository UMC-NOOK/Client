import React from 'react';

interface SaveListProps {
  img: string;
  bookName: string;
  author: string;
  className?: string;
}

const SaveListItem = ({
  img,
  bookName,
  author,
  className = '',
}: SaveListProps) => {
  return (
    <div
      className={`w-[165px] bg-[rgba(66,60,53,0.2)] rounded-xl flex justify-center items-start ${className} mb-5`}
    >
      <div className="flex flex-col justify-start items-start gap-3 mt-8">
        <div
          className="h-[188px] w-[130px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${img})` }}
        />
        <div className="flex flex-col items-start gap-3 pb-6">
          <p className="text-sm text-nook-100 text-center">{bookName}</p>
          <p className="text-xs text-nook-100 text-center">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default SaveListItem;
