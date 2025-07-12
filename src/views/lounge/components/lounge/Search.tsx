import React, { useState } from 'react';

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleBlur = () => {
    setKeyword('');
    setIsFocused(false);
  };

  return (
    <div className="flex rounded-[42px] bg-[#1F1C19] items-center w-[340px] h-[36px]">
      <span className="px-2 py-1 mx-3 my-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="17px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#B8AFA5"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </span>

      <span>
        <input
          className="
                    placeholder:text-[rgba(184, 175, 165, 0.5)]
                    placeholder:font-pretendard
                    placeholder:text-xs
                    "
          placeholder={isFocused ? '' : '제목, 저자, ISBN으로 검색'}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
      </span>
    </div>
  );
};

export default Search;
