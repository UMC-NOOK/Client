import { useState } from 'react';
import Calendar from 'react-calendar';
import '../../styles/globalCalendar.css';
import SaveList from '../library-items/grid-items/SaveList';
import SaveListView from '../library-items/grid-items/SaveListView';
import TileContent from '../calendar/TileContent';

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
    <div className="w-full flex">
      {istoggle ? (
        <div className="w-full h-full overflow-y-auto">
          <SaveListView onClick={handleClick} />
        </div>
      ) : (
        <div className="flex justify-between w-full">
          <div className="w-[84rem]">
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
              formatMonthYear={(locale, date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                return `${year} . ${month}`;
              }}
            />
          </div>
          <div className="mt-6 w-[16.2rem]">
            <SaveList onClick={handleClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GridView;
