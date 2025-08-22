// library
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Pagination from 'react-js-pagination';

// imgs
import chevron_left from '/src/assets/button/book-info/chevron-left.svg';
import empty_star from '/src/assets/button/book-info/emptyStar.svg';
import filled_star from '/src/assets/button/book-info/fullStar.svg';
import error_outline_rounded from '/src/assets/button/book-info/error-outline-rounded.svg';
import download_icon from '/src/assets/button/book-info/download.svg';
import move_icon from '/src/assets/button/book-info/move.svg';

// components
import DeleteBtn from '../../../../components/delete-modal/DeleteModal';
import LibraryRegistration from '../../../lounge/components/book-info/libraryRegistration';
import Comment from '../../components/book-info/comment';
import BestBook from '../../components/book-info/bestBook';

// hooks
import useGetBookInfo from '../../hooks/useQuery/book-info-query/useGetBookInfo';
import useGetReview from '../../hooks/useQuery/book-info-query/useGetReview';
import usePostReview from '../../hooks/useMutation/book-info-mutation/usePostReview';
import usePutReview from '../../hooks/useMutation/book-info-mutation/usePutReview';
import useDeleteReview from '../../hooks/useMutation/book-info-mutation/useDeleteReview';

// types
import { Review } from '../../types/book-info/review';

