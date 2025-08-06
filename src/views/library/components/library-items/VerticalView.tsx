import { useState } from 'react';
import FilterBar from '../library-items/list-items/FilterBar';
import tempBookData from '../../../../mock/library/bookData';
import BookItem from './list-items/book-list/BookItem';
import DeleteBtn from '../../../../components/delete-modal/DeleteModal';
import useGetBookState from '../../hooks/useQuery/library-query/useGetBookState';
import { useTabStore } from '../../../../store/library/useTabStore';
import useDeleteBook from '../../hooks/useMutation/library-mutation/useDeleteBook';
import { useDropDownStore } from '../../../../store/library/useDropDownStore';

export const tabMapping: Record<string, 'READING' | 'FINISHED' | 'BOOKMARK'> = {
  독서중: 'READING',
  완독: 'FINISHED',
  찜: 'BOOKMARK',
};

export const menuMapping: Record<
  string,
  'recent' | 'latest' | 'title' | 'rating'
> = {
  제목순: 'title',
  '최근 등록순': 'latest',
  '최근 기록순': 'recent',
  '내가 준 별점순': 'rating',
};

const VerticalView = () => {
  const [bookData, setBookData] = useState(tempBookData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentTab = useTabStore((state) => state.selectedTab);
  const currentMenu = useDropDownStore((state) => state.selectMenu);

  const convertTabToEnglish = (
    koreanTab: string,
  ): 'READING' | 'FINISHED' | 'BOOKMARK' => {
    return tabMapping[koreanTab] || 'BOOKMARK';
  };

  const convertMenuToEnglish = (
    koreanTab: string,
  ): 'recent' | 'latest' | 'title' | 'rating' => {
    return menuMapping[koreanTab] || 'recent';
  };

  const deleteBook = useDeleteBook();

  const handleDelete = () => {
    // deleteBook.mutate(bookId);
    setIsModalOpen(false);
  };

  const modalHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  const { data, isLoading, isError, error, isSuccess, refetch } =
    useGetBookState({
      status: convertTabToEnglish(currentTab),
      size: 10,
      sort: convertMenuToEnglish(currentMenu),
    });

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
        {bookData.map((data, idx) => (
          <BookItem
            key={idx}
            {...data}
            openModal={modalHandler}
            useOnLibrary={true}
            useOnSearch={false}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalView;
