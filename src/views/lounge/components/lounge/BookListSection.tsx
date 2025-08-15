import React, { useEffect, useMemo, useState } from 'react';
import BookSkeleton from './BookSkelton';
import BookCard from './BookCard';
import {
  LoungeBook,
  LoungeSection,
  MallType,
  LoungePagination
} from '../../apis/lounge/types/lounge-types';
import LoungeBookListGet from '../../apis/lounge/lounge-book/LoungeBookListGet';

interface BookListSectionProps {
  mallType: MallType;
  section: LoungeSection;
}

const BookListSection = ({ mallType, section }: BookListSectionProps) => {
  const sectionId = section.sectionId ?? '';
  const sectionCategoryId = section.categoryId ?? null;

  const [books, setBooks] = useState<LoungeBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(section.pagination.pageSize || 6);
  const [pagination, setPagination] = useState<LoungePagination>({
    currentPage: 0,
    pageSize: section.pagination.pageSize || 6,
    totalItems: section.pagination.totalItems || 0,
    totalPages: section.pagination.totalPages || 1,
  });

  const totalPages = pagination.totalPages || 1;

  const categoryIdParam = useMemo(() => {
    return sectionCategoryId == null ? undefined : String(sectionCategoryId);
  }, [sectionCategoryId]);

  const fetchBooks = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await LoungeBookListGet({
        mallType,
        sectionId,
        categoryId: categoryIdParam,
        page,
      });

      if (res?.isSuccess) {
        const updated = res.result.sections.find((sec: LoungeSection) => {
          const a = sec.categoryId ?? null;
          const b = sectionCategoryId ?? null;
          return sec.sectionId === sectionId && String(a) === String(b);
        });
        if (updated) {
          setBooks(updated.books || []);
          setPagination(updated.pagination || pagination);
        }
      }
    } catch (e) {
      console.error('도서 목록 조회 실패', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
    setBooks([]);
    fetchBooks(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mallType, sectionId, categoryIdParam]);

  useEffect(() => {
    fetchBooks(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    const updateVisibleCount = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(3);
      else if (w < 768) setVisibleCount(4);
      else if (w < 1024) setVisibleCount(5);
      else setVisibleCount(6);
    };
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((p) => p - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="relative w-full group">
      {/* 왼쪽 화살표 */}
      <button
        onClick={handlePrev}
        disabled={currentPage <= 0}
        aria-label="prev-page"
        style={{ backgroundColor: 'rgba(94, 89, 83, 0.8)' }}
        className="
          absolute -left-10 top-[40%] -translate-y-1/2 z-10
          w-[40px] h-[40px] rounded-full items-center justify-center
          flex
          opacity-0 pointer-events-none
          group-hover:enabled:opacity-100 group-hover:enabled:pointer-events-auto
          group-hover:disabled:opacity-40
          focus-visible:opacity-100 focus-visible:pointer-events-auto
          transition-opacity duration-150
        "
      >
        <svg className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path
            d="M8.75 3.75L2.5 10M2.5 10L8.75 16.25M2.5 10H17.5"
            stroke="#B7E3E6"
            strokeWidth="1.36"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 오른쪽 화살표 */}
      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1}
        aria-label="next-page"
        style={{ backgroundColor: 'rgba(94, 89, 83, 0.8)' }}
        className="
          absolute -right-10 top-[40%] -translate-y-1/2 z-10
          w-[40px] h-[40px] rounded-full items-center justify-center
          flex
          opacity-0 pointer-events-none
          group-hover:enabled:opacity-100 group-hover:enabled:pointer-events-auto
          group-hover:disabled:opacity-40
          focus-visible:opacity-100 focus-visible:pointer-events-auto
          transition-opacity duration-150
        "
      >
        <svg className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path
            d="M11.25 3.75L17.5 10M17.5 10L11.25 16.25M17.5 10H2.5"
            stroke="#B7E3E6"
            strokeWidth="1.36"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 리스트 */}
      <div className="w-full overflow-hidden">
        <div className="grid grid-flow-col auto-cols-[141px] gap-[23px]">
          {isLoading
            ? Array.from({ length: visibleCount }).map((_, i) => <BookSkeleton key={i} />)
            : books.slice(0, visibleCount).map((book) => <BookCard key={book.isbn13} book={book} />)}
        </div>
      </div>
    </div>
  );
};

export default BookListSection;
 