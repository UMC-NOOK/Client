import mockBookCover from "../../assets/search/mock_bookcover.svg";

export const mainMyPageRecentBookList = Array.from(
  { length: 5 },
  (_, index) => ({
    id: index + 1,
    imageUrl: mockBookCover,
    title: `최근 열람 도서 ${index + 1}`,
    author: "작가명",
  }),
);
