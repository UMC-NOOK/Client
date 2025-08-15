import userImg from '/src/assets/button/book-info/usrImg.svg';
import fullStar from '/src/assets/button/book-info/fullStar.svg';
import emptyStar from '/src/assets/button/book-info/emptyStar.svg';

import { Review } from '../../types/book-info/review';
import { useGetMe } from '../../../../views/home/hooks/useQuery/useGetMe';

interface CommentProps {
  setIsUserEditReview: (value: boolean) => void;
  reviewData: Review;
}

const Comment = ({ setIsUserEditReview, reviewData }: CommentProps) => {
  const isOwn = reviewData.ownedByUser;

  return (
    <div className="flex flex-col w-full">
      {isOwn ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16">
              <img src={userImg} alt="User" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white text-sm not-italic font-semibold leading-[normal] leading-[normal]  ">
                {reviewData.name ?? '사용자'}
              </span>
              <span className="text-white text-xs not-italic font-normal leading-[normal]  ">
                {reviewData.nickname ?? '닉네임 없음'}
              </span>
            </div>
          </div>
          <div
            className="w-[103px] px-5 py-2 rounded-lg text-white text-sm not-italic font-bold leading-[29.518px] tracking-[0.56px] bg-nook-br-200 flex items-center justify-center cursor-pointer"
            onClick={() => setIsUserEditReview(true)}
          >
            리뷰 수정
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <div className="w-16 h-16">
            <img src={userImg} alt="User" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white text-sm not-italic font-semibold leading-[normal] leading-[normal]  ">
              {reviewData.name}
            </span>
            <span className="text-white text-xs not-italic font-normal leading-[normal]  ">
              {reviewData.nickname}
            </span>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-10 h-10">
              <img
                src={i < reviewData.rating ? fullStar : emptyStar}
                alt={i < reviewData.rating ? 'Full Star' : 'Empty Star'}
              />
            </div>
          ))}
        </div>
        <span className="text-white text-xs font-normal   leading-none">
          {reviewData.reviewDate}
        </span>
      </div>
      <div className="w-full text-white text-sm font-normal mt-10  ">
        {reviewData.content}
      </div>
      <hr className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-600/70 mt-12 mb-12" />
    </div>
  );
};

export default Comment;
