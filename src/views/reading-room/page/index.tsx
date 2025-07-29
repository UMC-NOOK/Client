import React from 'react';

import MyReadingRoomCardList from '../components/MyReadingRoomCardList';
import ShowMoreTagsModal from '../components/Modals/ShowMoreTagsModal';

const ReadingRoom = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex items-center justify-center'>
        {/* <MyReadingRoomCardList/> */}
        <ShowMoreTagsModal/>
      </div>
    </div>
  );
};

export default ReadingRoom;