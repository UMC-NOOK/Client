import React from 'react';
import Tap from '../../../components/lounge/TapFilter';
import Search from '../../../components/lounge/Search';

const Lounge = () => {
  return (
    <div className='flex justify-center bg-black mt-25'>
      <div className='flex w-full justify-evenly items-center'>
        <Tap/>
        <Search/>
      </div>
    </div>
  );
};

export default Lounge;
