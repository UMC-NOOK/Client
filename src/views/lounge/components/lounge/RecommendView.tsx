import React from 'react';
import BookListSection from './BookListSection';
import { LoungeSection } from '../../apis/lounge/types/lounge-types';

const RecommendView = ({sections}: { sections: LoungeSection[];}) => {

  console.log(sections);
  const bestSections = sections.find((section) => section.sectionId === 'best');
  const favoriteSections = sections.find((section) => section.sectionId === 'favorite');

  return (
    <div className="flex flex-col items-start justify-center w-full">
      <div
        className="flex flex-col items-start justify-center w-full mt-10 mb-10 text-white"
        style={{ borderTop: '1px solid rgba(85, 83, 81, 0.7)' }}
      >
        <div className="text-base mt-10">지금 서재에 등록하세요!</div>
        <div className="text-lg font-semibold mt-1">
          놓치기 아쉬운 주간 베스트 셀러
        </div>
        <div className="flex items-center justify-center mt-10">
            {bestSections && <BookListSection section={bestSections} />}
        </div>
      </div>

      <div
        className="flex flex-col items-start justify-center w-full mt-15 text-white"
        style={{ borderTop: '1px solid rgba(85, 83, 81, 0.7)' }}
      >
        <div className="mt-20">
          <span className="text-base">경민 님이 좋아하는 </span>
          <span className="text-lg font-semibold">소설 | 시 | 희곡</span>
          <span>을 추천해요.</span>
        </div>
        <div className="flex items-center justify-center mt-10">
          {favoriteSections &&<BookListSection section={favoriteSections}/>}
        </div>
      </div>
    </div>
  );
};

export default RecommendView;
