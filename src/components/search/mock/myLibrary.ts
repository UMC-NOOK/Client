// src/components/search/mock/myLibrary.ts

export type BookItem = {
  id: number;
  title: string;
  author: string;
  category: string;
  /** 내 서재에 존재하는 책인지 여부 */
  isInMyLibrary: boolean;
};

// 최근 포커스한 책
export const focusedBooks: BookItem[] = [
  { id: 1001, title: "클린 코드", author: "Robert C. Martin", category: "국내도서", isInMyLibrary: true },
  { id: 1002, title: "리팩터링", author: "Martin Fowler", category: "eBook", isInMyLibrary: true },
  { id: 1003, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "외국도서", isInMyLibrary: true },
  { id: 1004, title: "실용주의 프로그래머", author: "Andrew Hunt", category: "eBook", isInMyLibrary: true },
  { id: 1005, title: "이펙티브 타입스크립트", author: "Dan Vanderkam", category: "국내도서", isInMyLibrary: true },
  { id: 1006, title: "함수형 사고", author: "닐 포드", category: "국내도서", isInMyLibrary: true },
];

// 아직 읽지 않은 책
export const unreadBooks: BookItem[] = [
  { id: 2001, title: "컴퓨터 네트워킹: 하향식 접근", author: "Kurose, Ross", category: "국내도서", isInMyLibrary: true },
  { id: 2002, title: "Operating Systems: Three Easy Pieces", author: "Remzi H. Arpaci-Dusseau", category: "eBook", isInMyLibrary: true },
  { id: 2003, title: "Hands-On Machine Learning", author: "Aurélien Géron", category: "외국도서", isInMyLibrary: true },
  { id: 2004, title: "Deep Learning", author: "Goodfellow", category: "eBook", isInMyLibrary: true },
  { id: 2005, title: "웹 해킹 기술", author: "김홍기", category: "국내도서", isInMyLibrary: true },
  { id: 2006, title: "머신러닝 보안", author: "Clarence Chio", category: "국내도서", isInMyLibrary: true },
  { id: 2007, title: "혼모노", author: "성해나", category: "국내도서", isInMyLibrary: true },
];

// 둘 다 없을 때 보여줄 추천
export const fallbackRecommendedBooks: BookItem[] = [
  { id: 201, title: "모던 자바스크립트 Deep Dive", author: "이웅모", category: "국내도서", isInMyLibrary: true },
  { id: 202, title: "You Don't Know JS Yet", author: "Kyle Simpson", category: "eBook", isInMyLibrary: true },
  { id: 203, title: "모던 자바스크립트 Deep Dive", author: "이웅모", category: "국내도서", isInMyLibrary: true },
  { id: 204, title: "You Don't Know JS Yet", author: "Kyle Simpson", category: "eBook", isInMyLibrary: true },
  { id: 205, title: "모던 자바스크립트 Deep Dive", author: "이웅모", category: "국내도서", isInMyLibrary: true },
  { id: 206, title: "You Don't Know JS Yet", author: "Kyle Simpson", category: "eBook", isInMyLibrary: true },
];

/* =======================
 * 🔍 검색 결과용 (내 서재 통합)
 * ======================= */
export const allBooks: BookItem[] = [...focusedBooks, ...unreadBooks];
