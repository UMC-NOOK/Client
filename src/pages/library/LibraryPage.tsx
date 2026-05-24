import DayBookSet from "./component/DayBookSet";
import DayIndicatorSet from "./component/DayIndicatorSet";
import BookGoal from "../../components/content/card/BookGoal/BookGoal";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import Icon from "../../components/action/Button/Icon";
import arrowRight from "../../assets/icons/arrow_right.svg";
import focus from "../../assets/icons/focus.svg";
import focusGray from "../../assets/icons/focus-gray.svg";
import book from "../../assets/icons/book.svg";
import book_gray_40 from "../../assets/icons/book_gray_40.svg"
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DayOfTheWeek from "../../components/content/Calendar/Resource/DayOfTheWeek";
import BottomBanner from "./modal/BottomBanner";
import DateFocusBookModal from "./modal/DateFocusBookModal";
import CaretDown from "../../assets/icons/caret_down.svg";
import CaretUp from "../../assets/icons/caret_up.svg";

import {
    useLibraryBookNum,
    useLibraryBookGoal,
    useLibraryFocusMonthly,
    useLibraryBooksMonthly,
    useLibraryDateToggle,
    useLibraryRecentBookInfo,
  } from "../../hooks/queries/library";

import {
    mockLibraryBookNumResponse,
    mockLibraryBookGoalResponse,
    MOCK_SPECIFIC_DATE_BOOK_ITEMS,
    mockLibraryFocusTimeResponse,
    mockLibraryBooksMonthlyResponse
} from "../../mocks/library/library"

import getGoalPercent from "./utils/getGoalPercent";
import DropDown from "../../components/section/dropDown/DropDown";
import { useLibrarySpecificDateBookInfo } from "../../hooks/queries/library/useLibrarySpecificDateBookInfo";
import { useAuthMe } from "../../hooks/queries/useAuthMe";



type SelectedYearMonth = {
    year: number;
    month: number;
  };


function formatFocusMinutes(totalFocusMin: number) {
    const hour = Math.floor(totalFocusMin / 60);
    const minute = totalFocusMin % 60;
  
    if (hour === 0) return `${minute}분 동안 포커스 했어요.`;
    if (minute === 0) return `${hour}시간 동안 포커스 했어요.`;
    return `${hour}시간 ${minute}분 동안 포커스 했어요.`;
  }
  

