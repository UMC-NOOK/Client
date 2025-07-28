import React, { useState } from 'react';
import arrowDownIcon from '../../../assets/button/home/Polygon_down.png';
import arrowUpIcon from '../../../assets/button/home/Polygon_up.png';

interface CategoryData {
  name: string;
  count: number;
  latestTimestamp: number; // 최근 등록 시간 기준
}

interface BookCategoryChartProps {
  categories: CategoryData[];
}

const COLORS = [
  'rgba(122, 191, 201, 1.0)',
  'rgba(122, 191, 201, 0.8)',
  'rgba(122, 191, 201, 0.6)',
  'rgba(122, 191, 201, 0.4)',
  'rgba(122, 191, 201, 0.2)',
];

const BookCategoryChart: React.FC<BookCategoryChartProps> = ({ categories }) => {
  const [expanded, setExpanded] = useState(false);

  // 동일 권수일 경우 최신 등록 시간 기준으로 정렬
  const sorted = [...categories].sort((a, b) => {
    if (b.count === a.count) {
      return b.latestTimestamp - a.latestTimestamp;
    }
    return b.count - a.count;
  });

  const total = sorted.reduce((acc, cur) => acc + cur.count, 0);
  const topCategory = sorted[0] || { name: '독서', count: 0 };

  // 5개 초과 시 기타 항목 생성
  const mainCategories = sorted.slice(0, 4);
  const others = sorted.slice(4);
  const otherTotal = others.reduce((acc, cur) => acc + cur.count, 0);
  const chartCategories = [...mainCategories];
  if (others.length > 0) {
    chartCategories.push({ name: '기타', count: otherTotal, latestTimestamp: 0 });
  }

  const radius = 50;
  const cx = 72.5;
  const cy = 72.5;
  const circumference = 2 * Math.PI * radius;
  const gapAngle = 6;

  let accumulatedAngle = 0;

  const renderSegments = () => {
    return chartCategories.map((cat, index) => {
      const ratio = cat.count / total;
      const angle = 360 * ratio;
      const length = circumference * (angle - gapAngle) / 360;
      const strokeDasharray = `${length} ${circumference}`;
      const strokeDashoffset = -circumference * accumulatedAngle / 360;
      accumulatedAngle += angle;

      return (
        <circle
          key={cat.name}
          r={radius}
          cx={cx}
          cy={cy}
          fill="transparent"
          stroke={COLORS[index % COLORS.length]}
          strokeWidth={20}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 70 70)"
          strokeLinecap="round"
        />
      );
    });
  };

  return (
    <div
      className={`w-[246px] rounded-[12px] bg-[#423C35]/10 flex flex-col items-center pt-[14px] transition-all duration-300 ${
        expanded ? 'h-auto pb-[16px]' : 'h-[254px] overflow-hidden'
      }`}
    >
      <p className="text-white text-[12px] leading-[25px] font-[400] font-pretendard">
        이 분야의 책을 가장 많이 읽었어요.
      </p>

      {total === 0 ? (
        <div className="w-[145px] h-[145px] rounded-full border-[25px] border-[#423C35]/50 flex flex-col items-center justify-center mt-[8px]">
          <span className="text-white text-[10px] leading-[20px] font-[400]">독서</span>
          <span className="text-white text-[12px] leading-[20px] font-[600]">0권</span>
        </div>
      ) : (
        <div className="relative w-[145px] h-[145px] mt-[8px]">
          <svg width={145} height={145}>{renderSegments()}</svg>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <span className="text-white text-[10px] leading-[20px] font-[400]">{topCategory.name}</span>
            <span className="text-white text-[12px] leading-[20px] font-[600]">{topCategory.count}권</span>
          </div>
        </div>
      )}

      {categories.length > 5 && (
        <button
          onClick={() => setExpanded(prev => !prev)}
          className="mt-[8px] inline-flex items-center gap-[8px] text-[11px] leading-[25px] font-[400] text-white/50 font-pretendard"
        >
          <span>{expanded ? '전체 보기' : '전체 보기'}</span>
          <img
            src={expanded ? arrowUpIcon : arrowDownIcon}
            alt="toggle"
            className="w-[12px] h-[12px] object-contain"
          />
        </button>
      )}

      {expanded && (
        <div className="mt-[12px] w-full px-[20px] text-white/80 text-[12px] font-[400] leading-[20px] font-pretendard">
          {chartCategories.map((cat, i) => (
            <div key={cat.name} className="flex justify-between items-center py-[2px]">
              <div className="flex items-center gap-[8px]">
                <div
                  className="w-[9px] h-[9px] rounded-[2px]"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
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
