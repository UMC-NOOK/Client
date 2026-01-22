import CloseIcon from "../../assets/search/addBookclose.svg";

type Props = {
  title: string;
  author: string;
  onChangeTitle: (v: string) => void;
  onChangeAuthor: (v: string) => void;
  onClose: () => void;
  onNext: () => void;
};

export default function SearchDirectAddForm({
  title,
  author,
  onChangeTitle,
  onChangeAuthor,
  onClose,
  onNext,
}: Props) {
  const isActive = title.trim() && author.trim();

  return (
    <div className="w-full min-h-screen bg-[#0E1430] flex flex-col">
      <div className="flex flex-col items-start self-stretch bg-[#0E1430]">
        <div className="w-full h-[40px] flex items-center justify-between ">
          <button
            onClick={onClose}
            className="flex p-2 justify-center items-center"
          >
            <img src={CloseIcon} alt="닫기" className="w-6 h-6" />
          </button>

          <button
            onClick={onNext}
            className="flex h-[40px] px-4 justify-center items-center"
          >
            <span
              className={`text-[18px] font-medium leading-[18px] ${
                isActive ? "text-white" : "text-[#525775]"
              }`}
            >
              다음
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 self-stretch">
        <div className="h-1 w-full rounded-[80px] bg-[#272D49]" />
      </div>

      <div className="w-full flex flex-col items-start gap-12 pt-12">
        <div className="w-full flex flex-col items-start gap-10 px-1">
          <h1 className="text-[#ECECEC] text-[20px] font-bold leading-[30px]">
            필수 도서 정보를 입력해주세요.
          </h1>

          <div className="w-full flex flex-col gap-8 px-1">
            <div className="w-full flex flex-col gap-3">
              <span className="text-[#ECECEC] text-[13px] font-semibold leading-[13px]">
                제목
              </span>

              <input
                value={title}
                onChange={(e) => onChangeTitle(e.target.value)}
                placeholder="책의 제목을 입력해주세요."
                className="
                  w-full px-4 py-3
                  rounded-lg
                  bg-[#1B203B]
                  text-[#ECECEC]
                  text-[14px] leading-[21px]
                  placeholder:text-[#697198]
                  outline-none
                "
              />
            </div>

            <div className="w-full flex flex-col gap-3">
              <span className="text-[#ECECEC] text-[13px] font-semibold leading-[13px]">
                저자
              </span>

              <input
                value={author}
                onChange={(e) => onChangeAuthor(e.target.value)}
                placeholder="책의 저자를 입력해주세요."
                className="
                  w-full px-4 py-3
                  rounded-lg
                  bg-[#1B203B]
                  text-[#ECECEC]
                  text-[14px] leading-[21px]
                  placeholder:text-[#697198]
                  outline-none
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
