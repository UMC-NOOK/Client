import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/search/useSearchStore';
import SearchDropdown from './SearchDropdown';
import searchIcon from '../../assets/button/search/search.png';

interface SearchBarProps {
  wrapperClassName?: string;
  customWidth?: string;
}

export default function SearchBar({
  wrapperClassName = '',
  customWidth = '470px',
}: SearchBarProps) {
  const {
    addRecentSearch,
    setSearchTerm,
    searchTerm, // ✅ 가져오기
  } = useSearchStore();

  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // ✅ 전역 상태로부터 초기값 동기화
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
    // ❌ setInput(''); 제거 → 그래야 검색어가 input에 남아 있음
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      handleSearch(input);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${wrapperClassName}`}>
      <div className="relative" style={{ width: customWidth }}>
        <div
          className="flex items-center gap-[10px] h-[47px] px-[12px] py-[7px]
          rounded-full border border-[rgba(211,211,211,0.3)] bg-[#1F1C19] w-full"
        >
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
