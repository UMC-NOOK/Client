// src/components/search/mock/books.ts
export type Book = {
  id: string;
  title: string;
  author: string;
};

export const recommendedBooks: Book[] = [
  { id: "rec-1", title: "혼모노", author: "성해나" },
  { id: "rec-2", title: "괴테는 모든 것을 말했다", author: "스즈키 유이" },
  { id: "rec-3", title: "흔한남매 21", author: "흔한남매" },
  { id: "rec-4", title: "안녕이라", author: "김애란" },
];

export const bestBooks: Book[] = [
  { id: "best-1", title: "어스탐 경의 임사전언", author: "" },
  { id: "best-2", title: "처음 만나는 양자의 세계", author: "" },
  { id: "best-3", title: "트렌드 코리아 2026", author: "" },
  { id: "best-4", title: "나는 매일 아침마다", author: "" },
  { id: "best-5", title: "2026 하루 3줄 감사일기", author: "" },
  { id: "best-6", title: "평균의 종말", author: "" },
  { id: "best-7", title: "달러구트 꿈 백화점", author: "" },
  { id: "best-8", title: "뇌과학자의 인생 실험", author: "" },
  { id: "best-9", title: "유행의 시간", author: "" },
  { id: "best-10", title: "모두를 위한 경제학", author: "" },
];

export type BookItem = {
  id: number;
  title: string;
  author: string;
};

// src/components/search/mock.ts
export const focusedBooks = [] = [];
export const unreadBooks = [] = [];

//export const focusedBooks = []; 엠티뷰 테스트용 
//export const unreadBooks = []; 엠티뷰 테스트용 


// 둘 다 없을 때 보여줄 "이 책을 추천해요" (한 배열)
export const fallbackRecommendedBooks: BookItem[] = [
  { id: 201, title: "모던 자바스크립트 Deep Dive", author: "이웅모" },
  { id: 202, title: "You Don't Know JS Yet", author: "Kyle Simpson" },
  { id: 201, title: "이 책을 읽어보실래요?", author: "이웅모" },
  { id: 202, title: "안녕 누키", author: "Kyle Simpson" },
  { id: 201, title: "모던 자바스크립트 Deep Dive", author: "이웅모" },
  { id: 202, title: "You Don't Know JS Yet", author: "Kyle Simpson" },
  
];
