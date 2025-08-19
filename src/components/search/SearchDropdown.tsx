// src/components/search/SearchDropdown.tsx
import { useRecentQueries } from '../../views/search/hooks/useQuery/useRecentQueries';
import { useDeleteRecentQuery } from '../../views/search/hooks/useMutation/useDeleteRecentQuery';
import { useClearRecentQueries } from '../../views/search/hooks/useMutation/useClearRecentQueries';

interface Props {
  onSelect: (val: string) => void;
  variant?: 'default' | 'lounge';
}

export default function SearchDropdown({ onSelect, variant = 'default' }: Props) {
  const { data, isLoading } = useRecentQueries();
  const { mutate: removeOne } = useDeleteRecentQuery();
  const { mutate: clearAll } = useClearRecentQueries();

  const recent = data?.recentQueries ?? [];
  if (isLoading || recent.length === 0) return null;

  const isLounge = variant === 'lounge';

  return (
    <div
      className="text-white overflow-y-auto flex-shrink-0 shadow-lg rounded-[8px]"
      style={{
        background: '#1F1C19',
        // 검색바와의 간격은 SearchBar에서 wrapper marginTop으로 제어 (여기선 0)
        marginTop: 0,
        // 좌측 그리드
        paddingLeft: isLounge ? '16px' : '23px',
        paddingRight: isLounge ? '16px' : '23px',
        // 섹션 상/하 여백
        paddingTop: isLounge ? '12px' : '20.5px',  // 최근 검색어 위
        paddingBottom: isLounge ? '12px' : '16px', // 검색 기록 삭제 밑
      }}
    >
      {/* 제목: 최근 검색어 */}
      <div
        style={{
          marginBottom: isLounge ? '12px' : '11.79px', // 제목 → 첫 결과
        }}
      >
        <span
          className={isLounge ? 'font-[600]' : 'font-semibold'}
          style={{
            color: '#FFFFFF',
            padding: 0,
            display: 'block',
            fontSize: isLounge ? '12px' : '14px', // 라운지 12 / 일반 14
            lineHeight: isLounge ? '12px' : '14px',
          }}
        >
          최근 검색어
        </span>
      </div>

      {/* 결과 리스트 (기본 여백 제거) */}
      <ul className="list-none p-0 m-0">
        {recent.map((item, idx) => (
          <li
            key={item.recentQueryId}
            style={{
              marginTop: idx === 0 ? 0 : (isLounge ? '8px' : '10.17px'), // 결과 간 간격
            }}
          >
            {/* 행 컨테이너: 패딩 없음, 텍스트가 패딩 먹지 않도록 */}
            <div
              className="w-full flex justify-between items-center cursor-pointer rounded-[6px]"
              style={{
                padding: 1,
              }}
              onMouseDown={(e) => {
                e.preventDefault(); // input blur 전에 선택되게
                onSelect(item.query);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(item.query);
              }}
            >
              <span
                className="block flex-1 min-w-0 truncate"
                style={{
                  // 나머지 텍스트: 라운지 10px / 일반 12px
                  fontSize: isLounge ? '10px' : '12px',
                  lineHeight: isLounge ? '10px' : '12px',
                  color: '#D3D3D3',
                  padding: 1, // 글씨 패딩 없음
                }}
              >
                {item.query}
              </span>

              {/* X 삭제 아이콘 10×10, hover 없음 */}
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  removeOne(item.recentQueryId);
                }}
                className="text-white/60"
                aria-label="최근 검색어 삭제"
                style={{
                  width: 10,
                  height: 10,
                  padding: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  lineHeight: 0,
                  marginLeft: '8px', // 텍스트와 아이콘 최소 간격 (필요 없으면 제거)
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: 'block' }}
                >
                  <path
                    d="M1 1L9 9M9 1L1 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 마지막 결과 ↔ 구분선 / 구분선 ↔ '검색 기록 삭제' */}
      <div
        style={{
          marginTop: isLounge ? '12px' : '11.75px',
          marginBottom: isLounge ? '12px' : '13.75px',
          // default에서만 구분선 왼여백 13.3px(컨테이너 23px 대비 -9.7px 보정)
          marginLeft: isLounge ? 0 : '-9.7px',
        }}
      >
        <div
          style={{
            height: '1px',
            backgroundColor: '#D3D3D3',
            opacity: 0.4,
          }}
        />
      </div>

      {/* 검색 기록 삭제 (나머지 텍스트 규칙 적용: 라운지 10 / 일반 12) */}
      <div>
        <button
          className="font-light"
          style={{
            color: '#FFFFFF',
            padding: 0,
            fontSize: isLounge ? '10px' : '12px',
            lineHeight: isLounge ? '10px' : '12px',
          }}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => clearAll()}
        >
          검색 기록 삭제
        </button>
      </div>
    </div>
  );
}
