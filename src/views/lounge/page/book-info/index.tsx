import React, { useState } from "react";
import chevron_left from "/src/assets/chevron-left.svg";
import book_cover from "/src/assets/bookImgEx.png";
import empty_star from "/src/assets/emptyStar.svg";
import filled_star from "/src/assets/fullStar.svg";
import error_outline_rounded from "/src/assets/error-outline-rounded.svg";
import Comment from "../../components/book-info/comment";
import BestBook from "../../components/book-info/bestBook";

const BookInfoPage = () => {
  const [reviewText, setReviewText] = useState("");
  const [reviewTextLength, setReviewTextLength] = useState(0);
  const [rating, setRating] = useState(0);
  const [isReviewExist, setIsReviewExist] = useState(true);

  const handleStarClick = (index: number) => {
    if (rating === index + 1) {
      setRating(rating - 1); // 별점이 이미 선택된 경우, 선택 해제
    } else {
      setRating(index + 1); // 새로운 별점 선택
    }
    console.log(`Selected rating: ${index + 1}`);
  };

  return (
    <div className="mt-11 w-full h-full">
      {/* 상위 컴포넌트 */}
      <div className="flex flex-col items-center justify-start h-screen mr-120 ml-120 overflow-y-auto">
        {/* 상단바 */}
        <div className="self-start flex items-center justify-center mb-25">
          <div className="w-10 h-10 mr-6">
            <img src={chevron_left} alt="Lounge Top Bar" />
          </div>
          <div className="text-white text-xl font-pretendard">라운지</div>
        </div>
        {/* 책소개 컴포넌트 */}
        <div className="w-full flex items-center justify-between pr-20 pl-20 ">
          {/* 책 이미지, 서재 추가 버튼 */}
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="w-118 h-173">
              <img src={book_cover} alt="Book Cover" className="rounded-lg" />
            </div>
            <div className="w-full text-center text-white text-sm not-italic font-semibold leading-[25px] font-pretendard rounded-sm px-4 py-[7px] bg-nook-br-200">
              서재에 등록
            </div>
          </div>
          {/* 책 정보 */}
          <div className="w-246 flex flex-col items-start justify-start gap-20">
            <div className="flex flex-col items-start justify-center gap-17">
              <div className="text-white text-[22px] not-italic font-semibold leading-[normal] text-pretendard">
                칵테일, 러브, 좀비
              </div>
              <div className="text-white text-sm not-italic font-normal leading-[22px] font-pretendard">
                안전가옥 쇼-트 시리즈의 두 번째 책으로, 조예은 작가의
                단편집이다. 안전가옥 오리지널 시리즈의 첫 책 뉴서울파크 젤리장수
                대학살에서 탄탄한 구성의 호러 스릴러를 선보였던 작가의 연출력은
                단편집에서 더욱 다양한 색채로 빛을 발한다.미묘하지만 분명한
                폭력을 감내해 왔던 여성 빌런의 탄생을 그린 '초대', 물귀신과
                숲귀신 사이의 사랑스러운 이끌림을 담은 '습지의 사랑', 블랙
                유머를 통해 가부장제의 이면을 들여다보는 오컬트 좀비물 '칵테일,
                러브, 좀비', 제2회 황금가지 타임리프 공모전에서 우수상을 차지한
                '오버랩 나이프, 나이프' 등 네 작품을 수록하였다.
              </div>
            </div>
            <hr className="w-full border-nook-hr" />
            <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-white font-pretendard">
              {/* 왼쪽 열 */}
              <div className="flex gap-15">
                <span className="font-semibold">저자</span>
                <span className="font-normal">조예은</span>
              </div>
              <div className="flex gap-15">
                <span className="font-semibold">분야</span>
                <span className="font-normal">국내도서 &gt; 소설/시/희곡</span>
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
        {/* 리뷰작성,리뷰 컴포넌트 */}
        <div className="w-full flex flex-col items-center justify-center gap-12 pr-20 pl-20">
          {/* 리뷰 작성 */}
          <div className="flex flex-col items-start justify-center gap-12 w-full">
            {/* 별점 */}
            <div className="flex flex-col self-start items-start justify-center gap-6 mt-12 w-full">
              <span className="text-white text-base not-italic font-semibold leading-[25px] font-pretendard">
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
              <span className="text-white text-base not-italic font-semibold leading-[25px] font-pretendard">
                리뷰
              </span>
              <div className="flex flex-col items-center justify-between box-border w-full h-[108px] pt-8 pb-4 pl-7 pr-9 text-white bg-[rgba(66,60,53,0.10)] rounded-lg resize-none focus:outline-none">
                <textarea
                  className="w-full resize-none text-white text-sm not-italic font-normal leading-[22px] font-pretendard focus:outline-none placeholder:text-[rgba(255, 255, 255, 0.30)] placeholder:text-sm placeholder:not-italic placeholder:font-normal placeholder:leading-[18px] placeholder:font-pretendard "
                  placeholder="책에 대한 리뷰를 남겨주세요. 과도한 비방 및 욕설, 책과 무관한 리뷰는 삭제될 수 있습니다."
                  value={reviewText}
                  onChange={(e) => {
                    setReviewText(e.target.value);
                    setReviewTextLength(e.target.value.length);
                  }}
                  maxLength={200}
                />
                <div className="flex items-end justify-end gap-5 w-full ">
                  <span className="text-[rgba(255,255,255,0.20)] text-right text-[10px] not-italic font-normal leading-[18px] font-pretendard">
                    ({reviewTextLength}/200)
                  </span>
                  <button className="w-[103px] h-[34px] rounded-[5px] bg-nook-br-200 text-white text-sm not-italic font-bold leading-[29.518px] tracking-[0.56px] font-pretendard flex items-center justify-center">
                    리뷰 등록
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* 리뷰 컴포넌트 */}
          {isReviewExist ? (
            <>
              <Comment />
              <Comment />
            </>
          ) : (
            <div className="flex items-center justify-center gap-8 w-full h-[140px] rounded-sm bg-[rgba(66,60,53,0.10)]">
              <div className="w-9 h-9">
                <img src={error_outline_rounded} alt="" />
              </div>
              <span className="text-[rgba(255,255,255,0.50)] text-sm not-italic font-normal leading-[normal] font-pretendard">
                이 책의 첫 리뷰를 남겨주세요
              </span>
            </div>
          )}
        </div>
        {/* 이 분야의 베스트 */}
        <div className="flex flex-col items-start justify-center gap-12 mt-27 w-full pr-20 pl-20">
          <span className="text-white text-base not-italic font-semibold leading-[25px] font-pretendard">
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
