import React from 'react';
import BookSkeleton from './BookSkelton';
import BookCard from './BookCard';
import { LoungeBook, LoungeSection, MallType } from '../../apis/lounge/types/lounge-types';

interface BookListSectionProps {
  mallType: MallType;
  section: LoungeSection;
}

const BookListSection = ({ mallType, section }: BookListSectionProps) => {
  const books: LoungeBook[] = section?.books ?? [];

  const [visibleCount, setVisibleCount] = React.useState<number>(6);
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  const isLoading = !section || !Array.isArray(books);

  React.useEffect(() => {
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

  React.useEffect(() => {
    setCurrentPage(0);
  }, [section?.sectionId, section?.categoryId, books.length, visibleCount]);

  const totalPages = React.useMemo(() => {
    const total = Math.ceil((books?.length ?? 0) / visibleCount);
    return Math.max(total, 1);
  }, [books?.length, visibleCount]);

  const start = currentPage * visibleCount;
  const end = start + visibleCount;
  const pageBooks = books.slice(start, end);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 0));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));

  const gridKey = `${section?.sectionId}-${section?.categoryId ?? 'x'}-${currentPage}`;

  return (
    <div className="relative w-full group">
      <button
        onClick={handlePrev}
        disabled={currentPage <= 0 || isLoading || books.length <= visibleCount}
        aria-label="prev-page"
        style={{ backgroundColor: 'rgba(94, 89, 83, 0.8)' }}
        className="
          absolute -left-10 top-[40%] -translate-y-1/2 z-10
          w-[40px] h-[40px] rounded-full items-center justify-center flex
          opacity-0 pointer-events-none
          group-hover:enabled:opacity-100 group-hover:enabled:pointer-events-auto
          group-hover:disabled:opacity-40
          focus-visible:opacity-100 focus-visible:pointer-events-auto
          transition-opacity duration-150
        "
      >
        <svg className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path d="M8.75 3.75L2.5 10M2.5 10L8.75 16.25M2.5 10H17.5" stroke="#B7E3E6" strokeWidth="1.36" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages - 1 || isLoading || books.length <= visibleCount}
        aria-label="next-page"
        style={{ backgroundColor: 'rgba(94, 89, 83, 0.8)' }}
        className="
          absolute -right-10 top-[40%] -translate-y-1/2 z-10
          w-[40px] h-[40px] rounded-full items-center justify-center flex
          opacity-0 pointer-events-none
          group-hover:enabled:opacity-100 group-hover:enabled:pointer-events-auto
          group-hover:disabled:opacity-40
          focus-visible:opacity-100 focus-visible:pointer-events-auto
          transition-opacity duration-150
        "
      >
        <svg className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path d="M11.25 3.75L17.5 10M17.5 10L11.25 16.25M17.5 10H2.5" stroke="#B7E3E6" strokeWidth="1.36" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="w-full overflow-hidden">
        <div
          key={gridKey}
          className={`grid grid-flow-col auto-cols-[141px] gap-[23px] transition-opacity duration-100 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {isLoading
            ? Array.from({ length: Math.min(visibleCount, 6) }).map((_, i) => <BookSkeleton key={`s-${i}`} />)
            : pageBooks.map((book) => <BookCard key={book.isbn13} book={book} />)}
        </div>
      </div>
    </div>
  );
};

export default BookListSection;
