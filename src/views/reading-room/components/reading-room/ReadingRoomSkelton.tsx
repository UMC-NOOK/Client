import React from 'react';

const ReadingRoomSkeleton = () => {
    return(
        <div className='relative w-124 h-200 animate-pulse'>
            <div
                className='w-full h-full rounded-xl'
                style={{backgroundColor:'rgba(255, 255, 255, 0.4)' }}>
            </div>
        </div>
    );
}

export default ReadingRoomSkeleton;