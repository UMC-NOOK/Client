import React from 'react';

const Tap = () => {
    const categories = ["추천", "국내도서", "외국도서", "eBook"];

    return(
        <div className='flex items-center text-sm font-pretendard'>
            {categories.map((cat, index) => (
                <React.Fragment key={cat}>
                    <span className='text-white text-sm px-2.5 py-2.5'> {cat} </span>
                    {index !== categories.length - 1 && (
                        <span className='text-white'>|</span>
                    )}
                </React.Fragment>
            ))}
        </div>        
    )
};

export default Tap;
