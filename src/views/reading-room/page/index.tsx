import React from 'react';
//import ReadingRoomCardList from '../components/ReadingRoomCardList';
import AddReadingRoom from '../components/AddReadingRoom';
import ReadingRoomCardList from '../components/ReadingRoomCardList';

const ReadingRoom = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex items-center justify-center'>
        {/* <ReadingRoomCardList/> */}
        <ReadingRoomCardList/>
      </div>
    </div>
  );
};

export default ReadingRoom;