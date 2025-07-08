import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from './useSearchStore';
import SearchDropdown from './SearchDropdown';
import searchIcon from '../../assets/button/search/search.png';

export default function SearchBar() {
  const { addRecentSearch, setSearchTerm } = useSearchStore();
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setSearchTerm(trimmed);
    addRecentSearch(trimmed);
    navigate(`/lounge/search-result?query=${encodeURIComponent(trimmed)}`);
    setInput('');
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      handleSearch(input);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-5 px-4">
      <div className="relative w-full max-w-[470px]">
        <div className="flex items-center gap-[10px] w-[470px] h-[47px] px-[12px] py-[7px]
          rounded-full border border-[rgba(211,211,211,0.3)] bg-[#1F1C19]">
          <img
            src={searchIcon}
            alt="검색 아이콘"
            className="w-[28px] h-[28px] opacity-80 pointer-events-none"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="제목, 저자, ISBN으로 검색"
            className="flex-1 outline-none border-none text-[16px] font-medium leading-[25px] text-white bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
        </div>

        {showDropdown && (
          <div className="absolute left-0 top-full mt-2 w-full z-10">
            <SearchDropdown onSelect={handleSearch} />
          </div>
        )}
      </div>
    </div>
  );
}
