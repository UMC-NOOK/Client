import { useMemo } from 'react';
import tempBookData from '../../../../mock/library/bookData';

interface TileContentProps {
  date: Date;
  view: string;
}

const TileContent = ({ date, view }: TileContentProps) => {
  const booksByDate = useMemo(() => {
    const groupedBooks: { [key: string]: (typeof tempBookData)[0][] } = {};
    tempBookData.forEach((book) => {
      const date = book.publication_date;
      if (!groupedBooks[date]) {
        groupedBooks[date] = [];
      }
      groupedBooks[date].push(book);
    });
    return groupedBooks;
  }, []);

  if (view === 'month') {
    const dateString = date.toISOString().split('T')[0];
    const booksOnThisDate = booksByDate[dateString];

    if (booksOnThisDate && booksOnThisDate.length > 0) {
      return (
        <div className="absolute inset-3 flex justify-center items-center py-2 px-1 overflow-hidden">
          <img
            src={booksOnThisDate[0].img}
            alt={booksOnThisDate[0].bookName}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '5px',
            }}
          />
          {/* {booksOnThisDate.length > 1 && (
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
              }}
            >
              +{booksOnThisDate.length - 1}
            </span>
          )} */}
        </div>
      );
    }
  }
  return null;
};

export default TileContent;
