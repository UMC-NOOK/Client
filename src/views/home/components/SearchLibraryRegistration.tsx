import { useState, useRef, useEffect } from 'react';

import chevron_left from '/src/assets/button/book-info/chevron-left.svg';
import calendar from '/src/assets/button/book-info/calendar.svg';

import Calendar from '../../lounge/components/book-info/calendar';
import usePostBookRegistration from '../hooks/useMutation/usePostBookRegistration';
import useGetCalendar from '../../lounge/hooks/useQuery/book-info-query/useGetCalendar';

interface LibraryRegistrationProps {
  onRegister: () => void;
  closeModal: () => void;
  bookImg?: string;
  bookTitle?: string;
  bookAuthor?: string;
  bookId?: number; // 상위에서 보장되지만 가드 유지
}

const LibraryRegistration = ({
  onRegister,
  closeModal,
  bookImg,
  bookTitle,
  bookAuthor,
  bookId,
}: LibraryRegistrationProps) => {
  // ---- 날짜 포맷터 ----
  const formatDate = (date: Date) => {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    return `${y}.${m}.${d} (${dayNames[date.getDay()]})`;
  };
  const serverFormatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    return `${y}-${m}-${d}`;
  };
  const serverFormatDateYM = (date: Date) => {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    return `${y}-${m}`;
  };

  // ---- 캘린더 상태 ----
  const [yearMonth, setYearMonth] = useState(serverFormatDateYM(new Date()));
  const { disabledDateSet } = useGetCalendar(yearMonth);
  const disabledList: number[] = disabledDateSet ?? [];

  const today = new Date();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDateAsDate, setSelectedDateAsDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [serverSelectedDate, setServerSelectedDate] = useState(serverFormatDate(today));
  const calendarRef = useRef<HTMLDivElement>(null);

  const calendarModalHandler = () => setIsCalendarOpen((prev) => !prev);
  const calendarRegisterHandler = (date: Date) => {
    setSelectedDate(formatDate(date));
    setYearMonth(serverFormatDateYM(date));
    setSelectedDateAsDate(date);
    setServerSelectedDate(serverFormatDate(date));
  };

  // 외부 클릭 시 달력 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isCalendarOpen && calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
        setYearMonth(serverFormatDateYM(selectedDateAsDate));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCalendarOpen, selectedDateAsDate]);

  // ---- 독서 상태 매핑 (1=READING, 2=FINISHED, 3=BOOKMARK) ----
  const [readingStatus, setReadingStatus] = useState(1);
  type ReadingStatus = 'READING' | 'FINISHED' | 'BOOKMARK';
  const statusToServer: ReadingStatus =
    readingStatus === 1 ? 'READING' : readingStatus === 2 ? 'FINISHED' : 'BOOKMARK';

  // ---- 등록 뮤테이션 (bookId 없으면 0 전달하되, 실제 저장은 가드) ----
  const { mutate: postBookRegistration, isPending } = usePostBookRegistration(bookId ?? 0);

  const canSave = Boolean(bookId) && !isPending;

  const handleSave = () => {
    if (!bookId) {
      alert('bookId가 없습니다. 다시 시도해 주세요.');
      return;
    }
    postBookRegistration(
      { date: serverSelectedDate, readingStatus: statusToServer },
      {
        onSuccess: () => {
          onRegister(); // 성공시에만 후속 처리
          closeModal();
        },
        onError: (err: any) => {
          console.error('도서 등록 실패:', err);
          // 서버에서 '이미 등록' 등의 메시지를 내려주면 그대로 노출
          alert(err?.response?.data?.message || '도서 등록에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="w-[440px] flex flex-col justify-start items-center bg-[rgba(45,40,34,1)] rounded-2xl px-17 relative pb-10">
        {/* 헤더 */}
        <div className="w-full h-11 mt-15 mb-17">
          <button
            type="button"
            className="absolute top-16 left-14 flex items-center gap-2"
            onClick={closeModal}
            aria-label="뒤로가기"
          >
            <img src={chevron_left} alt="" />
          </button>
          <div className="text-white text-center text-lg font-semibold">서재 등록</div>
        </div>

        {/* 본문 */}
        <div className="flex items-center justify-between w-full gap-17 mb-20">
          <div className="w-[135px] h-[198px] ml-4">
            {bookImg ? <img src={bookImg} alt="" /> : <div className="w-full h-full bg-black/20 rounded" />}
          </div>

          <div className="flex flex-col gap-8 w-[207px]">
            <div className="flex flex-col gap-4 items-start">
              <div className="text-[rgba(255,255,255,0.50)] text-xs">제목</div>
              <div className="text-white text-sm">{bookTitle ?? '-'}</div>
            </div>

            <div className="flex flex-col gap-4 items-start">
              <div className="text-[rgba(255,255,255,0.50)] text-xs">저자</div>
              <div className="text-white text-sm">{bookAuthor ?? '-'}</div>
            </div>

            <div className="flex flex-col gap-4 items-start relative" ref={calendarRef}>
              <div className="text-[rgba(255,255,255,0.50)] text-xs">날짜</div>
              <button
                type="button"
                className="flex items-center justify-between w-[207px] rounded-sm bg-[rgba(31,28,25,0.5)] px-5 py-[9px]"
                onClick={calendarModalHandler}
                aria-expanded={isCalendarOpen}
                aria-haspopup="dialog"
              >
                <span className="text-white text-sm">{selectedDate}</span>
                <span className="w-7 h-7">
                  <img src={calendar} alt="" />
                </span>
              </button>

              {isCalendarOpen && (
                <Calendar
                  onRegister={calendarRegisterHandler}
                  closeModal={() => {
                    setIsCalendarOpen(false);
                    setYearMonth(serverFormatDateYM(selectedDateAsDate));
                  }}
                  currentSelectedDate={selectedDate}
                  currentDateAsDate={selectedDateAsDate}
                  disabledDateSet={disabledList}
                  onMonthChange={(yyyyMM) => setYearMonth(yyyyMM)}
                />
              )}
            </div>
          </div>
        </div>

        {/* 독서 상태 */}
        <div className="flex flex-col items-start w-full gap-5 mb-12">
          <div className="text-white text-xs">독서 상태</div>
          <div className="flex justify-between w-full gap-[11px]">
            {[1, 2, 3].map((status, idx) => (
              <button
                key={status}
                type="button"
                className={`w-[117px] h-[38px] rounded border border-solid border-nook-br-100 px-10 py-2 text-sm ${
                  readingStatus === status ? 'bg-nook-br-100 text-white' : 'text-[rgba(255,255,255,0.50)]'
                }`}
                onClick={() => setReadingStatus(status)}
              >
                {['독서중', '완독', '찜'][idx]}
              </button>
            ))}
          </div>
        </div>

        {/* 저장 */}
        <button
          type="button"
          disabled={!canSave}
          className="w-full h-20 px-10 py-2 rounded bg-nook-br-100 text-white text-base font-semibold text-center flex items-center justify-center disabled:opacity-60"
          onClick={handleSave}
        >
          {isPending ? '저장 중…' : '저장'}
        </button>
      </div>
    </div>
  );
};

export default LibraryRegistration;
