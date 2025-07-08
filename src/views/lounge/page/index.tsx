import React, { useEffect, useState } from 'react';
import Tap from '../../../components/lounge/TapFilter';
import Search from '../../../components/lounge/Search';

const Lounge = () => {
  const [selectedCategory, setSelectedCategory] = useState('RECOMMENDATION');

  useEffect(() => {
    //카테고리 별 API 요청
    //fetch(`/api/lounge?mallType${selectedCategory}`)
    //.then((res)=> res.json())
    //.then((data) => setBooks(data))
    //.catch((error) => console.error(err)))
  },[selectedCategory])

  return (
    <div className='flex justify-center bg-black mt-25'>
      <div className='flex w-full justify-evenly items-center'>
        <Tap selected={selectedCategory} onSelect={setSelectedCategory}/>
        <Search/>
      </div>
    </div>
  );
};

export default Lounge;
