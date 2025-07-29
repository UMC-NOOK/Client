import React from 'react';

//import MyReadingRoomCardList from '../components/views/MyReadingRoomCardList';
import ReadingRoomList from '../components/views/ReadingRoomList';

const ReadingRoom = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex items-center justify-center'>
        {/* <MyReadingRoomCardList/> */}
        <ReadingRoomList/>
      </div>
    </div>
  );
};

export default ReadingRoom;