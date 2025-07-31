// Calendar.tsx
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns';
import { useState } from 'react';
import chevron_left from '/src/assets/button/book-info/chevron-left2.svg';
import chevron_right from '/src/assets/button/book-info/chevron-right.svg';

interface CalendarProps {
  onRegister: (date: Date) => void;
  closeModal: () => void;
  currentSelectedDate: String;
  currentDateAsDate: Date;
}

const Calendar = ({
  onRegister,
  closeModal,
  currentSelectedDate,
  currentDateAsDate,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(currentDateAsDate);
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const week = ['월', '화', '수', '목', '금', '토', '일'];
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const formatDate = (date: Date) => {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const dayOfWeek = dayNames[date.getDay()];
    return `${year}.${month}.${day} (${dayOfWeek})`;
  };

  const weeks = week.map((item, index) => (
    <div
      className="w-full my-5 flex justify-center items-center text-white text-xs not-italic font-normal leading-3 tracking-[0.36px] uppercase"
      key={index}
    >
      {item}
    </div>
  ));

  const day = [];
  let startDay = startDate;
  let days = [];

  while (startDay <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(startDay, 'd');
      const dateForClick = startDay;
      days.push(
        <div
          key={startDay.toISOString()}
          className={`w-[14.28%] flex flex-col justify-center items-center rounded-sm cursor-pointer
          ${formatDate(dateForClick) == currentSelectedDate ? 'bg-nook-br-100' : ''}`}
          onClick={() => {
            onRegister(dateForClick);
            closeModal();
          }}
        >
          <div
            className={`relative text-center text-xs not-italic font-normal leading-[22px] p-2.5 rounded-[50%] ${format(currentDate, 'M') !== format(startDay, 'M') ? 'text-[rgba(255,255,255,0.20)]' : 'text-white'} `}
          >
            {formattedDate}
          </div>
        </div>,
      );
      startDay = addDays(startDay, 1);
    }
    day.push(
      <div className="flex flex-row items-center" key={startDay.toISOString()}>
        {days}
      </div>,
    );
    days = [];
  }

  return (
    <div className="absolute top-full mt-3 left-0 z-50 w-[336px] bg-[#26221E] text-black rounded shadow-xl px-9 py-7">
      <div className="flex justify-between items-center gap-5 mb-2 px-[11px] py-7">
        <img
          src={chevron_left}
          alt="prev"
          className="cursor-pointer w-[15px] h-[15px]"
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        />
        <span className="text-white text-center text-sm not-italic font-normal leading-[normal]">
          {format(currentDate, 'yyyy')}.
          {format(currentDate, 'M') == '10' ||
          format(currentDate, 'M') == '11' ||
          format(currentDate, 'M') == '12'
            ? format(currentDate, 'M')
            : `0${format(currentDate, 'M')}`}
        </span>
        <img
          src={chevron_right}
          alt="next"
          className="cursor-pointer w-[15px] h-[15px]"
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        />
      </div>
      <div className="flex">{weeks}</div>
      <div className="w-full mt-2.5">{day}</div>
    </div>
  );
};

export default Calendar;
