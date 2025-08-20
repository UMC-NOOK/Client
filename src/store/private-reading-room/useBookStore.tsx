import { create } from 'zustand';

interface BookStoreProps {
  bookId: number | null;
  setBooks: (data: number) => void;
}

export const useBookStore = create<BookStoreProps>((set) => ({
  bookId: null,
  setBooks: (data: number) => {
    set({ bookId: data });
  },
}));
