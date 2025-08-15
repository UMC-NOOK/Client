import { create } from 'zustand';

export type BookProps = {
  bookId: number;
  thumbnailUrl: string;
  title: string | null;
};

export type BookData = {
  date: [number, number, number];
  books: BookProps[];
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
