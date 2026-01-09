import { create } from 'zustand';

type Book = {
  img: string;
  bookName: string;
  author: string;
  publisher: string;
};

type BookStore = {
  books: Book[];
  isLoading: boolean;
  setBooks: (books: Book[]) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  isLoading: false,
  setBooks: (books) => set({ books }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
