import React, { useEffect, useState } from 'react';
import Tap from '../../components/lounge/TapFilter';
import Search from '../../components/lounge/Search';
import CategorySectionView from '../../components/lounge/CategorySectionView';
import SearchBar from '../../../../components/search/SearchBar';

const Lounge = () => {
  const [selectedCategory, setSelectedCategory] = useState('추천');

  useEffect(() => {
    //카테고리 별 API 요청
    //fetch(`/api/lounge?mallType${selectedCategory}`)
    //.then((res)=> res.json())
    //.then((data) => setBooks(data))
    //.catch((error) => console.error(err)))
  },[selectedCategory])

  return (
    <div>
      <div className='flex justify-center bg-black mt-25 flex-col'>
        <div className='flex w-full justify-evenly items-center'>
          <Tap selected={selectedCategory} onSelect={setSelectedCategory}/>
          <SearchBar
            customWidth="340px"
            containerClassName="h-[36px] border border-[rgba(183,227,230,0.3)] bg-[#1F1C19] rounded-[42px] flex-shrink-0"
            inputClassName="text-white text-[12px] font-normal leading-[25px] font-pretendard"
            placeholderClassName="placeholder:text-[rgba(184,175,165,0.5)] placeholder:text-[12px] placeholder:leading-[25px] placeholder:font-normal placeholder:font-pretendard"
            iconClassName="w-[12.375px] h-[12.376px]"
          />
        </div>
        <div className='flex w-full justify-center items-center mb-10 '>
          <div className='flex justify-evenly items-center'>
            <CategorySectionView selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lounge;
