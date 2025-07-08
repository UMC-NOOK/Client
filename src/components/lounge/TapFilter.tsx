import React from 'react';
import { NavLink } from 'react-router-dom';

const Tap = () => {
    const categories = [
        { name: "추천", path: "RECOMMENDATION"}, 
        { name: "국내도서", path : "BOOK"}, 
        { name: "외국도서", path : "FOREIGN"}, 
        { name: "eBook", path : "EBOOK"}
    ];

    return(
        <div className='flex items-center text-sm font-pretendard'>
            {categories.map((cat, index) => (
                <React.Fragment key={cat.name}>
                    <NavLink
                        to={`/lounge/book/${cat.path}`}
                        className={({ isActive }) =>
                            `text-white text-sm px-2.5 py-2.5 mx-4 my-2 ${
                                isActive ? 'font-bold' : 'font-normal'}
                    `}>
                        {cat.name}
                    </NavLink>
                    {index !== categories.length - 1 && (
                        <span className='text-white'>|</span>
                    )}
                </React.Fragment>
            ))}
        </div>        
    )
};

export default Tap;
