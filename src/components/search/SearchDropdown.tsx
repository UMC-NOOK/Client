import { useSearch } from './useSearch';

interface Props {
    onSelect: (val: string) => void;
}

export default function SearchDropdown({ onSelect }: Props) {
    const { getRecentSearches, removeRecentSearch } = useSearch();
    const recents = getRecentSearches();

    if (recents.length === 0) return null;

    return (
        <div className="bg-[#434343] rounded-md shadow-lg w-full text-white text-sm">
            {/* 헤더 */}
            <div className="flex justify-between items-center px-8 py-8 border-b border-[#444]">
                <span className="text-white-400 font-semibold">최근 검색어</span>
            </div>

            {/* 최근 검색어 리스트 */}
            <ul>
                {recents.map((item, idx) => (
                    <li
                        key={idx}
                        className="flex justify-between items-center px-8 py-3"
                    >
                        <span onClick={() => onSelect(item)}>{item}</span>
                        <button
                            onClick={() => removeRecentSearch(item)}
                            className="text-white-400 hover:text-white px-1"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
