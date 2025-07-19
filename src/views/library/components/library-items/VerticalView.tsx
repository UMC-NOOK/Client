import { useState } from 'react';
import FilterBar from '../library-items/list-items/FilterBar';
import tempBookData from '../../../../mock/library/bookData';
import BookItem from './list-items/book-list/BookItem';
import DeleteBtn from '../../../../components/delete-modal/DeleteModal';

const VerticalView = () => {
  const [bookData, setBookData] = useState(tempBookData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    console.log('삭제로직');
    setIsModalOpen(false);
  };

  const modalHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  console.log(isModalOpen);

  return (
    <div className="w-full">
      {isModalOpen && (
        <DeleteBtn onDelete={handleDelete} closeModal={modalHandler} />
      )}
      <FilterBar />
      <div className="flex flex-col">
        {bookData.map((data, idx) => (
          <BookItem
            key={idx}
            {...data}
            openModal={modalHandler}
            useOnLibrary={true}
            useOnSearch={false}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalView;
