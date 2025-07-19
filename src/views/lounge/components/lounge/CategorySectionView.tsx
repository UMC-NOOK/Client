import React, { useEffect, useState } from 'react';
import RecommendView from './RecommendView';
import BookListSection from './BookListSection';

type Category = {
  title: string;
};

const CategorySectionView = ({
  selectedCategory,
}: {
  selectedCategory: string;
}) => {
  const [selected, setSelected] = useState('');

  const bestDomesticCategories = [
    { title: '국내 · 경제경영' },
    { title: '국내 · 소설 | 시 | 희곡' },
    { title: '국내 · 인문학' },
    { title: '국내 · 자기계발' },
  ];

  const bestForeignCategories = [
    { title: '외국 · 경제경영' },
    { title: '외국 · 에세이' },
    { title: '외국 · 인문 | 사회' },
    { title: '외국 · 문학' },
  ];

  const bestEbookCategories = [
    { title: 'eBook · 과학' },
    { title: 'eBook · 만화' },
    { title: 'eBook · 소설 | 시 | 희곡' },
    { title: 'eBook · 판타지 | 무협' },
  ];

  useEffect(() => {
    if (selectedCategory === '국내도서') {
      setSelected('국내');
    } else if (selectedCategory === '외국도서') {
      setSelected('외국');
    } else if (selectedCategory === 'eBook') {
      setSelected('eBook');
    }
  }, [selectedCategory]);

  let bestCategories: Category[] = [];

  if (selected === '국내') {
    bestCategories = bestDomesticCategories;
  } else if (selected === '외국') {
    bestCategories = bestForeignCategories;
  } else if (selected === 'eBook') {
    bestCategories = bestEbookCategories;
  }

  if (selectedCategory === '추천') {
    return <RecommendView />;
  }

    return (
        <div className='flex flex-col items-start justify-center w-full mt-9'>
            <div className='flex flex-col items-start justify-center w-full mt-1 mb-10 text-white font-pretendard'
                style={{ borderTop: "1px solid rgba(85, 83, 81, 0.7)" }}>
                <div className='text-base mt-10'>
                    {selected}
                </div>
                <div className='text-lg font-semibold mt-1'>
                    따끈따끈 신간 도서를 만나보세요!
                </div>
                <div className='flex items-center justify-center mt-10'>
                    <BookListSection />
                </div>
            </div>

      <div className="flex flex-col items-start justify-center w-full mt-15 text-white font-pretendard">
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
          {bestCategories.map((cat, index) => (
            <div key={index} className="text-white font-pretendard">
              <div className="mt-20">
                <span className="text-base">| {cat.title}</span>
              </div>
              <div className="flex items-center justify-center mt-10 mb-30">
                <BookListSection />
              </div>

              {index !== bestCategories.length - 1 && (
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
