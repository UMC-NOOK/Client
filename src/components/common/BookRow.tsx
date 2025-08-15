// src/components/common/BookRow.tsx

import { useState } from 'react';
import saveIcon from '../../assets/button/search/save.png';
import infoIcon from '../../assets/button/search/info.png';
import dotIcon from '../../assets/button/search/Ellipse.png';

interface BookRowProps {
  book: {
    img: string;
    bookName: string;
    category: string;
    author: string;
    publisher: string;
    publication_date: string;
    bookId: number; // ← 이미 요구됨
  };
  onClickInfo: () => void;
  onClickAdd: () => void;   // ← 부모에서 모달 열기
}

export default function BookRow({ book, onClickInfo, onClickAdd }: BookRowProps) {
  return (
    <div className="w-full max-w-[1040px] mx-auto">
      <div className="relative flex justify-between items-center w-full h-[173px] rounded-md mb-4">
        <div className="flex items-center gap-[8px]">
          <img
            src={book.img}
            alt={book.bookName}
            className="object-cover rounded"
            style={{ width: '111px', height: '170.2px', borderRadius: '7.2px' }}
          />
          <div className="text-white leading-[17px]">
            <p className="text-[18px]">[{book.category}] {book.bookName}</p>
            <p className="text-white text-[14px] my-[17px]">{book.author}</p>
            <p className="text-white text-[14px]">
              {book.publisher}
              <img src={dotIcon} alt="dot" className="inline-block" style={{ width: '1px', height: '1px', margin: '6px' }} />
              {new Date(book.publication_date).getFullYear()}년
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 right-6 flex flex-col gap-[8px] shrink-0">
          <button
            type="button"                   // ← 폼 제출 방지
            onClick={onClickInfo}           // ← 부모 핸들러 사용
            className="flex justify-center items-center gap-[8px] text-white w-[121px] h-[40px] px-[20px] py-[8px] rounded-[8px] border border-[#555351] bg-transparent text-[15.4px] font-normal leading-[25px]"
          >
            <img src={infoIcon} alt="책 정보" className="w-[12.74px] h-[18.31px] shrink-0" />
            책 정보
          </button>

          <button
            type="button"                   // ← 폼 제출 방지
            onClick={onClickAdd}            // ← 부모에서 등록 모달 열기
            className="flex justify-center items-center gap-[8px] text-white w-[121px] h-[40px] px-[20px] py-[8px] rounded-[8px] border border-[#555351] bg-[#2D2B29] text-[15.4px] font-normal leading-[25px]"
          >
            <img src={saveIcon} alt="서재 등록" className="w-[13.56px] h-[10.34px] shrink-0" />
            서재 등록
          </button>
        </div>
      </div>

      <div className="w-full border-t border-[rgba(85,83,81,0.7)] my-[20px]" />
    </div>
  );
}
