import React, { useState } from 'react';
import chevron_left from '/src/assets/button/book-info/chevron-left.svg';
import book_cover from '/src/assets/button/book-info/bookImgEx.png';
import empty_star from '/src/assets/button/book-info/emptyStar.svg';
import filled_star from '/src/assets/button/book-info/fullStar.svg';
import error_outline_rounded from '/src/assets/button/book-info/error-outline-rounded.svg';
import Comment from '../../components/book-info/comment';
import BestBook from '../../components/book-info/bestBook';
import download_icon from '/src/assets/button/book-info/download.svg';
import move_icon from '/src/assets/button/book-info/move.svg';
import Pagination from 'react-js-pagination';
import DeleteBtn from '../../../../components/delete-modal/DeleteModal';
import LibraryRegistration from '../../components/book-info/libraryRegistration';

const BookInfoPage = () => {
  // 리뷰 작성 관련 상태
  const [reviewText, setReviewText] = useState('');
  const [reviewTextLength, setReviewTextLength] = useState(0);
  const [rating, setRating] = useState(0);
  const [isReviewExist, setIsReviewExist] = useState(true);
  const [isUserReviewExist, setIsUserReviewExist] = useState(false);
  const [isUserEditReview, setIsUserEditReview] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    //삭제로직 추가
    setIsUserEditReview(false);
    setIsUserReviewExist(false);
    setReviewText('');
    setReviewTextLength(0);
    setRating(0);
    setIsDeleteModalOpen(false);
  };

  const modalHandler = () => {
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

  const commentList = [
    <Comment isOwn={false} setIsUserEditReview={setIsUserEditReview} key={1} />,
    <Comment isOwn={false} setIsUserEditReview={setIsUserEditReview} key={2} />,
    <Comment isOwn={false} setIsUserEditReview={setIsUserEditReview} key={3} />,
    <Comment isOwn={false} setIsUserEditReview={setIsUserEditReview} key={4} />,
    <Comment isOwn={false} setIsUserEditReview={setIsUserEditReview} key={5} />,
    <Comment isOwn={false} setIsUserEditReview={setIsUserEditReview} key={6} />,
    <Comment isOwn={false} setIsUserEditReview={setIsUserEditReview} key={7} />,
    <Comment isOwn={false} setIsUserEditReview={setIsUserEditReview} key={8} />,
    <Comment isOwn={false} setIsUserEditReview={setIsUserEditReview} key={9} />,
    <Comment
      isOwn={false}
      setIsUserEditReview={setIsUserEditReview}
      key={10}
    />,
    <Comment
      isOwn={false}
      setIsUserEditReview={setIsUserEditReview}
      key={11}
    />,
    <Comment
      isOwn={false}
      setIsUserEditReview={setIsUserEditReview}
      key={12}
    />,
  ];

  // Pagination 관련
  const [currentPost, setCurrentPost] = useState(1);
  const [page, setPage] = useState<JSX.Element[]>(commentList);
  const postsPerPage = 5;
  const indexOfLastPost = currentPost * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const handlePageChange = (pageNumber: number) => {
    setCurrentPost(pageNumber);
  };

  // 서재 등록 관련
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [isRegistrationLibrary, setIsRegistrationLibrary] = useState(false);

  const handleLibrary = () => {
    //서재 등록 로직 추가
    setIsLibraryModalOpen(false);
    setIsRegistrationLibrary(true);
  };

  const libraryModalHandler = () => {
    setIsLibraryModalOpen((prev) => !prev);
  };

  return (
    <div className="mt-11 w-full h-full flex flex-col items-center justify-center">
      {isDeleteModalOpen && (
        <DeleteBtn
          usage="book-info"
          onDelete={handleDelete}
          closeModal={modalHandler}
        />
      )}
      {isLibraryModalOpen && (
        <LibraryRegistration
          onRegister={handleLibrary}
          closeModal={libraryModalHandler}
        />
      )}
      {/* 상위 컴포넌트 */}
      <div className="flex flex-col w-[840px] items-center justify-start h-screen mr-150 ml-150 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {/* 상단바 */}
        <div className="self-start flex items-center justify-center mb-25">
          <div className="w-10 h-10 mr-6">
            <img src={chevron_left} alt="Lounge Top Bar" />
          </div>
          <div className="text-white text-xl  ">라운지</div>
        </div>
        {/* 책소개 컴포넌트 */}
        <div className="relative w-full">
          <img
            src={book_cover}
            alt="배경 이미지"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* 그라디언트 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black to-black/50" />

          <div className="px-11 py-8 w-full relative flex items-center justify-between box-border">
            {/* 책 이미지*/}
            <div className="w-118 h-173">
              <img src={book_cover} alt="Book Cover" className="rounded-lg" />
            </div>
            {/* 책 정보 */}
            <div className="relative w-246 flex flex-col items-start justify-start gap-20">
              <div className="flex flex-col items-start justify-center gap-17">
                <div className="text-white text-[22px] not-italic font-semibold leading-[normal] text-pretendard">
                  칵테일, 러브, 좀비
                </div>
                <div className="text-white text-sm not-italic font-normal leading-[22px]  ">
                  1965년 미국에서 발표된 후, 오랜 시간 동안 독자들에게
                  잊힌《스토너》는 영국, 프랑스, 독일, 네덜란드 등 유럽 출판계와
                  평론가, 독자들의 열렬한 반응을 이끌어내며 베스트셀러가 되었다.
                  미국과 유럽을 넘어 전 세계에 ‘늦고도 새로운 감동’을 전한
                  베스트셀러. 《스토너》가 드디어 한국 독자들을 찾아왔다.
                </div>
              </div>
              <hr className="w-full border-nook-hr" />
              <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-white  ">
                {/* 왼쪽 열 */}
                <div className="flex gap-15">
                  <span className="font-semibold">저자</span>
                  <span className="font-normal">조예은</span>
                </div>
                <div className="flex gap-15">
                  <span className="font-semibold">분야</span>
                  <span className="font-normal">
                    국내도서 &gt; 소설/시/희곡
                  </span>
                </div>

                <div className="flex gap-9">
                  <span className="font-semibold">출판사</span>
                  <span className="font-normal">안전가옥</span>
                </div>
                <div className="flex gap-15">
                  <span className="font-semibold">분량</span>
                  <span className="font-normal">162p</span>
                </div>

                <div className="flex gap-9">
                  <span className="font-semibold">출판일</span>
                  <span className="font-normal">2020.04.10</span>
                </div>
                <div className="flex gap-12">
                  <span className="font-semibold">ISBN</span>
                  <span className="font-normal">9791190174756</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 서재 등록 버튼 */}
        <div
          className="flex self-end items-center justify-center gap-5 mt-15 mb-24 rounded-sm mt-15 px-22 py-5 bg-nook-br-100 cursor-pointer"
          onClick={libraryModalHandler}
        >
          <div className="w-[13px]">
            <img
              src={isRegistrationLibrary ? move_icon : download_icon}
              alt=""
            />
          </div>
          <div className="text-center text-white text-sm not-italic leading-[25px]">
            {isRegistrationLibrary ? '서재로 이동' : '서재에 등록'}
          </div>
        </div>

        {/* 리뷰작성,리뷰 컴포넌트 */}
        <div className="w-full flex flex-col items-center justify-center gap-12  ">
          {/* 리뷰 작성 */}
          {isUserReviewExist ? (
            isUserEditReview ? (
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
                      <div className="flex items-center justify-center gap-4">
                        <button
                          className="w-[87px] h-[34px] rounded-sm bg-[#392121] text-[#E04F55] text-sm not-italic font-bold leading-[29.518px] tracking-[0.56px] flex items-center justify-center"
                          onClick={() => {
                            modalHandler();
                          }}
                        >
                          삭제
                        </button>
                        <button
                          className="w-[87px] h-[34px] rounded-sm bg-nook-br-200 text-white text-sm not-italic font-bold leading-[29.518px] tracking-[0.56px] flex items-center justify-center"
                          onClick={() => {
                            setIsUserEditReview(false);
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
              <Comment isOwn={true} setIsUserEditReview={setIsUserEditReview} />
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
                      className="w-[103px] h-[34px] rounded-sm bg-nook-br-200 text-white text-sm not-italic font-bold leading-[29.518px] tracking-[0.56px] flex items-center justify-center"
                      onClick={() => {
                        setIsUserReviewExist(true);
                      }}
                    >
                      리뷰 등록
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
                {/* 댓글 리스트 */}
                {page
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((comment, index) => (
                    <div key={index} className="w-full">
                      {comment}
                    </div>
                  ))}
                {/* Pagination */}
                <div className="flex items-center justify-center w-full mt-auto">
                  <Pagination
                    activePage={currentPost}
                    itemsCountPerPage={postsPerPage}
                    totalItemsCount={commentList.length}
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
        <div className="flex flex-col items-start justify-center gap-12 mt-27 mb-27 w-full  ">
          <span className="text-white text-base not-italic font-semibold leading-[25px]  ">
            | 이 분야의 베스트
          </span>
          <div className="flex items-start justify-center gap-[35px] w-full">
            <BestBook />
            <BestBook />
            <BestBook />
            <BestBook />
            <BestBook />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoPage;
