import React, { useEffect } from 'react';
import { useBookStore } from '../../../../store/book-card/useBookStore';
import tempBookData from '../../../../mock/library/bookData';

const BookCard = ({ index }: { index: number }) => {
  const { books, setBooks } = useBookStore();

  useEffect(() => {
    setTimeout(() => {
      setBooks(tempBookData);
    }, 10); // fake loading
  }, []);

  const book = books[index];
  if (!book) {
    return (
      <div className="flex justify-center item-center text-[#B8AFA5] text-sm">
        {' '}
        관련 도서가 없습니다.{' '}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex w-[141px] h-[208px] justify-center items-center">
        <img
          src={book.img}
          alt={book.bookName}
          className="bg-[#B8AFA5] object-cover rounded-[7px]"
        />
      </div>
      <div className="flex items-start flex-col space-y-2 text-white font-pretendard mt-4">
        <div className="flex items-center h-10 text-sm font-semibold">
          {book.bookName}
        </div>
        <div className="flex justify-evenly h-6 text-xs font-light">
          <span>{book.author}</span>
          <span>ᆞ</span>
          <span>{book.publisher}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
