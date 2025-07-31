// components/home/BookStatusBox.tsx
import React from 'react';
import RegisteredBooksCalendarBox from './RegisteredBooksCalendarBox';
import NoRegisteredBooksBox from './NoRegisteredBooksBox';

interface BookStatusBoxProps {
  hasRegisteredBooks: boolean;
}

const BookStatusBox = ({ hasRegisteredBooks }: BookStatusBoxProps) => {
  return hasRegisteredBooks ? <RegisteredBooksCalendarBox /> : <NoRegisteredBooksBox />;
};

export default BookStatusBox;
