import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useGetHomeRates } from '../hooks/useQuery/useGetHomeRates';

interface MonthlyRate {
  month: string;
  rate: number | null;
}

const CustomDot = ({ cx, cy, payload }: any) => {
  if (payload.rate === null) return <g />;
  return <circle cx={cx} cy={cy} r={1.6} stroke="#7ABFC9" strokeWidth={1} fill="#7ABFC9" />;
};

const CustomActiveDot = ({ cx, cy, payload }: any) => {
  if (payload.rate === null) return <g />;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={3.5}
      stroke="rgba(122, 191, 201, 0.5)"
      strokeWidth={2}
      fill="none"
    />
  );
};

const ReadingRateChart: React.FC = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const year = String(now.getFullYear());

  const { data } = useGetHomeRates(year); // { rates: [{month:number, rate:number}] }
  const byMonth = new Map((data?.rates ?? []).map((r) => [r.month, r.rate]));

  const isSecondHalf = currentMonth >= 7;
  const monthsToShow = isSecondHalf
    ? ['07월', '08월', '09월', '10월', '11월', '12월']
    : ['01월', '02월', '03월', '04월', '05월', '06월'];

  const filled: MonthlyRate[] = monthsToShow.map((mLabel) => {
    const m = parseInt(mLabel, 10);
    const value = m <= currentMonth ? byMonth.get(m) ?? 0 : null;
    return { month: mLabel, rate: value };
  });

  const thisMonthRate =
    filled.find((d) => parseInt(d.month, 10) === currentMonth)?.rate ?? 0;

  const chartHeight = 160;
  const lineAreaHeight = 140;
  const lineCount = 11;

  return (
    <div className="w-[246px] h-[220px] flex-shrink-0 rounded-[12px] bg-[#423C35]/10 px-[26px] pt-[11px]">
      {/* 텍스트 */}
      <p className="text-white text-[12px] font-pretendard leading-[25px]">
        이번 달 독서 기록률은 <span className="text-[16px]">{thisMonthRate}%</span> 입니다.
      </p>

      {/* 차트 */}
      <div className="mt-[5px] relative w-full h-[140px]">
        {/* 배경 줄 */}
        <svg
          className="absolute top-0 left-0 w-full"
          height={lineAreaHeight}
          style={{ pointerEvents: 'none' }}
        >
          {[...Array(lineCount)].map((_, i) => (
            <line
              key={i}
              x1="0"
              x2="100%"
              y1={(lineAreaHeight / (lineCount - 1)) * i}
              y2={(lineAreaHeight / (lineCount - 1)) * i}
              stroke="rgba(85, 83, 81, 0.30)"
              strokeWidth={0.5}
            />
          ))}
        </svg>

        {/* 라인 차트 */}
        <ResponsiveContainer width="100%" height={chartHeight + 20}>
          <LineChart data={filled} margin={{ top: 0, right: 10, left: 10, bottom: 10 }}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              interval={0}
              scale="point"
              tickMargin={10}
              tick={{
                fill: 'rgba(255, 255, 255, 0.50)',
                fontSize: 9,
                fontFamily: 'AppleSDGothicNeoR00',
                textAnchor: 'middle',
              }}
            />
            <YAxis hide domain={[0, 100]} type="number" tick={false} />
            <Tooltip content={() => null} cursor={false} />
            <Line
              type="linear"
              dataKey="rate"
              stroke="#7ABFC9"
              strokeWidth={0.7}
              dot={<CustomDot />}
              activeDot={<CustomActiveDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReadingRateChart;
