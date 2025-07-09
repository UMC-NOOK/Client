import React from 'react';
import BookListSection from './BookListSection';

const RecommendLayout = () => {
    return (
        <div className='flex flex-col items-start justify-center w-full'>
            <div className='flex flex-col items-start justify-center w-full mt-10 text-white font-pretendard'>
                <div className='text-base'>
                    지금 서재에 등록하세요!
                </div>
                <div className='text-lg font-semibold mt-1'>
                    놓치기 아쉬운 주간 베스트 셀러
                </div>
                <div className='flex items-center justify-center mt-10'>
                    <BookListSection />
                </div>
            </div>
        </div>
    );
};

export default RecommendLayout;
