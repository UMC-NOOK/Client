import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import '../../styles/globalCalendar.css';
import SaveList from '../library-items/grid-items/SaveList';
import SaveListView from '../library-items/grid-items/SaveListView';
import TileContent from '../calendar/TileContent';
import useGetBookMonth from '../../hooks/useQuery/library-query/useGetBookMonth';
import { useBookStore } from '../../../../store/library/useBookStore';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Toggle = boolean;

const GridView = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [istoggle, setIsToggle] = useState<Toggle>(false);
  const [yearMonth, setYearMonth] = useState<string>(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  });

  const setBooks = useBookStore((state) => state.setBooks);

  const { data, isLoading, isError, error, isSuccess, refetch } =
    useGetBookMonth({ yearMonth });

  useEffect(() => {
    if (isSuccess && data) {
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        setBooks([]);
      }
    } else if (isError) {
      setBooks([]);
    }
  }, [data, isSuccess, isError, error, setBooks]);

  // console.log('zzzz', data);

  const handleClick = () => {
    setIsToggle((prev) => !prev);
  };

  const handleActiveStartDateChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (activeStartDate) {
      const year = activeStartDate.getFullYear();
      const month = String(activeStartDate.getMonth() + 1).padStart(2, '0');
      const newYearMonth = `${year}-${month}`;

      if (newYearMonth !== yearMonth) {
        setYearMonth(newYearMonth);
      }
    }
  };

  // useEffect(() => {
  //   if (isSuccess && data) {
  //     console.log('API 데이터:', data);
  //     if (Array.isArray(data)) {
  //       setBooks(data);
  //     } else {
  //       console.error('API 데이터가 배열이 아닙니다:', data);
  //       setBooks([]);
  //     }
  //   } else if (isError) {
  //     console.error('API 데이터 로드 실패:', error);
  //     setBooks([]);
  //   }
  // }, [data, isSuccess, isError, error, setBooks]);

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
              onActiveStartDateChange={handleActiveStartDateChange}
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
          <div className=" w-[15rem]">
            <SaveList onClick={handleClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GridView;
