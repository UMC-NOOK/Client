import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BookRow from '../common/BookRow';
import NookiIcon from '../../assets/button/search/none_book.png';
import { useSearchBooks } from '../../views/search/hooks/useQuery/useSearchBooks';
import BookAlreadyAddedModal from './SearchModal';
import { getBookDetail } from '../../views/search/apis/book';

import jumpLeftIcon from '../../assets/button/search/chevron-double-left.png';
import prevIcon      from '../../assets/button/search/chevron-left.png';
import nextIcon      from '../../assets/button/search/chevron-right.png';
import jumpRightIcon from '../../assets/button/search/chevron-double-right.png';

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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL → query, page
  const query = (searchParams.get('query') ?? '').trim();
  const pageParam = Number(searchParams.get('page') || 1);
  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  // query 변경 시 page를 1로 리셋 (URL에 반영)
  useEffect(() => {
    if (page !== 1) {
      const next = new URLSearchParams(searchParams);
      next.set('page', '1');
      setSearchParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        goDetail(isbn13);
      }
    } catch {
      goDetail(isbn13);
    }
  };

  // ---------- 페이지네이션(10단위 그룹) ----------
  const GROUP = 10;
  const groupStart = Math.floor((page - 1) / GROUP) * GROUP + 1;
  const groupEnd = Math.min(totalPages, groupStart + GROUP - 1);

  const canPrev1 = page > 1;
  const canNext1 = page < totalPages;
  const canPrev10 = groupStart > 1;
  const canNext10 = groupEnd < totalPages;

  const setPageInUrl = (n: number, opts?: { replace?: boolean }) => {
    const target = Math.max(1, Math.min(totalPages || 1, n));
    const next = new URLSearchParams(searchParams);
    next.set('page', String(target));
    setSearchParams(next, opts);
    // UX: 페이지 이동 시 상단으로
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPrev10 = () => setPageInUrl(page - 10);
  const goNext10 = () => setPageInUrl(page + 10);
  const goPrev1  = () => setPageInUrl(page - 1);
  const goNext1  = () => setPageInUrl(page + 1);

  // ---------- 화면 렌더 ----------
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
      <div className="flex flex-col items-center gap-0 w-full max-w-[1040px] mx-auto mt-8">
        <div
          style={{
            width: '1040px',
            borderTop: '1px solid rgba(85, 83, 81, 0.7)',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        />

        <div className="flex flex-col w-full">
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
          <div className="flex justify-center items-center mb-[154px] mt-[70px]">
            {/* 왼쪽 화살표 그룹: « ‹  (내부 간격 6px) */}
            <div className="flex items-center h-[24px] gap-[6px] mr-[33px]">
              <button
                onClick={goPrev10}
                disabled={!canPrev10}
                className={`w-6 h-6 flex items-center justify-center ${canPrev10 ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
                aria-label="이전 10페이지"
              >
                <img src={jumpLeftIcon} alt="이전 10페이지" className="w-4 h-4" />
              </button>
              <button
                onClick={goPrev1}
                disabled={!canPrev1}
                className={`w-6 h-6 flex items-center justify-center ${canPrev1 ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
                aria-label="이전 페이지"
              >
                <img src={prevIcon} alt="이전 페이지" className="w-4 h-4" />
              </button>
            </div>

            {/* 숫자 그룹: 숫자 간격 20px + 활성 밑줄(absolute) */}
            <div className="flex items-center h-[24px] gap-[20px]">
              {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => {
                const n = groupStart + i;
                const active = n === page;
                return (
                  <button
                    key={n}
                    onClick={() => setPageInUrl(n)}
                    className={`relative w-[18px] h-[24px] flex items-center justify-center transition
                      ${active ? 'text-white font-semibold' : 'text-white/60 hover:text-white'}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="leading-none">{n}</span>
                    {active && (
                      <span className="absolute bottom-0 block w-[11px] h-0 border-t-2 border-white flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* 오른쪽 화살표 그룹: › »  (내부 간격 6px) */}
            <div className="flex items-center h-[24px] gap-[6px] ml-[33px]">
              <button
                onClick={goNext1}
                disabled={!canNext1}
                className={`w-6 h-6 flex items-center justify-center ${canNext1 ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
                aria-label="다음 페이지"
              >
                <img src={nextIcon} alt="다음 페이지" className="w-4 h-4" />
              </button>
              <button
                onClick={goNext10}
                disabled={!canNext10}
                className={`w-6 h-6 flex items-center justify-center ${canNext10 ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
                aria-label="다음 10페이지"
              >
                <img src={jumpRightIcon} alt="다음 10페이지" className="w-4 h-4" />
              </button>
            </div>
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
