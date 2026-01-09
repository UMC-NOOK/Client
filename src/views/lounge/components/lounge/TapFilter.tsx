import React from 'react';

const categories = ['추천', '국내도서', '외국도서', 'eBook'];

const Tap = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (c: string) => void;
}) => {
  return (
    <div className="flex items-center gap-5">
      {categories.map((cat, index) => (
        <React.Fragment key={cat}>
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`text-white text-base px-5 py-2 
                            ${selected === cat ? 'font-semibold' : 'font-extra-light'}
                        `}
            style={{color: selected === cat ? '#FFFFFF' : 'rgba(255, 255, 255, 0.50)'}}
          >
            {cat}
          </button>
          {index !== categories.length - 1 && (
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="13" viewBox="0 0 2 13" fill="none">
              <path d="M1 0V13" stroke="white" strokeOpacity="0.5"/>
            </svg>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Tap;
