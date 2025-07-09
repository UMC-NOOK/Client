import React, { useEffect, useState } from 'react';
import Tap from '../../components/lounge/TapFilter';
import Search from '../../components/lounge/Search';
import RecommendView from '../../components/lounge/RecommendView';
import CategorySectionView from '../../components/lounge/CategorySectionView';

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
          <Search/>
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
