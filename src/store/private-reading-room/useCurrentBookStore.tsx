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

// allCurrentBooks용 타입 (roomId 없음)
interface AllCurrentBookItem {
  userId: number;
  title: string;
}

// 다양한 데이터 구조를 처리하기 위한 타입 정의
interface AllCurrentBooksData {
  books?: (BookDataProps | AllCurrentBookItem)[];
  entries?: (BookDataProps | AllCurrentBookItem)[];
  [key: string]: any;
}

// 타입 가드 함수들
const isValidBook = (book: any): book is BookDataProps => {
  return (
    book && typeof book.userId === 'number' && typeof book.title === 'string'
  );
};

// allCurrentBooks 전용 타입 가드 (roomId 없어도 OK)
const isValidAllCurrentBook = (book: any): book is AllCurrentBookItem => {
  return (
    book && typeof book.userId === 'number' && typeof book.title === 'string'
  );
};

interface BookStore {
  Books: BookDataProps[];
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser) => void;
  setBooks: (books: BookDataProps[] | AllCurrentBooksData | any) => void;
  updateCurrentUserBook: (title: string) => void;
  removeBook: (userId: number) => void;
}

const useCurrentBookStore = create<BookStore>((set, get) => {
  return {
    Books: [],
    currentUser: null,

    setCurrentUser: (user) => set({ currentUser: user }),

    setBooks: (data: BookDataProps[] | AllCurrentBooksData | any) =>
      set(() => {
        console.log('setBooks 호출됨, 받은 데이터:', data);

        let booksArray: BookDataProps[] = [];

        // 데이터 타입에 따른 변환 처리
        if (Array.isArray(data)) {
          // 배열 형태 처리
          booksArray = data
            .map((item: any) => {
              if (isValidBook(item)) {
                return item; // 이미 완전한 BookDataProps
              } else if (isValidAllCurrentBook(item)) {
                // roomId가 없는 경우 기본값 설정
                return {
                  roomId: 0, // 기본값
                  userId: item.userId,
                  title: item.title,
                } as BookDataProps;
              }
              return null;
            })
            .filter((book): book is BookDataProps => book !== null);
        } else if (data && typeof data === 'object') {
          // 객체 형태 처리
          let sourceArray: any[] = [];

          if (data.books && Array.isArray(data.books)) {
            sourceArray = data.books;
          } else if (data.entries && Array.isArray(data.entries)) {
            sourceArray = data.entries;
          } else if (isValidAllCurrentBook(data)) {
            sourceArray = [data];
          }

          booksArray = sourceArray
            .map((item: any) => {
              if (isValidBook(item)) {
                return item;
              } else if (isValidAllCurrentBook(item)) {
                return {
                  roomId: 0,
                  userId: item.userId,
                  title: item.title,
                } as BookDataProps;
              }
              return null;
            })
            .filter((book): book is BookDataProps => book !== null);
        }

        // console.log('변환된 books 배열:', booksArray);

        // 중복 제거
        const uniqueBooks = new Map<number, BookDataProps>();
        booksArray.forEach((book: BookDataProps) => {
          uniqueBooks.set(book.userId, {
            roomId: book.roomId,
            userId: book.userId,
            title: book.title,
          });
        });

        const finalBooks = Array.from(uniqueBooks.values());
        // console.log('최종 Books 배열:', finalBooks);

        return { Books: finalBooks };
      }),

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
