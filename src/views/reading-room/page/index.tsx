import React from 'react';

import MyReadingRoomCardList from '../components/MyReadingRoomCardList';

const ReadingRoom = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex items-center justify-center'>
        <MyReadingRoomCardList/>
      </div>
    </div>
  );
};

export default ReadingRoom;