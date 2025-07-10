import book_cover from "/src/assets/bookImgEx.png";
import middle_point from "/src/assets/middlePoint.svg";

const BestBook = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-3 mt-27 w-full pr-20 pl-20">
      <div className="w-70 h-102 rounded-lg">
        <img src={book_cover} alt="Best Book Cover" className="rounded-lg" />
      </div>
      <span className="self-stretch justify-center text-white text-base font-semibold  ">
        혼모노
      </span>
      <div className="flex items-center justify-start gap-3  justify-center text-white text-xs font-normal  ">
        <span>성해나</span>
        <div className="w-[1px] h-[1px]">
          <img src={middle_point} alt="" />
        </div>

        <span>창비</span>
      </div>
    </div>
  );
};

export default BestBook;