export default function LibraryPage() {
    const [selectedView, setSelectedView] = useState<"focus" | "book">("focus");
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedDate, setSelectedDate] = useState<string | "">("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isBannerOpen, setIsBannerOpen] = useState(true);
    const [cursor, setCursor] = useState(0);

    const { data: authMe, isLoading: isAuthMeLoading } = useAuthMe();
    const { data: libraryBookData, isLoading: isBookLoading } = useLibraryBookNum();
    const { data: libraryBookGoalData } = useLibraryBookGoal();
    console.log("libraryBookGoalData:", libraryBookGoalData);

    const { data: libraryToggleYearsData } = useLibraryDateToggle();
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const availableYears = libraryToggleYearsData?.years ?? [];
    const startYear = availableYears.length > 0 ? Math.min(...availableYears) : currentYear;
    const endYear = availableYears.length > 0 ? Math.max(...availableYears) : currentYear;

    const [selectedYearMonth, setSelectedYearMonth] = useState<SelectedYearMonth>({
        year: startYear,
        month: currentMonth,
      });

    const yearMonth = useMemo(() => {
        return `${selectedYearMonth.year}-${String(selectedYearMonth.month).padStart(2, "0")}`;
    }, [selectedYearMonth.year, selectedYearMonth.month]);

    const {
        data: libraryFocusMonthlyData,
        isLoading: isFocusMonthlyLoading,
        isError: isFocusMonthlyError,
      } = useLibraryFocusMonthly(yearMonth);

    const handleApplyYearMonth = (value: SelectedYearMonth) => {
        setSelectedYearMonth(value);
        setIsDropdownOpen(false);
    };

    const {
        data: libraryBooksMonthlyData,
        isLoading: isBooksMonthlyLoading,
        isError: isBooksMonthlyError,
      } = useLibraryBooksMonthly(yearMonth);

    const handleSelectFocusDate = (date: string) => {
        setSelectedDate(date);
        setIsModalOpen(true);
        setCursor(0);
      };

    const {
        data: specificDateBookInfo
    } = useLibrarySpecificDateBookInfo(
        isModalOpen, selectedDate, cursor);

    const { data: libraryRecentBookInfoData } = useLibraryRecentBookInfo();
    const bookId = libraryRecentBookInfoData?.bookId ?? 0;
    const title = libraryRecentBookInfoData?.title ?? "클라우드 쿠쿠 랜드";
    const coverUrl = libraryRecentBookInfoData?.coverUrl ?? "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop";
    const page = libraryRecentBookInfoData?.page ?? 147;
    const focusTime = libraryRecentBookInfoData?.focusTime?? "08:10:22";
    
    const dropdownPositionClass =
        selectedView === "focus"
            ? "absolute right-12 z-50 bottom-94"
            : "absolute right-12 z-50 bottom-124";

    //mock
    const mockTotalBookNum = mockLibraryBookNumResponse.result.totalBookNum;
    const mockLibraryBookGoal = mockLibraryBookGoalResponse.result;

    const totalBookNum = libraryBookData?.totalBookNum ?? 0;
    const goal = libraryBookGoalData?.goal ?? mockLibraryBookGoal.goal;
    const remainingCount = libraryBookGoalData?.remainingCount ?? mockLibraryBookGoal.remainingCount;
    console.log( libraryBookGoalData?.remainingCount);
    const progressPercent = libraryBookGoalData?.progressPercent ?? mockLibraryBookGoal.progressPercent;
    console.log(libraryBookGoalData?.progressPercent);
    const iconProgressPercent = getGoalPercent(progressPercent);

    const focusItems =
        libraryFocusMonthlyData?.focusBookItems &&
        libraryFocusMonthlyData.focusBookItems.length > 0
            ? libraryFocusMonthlyData.focusBookItems
            : mockLibraryFocusTimeResponse.result.focusBookItems;

    const totalFocusMin =
        libraryFocusMonthlyData?.focusBookItems &&
        libraryFocusMonthlyData.focusBookItems.length > 0
            ? libraryFocusMonthlyData.totalFocusMin
            : mockLibraryFocusTimeResponse.result.totalFocusMin;

    const hasBookMockFallback =
        !libraryBooksMonthlyData?.days ||
        libraryBooksMonthlyData.days.length === 0;
          
    const bookDays = hasBookMockFallback
        ? mockLibraryBooksMonthlyResponse.result.days
        : libraryBooksMonthlyData.days;
          
    const totalBookCount = hasBookMockFallback
        ? mockLibraryBooksMonthlyResponse.result.totalBookCount
        : libraryBooksMonthlyData.totalBookCount;
    
    const dayBookInformations = bookDays.map((item) => ({
        day: String(new Date(item.date).getDate()),
        bookCount: item.bookCount,
        coverUrl: item.topBook?.coverUrl ?? null,
        bookId: item.topBook?.bookId ?? null,
      }));
    
    const bookBottomText = isBooksMonthlyLoading
        ? "독서한 책을 불러오는 중이에요."
        : isBooksMonthlyError
            ? "독서한 책을 불러오지 못했어요."
            : `${totalBookCount}권의 책을 독서했어요.`;
    
    const focusBottomText = isFocusMonthlyLoading
        ? "포커스 시간을 불러오는 중이에요."
        : isFocusMonthlyError
            ? "포커스 시간을 불러오지 못했어요."
            : formatFocusMinutes(totalFocusMin);
    
    const modalItems =
        specificDateBookInfo?.items ?? MOCK_SPECIFIC_DATE_BOOK_ITEMS;
    
    const nickName = authMe?.nickName ?? "";

    return (
        <div className="relative flex flex-col w-full">
            <div className="flex flex-col pt-6.5">
                <div className="flex flex-row gap-1">
                    <label className="text-label-20-b text-gray-90">
                        {isAuthMeLoading ? "" : nickName}
                    </label>
                    <label className="text-label-20-b text-gray-90">님의 서재에</label>
                </div>

                <div className="flex flex-row gap-1 pt-2.5">
                    <div>
                        <label className="text-label-20-b text-yellow-70">
                            {isBookLoading ? mockTotalBookNum : totalBookNum}
                        </label>
                        <label className="text-label-20-b text-yellow-70">권</label>
                        <label className="text-label-20-b text-gray-90">의 책이 있어요.</label>
                    </div>
                    <Link to="/library/status">
                        <Icon size="m" className="items-center">
                            <img src={arrowRight}/>
                        </Icon>
                    </Link>
                </div>

                <Link
                    to="/users/me/onboarding/goal"
                    className="block w-full pt-4 text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-gray-40 focus-visible:ring-offset-2 rounded-[8px]"
                >
                    <BookGoal
                        percent={iconProgressPercent}
                        message={`${goal}권까지 ${remainingCount}권 남았어요.`}
                    />
                </Link>
            </div>

            <div className="flex flex-col pt-8">
                <div className="flex w-full">
                    <SectionHeader
                        size="16"
                        top={
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <div className="text-label-16-b text-gray-90">
                                    {selectedYearMonth.month}월 독서 달력
                                </div>
                                <div 
                                    className="flex w-3 h-3 items-center justify-center"
                                    onClick={() => setIsDropdownOpen((prev) => !prev)}>
                                    <img
                                        src={isDropdownOpen ? CaretUp : CaretDown}
                                    />
                                </div>
                                {isDropdownOpen && (
                                    <div className={dropdownPositionClass}> 
                                        <DropDown 
                                            initialYear={selectedYearMonth.year} 
                                            initialMonth={selectedYearMonth.month} 
                                            startYear={startYear} 
                                            endYear={endYear} 
                                            onApply={handleApplyYearMonth}
                                        /> 
                                    </div>
                                )}   
                            </div>
                        }
                        bottom={
                            <div className="text-label-14-sb text-gray-70">
                                {selectedView === "focus"
                                ? focusBottomText
                                : bookBottomText}
                            </div>
                        }
                    />

                    <div className="ml-auto flex flex-row gap-0">
                        <div
                            className="cursor-pointer"
                            onClick={() => setSelectedView("focus")}
                        >
                            <Icon size="m">
                                <img
                                    src={selectedView === "focus" ? focus : focusGray}
                                    alt=""
                                />
                            </Icon>
                        </div>

                        <div
                            className="cursor-pointer"
                            onClick={() => setSelectedView("book")}
                        >
                            <Icon size="m">
                                <img
                                    src={selectedView === "book" ? book : book_gray_40}
                                    alt=""
                                />
                            </Icon>
                        </div>
                    </div>
                </div>

                <div className="grid w-full grid-cols-7 pt-4">
                    {(["월", "화", "수", "목", "금", "토", "일"] as const).map((d) => (
                        <div key={d} className="flex justify-center">
                            <DayOfTheWeek text={d} />
                        </div>
                    ))}
                </div>

                <div className="pt-2">
                {selectedView === "focus" ? (
                    <DayIndicatorSet
                        year={selectedYearMonth.year}
                        month={selectedYearMonth.month}
                        dayInformations={focusItems}
                        onSelectDate={handleSelectFocusDate}
                  />
                ) : (
                    <DayBookSet
                        year={selectedYearMonth.year}
                        month={selectedYearMonth.month}
                        dayInfomations={dayBookInformations}
                        onSelectDate={handleSelectFocusDate}
                    />
                )}
                </div>
            </div>

            {isBannerOpen && (
                <BottomBanner
                    bookId={bookId}
                    title={title}
                    coverUrl={coverUrl}
                    page={page}
                    focusTime={focusTime}
                    onClick={(bookId) => {
                        console.log("이동:", bookId);
                    }}
                    onClose={() => {
                        setIsBannerOpen(false);
                    }}
                />
            )}

            <DateFocusBookModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDate={selectedDate}
                items={modalItems}
            />
        </div>
    );
}