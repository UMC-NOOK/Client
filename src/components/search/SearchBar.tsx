import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from './useSearch';
import SearchDropdown from './SearchDropdown'; 
import Searchicon from '../../assets/button/search/search.png';

export default function SearchBar() {
    const { addRecentSearch } = useSearch();
    const [input, setInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const trimmed = input.trim();
            if (!trimmed) return;
            addRecentSearch(trimmed);
            navigate(`/lounge/search-result?query=${encodeURIComponent(trimmed)}`); // ✅ 수정됨
            setShowDropdown(false);
        }
    };

    return (
        <div className="flex items-start justify-center" style={{ paddingTop: '20px' }}>
            <div className="relative w-full max-w-[470px]">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="제목, 저자, ISBN으로 검색"
                    className="w-full pl-10 pr-4 py-2 focus:outline-none"
                    style={{
                        height: '47px',
                        flexShrink: 0,
                        borderRadius: '8px',
                        background: '#525252',
                        color: '#FFF',
                        fontFamily: 'AppleSDGothicNeoR00',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '25px',
                    }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)} 
                />

                {showDropdown && (
                    <div className="absolute left-0 top-[100%] mt-2 w-full z-10">
                        <SearchDropdown
                            onSelect={(val) => {
                                setInput(val);
                                setShowDropdown(false);
                                navigate(`/lounge/search-result?query=${encodeURIComponent(val)}`); // ✅ 수정됨
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

