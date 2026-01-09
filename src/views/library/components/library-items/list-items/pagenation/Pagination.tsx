import React from 'react';
import pageButton from '../../../../../../assets/button/home/chevron-right.png';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
}) => {
  const currentGroup = Math.ceil(currentPage / 10);
  const groupStartPage = (currentGroup - 1) * 10 + 1;
  const groupEndPage = Math.min(currentGroup * 10, totalPages);

  const getVisiblePages = () => {
    const pages = [];
    for (let i = groupStartPage; i <= groupEndPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  const hasPrevGroup = groupStartPage > 1;
  const hasNextGroup = groupEndPage < totalPages;

  const getNextJumpPage = () => {
    const nextJumpPage = currentPage + 10;
    return nextJumpPage <= totalPages ? nextJumpPage : null;
  };

  const nextJumpPage = getNextJumpPage();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center mt-44">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`pr-18 py-2 rounded-md`}
      >
        <img
          src={pageButton}
          alt=""
          className="object-contain w-[11.37px] h-[21.12px] rotate-180"
        />
      </button>

      {visiblePages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`px-1 font-normal text-[18px] mx-6 ${
            currentPage === pageNum
              ? 'text-white border-b-2'
              : 'text-[rgba(255,255,255,0.5)]'
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`pl-18 py-2 rounded-md ${
          !hasNext ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
        }`}
      >
        <img
          src={pageButton}
          alt=""
          className="object-contain w-[11.37px] h-[21.12px]"
        />
      </button>

      {/* {totalPages > 10 && nextJumpPage && (
        <button
          onClick={() => onPageChange(nextJumpPage)}
          className="px-3 py-2 rounded-md text-blue-600 hover:bg-blue-50 border border-blue-200"
          title={`${nextJumpPage}페이지로 이동`}
        >
          +10
        </button>
      )} */}

      {/* {hasPrevGroup && (
        <button
          onClick={() => onPageChange(groupStartPage - 1)}
          className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <img src={pageButton} alt="" className="object-contain" />
        </button>
      )} */}
    </div>
  );
};

export default Pagination;
