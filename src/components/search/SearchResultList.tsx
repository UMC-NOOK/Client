import tempBookData from '../../mock/library/bookData';

interface Props {
  query: string;
}

export default function SearchResultList({ query }: Props) {
  // 검색어 없으면 아무것도 안 보여줌
  if (!query.trim()) return null;

  const results = tempBookData.filter(book =>
    book.bookName.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase())
  );

  // 검색어는 있지만 결과가 없는 경우
  if (results.length === 0) {
    return (
      <div className="text-center text-white mt-10 text-base">
        책을 찾을 수 없습니다.
      </div>
    );
  }

  // 검색 결과가 있는 경우
  return (
    <div className="flex flex-col gap-4 w-full max-w-[768px] mx-auto mt-8">
      {results.map((book, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between bg-[#2C2C2C] rounded-[8px] px-4 py-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={book.img}
              alt={book.bookName}
              style={{ width: '80px', height: '100px' }}
              className="object-cover rounded-[4px] shrink-0"
            />
            <div className="flex flex-col text-white text-sm leading-[1.5]">
              <p className="font-medium">{book.bookName}</p>
              <p>{book.author}</p>
              <p>{book.publisher} ・ {book.publication_date}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-[#484848] text-white text-sm px-3 py-1 rounded">
              책 정보
            </button>
            <button className="bg-[#484848] text-white text-sm px-3 py-1 rounded">
              서재 등록
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
