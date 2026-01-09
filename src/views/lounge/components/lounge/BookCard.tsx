import React from 'react';
import { LoungeBook } from '../../apis/lounge/types/lounge-types';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }: { book: LoungeBook }) => {
    const navigate = useNavigate();
    const isbn = book.isbn13;

    if (!book) {
        return (
            <div className="flex justify-center items-center text-[#B8AFA5] text-sm w-[141px] h-[260px]">
                관련 도서가 없습니다.
            </div>
        );
    }

    return (
        <div className="flex flex-col w-[141px]"
        onClick={() => navigate(`book-info/${isbn}`)}>
            <div className="flex justify-center items-center">
                <img
                    src={book.coverImageUrl}
                    alt={book.title}
                    className="bg-[#B8AFA5] w-[141px] h-[207.099px] object-cover rounded-[7px]"
                />
            </div>

            <div 
                className="text-white mt-[6px]">
                <div className="h-10 text-[16px] font-semibold w-[141px] truncate">
                    {book.title}
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[6px] w-[141px] text-xs mt-[6px]">
                    <span className="min-w-0 truncate">{book.author}</span>

                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none" className="shrink-0">
                        <circle cx="1" cy="1" r="1" fill="white" />
                    </svg>

                    <span className="min-w-0 truncate">{book.publisher}</span>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
