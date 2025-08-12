import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import arrowDownIcon from '../../../assets/button/home/Polygon_down.png';
import arrowUpIcon from '../../../assets/button/home/Polygon_up.png';
import { useGetHomeCategories } from '../hooks/useQuery/useGetHomeCategories';

type CategoryData = { name: string; count: number };

// 적은 순서 → 많은 순서 컬러 팔레트
const COLORS = ['#80CADD', '#38BDBF', '#86BD09', '#FFD857', '#FCAE04', '#FC9605'];

// 0권(데이터 없음)일 때
const EmptyDonut = () => (
  <div className="relative flex items-center justify-center" style={{ width: 145, height: 145 }}>
    <svg width={140} height={140} viewBox="0 0 140 140">
      <circle cx="70" cy="70" r="50" fill="none" stroke="#423C3580" strokeWidth="20" />
    </svg>
  </div>
);

const BookCategoryChart: React.FC = () => {
  const { data } = useGetHomeCategories(); // Server: { categoryName, count }[]
  const [expanded, setExpanded] = useState(false);

  // 서버 데이터를 컴포넌트 shape으로 매핑
  const categories: CategoryData[] = useMemo(
    () => (data ?? []).map((c) => ({ name: c.categoryName, count: c.count })),
    [data],
  );

  // 정렬: count desc
  const sorted = useMemo(
    () => [...categories].sort((a, b) => b.count - a.count),
    [categories],
  );

  const total = sorted.reduce((sum, item) => sum + item.count, 0);
  const topCategory = sorted[0] || { name: '독서', count: 0 };

  // 도넛에 표시할 카테고리 + 기타
  const chartCategories = useMemo(() => {
    const main = sorted.slice(0, 5);
    const others = sorted.slice(5);
    if (others.length > 0) {
      const otherTotal = others.reduce((sum, item) => sum + item.count, 0);
      main.push({ name: '기타', count: otherTotal });
    }
    return main;
  }, [sorted]);

  // 칼라 순서: 오름차순 count 기준
  const dataWithColor = useMemo(() => {
    const asc = [...chartCategories].sort((a, b) => a.count - b.count);
    return asc.map((item, idx) => ({
      ...item,
      color: COLORS[idx] || COLORS[COLORS.length - 1],
    }));
  }, [chartCategories]);

  return (
    <div className="w-[246px] rounded-[12px] bg-[#423C35]/10 flex flex-col items-left pt-[14px] pb-[49px] transition-all duration-300">
      <p className="text-white text-[12px] leading-[25px] font-[400] font-pretendard mb-[20px] pl-[25px]">
        이 분야의 책을 가장 많이 읽었어요.
      </p>

      <div className="w-full h-[145px] flex items-center justify-center relative">
        {total === 0 ? (
          <>
            {/* 0권 전용 회색 도넛 */}
            <EmptyDonut />
            {/* 중앙 텍스트 */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-white text-[10px] leading-[20px] font-[400] font-pretendard">
                독서
              </span>
              <span className="text-white text-[12px] leading-[20px] font-[600] font-pretendard">
                0권
              </span>
            </div>
          </>
        ) : (
          <>
            {/* 정상 데이터 도넛 */}
            <PieChart width={145} height={145}>
              <Pie
                data={dataWithColor}
                dataKey="count"
                nameKey="name"
                innerRadius={50}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                stroke="none"
                cornerRadius={6}
                isAnimationActive={false}
              >
                {dataWithColor.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>

            {/* 중앙 텍스트 */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-white text-[10px] leading-[20px] font-[400] font-pretendard">
                {topCategory.name}
              </span>
              <span className="text-white text-[12px] leading-[20px] font-[600] font-pretendard">
                {topCategory.count}권
              </span>
            </div>
          </>
        )}
      </div>

      {/* 전체 보기 토글 */}
      {total > 0 && categories.length > 5 && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className=" inline-flex items-center gap-[8px] text-[11px] leading-[25px] font-[400] text-white/50 font-pretendard mt-[12px]  pl-[25px]"
        >
          <img
            src={expanded ? arrowUpIcon : arrowDownIcon}
            alt="toggle"
            className="w-[7px] h-[7px] object-contain"
          />
          <span>전체 보기</span>
        </button>
      )}

      {/* 리스트 (0권일 때는 숨김) */}
      {total > 0 && expanded && (
        <div className="mt-[12px] w-full px-[20px] text-white/80 text-[12px] font-[400] leading-[20px] font-pretendard">
          {chartCategories.map((cat) => (
            <div key={cat.name} className="flex justify-between items-center py-[2px]">
              <div className="flex items-center gap-[8px]">
                <div
                  className="w-[9px] h-[9px] rounded-[2px]"
                  style={{
                    backgroundColor: dataWithColor.find((d) => d.name === cat.name)?.color,
                  }}
                />
                <span>{cat.name}</span>
              </div>
              <span>{cat.count}권</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookCategoryChart;
