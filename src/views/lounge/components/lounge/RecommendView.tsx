import React, { useMemo } from 'react';
import BookListSection from './BookListSection';
import { LoungeSection, MallType } from '../../apis/lounge/types/lounge-types';
import { renderCategoryName } from '../../utils/formatCategory';
import { useGetMe } from '../../../home/hooks/useQuery/useGetMe';

const RecommendView = ({ mallType, sections }: { mallType: MallType; sections: LoungeSection[] }) => {
  const { data: me } = useGetMe();
  const name = useMemo(() => (me?.nickname?.trim?.() || '회원'), [me?.nickname]);

  const bestSection = useMemo(
    () => sections.find((section) => section.sectionId === 'best') || null,
    [sections]
  );
  const favoriteSection = useMemo(
    () => sections.find((section) => section.sectionId === 'favorite_best') || null,
    [sections]
  );

  return (
    <div className="w-full">
      <div className="px-[240px] text-white">
        <div>
          <div className="mt-[26px] w-[960px] border-t border-[#555351]/70" />

          <h3 className="mt-[26px] text-[18px] font-normal">지금 서재에 등록하세요!</h3>
          <h2 className="text-[22px] font-semibold gap-[5px]">놓치기 아쉬운 주간 베스트셀러</h2>

          <div className="mt-[36px]">
            {bestSection && <BookListSection mallType={mallType} section={bestSection} />}
          </div>
        </div>

        <div>
          <div className="mt-[63px] w-[960px] border-t border-[#555351]/70" />

          <div className="mt-[26px]">
            <span className="text-[18px] font-normal">{me?.nickname}님이 좋아하는 </span>
            <span className="text-[22px] font-semibold">
              {renderCategoryName(favoriteSection?.categoryName, {
                pipeClass: 'text-[22px] font-semibold',
              })}
            </span>
            <span className="text-[18px] font-normal">을 추천해요.</span>
          </div>

          <div className="mt-[36px] mb-[144px]">
            {favoriteSection && <BookListSection mallType={mallType} section={favoriteSection} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendView;

