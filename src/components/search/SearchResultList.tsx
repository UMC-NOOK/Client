import { useState, useEffect } from 'react';
import BookRow from '../common/BookRow';
import tempBookData from '../../mock/library/bookData';
import NookiIcon from '../../assets/button/search/none_book.png';
import { useSearchStore } from '../../store/search/useSearchStore';

interface Props {
  viewType?: 'default' | 'compact';
  emptyMessage?: string;
}

const ITEMS_PER_PAGE = 6;

export default function SearchResultList({ emptyMessage = '책을 찾을 수 없습니다.' }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchTerm } = useSearchStore();

  useEffect(() => {
    setCurrentPage(1); // 검색어 바뀌면 페이지 초기화
  }, [searchTerm]);

  if (!searchTerm.trim()) return null;

  const filteredResults = tempBookData.filter((book: any) =>
    book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResults = filteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (filteredResults.length === 0) {
    return (
      <div className="relative w-full h-screen bg-transparent">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
          <img src={NookiIcon} alt="검색 결과 없음" className="w-[125.586px] h-[169px]" />
          <p className="text-white text-base font-medium opacity-50">{emptyMessage}</p>
        </div>
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ width: '1040px', borderTop: '1px solid rgba(85, 83, 81, 0.7)', top: '40px' }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[1040px] mx-auto mt-8">
      <div style={{
        width: '1040px',
        borderTop: '1px solid rgba(85, 83, 81, 0.7)',
        marginTop: '40px',
      }} />

      <div className="flex flex-col gap-4 w-full">
        {currentResults.map((book: any, idx: number) => (
          <BookRow
            key={idx}
            book={book}
            onClickInfo={() => console.log('책 정보 보기', book)}
            onClickAdd={() => console.log('서재 등록', book)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-6 mb-20">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1 ? 'text-white font-bold' : 'text-white hover:opacity-70'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
