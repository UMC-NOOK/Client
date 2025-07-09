//src/components/common/bookrow.tsx
import saveIcon from '../../assets/button/search/save.png';
import infoIcon from '../../assets/button/search/info.png';

interface BookRowProps {
  book: {
    img: string;
    bookName: string;
    category: string;
    author: string;
    publisher: string;
    publication_date: string;
  };
  onClickInfo: () => void;
  onClickAdd: () => void;
}

export default function BookRow({ book, onClickInfo, onClickAdd }: BookRowProps) {
    return (
      <div className="w-full max-w-[1040px] mx-auto">
        {/* 책 정보 박스 */}
        <div className="relative flex justify-between items-center w-full h-[173px] rounded-md mb-4">
          {/* 이미지 + 텍스트 */}
          <div className="flex items-center gap-6">
            <img
              src={book.img}
              alt={book.bookName}
              className="object-cover rounded"
              style={{
                width: '6.965rem',
                height: '10.8405rem',
                aspectRatio: '111.44 / 173.45',
              }}
            />
            <div className="text-white leading-[17px]">
              <p className="font-semibold text-[18px]">
                [{book.category}] {book.bookName}
              </p>
              <p className="text-gray-300 text-[14px]">{book.author}</p>
              <p className="text-gray-400 text-[14px]">
                {book.publisher} · {book.publication_date}
              </p>
            </div>
          </div>
  
          {/* 버튼 */}
          <div className="absolute bottom-4 right-6 flex flex-col gap-2 shrink-0">
            <button
              onClick={onClickInfo}
              className="flex justify-center items-center gap-2 text-white w-[8rem] h-[2.5rem] px-5 py-2 rounded-[0.5rem] border border-[#555351]"
              style={{
                backgroundColor: 'transparent',
                fontFamily: 'Pretendard',
                fontSize: '1rem',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '1.5625rem',
              }}
            >
              <img
                src={infoIcon}
                alt="책 정보"
                className="w-[12.74px] h-[18.3px] shrink-0"
              />
              책 정보
            </button>
            <button
              onClick={onClickAdd}
              className="flex justify-center items-center gap-2 text-white w-[8rem] h-[2.5rem] px-[1.25rem] py-[0.5rem] rounded-[0.5rem] border-none"
              style={{
                background: '#2D2B29',
                fontFamily: 'Pretendard',
                fontSize: '1rem',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '1.5625rem',
              }}
            >
              <img
                src={saveIcon}
                alt="서재 등록"
                className="w-[13.56px] h-[10.34px] shrink-0"
              />
              서재 등록
            </button>
          </div>
        </div>

        {/* 아래 선 */}
        <div className="w-full h-px border-t border-[rgba(85,83,81,0.7)] my-5" />
      </div>
    );
  }
  