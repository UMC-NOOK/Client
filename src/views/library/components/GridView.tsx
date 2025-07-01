import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar-override.css';
import SaveList from './save-list/SaveList';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const GridView = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="w-full h-[1100px] flex gap-6">
      <Calendar
        onChange={onChange}
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
        value={value}
        showNeighboringMonth={false}
      />
      <div className="w-[192px] mt-6">
        <SaveList />
      </div>
    </div>
  );
};

export default GridView;
