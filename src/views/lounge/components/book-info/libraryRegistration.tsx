import chevron_left from "/src/assets/button/book-info/chevron-left.svg";
import calendar from "/src/assets/button/book-info/calendar.svg";
import bookImgEx from "/src/assets/button/book-info/bookImgEx.png";

interface LibraryRegistrationProps {
  onRegister: () => void;
  closeModal: () => void;
}

const LibraryRegistration = ({
  onRegister,
  closeModal,
}: LibraryRegistrationProps) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="w-[440px] flex flex-col justify-start items-center bg-[rgba(45,40,34,1)] rounded-2xl px-17 relative">
        <div className="w-full h-11 mt-15 mb-17">
          <div className="absolute top-16 left-14 flex items-center gap-2">
            <img
              src={chevron_left}
              alt="Chevron Left Icon"
              onClick={closeModal}
            />
          </div>
          <div className="text-white text-center text-lg not-italic font-semibold  ">
            서재 등록
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-17 mb-20">
          <div className="w-[135px] h-[198px] ml-4">
            <img src={bookImgEx} alt="" />
          </div>
          <div className="flex flex-col gap-8 ">
            <div className="flex flex-col gap-4 items-start justify-center">
              <div className="text-[rgba(255,255,255,0.50)] text-center text-xs not-italic font-normal">
                제목
              </div>
              <div className=" text-white text-sm not-italic font-normal  ">
                칵테일, 러브, 좀비
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-start justify-center">
              <div className="text-[rgba(255,255,255,0.50)] text-center text-xs not-italic font-normal  ">
                저자
              </div>
              <div className=" text-white text-sm not-italic font-normal  ">
                조예은
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-start justify-center">
              <div className="text-[rgba(255,255,255,0.50)] text-center text-xs not-italic font-normal  ">
                날짜
              </div>
              <div className="flex items-center justify-between w-[207px] rounded-sm bg-[rgba(31,28,25,0.5)] px-5 py-[9px] box-border">
                <div className=" text-white text-sm not-italic font-normal  ">
                  2025.05.30 (금)
                </div>
                <div className="w-7 h-7">
                  <img src={calendar} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-5 mb-12">
          <div className="text-white text-xs not-italic font-normal">
            독서상태
          </div>
          <div className="flex items-center justify-between w-full gap-[11px]">
            <button className="w-[117px] h-[38px] rounded border border-solid border-nook-br-100 px-10 py-2 text-[rgba(255,255,255,0.50)] text-center text-sm not-italic font-normal leading-[22px]">
              독서중
            </button>
            <button className="w-[117px] h-[38px] rounded border border-solid border-nook-br-100 px-10 py-2 text-[rgba(255,255,255,0.50)] text-center text-sm not-italic font-normal leading-[22px]">
              완독
            </button>
            <button className="w-[117px] h-[38px] rounded border border-solid border-nook-br-100 px-10 py-2 text-[rgba(255,255,255,0.50)] text-center text-sm not-italic font-normal leading-[22px]">
              찜
            </button>
          </div>
        </div>
        <div
          className="flex items-center justify-center w-full h-20 px-10 py-2 rounded bg-nook-br-100 text-white text-center text-base not-italic font-semibold leading-[22px] mb-[27px] cursor-pointer"
          onClick={onRegister}
        >
          저장
        </div>
      </div>
    </div>
  );
};

export default LibraryRegistration;
