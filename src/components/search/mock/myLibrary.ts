// 빈 배열 테스트
//export const focusedBooks: BookItem[] = [];
//export const unreadBooks: BookItem[] = [];

// src/components/search/mock/myLibrary.ts
export type BookItem = {
  id: number;
  title: string;
  author: string;
};

// ✅ 최근 포커스한 책 (빈 배열 X)
export const focusedBooks: BookItem[] = [
  { id: 1001, title: "클린 코드", author: "Robert C. Martin" },
  { id: 1002, title: "리팩터링", author: "Martin Fowler" },
  { id: 1003, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann" },
  { id: 1004, title: "실용주의 프로그래머", author: "Andrew Hunt, David Thomas" },
  { id: 1005, title: "이펙티브 타입스크립트", author: "Dan Vanderkam" },
  { id: 1006, title: "함수형 사고", author: "닐 포드" },
];

// ✅ 아직 읽지 않은 책 (빈 배열 X)
export const unreadBooks: BookItem[] = [
  { id: 2001, title: "컴퓨터 네트워킹: 하향식 접근", author: "Kurose, Ross" },
  { id: 2002, title: "Operating Systems: Three Easy Pieces", author: "Remzi H. Arpaci-Dusseau" },
  { id: 2003, title: "Hands-On Machine Learning", author: "Aurélien Géron" },
  { id: 2004, title: "Deep Learning", author: "Goodfellow, Bengio, Courville" },
  { id: 2005, title: "웹 해킹 기술", author: "김홍기" },
  { id: 2006, title: "머신러닝 보안", author: "Clarence Chio, David Freeman" },
];

// ✅ 둘 다 없을 때 보여줄 추천(한 섹션)
export const fallbackRecommendedBooks: BookItem[] = [
  { id: 201, title: "모던 자바스크립트 Deep Dive", author: "이웅모" },
  { id: 202, title: "You Don't Know JS Yet", author: "Kyle Simpson" },
  { id: 203, title: "모던 자바스크립트 Deep Dive", author: "이웅모" },
  { id: 204, title: "You Don't Know JS Yet", author: "Kyle Simpson" },
  { id: 205, title: "모던 자바스크립트 Deep Dive", author: "이웅모" },
  { id: 206, title: "You Don't Know JS Yet", author: "Kyle Simpson" },
];
