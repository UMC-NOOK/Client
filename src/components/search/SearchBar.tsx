import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/search/useSearchStore';
import SearchDropdown from './SearchDropdown';
import searchIcon from '../../assets/button/search/search.png';

interface SearchBarProps {
  wrapperClassName?: string;
  customWidth?: string;
  containerClassName?: string;
  inputClassName?: string;
  placeholderClassName?: string;
  iconClassName?: string;
}

export default function SearchBar({
  wrapperClassName = '',
  customWidth = '470px',
  containerClassName = '',
  inputClassName = '',
  placeholderClassName = '',
  iconClassName = '',
}: SearchBarProps) {
  const { addRecentSearch, setSearchTerm, searchTerm } = useSearchStore();

  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setInput(searchTerm);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setSearchTerm(trimmed);
    addRecentSearch(trimmed);
    navigate(`/lounge/search-result?query=${encodeURIComponent(trimmed)}`);
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      handleSearch(input);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${wrapperClassName}`}
    >
      <div className="relative" style={{ width: customWidth }}>
        <div
          className={`flex items-center gap-[10px] px-[12px] py-[7px] w-full 
            ${containerClassName || 'h-[47px] rounded-full border border-[rgba(211,211,211,0.3)] bg-[#1F1C19]'}`}
        >
          <img
            src={searchIcon}
            alt="검색 아이콘"
            className={`${iconClassName || 'w-[28px] h-[28px]'} opacity-80 pointer-events-none flex-shrink-0`}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="제목, 저자, ISBN으로 검색"
            className={`flex-1 outline-none border-none bg-transparent 
              ${inputClassName || 'text-[16px] font-medium leading-[25px] text-white'} 
              ${placeholderClassName || 'placeholder:text-white placeholder:opacity-50'}`}
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
