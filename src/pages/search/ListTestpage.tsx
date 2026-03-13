import { BookList } from "../../components/content/Card/Book/List";

import sampleBook from "../../assets/Book Cover.jpg";

export default function ListPage() {
  return (
    <main className="min-h-screen bg-neutral-100 py-8">
      <section className="mx-auto flex w-full max-w-[375px] flex-col gap-6 rounded-[16px] bg-[#0B0F23] p-4">
        <p className="text-sm text-white/80">Card/Book/List</p>

        <BookList
          imageUrl={sampleBook}
          title="검색 결과 도서"
          author="저자 이름"
          type="SEARCH"
        />

        <BookList
          imageUrl="https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg"
          title="서재 도서"
          author="Antoine de Saint-Exupéry"
          type="LIBRARY"
        />

        <BookList
          imageUrl="https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
          title="아이콘 없이 라벨만 있는 경우"
          author="Yuval Noah Harari"
          type="REPORT"
          typeLabel="완독"
        />

        <BookList
          imageUrl="https://covers.openlibrary.org/b/isbn/9780439554930-M.jpg"
          title="아이콘도 라벨도 없는 경우"
          author="J.K. Rowling"
          type="NONE"
        />

        <BookList
          imageUrl={sampleBook}
          title="아주 긴 제목이 들어갔을 때 한 줄 말줄임 처리가 잘 되는지 확인하기 위한 테스트용 제목입니다"
          author="아주 긴 저자명 테스트"
          type="SEARCH"
          typeLabel="읽는 중"
          onClick={() => {
            console.log("book list clicked");
          }}
        />
      </section>
    </main>
  );
}