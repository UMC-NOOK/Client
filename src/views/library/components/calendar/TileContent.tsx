import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookStore } from '../../../../store/library/useBookStore';
import type {
  BookData,
  BookProps,
} from '../../../../store/library/useBookStore';

interface TileContentProps {
  date: Date;
  view: string;
}

const TileContent = ({ date, view }: TileContentProps) => {
  const navigate = useNavigate();
  const books = useBookStore((state) => state.books);

  const booksByDate = useMemo(() => {
    const groupedBooks: { [key: string]: BookProps[] } = {};
    books.forEach((bookData: BookData) => {
      const [year, month, day] = bookData.date;
      const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      groupedBooks[dateString] = bookData.books;
    });

    return groupedBooks;
  }, [books]);

  const handleBookClick = (bookId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/library/${bookId}`);
  };

  if (view === 'month') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    const booksOnThisDate = booksByDate[dateString];

    if (booksOnThisDate && booksOnThisDate.length > 0) {
      return (
        <div className="absolute inset-3 flex justify-center items-center py-2 px-1 overflow-hidden">
          <img
            src={booksOnThisDate[0].thumbnailUrl}
            alt={booksOnThisDate[0].title || '책 제목 없음'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={(e) => handleBookClick(booksOnThisDate[0].bookId, e)}
          />
          {booksOnThisDate.length > 1 && (
            <span
              style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                fontSize: '0.7em',
                padding: '2px 4px',
                borderRadius: '3px',
                zIndex: 1,
                cursor: 'pointer',
              }}
              onClick={(e) => handleBookClick(booksOnThisDate[0].bookId, e)}
            >
              +{booksOnThisDate.length - 1}
            </span>
          )}
        </div>
      );
    }
  }

  return null;
};

export default TileContent;
