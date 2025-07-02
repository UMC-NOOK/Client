import React, { useState } from 'react';
import SaveList from './SaveList';
import SaveListItem from './SaveListItem';
import tempBookData from '../../../../mock/library/bookData';

const SaveListView = () => {
  const [bookData, setBookData] = useState(tempBookData);

  return (
    <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 auto-rows-max">
      {bookData.map((data, idx) => (
        <SaveListItem key={idx} {...data} />
      ))}
    </div>
  );
};

export default SaveListView;
