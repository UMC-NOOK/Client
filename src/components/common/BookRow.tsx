import saveIcon from '../../assets/button/search/saved.png';
import infoIcon from '../../assets/button/search/info.png';
import dotIcon from '../../assets/button/search/Ellipse.png';

interface BookRowProps {
  book: {
    img: string;
    bookName: string;
    category: string;
    author: string;
    publisher: string;
    publication_date: string;
    bookId: number;
  };
  onClickInfo: () => void;
  onClickAdd: () => void;
}

export default function BookRow({ book, onClickInfo, onClickAdd }: BookRowProps) {
  return (
    <div className="w-full max-w-[1040px] mx-auto">
      <div className="relative flex justify-between items-center w-full h-[173px] rounded-md mb-4">
        {/* 이미지 + 정보 */}
        <div className="flex items-start gap-[21.56px]">
          <img
            src={book.img}
            alt={book.bookName}
            className="object-cover rounded"
            style={{ width: '111px', height: '170.2px', borderRadius: '7.2px' }}
          />
          <div className="text-white leading-[17px]">
            <p className="text-[18px]">[{book.category}] {book.bookName}</p>
            <p className="text-white text-[14px] my-[17px]">{book.author}</p>
            <p className="text-white text-[14px]">
              {book.publisher}
              <img
                src={dotIcon}
                alt="dot"
                className="inline-block"
                style={{ width: '1px', height: '1px', margin: '6px' }}
              />
              {new Date(book.publication_date).getFullYear()}년
            </p>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="absolute bottom-0 right-6 flex flex-col gap-[8px] shrink-0">
          {/* 책 정보 버튼 */}
          <button
            type="button"
            onClick={onClickInfo}
            className="flex justify-center items-center gap-[8px] text-white rounded-[8px] border border-transparent transition-colors"
            style={{
              width: '100px',
              height: '36px',
              padding: '8px 20px',
              background: 'rgba(55, 50, 44, 0.50)',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '25px',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget.style.borderColor = '#555351');
              (e.currentTarget.style.background as any) = 'rgba(55, 50, 44, 0.50)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.style.borderColor = 'transparent');
              (e.currentTarget.style.background as any) = 'rgba(55, 50, 44, 0.50)';
            }}
          >
            <img
              src={infoIcon}
              alt="책 정보"
              className="shrink-0"
              style={{ width: '9px', height: '12.938px' }}
            />
            책 정보
          </button>

          {/* 서재 등록 버튼 */}
          <button
            type="button"
            onClick={onClickAdd}
            className="flex justify-center items-center gap-[8px] text-white rounded-[8px] border border-transparent transition-colors"
            style={{
              width: '100px',
              height: '36px',
              padding: '8px 12px',
              background: '#37322C',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '25px',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget.style.borderColor = 'rgba(211, 211, 211, 0.30)');
              (e.currentTarget.style.background as any) = '#37322C';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.style.borderColor = 'transparent');
              (e.currentTarget.style.background as any) = '#37322C';
            }}
          >
            <img
              src={saveIcon}
              alt="서재 등록"
              className="shrink-0"
              style={{ width: '11px', height: '9.151px' }}
            />
            서재 등록
          </button>
        </div>
      </div>

      <div className="w-full border-t border-[rgba(85,83,81,0.7)] my-[20px]" />
    </div>
  );
}
