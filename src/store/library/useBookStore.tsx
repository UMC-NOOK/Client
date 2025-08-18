import { create } from 'zustand';

export type BookInfo = {
  author: string;
  bookId: number;
  thumbnailUrl: string;
  title: string;
};

export type BookData = {
  date: number[];
  bookInfo: BookInfo;
};

interface BookStoreProps {
  books: BookData[];
  setBooks: (data: BookData[]) => void;
}

export const useBookStore = create<BookStoreProps>((set) => ({
  books: [],
  setBooks: (data: BookData[]) => {
    set({ books: data });
  },
}));
