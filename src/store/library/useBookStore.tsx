import { create } from 'zustand';

export type DataProps = {
  bookId: number;
  thumbnailUrl: string;
};

export type Book = {
  date: string;
  books: DataProps[];
};

interface BookStoreProps {
  booksData: Book[];
  setBooksData: (data: Book[]) => void;
}

export const useBookStore = create<BookStoreProps>((set) => ({
  booksData: [],
  setBooksData: (data: Book[]) => {
    set({ booksData: data });
  },
}));
