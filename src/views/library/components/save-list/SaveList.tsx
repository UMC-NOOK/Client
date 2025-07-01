import React, { useState } from 'react';
import leftButton from '../../../../assets/button/library/chevron-left.png';
import SaveListItem from './SaveListItem';

const SaveList = () => {
  const [bookData, setBookData] = useState([
    {
      img: 'https://image.bugsm.co.kr/album/images/500/40752/4075248.jpg',
      bookName: '누크누크누크',
      author: '누키',
    },
    {
      img: 'https://image.bugsm.co.kr/album/images/500/40752/4075248.jpg',
      bookName: '누크누크누크',
      author: '누키',
    },
    {
      img: 'https://image.bugsm.co.kr/album/images/500/40752/4075248.jpg',
      bookName: '누크누크누크',
      author: '누키',
    },
    {
      img: 'https://image.bugsm.co.kr/album/images/500/40752/4075248.jpg',
      bookName: '누크누크누크',
      author: '누키',
    },
  ]);

  const displayData = bookData.slice(0, 3);
  const remainingCount = bookData.length - 3;

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl text-nook-100">찜</span>
        <button className="w-10 h-10 flex items-center justify-center translate-y-[2px]">
          <img
            src={leftButton}
            alt="왼쪽버튼"
            className="w-full h-full object-contain"
          />
        </button>
      </div>
      <p className="text-sm text-nook-100 font-light mt-5">
        내가 찜한 책을 확인해보세요
      </p>
      <div>
        {displayData.map((data) => (
          <SaveListItem {...data} />
        ))}
        {bookData.length > 3 && (
          <div className="text-center py-4 text-[rgba(66,60,53,1)] text-9xl">
            ⋮
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveList;
