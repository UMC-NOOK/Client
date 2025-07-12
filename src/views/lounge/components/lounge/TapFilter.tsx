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
    <div className="flex items-center text-sm font-pretendard">
      {categories.map((cat, index) => (
        <React.Fragment key={cat}>
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`text-white text-sm px-2.5 py-2.5 mx-4 my-2 
                            ${selected === cat ? 'font-bold' : 'font-normal'}
                        `}
          >
            {cat}
          </button>
          {index !== categories.length - 1 && (
            <span className="text-white">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Tap;
