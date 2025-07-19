import React from 'react';

const BookSkeleton = () => {
    return (
            <div className='relative w-[141px] h-[208px] rounded-lg animate-pulse'>
                <div 
                    className={"w-full h-full rounded-lg"}
                    style={{backgroundColor: "rgba(255, 255, 255, 0.4)"}}/>
                
                <div className='absolute bottom-0 left-0 w-full bg-black bg-opacity-75 py-2 flex flex-col space-y-2'>
                    <div 
                    className='h-10 rounded-sm' 
                    style={{backgroundColor: "rgba(255, 255, 255, 0.4)"}}/>
                    <div 
                    className='h-6 rounded-sm'
                    style={{backgroundColor: "rgba(255, 255, 255, 0.4)"}} />
                </div>
            </div>
        );
};

export default BookSkeleton;
