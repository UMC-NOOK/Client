import React, { useEffect, useState } from 'react';
import BookSkeleton from './BookSkelton';
import BookCard from './BookCard';
import { LoungeSection, MallType } from '../../apis/lounge/types/lounge-types';
import LoungeBookListGet from '../../apis/lounge/lounge-book/LoungeBookListGet';
interface BookListSectionProps {
  mallType: MallType;
  section: LoungeSection;
}

const BookListSection = ({ mallType, section }: BookListSectionProps) => {
  const [books, setBooks] = useState(section.books || []);
  const [isLoading, setIsLoading] = useState(false);

  const sectionId = section.sectionId ?? '';
  const categoryId = section.categoryId ?? '';
  const [visibleCount, setVisibleCount] = useState(section.pagination.pageSize);
  const [currentPage, setCurrentPage] = useState(section.pagination.currentPage);
  const totalPages = section.pagination.totalPages;

  // 데이터 로드 함수
  const fetchBooks = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await LoungeBookListGet({
        mallType,
        sectionId,
        categoryId: categoryId || undefined,
        page,
      });

      if (res?.isSuccess) {
        const updatedSection = res.result.sections.find(
          (sec : LoungeSection) => sec.sectionId === sectionId && sec.categoryId === section.categoryId
        );
        if (updatedSection) {
          setBooks(updatedSection.books);
        }
      }
    } catch (err) {
      console.error('도서 목록 조회 실패', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  // 화면 너비에 따라 visibleCount 변경
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(3);
      else if (width < 768) setVisibleCount(4);
      else if (width < 1024) setVisibleCount(5);
      else setVisibleCount(6);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="relative w-full group">
      {/* 왼쪽 화살표 */}
      <button
        onClick={handlePrev}
        className="flex hidden group-hover:flex absolute -left-10 top-[40%] -translate-y-1/2
                            w-20 h-20 z-10 rounded-full items-center justify-center"
        style={{ backgroundColor: 'rgba(94, 89, 83, 0.8)' }}
      >
        <svg className="flex w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path
            d="M8.75 3.75L2.5 10M2.5 10L8.75 16.25M2.5 10H17.5"
            stroke="#B7E3E6"
            strokeWidth="1.36364"
            strokeLinecap="round"
            strokeLinejoin="round"
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
        <svg className="flex w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path
            d="M11.25 3.75L17.5 10M17.5 10L11.25 16.25M17.5 10H2.5"
            stroke="#B7E3E6"
            strokeWidth="1.36364"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-11">
        {isLoading
          ? Array.from({ length: visibleCount }).map((_, index) => <BookSkeleton key={index} />)
          : books.map((book, index) => <BookCard key={book.isbn13} book={book} />)}
      </div>
    </div>
  );
};

export default BookListSection;
