import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar-override.css';
import SaveList from './grid-save-list/SaveList';
import SaveListView from './grid-save-list/SaveListView';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Toggle = boolean;

const GridView = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [istoggle, setIsToggle] = useState<Toggle>(false);

  const handleClick = () => {
    setIsToggle((prev) => !prev);
  };

  console.log(istoggle);

  return (
    <div className="w-full h-[1100px] flex gap-6">
      {istoggle ? (
        <div className="w-full h-full overflow-y-auto">
          <SaveListView />
        </div>
      ) : (
        <>
          <Calendar
            onChange={onChange}
            calendarType="gregory"
            prev2Label={null}
            next2Label={null}
            value={value}
            showNeighboringMonth={false}
          />
          <div className="mt-6">
            <SaveList onClick={handleClick} />
          </div>
        </>
      )}
    </div>
  );
};

export default GridView;
