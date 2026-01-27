import CameraIcon from "../../../assets/search/atomic-icon-shape.svg";

type DateParts = {
  yyyy: string;
  mm: string;
  dd: string;
};

type Props = {
  intro: string;
  pages: string;
  publisher: string;
  isbn: string;
  pubDate: DateParts;

  onChangeImage: (f: File | null) => void;
  onChangeIntro: (v: string) => void;
  onChangePages: (v: string) => void;
  onChangePublisher: (v: string) => void;
  onChangeIsbn: (v: string) => void;
  onChangePubDate: (v: DateParts) => void;
};

const LabelBlock = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-3">
      <span className='text-gray-100 font-["SUIT_Variable"] text-[13px] font-semibold leading-[13px]'>
        {label}
      </span>
      {children}
    </div>
  );
};

export default function SearchNewAddMoreForm({
  intro,
  pages,
  publisher,
  isbn,
  pubDate,
  onChangeImage,
  onChangeIntro,
  onChangePages,
  onChangePublisher,
  onChangeIsbn,
  onChangePubDate,
}: Props) {
  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    onChangeImage(f);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center gap-8 px-1">
        <label
          className="flex w-25 h-[144px] justify-center items-center rounded-[2px] bg-gray-900 cursor-pointer"
          aria-label="사진 추가"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePick}
          />
          <img src={CameraIcon} alt="" className="w-6 h-6" />
        </label>

        <div className="w-full flex flex-col items-start gap-6 px-1">
          {/* 소개 */}
          <LabelBlock label="소개">
            <div className="w-full">
              <textarea
                value={intro}
                onChange={(e) => onChangeIntro(e.target.value)}
                placeholder="책에 대한 소개를 입력해주세요."
                className="
                  w-full h-[116px]
                  px-4 py-3
                  rounded-md
                  bg-gray-900
                  text-gray-100
                  text-[14px] font-normal leading-5.25
                  placeholder:text-gray-500
                  outline-none resize-none
                "
              />
            </div>
          </LabelBlock>

          {/* 분량 */}
          <LabelBlock label="분량">
            <input
              value={pages}
              onChange={(e) => onChangePages(e.target.value)}
              placeholder="책의 전체 쪽수를 입력해주세요."
              className="
                w-full
                px-4 py-3
                rounded-md
                bg-gray-900
                text-gray-100
                text-[14px] font-normal leading-5.25
                placeholder:text-gray-500
                outline-none
              "
              inputMode="numeric"
            />
          </LabelBlock>

          {/* 출판사 */}
          <LabelBlock label="출판사">
            <input
              value={publisher}
              onChange={(e) => onChangePublisher(e.target.value)}
              placeholder="책의 출판사를 입력해주세요."
              className="
                w-full
                px-4 py-3
                rounded-md
                bg-gray-900
                text-gray-100
                text-[14px] font-normal leading-5.25
                placeholder:text-gray-500
                outline-none
              "
            />
          </LabelBlock>

          {/* 출판일 */}
          <LabelBlock label="출판일">
            <div className="w-full flex items-start gap-2">
              {[
                { key: "yyyy", placeholder: "YYYY", value: pubDate.yyyy },
                { key: "mm", placeholder: "MM", value: pubDate.mm },
                { key: "dd", placeholder: "DD", value: pubDate.dd },
              ].map((f) => (
                <input
                  key={f.key}
                  value={f.value}
                  onChange={(e) =>
                    onChangePubDate({
                      ...pubDate,
                      [f.key]: e.target.value,
                    } as DateParts)
                  }
                  placeholder={f.placeholder}
                  className="
                    flex-1 min-w-0
                    px-2 py-3
                    text-center
                    rounded-lg
                    bg-gray-900
                    text-gray-100
                    text-[14px] font-normal leading-5.25
                    placeholder:text-gray-500
                    outline-none
                  "
                  maxLength={f.key === "yyyy" ? 4 : 2}
                  inputMode="numeric"
                />
              ))}
            </div>
          </LabelBlock>
          {/* ISBN */}
          <LabelBlock label="ISBN">
            <input
              value={isbn}
              onChange={(e) => onChangeIsbn(e.target.value)}
              placeholder="책의 ISBN을 입력해주세요."
              className="
                w-full
                px-4 py-3
                rounded-md
                bg-gray-900
                text-gray-100
                text-[14px] font-normal leading-5.25
                placeholder:text-gray-500
                outline-none
              "
            />
          </LabelBlock>
        </div>
      </div>
    </div>
  );
}
