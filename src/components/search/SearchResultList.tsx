import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BookRow from '../common/BookRow';
import NookiIcon from '../../assets/button/search/none_book.png';
import { useSearchBooks } from '../../views/search/hooks/useQuery/useSearchBooks';
import LibraryRegistration from '../../views/home/components/libraryRegistration';
import BookAlreadyAddedModal from '../search/SearchModal'; 

import { getBookDetail } from '../../views/search/apis/book';

import jumpLeftIcon from '../../assets/button/search/chevron-double-left.png';
import prevIcon from '../../assets/button/search/chevron-left.png';
import nextIcon from '../../assets/button/search/chevron-right.png';
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

  // 등록 모달 상태 (상위에서 제어)
  const [registerModal, setRegisterModal] = useState<{
    open: boolean;
    book?: {
      bookId: number;
      img: string;
      title: string;
      author: string;
    };
  }>({ open: false });

  // “이미 등록” 모달 상태
  const [alreadyOpen, setAlreadyOpen] = useState(false);

  const openRegisterModal = (b: SearchBook) => {
    setRegisterModal({
      open: true,
      book: {
        bookId: b.bookId,
        img: b.coverImageUrl ?? '',
        title: b.title ?? '',
        author: b.author ?? '',
      },
    });
  };
  const closeRegisterModal = () => setRegisterModal({ open: false });

  const goDetail = (isbn13: string) => {
    // 라우터: /lounge/book-info/:isbn
    navigate(`/lounge/book-info/${encodeURIComponent(isbn13)}`);
  };

  const handleClickInfo = (isbn13: string) => {
    goDetail(isbn13);
  };

  // 등록 버튼 클릭 → 사전 체크 후 분기
  const handleClickAdd = async (b: SearchBook) => {
    try {
      const detail = await getBookDetail(b.isbn13);
      if (detail.book.registeredBookshelf) {
        // 이미 등록: 안내 모달
        setAlreadyOpen(true);
      } else {
        // 미등록: 등록 모달
        openRegisterModal(b);
      }
    } catch {
      // 상세 조회 실패 시엔 보수적으로 등록 모달을 열어 사용자가 진행 가능
      openRegisterModal(b);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPrev10 = () => setPageInUrl(page - 10);
  const goNext10 = () => setPageInUrl(page + 10);
  const goPrev1 = () => setPageInUrl(page - 1);
  const goNext1 = () => setPageInUrl(page + 1);

  // ---------- 화면 렌더 ----------
  if (isInitial) {
    return (
      <div className="w-full bg-transparent pt-[40px] relative">
        <div
          className="mx-auto"
          style={{
            width: '1040px',
            borderTop: '1px solid rgba(85, 83, 81, 0.7)',
          }}
        />
        <div
          className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ top: '487px' }}
        >
          <p
            className="text-white text-[16px] font-normal opacity-50 text-center"
            style={{ marginTop: '-90%' }}
          >
            책을 검색하고 서재에 등록하세요.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[200px] text-white/70">
        로딩 중…
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="w-full bg-transparent pt-[40px]">
        <div
          className="mx-auto"
          style={{
            width: '1040px',
            borderTop: '1px solid rgba(85, 83, 81, 0.7)',
          }}
        />
        <div
          className="flex justify-center items-center gap-2 mt-[142px]"
          style={{ transform: 'translateX(-4%)' }}
        >
          <img
            src={NookiIcon}
            alt="검색 결과 없음"
            className="w-[125.586px] h-[169px]"
          />
          <p className="text-white text-base font-medium opacity-50">
            {emptyMessage}
          </p>
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
                bookId: b.bookId, 
              }}
              onClickInfo={() => handleClickInfo(b.isbn13)}
              onClickAdd={() => handleClickAdd(b)} 
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mb-[154px] mt-[70px]">
            {/* 왼쪽 화살표: « ‹ */}
            <div className="flex items-center h-[24px] gap-[6px] mr-[33px]">
              <button
                onClick={goPrev10}
                disabled={!canPrev10}
                className={`w-6 h-6 flex items-center justify-center ${
                  canPrev10 ? 'opacity-100' : 'opacity-30 cursor-not-allowed'
                }`}
                aria-label="이전 10페이지"
              >
                <img
                  src={jumpLeftIcon}
                  alt="이전 10페이지"
                  className="w-4 h-4"
                />
              </button>
              <button
                onClick={goPrev1}
                disabled={!canPrev1}
                className={`w-6 h-6 flex items-center justify-center ${
                  canPrev1 ? 'opacity-100' : 'opacity-30 cursor-not-allowed'
                }`}
                aria-label="이전 페이지"
              >
                <img src={prevIcon} alt="이전 페이지" className="w-4 h-4" />
              </button>
            </div>

            {/* 숫자 그룹 */}
            <div className="flex items-center h-[24px] gap-[20px]">
              {Array.from(
                { length: groupEnd - groupStart + 1 },
                (_, i) => groupStart + i,
              ).map((n) => {
                const active = n === page;
                return (
                  <button
                    key={n}
                    onClick={() => setPageInUrl(n)}
                    className={`relative w-[18px] h-[24px] flex items-center justify-center transition ${
                      active
                        ? 'text-white font-semibold'
                        : 'text-white/60 hover:text-white'
                    }`}
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

            {/* 오른쪽 화살표: › » */}
            <div className="flex items-center h-[24px] gap-[6px] ml-[33px]">
              <button
                onClick={goNext1}
                disabled={!canNext1}
                className={`w-6 h-6 flex items-center justify-center ${
                  canNext1 ? 'opacity-100' : 'opacity-30 cursor-not-allowed'
                }`}
                aria-label="다음 페이지"
              >
                <img src={nextIcon} alt="다음 페이지" className="w-4 h-4" />
              </button>
              <button
                onClick={goNext10}
                disabled={!canNext10}
                className={`w-6 h-6 flex items-center justify-center ${
                  canNext10 ? 'opacity-100' : 'opacity-30 cursor-not-allowed'
                }`}
                aria-label="다음 10페이지"
              >
                <img
                  src={jumpRightIcon}
                  alt="다음 10페이지"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 서재 등록 모달 */}
      {registerModal.open && registerModal.book && (
        <LibraryRegistration
          onRegister={() => {
            closeRegisterModal();
          }}
          closeModal={closeRegisterModal}
          bookImg={registerModal.book.img}
          bookTitle={registerModal.book.title}
          bookAuthor={registerModal.book.author}
          bookId={registerModal.book.bookId}
        />
      )}

      {/* 이미 등록 모달 */}
      {alreadyOpen && (
        <BookAlreadyAddedModal onClose={() => setAlreadyOpen(false)} />
      )}
    </>
  );
}
