import { useSearchStore } from '../../store/search/useSearchStore';

interface Props {
  onSelect: (val: string) => void;
}

export default function SearchDropdown({ onSelect }: Props) {
  const { recentSearches, removeRecentSearch, clearAllSearches } =
    useSearchStore();

  if (recentSearches.length === 0) return null;

  return (
    <div
      className="text-sm text-white overflow-y-auto flex-shrink-0 shadow-lg rounded-lg"
      style={{
        background: '#1F1C19',
        borderRadius: '8px',
        paddingTop: '20.54px',
        paddingRight: '23.5px',
        paddingLeft: '23.5px',
        marginTop: '12px',
      }}
    >
      <div className="flex items-center" style={{ height: '16.919px' }}>
        <span
          className="text-white font-semibold text-[14px]"
          style={{ marginBottom: '11.8px' }}
        >
          최근 검색어
        </span>
      </div>

      <ul>
        {recentSearches.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center py-3 cursor-pointer hover:bg-[#2b2825]"
          >
            <span
              onClick={() => onSelect(item)} 
              style={{ fontSize: '12px', color: '#D3D3D3' }}
            >
              {item}
            </span>
            <button
              onClick={() => removeRecentSearch(item)}
              className="text-white/60 hover:text-white text-[14px]"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div
        style={{
          height: '1px',
          backgroundColor: '#D3D3D3',
          opacity: 0.4,
          marginTop: '8px',
        }}
      />
      <div className="flex items-center" style={{ padding: '16px 0px' }}>
        <button
          className="text-white text-[12px] font-light"
          onClick={clearAllSearches}
        >
          검색 기록 삭제
        </button>
      </div>
    </div>
  );
}
