import React, { useEffect, useState } from 'react';
import BookSkeleton from './BookSkelton';
import { useBookStore } from '../../../../store/book-card/useBookStore';
import tempBookData from '../../../../mock/library/bookData';
import BookCard from './BookCard';
import { LoungeSection } from '../../apis/lounge/types/lounge-types';


const BookListSection = ({section}: { section: LoungeSection;}) => {
  const isLoading = useBookStore((state) => state.isLoading);
  const setIsLoading = useBookStore((state) => state.setIsLoading);

  const sectionId = section.sectionId ?? "";
  const categoryId = section.categoryId ?? "";
  
  const [visibleCount, setVisibleCount] = useState(section.pagination.pageSize);
  const [currentPage, setCurrentPage] = useState(section.pagination.currentPage);
  

  const totalPages = section.pagination.totalPages;
  const currentPages = 

  //API 재조회


  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setBooks(tempBookData);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      //sm 이하
      if (width < 640) {
        setVisibleCount(3);
      }
      //sm~md
      else if (width < 768) {
        setVisibleCount(4);
      }
      //m ~ lg
      else if (width < 1024) {
        setVisibleCount(5);
      } else {
        setVisibleCount(6);
      }
    };

    updateVisibleCount(); // 초기 설정
    window.addEventListener('resize', updateVisibleCount); // 창 사이즈가 변경될 때마다 해당 함수를 실행하겠다는 의미

    return () => {
      window.removeEventListener('resize', updateVisibleCount); // 컴포넌트 사라질 때 리스너도 제거
    };
  }, []);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const startIndex = (currentPage - 1) * visibleCount;
  const currentBooks = books.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="relative w-full group">
      {/* 왼쪽 화살표 */}
      <button
        onClick={handlePrev}
        className="flex hidden group-hover:flex absolute -left-10 top-[40%] -translate-y-1/2
                            w-20 h-20 z-10 rounded-full items-center justify-center"
        style={{ backgroundColor: 'rgba(94, 89, 83, 0.8)' }}
      >
        <svg
          className="flex w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M8.75 3.75L2.5 10M2.5 10L8.75 16.25M2.5 10H17.5"
            stroke="#B7E3E6"
            stroke-width="1.36364"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      {/* 오른쪽 화살표 */}
      <button
        onClick={handleNext}
        className="flex hidden group-hover:flex absolute -right-10 top-[40%] -translate-y-1/2
                            w-20 h-20 z-10 rounded-full items-center justify-center"
        style={{ backgroundColor: 'rgba(94, 89, 83, 0.8)' }}
      >
        <svg
          className="flex w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M11.25 3.75L17.5 10M17.5 10L11.25 16.25M17.5 10H2.5"
            stroke="#B7E3E6"
            stroke-width="1.36364"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-11">
        {isLoading
          ? Array.from({ length: visibleCount }).map((_, index) => (
              <BookSkeleton key={index}/>
            ))
          : section.books.map((book, index) => <BookCard index={index} />)}
      </div>
    </div>
  );
};

export default BookListSection;
