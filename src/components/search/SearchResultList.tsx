import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookRow from '../common/BookRow';
import NookiIcon from '../../assets/button/search/none_book.png';
import { useSearchBooks } from '../../views/search/hooks/useQuery/useSearchBooks';
import BookAlreadyAddedModal from './SearchModal';
import { getBookDetail } from '../../views/search/apis/book';

type SearchBook = {
  bookId: number;
  isbn13: string;
  title: string;
  author: string;
  publisher: string;
  coverImageUrl: string;
  publicationDate: string;
  mallType: string;
};

type BookRowBook = {
  img: string;
  bookName: string;
  category: string;
  author: string;
  publisher: string;
  publication_date: string;
};

interface Props {
  viewType?: 'default' | 'compact';
  emptyMessage?: string;
}

export default function SearchResultList({
  emptyMessage = '책을 찾을 수 없습니다.',
}: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const query = (params.get('query') ?? '').trim();

  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [query]);

  const { data, isLoading } = useSearchBooks({ query, page });

  const isInitial = !query;
  const books = (data?.books ?? []) as SearchBook[];
  const totalPages = data?.pagination?.totalPages ?? 0;

  const rows: BookRowBook[] = useMemo(
    () =>
      books.map((b) => ({
        img: b.coverImageUrl ?? '',
        bookName: b.title ?? '',
        category: b.mallType ?? '',
        author: b.author ?? '',
        publisher: b.publisher ?? '',
        publication_date: b.publicationDate ?? '',
      })),
    [books],
  );

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);

  const handleGoToLibrary = () => {
    setModalOpen(false);
    navigate('/library'); // 내 서재로 이동
  };

  const goDetail = (isbn13: string) => {
    navigate(`/lounge/book-info?isbn13=${encodeURIComponent(isbn13)}`);
  };

  const handleClickInfo = (isbn13: string) => {
    goDetail(isbn13);
  };

  const handleClickAdd = async (isbn13: string) => {
    try {
      const detail = await getBookDetail(isbn13);
      if (detail.book.registeredBookshelf) {
        setModalOpen(true);
      } else {
        // 아직 서재에 없으면 상세 페이지로 이동(거기서 '등록' 진행)
        goDetail(isbn13);
      }
    } catch (e) {
      // 실패 시엔 일단 상세로 유도
      goDetail(isbn13);
    }
  };

  // 초기 화면
  if (isInitial) {
    return (
      <div className="w-full bg-transparent pt-[40px] relative">
        <div className="mx-auto" style={{ width: '1040px', borderTop: '1px solid rgba(85, 83, 81, 0.7)' }} />
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3" style={{ top: '487px' }}>
          <p className="text-white text-[16px] font-normal opacity-50 text-center" style={{ marginTop: '-90%' }}>
            책을 검색하고 서재에 등록하세요.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="flex justify-center items-center w-full h-[200px] text-white/70">로딩 중…</div>;
  }

  if (rows.length === 0) {
    return (
      <div className="w-full bg-transparent pt-[40px]">
        <div className="mx-auto" style={{ width: '1040px', borderTop: '1px solid rgba(85, 83, 81, 0.7)' }} />
        <div className="flex justify-center items-center gap-2 mt-[142px]" style={{ transform: 'translateX(-4%)' }}>
          <img src={NookiIcon} alt="검색 결과 없음" className="w-[125.586px] h-[169px]" />
          <p className="text-white text-base font-medium opacity-50">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <>
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
          {books.map((b, idx) => (
            <BookRow
              key={`${b.isbn13}-${idx}`}
              book={{
                img: b.coverImageUrl ?? '',
                bookName: b.title ?? '',
                category: b.mallType ?? '',
                author: b.author ?? '',
                publisher: b.publisher ?? '',
                publication_date: b.publicationDate ?? '',
              }}
              onClickInfo={() => handleClickInfo(b.isbn13)}
              onClickAdd={() => handleClickAdd(b.isbn13)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 mb-20">
            {Array.from({ length: totalPages }, (_, i) => {
              const n = i + 1;
              const isActive = n === page;
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`px-3 py-1 rounded ${isActive ? 'text-white font-bold' : 'text-white hover:opacity-70'}`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {modalOpen && (
        <BookAlreadyAddedModal
          onClose={() => setModalOpen(false)}
          onGoToLibrary={handleGoToLibrary}
        />
      )}
    </>
  );
}
