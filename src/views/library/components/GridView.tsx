import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../styles/globalCalendar.css';
// import '../styles/calendar-override.css';
import SaveList from './gridview-items/SaveList';
import SaveListView from './gridview-items/SaveListView';
import TileContent from './calendar/TileContent';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Toggle = boolean;

const GridView = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [istoggle, setIsToggle] = useState<Toggle>(false);

  const handleClick = () => {
    setIsToggle((prev) => !prev);
  };

  return (
    <div className="w-full h-[1100px] flex gap-6">
      {istoggle ? (
        <div className="w-full h-full overflow-y-auto">
          <SaveListView onClick={handleClick} />
        </div>
      ) : (
        <>
          <Calendar
            onChange={onChange}
            calendarType="gregory"
            prev2Label={null}
            next2Label={null}
            value={value}
            showFixedNumberOfWeeks={true}
            showNeighboringMonth={false}
            tileContent={({ date, view }) => (
              <TileContent date={date} view={view} />
            )}
            formatDay={(locale, date) => {
              return date.getDate().toString().padStart(2, '0');
            }}
            formatShortWeekday={(locale, date) => {
              const weekdays = [
                'SUN',
                'MON',
                'TUE',
                'WED',
                'THU',
                'FRI',
                'SAT',
              ];
              return weekdays[date.getDay()];
            }}
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
