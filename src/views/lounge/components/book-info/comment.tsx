import userImg from "/src/assets/button/book-info/usrImg.svg";
import fullStar from "/src/assets/button/book-info/fullStar.svg";
import emptyStar from "/src/assets/button/book-info/emptyStar.svg";

const Comment = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16">
          <img src={userImg} alt="User" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white text-sm not-italic font-semibold leading-[normal] leading-[normal]  ">
            승민
          </span>
          <span className="text-white text-xs not-italic font-normal leading-[normal]  ">
            이 구역의 책벌레
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10">
            <img src={fullStar} alt="Full Star" />
          </div>
          <div className="w-10 h-10">
            <img src={fullStar} alt="Full Star" />
          </div>
          <div className="w-10 h-10">
            <img src={fullStar} alt="Full Star" />
          </div>
          <div className="w-10 h-10">
            <img src={fullStar} alt="Full Star" />
          </div>
          <div className="w-10 h-10">
            <img src={emptyStar} alt="Empty Star" />
          </div>
        </div>
        <span className="text-white text-xs font-normal   leading-none">
          2025.04.23
        </span>
      </div>
      <div className="w-full text-white text-sm font-normal leading-[normal] mt-10  ">
        일상과 비일 상의 경계를 넘나들며, 익숙한 감정을 낯설게 풀어낸 점이
        인상적입니다. 일상과 비일 상의 경계를 넘나들며, 익숙한 감정을 낯설게
        풀어낸 점이 인상적입니다. 일상과 비일 상의 경계를 넘나들며, 익숙한
        감정을 낯설게 풀어낸 점이 인상적입니다.
      </div>
      <hr className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-600/70 mt-12 mb-12" />
    </div>
  );
};

export default Comment;
