import { useEffect, useState } from 'react';
import FilterBar from '../library-items/list-items/FilterBar';
import tempBookData from '../../../../mock/library/bookData';
import BookItem from './list-items/book-list/BookItem';
import DeleteBtn from '../../../../components/delete-modal/DeleteModal';
import useGetBookState from '../../hooks/useQuery/library-query/useGetBookState';
import { useTabStore } from '../../../../store/library/useTabStore';
import useDeleteBook from '../../hooks/useMutation/library-mutation/useDeleteBook';
import { useDropDownStore } from '../../../../store/library/useDropDownStore';
import Pagination from './list-items/pagenation/Pagination';

interface ApiBookData {
  coverImageUrl: string;
  title: string;
  author: string;
  publisher: string;
  publicationDate: string;
  myRating: number;
  bookId: number;
  isbn13: string;
}

export const tabMapping: Record<string, 'READING' | 'FINISHED' | 'BOOKMARK'> = {
  '독서 중': 'READING',
  완독: 'FINISHED',
  찜: 'BOOKMARK',
};

export const menuMapping: Record<
  string,
  'RECENT' | 'LATEST' | 'TITLE' | 'RATING'
> = {
  제목순: 'TITLE',
  '최근 등록순': 'LATEST',
  '최근 기록순': 'RECENT',
  '내가 준 별점순': 'RATING',
};

const VerticalView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const currentTab = useTabStore((state) => state.selectedTab);
  const currentMenu = useDropDownStore((state) => state.selectMenu);
  const [currentPage, setCurrentPage] = useState(1);

  const convertTabToEnglish = (
    koreanTab: string,
  ): 'READING' | 'FINISHED' | 'BOOKMARK' => {
    return tabMapping[koreanTab] || 'BOOKMARK';
  };

  const convertMenuToEnglish = (
    koreanTab: string,
  ): 'RECENT' | 'LATEST' | 'TITLE' | 'RATING' => {
    return menuMapping[koreanTab] || 'RECENT';
  };

  const deleteBookMutation = useDeleteBook();

  const handleDelete = () => {
    if (selectedBookId) {
      deleteBookMutation.mutate({ bookId: selectedBookId });
      setIsModalOpen(false);
      setSelectedBookId(null);
    }
  };

  const modalHandler = (bookId?: number) => {
    if (bookId) {
      setSelectedBookId(bookId);
    }
    setIsModalOpen((prev) => !prev);
  };

  const { data, isLoading, isError, error, isSuccess, refetch } =
    useGetBookState({
      status: convertTabToEnglish(currentTab),
      size: 8,
      sort: convertMenuToEnglish(currentMenu),
      page: currentPage - 1,
    });

  const booksData: ApiBookData[] = data?.content || [];
  const hasNext = data?.hasNext || false;

  return (
    <div className="w-full">
      {isModalOpen && (
        <DeleteBtn
          onDelete={handleDelete}
          closeModal={modalHandler}
          usage="library"
        />
      )}
      <FilterBar />
      <div className="flex flex-col">
        {booksData.map((book: ApiBookData) => (
          <BookItem
            key={book.bookId}
            {...book}
            openModal={() => modalHandler(book.bookId)}
            useOnLibrary={true}
            useOnSearch={false}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalView;
