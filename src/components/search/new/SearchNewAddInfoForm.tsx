type Props = {
  title: string;
  author: string;
  onChangeTitle: (v: string) => void;
  onChangeAuthor: (v: string) => void;
};

export default function SearchNewAddInfoForm({
  title,
  author,
  onChangeTitle,
  onChangeAuthor,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-8 px-1">
      <div className="w-full flex flex-col gap-3">
        <span className="text-[#ECECEC] text-[13px] font-semibold leading-3.25">
          제목
        </span>

        <input
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="책의 제목을 입력해주세요."
          className="
            w-full px-4 py-3 rounded-lg bg-[#1B203B]
            text-[#ECECEC] text-[14px] leading-5.25
            placeholder:text-[#697198] outline-none
          "
        />
      </div>

      <div className="w-full flex flex-col gap-3">
        <span className="text-[#ECECEC] text-[13px] font-semibold leading-3.25">
          저자
        </span>

        <input
          value={author}
          onChange={(e) => onChangeAuthor(e.target.value)}
          placeholder="책의 저자를 입력해주세요."
          className="
            w-full px-4 py-3 rounded-lg bg-[#1B203B]
            text-[#ECECEC] text-[14px] leading-5.25
            placeholder:text-[#697198] outline-none
          "
        />
      </div>
    </div>
  );
}
