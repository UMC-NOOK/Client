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

  const trimmedTerm = searchTerm.trim();

  const filteredResults = tempBookData.filter((book: any) =>
    book.bookName.toLowerCase().includes(trimmedTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(trimmedTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResults = filteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (!trimmedTerm || filteredResults.length === 0) {
    const isInitial = !trimmedTerm;

    return (
      <div className={`w-full bg-transparent pt-[40px] ${isInitial ? 'relative' : ''}`}>
        {/* 공통 구분선 */}
        <div
          className="mx-auto"
          style={{
            width: '1040px',
            borderTop: '1px solid rgba(85, 83, 81, 0.7)',
          }}
        />

        {/* 아이콘 + 문구 */}
        {isInitial ? (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
            style={{ top: '487px' }}
          >
            <p className="text-white text-[16px] font-normal opacity-50 text-center" style={{ marginTop: '-90%' }}>
              책을 검색하고 서재에 등록하세요.
            </p>
          </div>
        ) : (
          <div
            className="flex justify-center items-center gap-2 mt-[142px]"
            style={{ transform: 'translateX(-4%)' }}
          >
            <img src={NookiIcon} alt="검색 결과 없음" className="w-[125.586px] h-[169px]" />
            <p className="text-white text-base font-medium opacity-50">
              {emptyMessage}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[1040px] mx-auto mt-8">
      <div
        style={{
          width: '1040px',
          borderTop: '1px solid rgba(85, 83, 81, 0.7)',
          marginTop: '22px',
          marginBottom: '20px',
        }}
      />

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
