import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface MonthlyRate {
  month: string;
  rate: number | null;
}

const mockData: MonthlyRate[] = [
  { month: '01월', rate: 30 },
  { month: '02월', rate: 45 },
  { month: '03월', rate: 50 },
  { month: '04월', rate: 55 },
  { month: '05월', rate: 65 },
  { month: '06월', rate: 75 },
  { month: '07월', rate: 20 },
  { month: '08월', rate: 70 },
  { month: '09월', rate: 10 },
  { month: '10월', rate: 85 },
  { month: '11월', rate: 60 },
  { month: '12월', rate: 99 },
];

const CustomDot = ({ cx, cy, payload }: any) => {
  if (payload.rate === null) return <g />;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={1.6}
      stroke="#7ABFC9"
      strokeWidth={1}
      fill="#7ABFC9"
    />
  );
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
  const currentMonth = new Date().getMonth() + 1;
  const isSecondHalf = currentMonth >= 7;

  const monthsToShow = isSecondHalf
    ? ['07월', '08월', '09월', '10월', '11월', '12월']
    : ['01월', '02월', '03월', '04월', '05월', '06월'];

  const filled = monthsToShow.map((m) => {
    const monthNum = parseInt(m);
    const found = mockData.find((d) => d.month === m);
    return {
      month: m,
      rate: monthNum <= currentMonth ? found?.rate ?? 0 : null,
    };
  });

  const thisMonthRate =
    filled.find((d) => parseInt(d.month) === currentMonth)?.rate ?? 0;

  const chartHeight = 160;
  const lineAreaHeight = 140; // 선이 그려질 실제 영역
  const lineCount = 11;

  return (
    <div className="w-[246px] h-[220px] flex-shrink-0 rounded-[12px] bg-[#423C35]/10 px-[26px] pt-[11px]">
      {/* 텍스트 */}
      <p className="text-white text-[12px] font-pretendard leading-[25px]">
        이번 달 독서 기록률은{' '}
        <span className="text-[16px]">{thisMonthRate}%</span> 입니다.
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
          <LineChart
            data={filled}
            margin={{ top: 0, right: 10, left: 10, bottom: 10 }} // ← 여백 줘서 텍스트 안 짤림
          >
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
            <YAxis
              hide
              domain={[0, 100]}
              type="number"
              tick={false}
            />
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
