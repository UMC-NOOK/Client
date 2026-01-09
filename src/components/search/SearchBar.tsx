import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/search/useSearchStore';
import SearchDropdown from './SearchDropdown';
import defaultIcon from '../../assets/button/search/search.png';

interface SearchBarProps {
  wrapperClassName?: string;
  customWidth?: string;
  containerClassName?: string;
  inputClassName?: string;
  placeholderClassName?: string;
  iconClassName?: string;
  inputStyle?: React.CSSProperties;
  iconSrc?: string;
  variant?: 'default' | 'lounge';
  syncToStore?: boolean;
}

export default function SearchBar({
  wrapperClassName = '',
  customWidth = '470px',
  containerClassName,
  inputClassName,
  placeholderClassName,
  iconClassName,
  inputStyle,
  iconSrc,
  variant = 'default',
  syncToStore = true,
}: SearchBarProps) {
  const { setSearchTerm, searchTerm } = useSearchStore();
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // placeholder 제어
  const BASE_PLACEHOLDER = '제목, 저자, ISBN으로 검색';
  const [placeholder, setPlaceholder] = useState(BASE_PLACEHOLDER);

  useEffect(() => {
    if (syncToStore) setInput(searchTerm);
  }, [searchTerm, syncToStore]);

  const handleSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    if (syncToStore) {
      setSearchTerm(trimmed);
    }

    navigate(`/lounge/search-result?query=${encodeURIComponent(trimmed)}`);
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      handleSearch(input);
    }
  };

  const isLounge = variant === 'lounge';
  const finalInputStyle = isLounge
    ? {
        color: '#FFF',
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '25px',
        ...inputStyle,
      }
    : {
        color: '#FFF',
        fontFamily: 'Pretendard',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '25px',
        ...inputStyle,
      };

  return (
    <div className={`flex flex-col items-center justify-center ${wrapperClassName}`}>
      <div className="relative" style={{ width: customWidth }}>
        {isLounge && (
          <style>{`
            .lounge-placeholder::placeholder {
              color: #797776; 
              font-family: Pretendard;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 25px;
            }
          `}</style>
        )}
        <div
          className={`flex items-center gap-[10px] px-[12px] py-[7px] w-full ${
            containerClassName ||
            (isLounge
              ? 'h-[36px] rounded-[42px] border border-[rgba(211,211,211,0.3)] bg-[#1F1C19]'
              : 'h-[47px] rounded-full border border-[rgba(211,211,211,0.3)] bg-[#1F1C19]')
          }`}
          onMouseDown={() => inputRef.current?.focus()} // 바 전체 클릭 시 포커스
        >
          <img
            src={iconSrc || defaultIcon}
            alt="검색 아이콘"
            className={`${iconClassName || ''} pointer-events-none`}
            style={
              isLounge
                ? {
                    display: 'flex',
                    width: '22px',
                    height: '22px',
                    padding: '5.042px 4.584px 4.583px 5.042px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                    aspectRatio: '1 / 1',
                  }
                : {
                    display: 'flex',
                    width: '28px',
                    height: '28px',
                    padding: '6.42px 5.83px 5.83px 6.42px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                    aspectRatio: '1 / 1',
                  }
            }
          />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className={`flex-1 outline-none border-none bg-transparent ${
              inputClassName ||
              (isLounge
                ? 'lounge-placeholder'
                : 'text-white text-[16px] font-medium leading-[25px] placeholder:!text-[#797776]')
            } ${placeholderClassName || ''}`}
            style={finalInputStyle}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onFocus={() => {
              setPlaceholder('');        // 클릭/포커스 시 placeholder 제거
              setShowDropdown(true);
            }}
            onBlur={() => {
              // 드롭다운 닫고 placeholder 복원
              setTimeout(() => {
                setShowDropdown(false);
                setPlaceholder(BASE_PLACEHOLDER);
              }, 150);
            }}
          />
        </div>

        {showDropdown && (
          <div
            className="absolute left-0 top-full w-full z-10"
            style={{ marginTop: variant === 'lounge' ? '7px' : '12px' }}
          >
            <SearchDropdown onSelect={handleSearch} variant={variant} />
          </div>
        )}
      </div>
    </div>
  );
}
