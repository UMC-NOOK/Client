import React from 'react';
import Tap from '../../../components/lounge/TapFilter';
import Search from '../../../components/lounge/Search';

const Lounge = () => {
  return (
    <div className='flex justify-center bg-black mt-29'>
      <div className='flex justify-evenly items-center space-x-200'>
        <Tap/>
        <Search/>
      </div>
    </div>
  );
};

export default Lounge;
