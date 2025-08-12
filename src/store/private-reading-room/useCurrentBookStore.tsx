import { create } from 'zustand';

interface BookDataProps {
  roomId: number;
  userId: number;
  title: string;
}

interface CurrentUser {
  userId: number;
  roomId: number;
}

interface BookStore {
  Books: BookDataProps[];
  currentUser: CurrentUser | null;

  // 현재 사용자 설정
  setCurrentUser: (user: CurrentUser) => void;

  // 책 관련 액션들
  setBooks: (books: BookDataProps[]) => void;
  updateCurrentUserBook: (title: string) => void;
  removeBook: (userId: number) => void;
}

const useCurrentBookStore = create<BookStore>((set, get) => {
  return {
    Books: [],
    currentUser: null,

    setCurrentUser: (user) => set({ currentUser: user }),

    setBooks: (books) =>
      set(() => {
        const uniqueBooks = new Map<number, BookDataProps>();
        books.forEach((book) => {
          uniqueBooks.set(book.userId, book);
        });
        return { Books: Array.from(uniqueBooks.values()) };
      }),

    // 현재 사용자의 책만 업데이트
    updateCurrentUserBook: (title) =>
      set((state) => {
        const { currentUser } = state;
        if (!currentUser) return state;

        const existingIndex = state.Books.findIndex(
          (b) => b.userId === currentUser.userId,
        );

        if (existingIndex !== -1) {
          const updatedBooks = [...state.Books];
          updatedBooks[existingIndex] = {
            userId: currentUser.userId,
            roomId: currentUser.roomId,
            title,
          };
          return { Books: updatedBooks };
        } else {
          return {
            Books: [
              ...state.Books,
              {
                userId: currentUser.userId,
                roomId: currentUser.roomId,
                title,
              },
            ],
          };
        }
      }),

    removeBook: (userId) =>
      set((state) => ({
        Books: state.Books.filter((book) => book.userId !== userId),
      })),
  };
});

export default useCurrentBookStore;
