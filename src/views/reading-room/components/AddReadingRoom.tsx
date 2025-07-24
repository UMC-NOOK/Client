import React from 'react';

const AddReadingRoom = () => {
    return(
        <div 
            className='relative flex justify-center items-center w-124 h-200 group rounded-xl border border-dashed'
            style={{
                backgroundColor: 'rgba(66, 60, 53, 0.10)',
                borderColor: 'rgba(66, 60, 53, 0.40)'}}>
            <button
                className='flex justify-center items-center w-20 h-20 rounded-full border border-dashed'
                style={{borderColor: 'rgba(121, 191, 201, 0.50)'}}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 0.75V11M11 21.25V11M11 11H1M11 11H21" stroke="#7ABFC9" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    );
}

export default AddReadingRoom;