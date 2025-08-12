import React, { useEffect, useState } from 'react';
import RecommendView from './RecommendView';
import BookListSection from './BookListSection';
import { categoryToMallType } from '../../features/constants';
import useGetLoungeBook from '../../hooks/useQuery/useGetLoungeBook';
import { LoungeSection } from '../../apis/lounge/types/lounge-types';

const CategorySectionView = ({selectedCategory}: { selectedCategory: string;}) => {
  const mallType = categoryToMallType(selectedCategory);

  const { data } = useGetLoungeBook({mallType});

  //Sections 별로 데이터 가져오기
  const sections = data?.sections ?? []; //recommend
  const newSections = data?.newSections ?? [];
  const bestSections = data?.bestSections;


  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (selectedCategory === '국내도서') {
      setSelected('국내');
    } else if (selectedCategory === '외국도서') {
      setSelected('외국');
    } else if (selectedCategory === 'eBook') {
      setSelected('eBook');
    }
  }, [selectedCategory]);

  
  
  if (mallType === 'RECOMMENDATION') {
    return <RecommendView sections={sections?? []}/>;
  }
  
  return (
    <div className="flex flex-col items-start justify-center w-full mt-10">
        <div
          className="flex flex-col items-start justify-center w-full mt-1 mb-10 text-white"
          style={{ borderTop: '1px solid rgba(85, 83, 81, 0.7)' }}
        >
          <div className="text-base mt-10">{selected}</div>
            <div className="text-lg font-semibold mt-1">
              따끈따끈 신간 도서를 만나보세요!
            </div>
            <div className="flex items-center justify-center mt-10">
              <BookListSection section={newSections}/>
            </div>
          </div>

      <div className="flex flex-col items-start justify-center w-full mt-15 text-white">
        <div className="flex items-center w-full">
          <span className="flex text-lg font-bold whitespace-nowrap mr-4">
            분야별 베스트셀러 Top 10
          </span>
          <div
            className="flex-1"
            style={{ borderTop: '1px solid rgba(85, 83, 81, 0.7)' }}
          />
        </div>
        <div className="flex flex-col w-full">
          {bestSections.map((sec:LoungeSection, index:number) => (
            <div key={`${sec.sectionId}-${sec.categoryName}-${index}`} className='text-white'>
              <div className='mt-20'>
                <span className='text-lg'>| {selected} · {sec.categoryName}</span>
              </div>
              <div className='flex items-center justify-center mt-10 mb-30'>
                <BookListSection section={sec}/>
              </div>

              {index !== bestSections.length - 1 && (
                <div
                  className="flex-1"
                  style={{ borderTop: '1px solid rgba(85, 83, 81, 0.7)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySectionView;
