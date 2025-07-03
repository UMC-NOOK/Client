import React, { useState } from 'react';
import FilterBar from './verticalview-items/FilterBar';
import tempBookData from '../../../mock/library/bookData';
import BookItem from './verticalview-items/BookItem';

const VerticalView = () => {
  const [bookData, setBookData] = useState(tempBookData);

  return (
    <div className="w-full">
      <FilterBar />
      <div className="flex flex-col">
        {bookData.map((data, idx) => (
          <BookItem key={idx} {...data} />
        ))}
      </div>
    </div>
  );
};

export default VerticalView;
