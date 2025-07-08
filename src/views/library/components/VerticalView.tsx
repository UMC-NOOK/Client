import { useState } from 'react';
import FilterBar from './verticalview-items/FilterBar';
import tempBookData from '../../../mock/library/bookData';
import BookItem from './verticalview-items/BookItem';
import DeleteBtn from '../../../components/delete-button/DeleteBtn';

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

  return (
    <div className="w-full">
      {isModalOpen && (
        <DeleteBtn onDelete={handleDelete} closeModal={modalHandler} />
      )}
      <FilterBar />
      <div className="flex flex-col">
        {bookData.map((data, idx) => (
          <BookItem key={idx} {...data} openModal={modalHandler} />
        ))}
      </div>
    </div>
  );
};

export default VerticalView;
