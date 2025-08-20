import React from 'react';
import useCurrentBookStore from '../../../../../../store/private-reading-room/useCurrentBookStore';
import clsx from 'clsx';
import { useBookStore } from '../../../../../../store/private-reading-room/useBookStore';

// interface BookPanelActionProps {
//   onChoose: (bookId: string) => void;
// }

interface BookItemProps {
  bookId: number;
  title: string;
  shouldShowScrollbar: boolean;
  onClick: (title: string) => void;
  onBookClick: () => void;
}

function BookItem({
  bookId,
  title,
  shouldShowScrollbar,
  onClick,
  onBookClick,
}: BookItemProps) {
  const updateCurrentUserBook = useCurrentBookStore(
    (state) => state.updateCurrentUserBook,
  );

  // const setBookId = useBookStore((state) => state.setBooks);
  // const currentBookId = useBookStore((state) => state.bookId);

  const handleClick = (bookId: number) => {
    updateCurrentUserBook(title);
    onClick?.(title);
    onBookClick();
  };

  // console.log('zzzzzzz', currentBookId);

  return (
    <div
      className={clsx(
        'w-127 flex items-center px-7 h-20 rounded-[8px] bg-[rgba(66,60,53,1)] flex-shrink-0 cursor-pointer',
        !shouldShowScrollbar && 'w-full',
      )}
      onClick={() => handleClick(bookId)}
    >
      <span className="font-normal text-sm text-nook-100 line-clamp-1">
        {title}
      </span>
    </div>
  );
}

export default BookItem;