const BookInfoPage = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const qc = useQueryClient();
  const navigate = useNavigate();

  // 책 정보 조회
  const { data: bookInfoData } = useGetBookInfo(isbn!);
  const bookId = bookInfoData?.result.book.bookId;

  // 리뷰 Pagination
  const [currentPost, setCurrentPost] = useState(1);
  const postsPerPage = 5;

  // 리뷰 조회
  const { data: reviewData } = useGetReview(bookId!, currentPost - 1);

  // 파생값들(변수)
  const reviews = reviewData?.result.reviews ?? [];
  const totalItems = reviewData?.result.pagination.totalItems ?? 0;
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [isReviewExist, setIsUserReviewExist] = useState(reviews.length > 0);
  const isUserReviewExist = !!userReview;
  const others = reviews.filter((r) => !r.ownedByUser);
  const scrollRef = useRef<HTMLDivElement>(null);

  // isbn(또는 pathname) 바뀔 때 컨테이너 맨 위로
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [isbn]);

  useEffect(() => {
    if (!reviewData) return;
    const reviews = reviewData.result.reviews ?? [];
    const mine = reviews.find((r) => r.ownedByUser) ?? null;
    setUserReview(mine); // ← 서버에 있으면 반영
    setIsUserReviewExist(reviews.length > 0);
  }, [reviewData]);

  // 리뷰 작성
  const { mutate: createReview, isPending: createReviewPending } =
    usePostReview(bookId!);

  // 리뷰 삭제
  const { mutate: deleteReview } = useDeleteReview(userReview?.reviewId!);

  // 리뷰 수정
  const { mutate: editReview } = usePutReview(userReview?.reviewId!);

  // 폼/뷰 상태
  const [reviewText, setReviewText] = useState('');
  const [reviewTextLength, setReviewTextLength] = useState(0);
  const [rating, setRating] = useState(0);
  const [isUserEditReview, setIsUserEditReview] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 핸들러
  const handlePageChange = (pageNumber: number) => setCurrentPost(pageNumber);
  const handleReviewCreateClick = () => {
    if (reviewText.trim().length === 0 && rating === 0) {
      alert('리뷰 혹은 별점을 남겨주세요.');
      return; // <- 페이지 리로드 금지!
    }
    createReview(
      { rating, content: reviewText },
      {
        onSuccess: (res) => {
          // setReviewText('');
          setReviewTextLength(0);
          setRating(0);
          setIsUserEditReview(false);
          setIsUserReviewExist(true);
          // 새로 작성한 내 리뷰를 즉시 반영
          setUserReview(res?.result ?? null);
        },
      },
    );
  };
  const handleDelete = () => {
    deleteReview(undefined, {
      onSuccess: () => {
        setIsUserEditReview(false);
        setReviewText('');
        setReviewTextLength(0);
        setRating(0);
        setIsDeleteModalOpen(false);
        setUserReview(null);
        qc.invalidateQueries({
          queryKey: ['reviewData', bookId, currentPost],
        });
      },
    });
  };
  const handleDeleteModal = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };
  const handleStarClick = (index: number) => {
    if (rating === index + 1) {
      setRating(rating - 1); // 별점이 이미 선택된 경우, 선택 해제
    } else {
      setRating(index + 1); // 새로운 별점 선택
    }
    console.log(`Selected rating: ${index + 1}`);
  };
  const handleReviewEdit = () => {
    if (reviewText.trim().length === 0 && rating === 0) {
      alert('리뷰 혹은 별점을 남겨주세요.');
      return;
    }
    editReview(
      { rating, content: reviewText },
      {
        onSuccess: (res) => {
          setIsUserEditReview(false);
          setUserReview(res?.result ?? null);
          qc.invalidateQueries({
            queryKey: ['reviewData', bookId, currentPost],
          });
        },
      },
    );
    setIsUserEditReview(false);
  };

  // 서재 등록 관련
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const isRegistrationLibrary =
    bookInfoData?.result.book.registeredBookshelf || false;

  const handleLibrary = () => {
    //서재 등록 로직 추가
    setIsLibraryModalOpen(false);
  };
  const handleLibraryModal = () => {
    setIsLibraryModalOpen((prev) => !prev);
  };
  const handleMoveToLibrary = () => {
    navigate('/library');
  };

  return (
    <div className="mt-11 w-full h-full flex flex-col items-center justify-center">
      {isDeleteModalOpen && (
        <DeleteBtn
          usage="book-info"
          onDelete={handleDelete}
          closeModal={handleDeleteModal}
        />
      )}
      {isLibraryModalOpen && (
        <LibraryRegistration
          onRegister={handleLibrary}
          closeModal={handleLibraryModal}
          bookImg={bookInfoData?.result.book.coverImageUrl || ''}
          bookTitle={bookInfoData?.result.book.title || ''}
          bookAuthor={bookInfoData?.result.book.author || ''}
          bookId={bookId || 0}
          type={isRegistrationLibrary ? 'edit' : 'register'}
        />
      )}
      {/* 상위 컴포넌트 */}
      <div
        ref={scrollRef}
        className="flex flex-col w-[840px] items-center justify-start h-screen mr-150 ml-150 overflow-y-auto [&::-webkit-scrollbar]:hidden"
      >
        {/* 상단바 */}
        <div className="self-start flex items-center justify-center mb-25">
          <button
            type="button"
            onClick={() => navigate(-1)} // ← 뒤로가기
            className="w-10 h-10 mr-6 inline-flex items-center justify-center cursor-pointer"
            aria-label="뒤로가기"
          >
            <img src={chevron_left} alt="Lounge Top Bar" />
          </button>
          <div className="text-white text-xl  ">라운지</div>
        </div>
        {/* 책소개 컴포넌트 */}
        <div className="relative w-full ">
          {/* 그라디언트 오버레이 */}
          <div className="absolute w-full h-full inset-0 blur-xs">
            <img
              src={bookInfoData?.result.book.coverImageUrl}
              alt="배경 이미지"
              className="w-[835px] h-full object-cover"
            />

            <div className="absolute w-[835px] h-full inset-0 bg-gradient-to-b from-black to-black/50" />
          </div>

          <div className="px-11 py-8 w-full relative flex items-center justify-between box-border">
            {/* 책 이미지*/}
            <div className="w-118 h-173 flex items-center justify-center">
              <img
                src={bookInfoData?.result.book.coverImageUrl}
                alt="Book Cover"
                className="rounded-lg"
              />
            </div>
            {/* 책 정보 */}
            <div className="relative w-246 flex flex-col items-start justify-start gap-20">
              <div className="flex flex-col items-start justify-center gap-17">
                <div className="text-white text-[22px] not-italic font-semibold leading-[normal] text-pretendard">
                  {bookInfoData?.result.book.title}
                </div>
                <div className="text-white text-sm not-italic font-normal leading-[22px]  ">
                  {bookInfoData?.result.book.description
                    ? bookInfoData?.result.book.description
                    : '책에 대한 설명이 없습니다.'}
                </div>
              </div>
              <hr className="w-full border-nook-hr" />
              <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-white  ">
                {/* 왼쪽 열 */}
                <div className="flex justify-start gap-9">
                  <span className="font-semibold w-[37px]">저자</span>
                  <span className="font-normal w-[167px]">
                    {bookInfoData?.result.book.author}
                  </span>
                </div>
                <div className="flex gap-15">
                  <span className="font-semibold">분야</span>
                  <span className="font-normal">
                    {bookInfoData?.result.book.mallType === 'BOOK'
                      ? '국내도서 '
                      : bookInfoData?.result.book.mallType === 'FOREIGN'
                        ? '해외도서 '
                        : bookInfoData?.result.book.mallType === 'EBOOK'
                          ? '전자책 '
                          : '기타 '}
                    &gt; {bookInfoData?.result.book.category}
                  </span>
                </div>

                <div className="flex gap-9">
                  <span className="font-semibold">출판사</span>
                  <span className="font-normal">
                    {bookInfoData?.result.book.publisher}
                  </span>
                </div>
                <div className="flex gap-15">
                  <span className="font-semibold">분량</span>
                  <span className="font-normal">
                    {bookInfoData?.result.book.pages}p
                  </span>
                </div>

                <div className="flex gap-9">
                  <span className="font-semibold">출판일</span>
                  <span className="font-normal">
                    {bookInfoData?.result.book.publicationDate}
                  </span>
                </div>
                <div className="flex gap-12">
                  <span className="font-semibold">ISBN</span>
                  <span className="font-normal">
                    {bookInfoData?.result.book.isbn13}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 서재 등록 버튼 */}
        <div
          className="flex self-end items-center justify-center w-[176px] h-[40px] gap-5 mt-15 mb-24 rounded-sm px-22 py-5 bg-nook-br-100 cursor-pointer"
          onClick={
            isRegistrationLibrary ? handleMoveToLibrary : handleLibraryModal
          }
        >
          <div className="w-[13px]">
            <img
              src={isRegistrationLibrary ? move_icon : download_icon}
              alt=""
            />
          </div>
          <div className="text-center text-white text-sm font-semibold not-italic">
            {isRegistrationLibrary ? '서재로 이동' : '서재에 등록'}
          </div>
        </div>

        {/* 리뷰작성,리뷰 컴포넌트 */}
        <div
          className={`w-full flex flex-col items-center justify-center ${isUserReviewExist && userReview && !isUserEditReview ? '' : 'gap-12'}`}
        >
          {/* 리뷰 작성 */}
          {isUserReviewExist && userReview ? (
            isUserEditReview ? (
              <div className="flex flex-col items-start justify-center gap-12 w-full">
                {/* 별점 */}
                <div className="flex flex-col self-start items-start justify-center gap-6 w-full">
                  <span className="text-white text-base not-italic font-semibold leading-[25px]  ">
                    이 작품을 평가해 주세요!
                  </span>
                  <div className="flex items-center justify-start gap-6">
                    <img
                      src={rating === 0 ? empty_star : filled_star}
                      alt="Star"
                      className="w-15 h-15"
                      onClick={() => handleStarClick(0)}
                    />
                    <img
                      src={rating <= 1 ? empty_star : filled_star}
                      alt="Star"
                      className="w-15 h-15"
                      onClick={() => handleStarClick(1)}
                    />
                    <img
                      src={rating <= 2 ? empty_star : filled_star}
                      alt="Star"
                      className="w-15 h-15"
                      onClick={() => handleStarClick(2)}
                    />
                    <img
                      src={rating <= 3 ? empty_star : filled_star}
                      alt="Star"
                      className="w-15 h-15"
                      onClick={() => handleStarClick(3)}
                    />
                    <img
                      src={rating <= 4 ? empty_star : filled_star}
                      alt="Star"
                      className="w-15 h-15"
                      onClick={() => handleStarClick(4)}
                    />
                  </div>
                </div>
                {/* 리뷰 작성 폼 */}
                <div className="flex flex-col items-start justify-center gap-6 w-full">
                  <span className="text-white text-base not-italic font-semibold leading-[25px]  ">
                    리뷰
                  </span>
                  <div className="flex flex-col items-center justify-between box-border w-full h-[108px] pt-8 pb-4 pl-7 pr-9 text-white bg-[rgba(66,60,53,0.10)] rounded-lg resize-none focus:outline-none">
                    <textarea
                      className="w-full resize-none text-white text-sm not-italic font-normal leading-[22px]   focus:outline-none placeholder:text-[rgba(255, 255, 255, 0.30)] placeholder:text-sm placeholder:not-italic placeholder:font-normal placeholder:leading-[18px] placeholder:  "
                      placeholder="책에 대한 리뷰를 남겨주세요. 과도한 비방 및 욕설, 책과 무관한 리뷰는 삭제될 수 있습니다."
                      value={reviewText}
                      onChange={(e) => {
                        setReviewText(e.target.value);
                        setReviewTextLength(e.target.value.length);
                      }}
                      maxLength={200}
                    />
                    <div className="flex items-end justify-end gap-5 w-full ">
                      <span className="text-[rgba(255,255,255,0.20)] text-right text-[10px] not-italic font-normal leading-[18px]  ">
                        ({reviewTextLength}/200)
                      </span>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          className="w-[87px] h-[34px] rounded-sm bg-[#392121] text-[#E04F55] text-sm not-italic font-bold leading-[29.518px] tracking-[0.56px] flex items-center justify-center"
                          onClick={() => {
                            handleDeleteModal();
                          }}
                        >
                          삭제
                        </button>
                        <button
                          className="w-[87px] h-[34px] rounded-sm bg-nook-br-200 text-white text-sm not-italic font-bold leading-[29.518px] tracking-[0.56px] flex items-center justify-center"
                          onClick={() => {
                            handleReviewEdit();
                          }}
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Comment
                setIsUserEditReview={setIsUserEditReview}
                reviewData={userReview}
              />
            )
          ) : (
            <div className="flex flex-col items-start justify-center gap-12 w-full">
              {/* 별점 */}
              <div className="flex flex-col self-start items-start justify-center gap-6 mt-12 w-full">
                <span className="text-white text-base not-italic font-semibold leading-[25px]  ">
                  이 작품을 평가해 주세요!
                </span>
                <div className="flex items-center justify-start gap-6">
                  <img
                    src={rating === 0 ? empty_star : filled_star}
                    alt="Star"
                    className="w-15 h-15"
                    onClick={() => handleStarClick(0)}
                  />
                  <img
                    src={rating <= 1 ? empty_star : filled_star}
                    alt="Star"
                    className="w-15 h-15"
                    onClick={() => handleStarClick(1)}
                  />
                  <img
                    src={rating <= 2 ? empty_star : filled_star}
                    alt="Star"
                    className="w-15 h-15"
                    onClick={() => handleStarClick(2)}
                  />
                  <img
                    src={rating <= 3 ? empty_star : filled_star}
                    alt="Star"
                    className="w-15 h-15"
                    onClick={() => handleStarClick(3)}
                  />
                  <img
                    src={rating <= 4 ? empty_star : filled_star}
                    alt="Star"
                    className="w-15 h-15"
                    onClick={() => handleStarClick(4)}
                  />
                </div>
              </div>
              {/* 리뷰 작성 폼 */}
              <div className="flex flex-col items-start justify-center gap-6 w-full">
                <span className="text-white text-base not-italic font-semibold leading-[25px]  ">
                  리뷰
                </span>
                <div className="flex flex-col items-center justify-between box-border w-full h-[108px] pt-8 pb-4 pl-7 pr-9 text-white bg-[rgba(66,60,53,0.10)] rounded-lg resize-none focus:outline-none">
                  <textarea
                    className="w-full resize-none text-white text-sm not-italic font-normal leading-[22px]   focus:outline-none placeholder:text-[rgba(255, 255, 255, 0.30)] placeholder:text-sm placeholder:not-italic placeholder:font-normal placeholder:leading-[18px] placeholder:  "
                    placeholder="책에 대한 리뷰를 남겨주세요. 과도한 비방 및 욕설, 책과 무관한 리뷰는 삭제될 수 있습니다."
                    value={reviewText}
                    onChange={(e) => {
                      setReviewText(e.target.value);
                      setReviewTextLength(e.target.value.length);
                    }}
                    maxLength={200}
                  />
                  <div className="flex items-end justify-end gap-5 w-full ">
                    <span className="text-[rgba(255,255,255,0.20)] text-right text-[10px] not-italic font-normal leading-[18px]  ">
                      ({reviewTextLength}/200)
                    </span>
                    <button
                      className={`w-[103px] h-[34px] rounded-sm text-sm font-bold flex items-center justify-center
    ${
      createReviewPending || (reviewText.trim().length === 0 && rating === 0)
        ? 'bg-nook-br-200/50 cursor-not-allowed'
        : 'bg-nook-br-200 text-white cursor-pointer'
    }`}
                      onClick={() => {
                        handleReviewCreateClick();
                      }}
                    >
                      {createReviewPending ? '등록 중…' : '리뷰 등록'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 리뷰 컴포넌트 */}
          {isReviewExist ? (
            <div className="flex flex-col items-start justify-center gap-12 w-full">
              <div className="flex flex-col items-start justify-center w-full">
                {others.map((r) => (
                  <Comment
                    key={r.reviewId}
                    setIsUserEditReview={setIsUserEditReview}
                    reviewData={r}
                  />
                ))}

                {/* Pagination: 서버 totalItems 그대로 사용 */}
                <div className="flex items-center justify-center w-full mt-auto">
                  <Pagination
                    activePage={currentPost}
                    itemsCountPerPage={postsPerPage}
                    totalItemsCount={totalItems}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    prevPageText=""
                    nextPageText=""
                    firstPageText=""
                    lastPageText=""
                    innerClass="flex justify-center items-center gap-10 mt-[13px]"
                    itemClass="text-[rgba(255,255,255,0.50)] text-center text-base not-italic font-normal leading-[normal] cursor-pointer"
                    linkClass="hover:text-white"
                    activeClass="text-white"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-8 w-full h-[140px] rounded-sm bg-[rgba(66,60,53,0.10)]">
              <div className="w-9 h-9">
                <img src={error_outline_rounded} alt="" />
              </div>
              <span className="text-[rgba(255,255,255,0.50)] text-sm not-italic font-normal leading-[normal]  ">
                이 책의 첫 리뷰를 남겨주세요
              </span>
            </div>
          )}
        </div>
        {/* 이 분야의 베스트 */}
        <div className="flex flex-col items-start justify-center gap-12 mt-27 mb-70 w-full  ">
          <span className="text-white text-base not-italic font-semibold leading-[25px]  ">
            | 이 분야의 베스트
          </span>
          <div className="flex items-start justify-center gap-[35px] w-full">
            <BestBook bestBook={bookInfoData?.result.bestInThisCategory[0]} />
            <BestBook bestBook={bookInfoData?.result.bestInThisCategory[1]} />
            <BestBook bestBook={bookInfoData?.result.bestInThisCategory[2]} />
            <BestBook bestBook={bookInfoData?.result.bestInThisCategory[3]} />
            <BestBook bestBook={bookInfoData?.result.bestInThisCategory[4]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoPage;
