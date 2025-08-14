import React, { useEffect, useMemo, useState } from 'react';
import RecommendView from './RecommendView';
import BookListSection from './BookListSection';
import { categoryToMallType } from '../../features/constants';
import useGetLoungeBook from '../../hooks/useQuery/useGetLoungeBook';
import { LoungeSection, MallType } from '../../apis/lounge/types/lounge-types';
import { renderCategoryName } from '../../utils/formatCategory';

const CategorySectionView = ({ selectedCategory }: { selectedCategory: string }) => {
  const mallType: MallType = categoryToMallType(selectedCategory);

  // mallType별 섹션 세트 로드
  const { data } = useGetLoungeBook({ mallType });

  // 추천 탭에서 사용할 전체 섹션 배열
  const sections = data?.sections ?? [];

  // 일반 탭(국내/외국/eBook)용: new/best 분리되어 온다고 가정하되, 방어적으로 처리
  const newSectionsRaw = (data)?.newSections ?? null;
  const newSection: LoungeSection | null = useMemo(() => {
    if (!newSectionsRaw) return null;
    return Array.isArray(newSectionsRaw) ? (newSectionsRaw[0] ?? null) : newSectionsRaw;
  }, [newSectionsRaw]);

  const bestSections: LoungeSection[] = (data)?.bestSections ?? [];

  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (selectedCategory === '국내도서') setSelected('국내');
    else if (selectedCategory === '외국도서') setSelected('외국');
    else if (selectedCategory === 'eBook') setSelected('eBook');
    else setSelected('');
  }, [selectedCategory]);

  if (mallType === 'RECOMMENDATION') {
    return <RecommendView mallType={mallType} sections={sections} />;
  }

  return (
    <div className="flex flex-col items-start justify-center w-full">
      <div className='text-white'>
        <div className="mt-[26px] w-[960px] border-t border-[#555351]/70" />

        <div className="text-lg mt-[26px]">{selected}</div>
        <div className="mt-[5px] text-[22px] font-semibold">따끈따끈 신간 도서를 만나보세요!</div>
        <div className="flex items-center justify-center mt-[36px]">
          {newSection && <BookListSection mallType={mallType} section={newSection} />}
        </div>
      </div>

      <div className="flex flex-col items-start justify-center w-full mt-[50px] text-white">
        <div className="flex items-center w-full">
          <span className="flex text-[22px] font-bold py-5 whitespace-nowrap mr-4">분야별 베스트셀러 Top 10</span>
          <div className="flex-1" style={{ borderTop: '1px solid rgba(85, 83, 81, 0.7)' }} />
        </div>

        <div className="flex flex-col w-full">
          {(bestSections ?? []).map((sec: LoungeSection, index: number) => (
            <div key={`${sec.sectionId}-${sec.categoryName}-${index}`} className="text-white">
              <div className="mt-[40px]">
                <span className="text-lg">| {selected} · </span>
                <span className='text-lg'>
                  {renderCategoryName(sec?.categoryName, {
                                pipeClass: "text-base font-semibold text-[rgba(255,255,255,0.5)]",
                              })}
                </span> 
              </div>

              <div className="flex items-center justify-center mt-[24px] mb-[70px]">
                <BookListSection mallType={mallType} section={sec} />
              </div>

              {index !== bestSections.length - 1 && (
                <div className="flex-1" style={{ borderTop: '1px solid rgba(85, 83, 81, 0.7)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySectionView;
