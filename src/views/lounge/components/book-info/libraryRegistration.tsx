import { useState, useRef, useEffect } from 'react';
import chevron_left from '/src/assets/button/book-info/chevron-left.svg';
import calendar from '/src/assets/button/book-info/calendar.svg';
import bookImgEx from '/src/assets/button/book-info/bookImgEx.png';
import Calendar from './calendar';

interface LibraryRegistrationProps {
  onRegister: () => void;
  closeModal: () => void;
}

const LibraryRegistration = ({
  onRegister,
  closeModal,
}: LibraryRegistrationProps) => {
  const formatDate = (date: Date) => {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const dayOfWeek = dayNames[date.getDay()];
    return `${year}.${month}.${day} (${dayOfWeek})`;
  };

  const today = new Date();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDateAsDate, setSelectedDateAsDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const calendarRef = useRef<HTMLDivElement>(null);

  const calendarModalHandler = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const calendarRegisterHandler = (date: Date) => {
    setSelectedDate(formatDate(date));
    setSelectedDateAsDate(date);
  };

  // 외부 클릭 시 달력 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isCalendarOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  const [readingStatus, setReadingStatus] = useState(1);
  const handleClickSave = () => {
    console.log('저장 버튼 클릭됨', readingStatus);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="w-[440px] flex flex-col justify-start items-center bg-[rgba(45,40,34,1)] rounded-2xl px-17 relative pb-10">
        <div className="w-full h-11 mt-15 mb-17">
          <div className="absolute top-16 left-14 flex items-center gap-2">
            <img
              src={chevron_left}
              alt="Chevron Left Icon"
              onClick={closeModal}
            />
          </div>
          <div className="text-white text-center text-lg font-semibold">
            서재 등록
          </div>
        </div>

        <div className="flex items-center justify-between w-full gap-17 mb-20">
          <div className="w-[135px] h-[198px] ml-4">
            <img src={bookImgEx} alt="" />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 items-start">
              <div className="text-[rgba(255,255,255,0.50)] text-xs">제목</div>
              <div className="text-white text-sm">칵테일, 러브, 좀비</div>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <div className="text-[rgba(255,255,255,0.50)] text-xs">저자</div>
              <div className="text-white text-sm">조예은</div>
            </div>
            <div
              className="flex flex-col gap-4 items-start relative"
              ref={calendarRef}
            >
              <div className="text-[rgba(255,255,255,0.50)] text-xs">날짜</div>
              <div
                className="flex items-center justify-between w-[207px] rounded-sm bg-[rgba(31,28,25,0.5)] px-5 py-[9px] cursor-pointer"
                onClick={calendarModalHandler}
              >
                <div className="text-white text-sm">{selectedDate}</div>
                <div className="w-7 h-7">
                  <img src={calendar} alt="" />
                </div>
              </div>
              {isCalendarOpen && (
                <Calendar
                  onRegister={calendarRegisterHandler}
                  closeModal={() => setIsCalendarOpen(false)}
                  currentSelectedDate={selectedDate}
                  currentDateAsDate={selectedDateAsDate}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start w-full gap-5 mb-12">
          <div className="text-white text-xs">독서 상태</div>
          <div className="flex justify-between w-full gap-[11px]">
            {[1, 2, 3].map((status, idx) => (
              <button
                key={status}
                className={`w-[117px] h-[38px] rounded border border-solid border-nook-br-100 px-10 py-2 text-sm ${readingStatus === status ? 'bg-nook-br-100 text-white' : 'text-[rgba(255,255,255,0.50)]'}`}
                onClick={() => setReadingStatus(status)}
              >
                {['독서중', '완독', '찜'][idx]}
              </button>
            ))}
          </div>
        </div>

        <div
          className="w-full h-20 px-10 py-2 rounded bg-nook-br-100 text-white text-base font-semibold text-center cursor-pointer"
          onClick={() => {
            onRegister();
            handleClickSave();
          }}
        >
          저장
        </div>
      </div>
    </div>
  );
};

export default LibraryRegistration;
