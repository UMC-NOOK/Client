import React from 'react';
import ReadingRoomCard from './ReadingRoomCard';
import SectionTitle from './SectionTitle';
import AddReadingRoom from './AddReadingRoom';

const ReadingRoomCardList = () => {
    const viewCount = 4;

    return (
        <div className='relative w-full group'>
            <SectionTitle/>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12'>
                {Array.from({length: viewCount -1}).map((_, index) => (
                    <ReadingRoomCard/>
                ))}
                <AddReadingRoom/>
            </div>
        </div>
    )
}

export default ReadingRoomCardList;