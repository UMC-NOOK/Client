// Client/src/components/search/mock/books.ts

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  isInMyLibrary: boolean;
};

/* =======================
 * 추천 도서
 * ======================= */
export const recommendedBooks: Book[] = [
  { id: "rec-1", title: "혼모노", author: "성해나", category: "국내도서", isInMyLibrary: true },
  { id: "rec-2", title: "괴테는 모든 것을 말했다", author: "스즈키 유이", category: "eBook", isInMyLibrary: false },
  { id: "rec-3", title: "흔한남매 21", author: "흔한남매", category: "국내도서", isInMyLibrary: true },
  { id: "rec-4", title: "안녕은 영원한 헤어짐은 아니겠지요", author: "김애란", category: "국내도서", isInMyLibrary: false },
  { id: "rec-5", title: "슬기로운 개발 생활", author: "Nook", category: "eBook", isInMyLibrary: true },
  { id: "rec-6", title: "넌 진짜 혼모노", author: "성해나", category: "국내도서", isInMyLibrary: false },
  { id: "rec-7", title: "내가 진짜 혼모노", author: "성해나", category: "국내도서", isInMyLibrary: false },
  { id: "rec-8", title: "혼모노 폼폼푸린의 이중생활", author: "폼폼푸린", category: "eBook", isInMyLibrary: false },
];

/* =======================
 * 주간 베스트
 * ======================= */
export const bestBooks: Book[] = [
  { id: "best-1", title: "어스탐 경의 임사전언", author: "", category: "국내도서", isInMyLibrary: false },
  { id: "best-2", title: "처음 만나는 양자의 세계", author: "", category: "eBook", isInMyLibrary: false },
  { id: "best-3", title: "트렌드 코리아 2026", author: "", category: "국내도서", isInMyLibrary: true },
  { id: "best-4", title: "나는 매일 아침마다", author: "", category: "국내도서", isInMyLibrary: false },
  { id: "best-5", title: "2026 하루 3줄 감사일기", author: "", category: "eBook", isInMyLibrary: true },
  { id: "best-6", title: "평균의 종말", author: "", category: "국내도서", isInMyLibrary: false },
  { id: "best-7", title: "달러구트 꿈 백화점", author: "", category: "eBook", isInMyLibrary: true },
  { id: "best-8", title: "뇌과학자의 인생 실험", author: "", category: "국내도서", isInMyLibrary: false },
  { id: "best-9", title: "유행의 시간", author: "", category: "국내도서", isInMyLibrary: false },
  { id: "best-10", title: "모두를 위한 경제학", author: "", category: "eBook", isInMyLibrary: false },
];

/* =======================
 * 🔍 검색 결과용 전체 도서
 * ======================= */
export const allBooks: Book[] = [...recommendedBooks, ...bestBooks];
