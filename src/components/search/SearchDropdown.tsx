// src/components/search/SearchDropdown.tsx
import { useRecentQueries } from '../../views/search/hooks/useQuery/useRecentQueries';
import { useDeleteRecentQuery } from '../../views/search/hooks/useMutation/useDeleteRecentQuery';
import { useClearRecentQueries } from '../../views/search/hooks/useMutation/useClearRecentQueries';

interface Props {
  onSelect: (val: string) => void;
}

export default function SearchDropdown({ onSelect }: Props) {
  const { data, isLoading } = useRecentQueries();
  const { mutate: removeOne } = useDeleteRecentQuery();
  const { mutate: clearAll } = useClearRecentQueries();

  const recent = data?.recentQueries ?? [];
  if (isLoading || recent.length === 0) return null;

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
        {recent.map((item) => (
          <li key={item.recentQueryId}>
            <div
              className="flex justify-between items-center py-3 cursor-pointer hover:bg-[#2b2825] rounded-[6px] px-[6px]"
              // 👇 mousedown에서 처리하면 input의 blur보다 먼저 실행되어 드롭다운이 닫히기 전에 검색이 트리거됩니다.
              onMouseDown={(e) => {
                e.preventDefault(); // input blur 방지
                onSelect(item.query);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(item.query);
              }}
            >
              <span style={{ fontSize: '12px', color: '#D3D3D3' }}>
                {item.query}
              </span>

              <button
                // 삭제 버튼은 클릭 버블링 막아 선택과 충돌하지 않게 처리
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  removeOne(item.recentQueryId);
                }}
                className="text-white/60 hover:text-white text-[14px]"
                aria-label="최근 검색어 삭제"
              >
                ✕
              </button>
            </div>
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
          onMouseDown={(e) => e.preventDefault()} // blur 방지
          onClick={() => clearAll()}
        >
          검색 기록 삭제
        </button>
      </div>
    </div>
  );
}
