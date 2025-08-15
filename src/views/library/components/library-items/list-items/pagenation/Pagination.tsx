interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  hasNext,
  hasPrevious,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-4 py-6">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
          hasPrevious
            ? 'border-blue-500 text-blue-500 hover:bg-blue-50'
            : 'border-gray-300 text-gray-400 cursor-not-allowed'
        }`}
      >
        이전
      </button>

      {/* 현재 페이지 표시 */}
      <div className="flex items-center gap-2">
        <span className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg">
          {currentPage}
        </span>
        <span className="text-gray-500 text-sm">페이지</span>
      </div>

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
          hasNext
            ? 'border-blue-500 text-blue-500 hover:bg-blue-50'
            : 'border-gray-300 text-gray-400 cursor-not-allowed'
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
