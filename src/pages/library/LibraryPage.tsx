import DayBookSet from "./component/DayBookSet";
import DayIndicatorSet from "./component/DayIndicatorSet";
import BookGoal from "../../components/content/card/BookGoal/BookGoal";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import Icon from "../../components/action/Button/Icon";
import arrowRight from "../../assets/icons/arrow_right.svg";
import focus from "../../assets/icons/focus.svg";
import focusGray from "../../assets/icons/focus-gray-40.svg";
import book from "../../assets/icons/book.svg";
import book_gray_40 from "../../assets/icons/book_gray_40.svg";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DayOfTheWeek from "../../components/content/Calendar/Resource/DayOfTheWeek";
import BottomBanner from "./modal/BottomBanner";
import DateFocusBookModal from "./modal/DateFocusBookModal";
import LoadingState from "../../components/feedback/LoadingState";
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
} from "../../mocks/library/library";

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
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(
    () => sessionStorage.getItem("libraryBottomBannerDismissed") !== "true",
  );
  const [modalCursor, setModalCursor] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: authMe, isLoading: isAuthMeLoading } = useAuthMe();
  const { data: libraryBookData, isLoading: isBookLoading } = useLibraryBookNum();
  const { data: libraryBookGoalData, isLoading: isBookGoalLoading } =
    useLibraryBookGoal();
  const { data: libraryToggleYearsData, isLoading: isYearsLoading } =
    useLibraryDateToggle();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const availableYears = libraryToggleYearsData?.years ?? [];
  const startYear =
    availableYears.length > 0 ? Math.min(...availableYears) : currentYear;
  const endYear =
    availableYears.length > 0 ? Math.max(...availableYears) : currentYear;

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
  } = useLibraryFocusMonthly(yearMonth, selectedView === "focus");

  const {
    data: libraryBooksMonthlyData,
    isLoading: isBooksMonthlyLoading,
    isError: isBooksMonthlyError,
  } = useLibraryBooksMonthly(yearMonth, selectedView === "book");

  const handleApplyYearMonth = (value: SelectedYearMonth) => {
    setSelectedYearMonth(value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (dropdownRef.current?.contains(event.target as Node)) return;
      setIsDropdownOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isDropdownOpen]);

  const handleSelectFocusDate = (date: string) => {
    setSelectedDate(date);
    setModalCursor(null);
    setIsModalOpen(true);
  };

  const {
    data: specificDateBookInfo,
    isLoading: isSpecificDateLoading,
  } = useLibrarySpecificDateBookInfo(isModalOpen, selectedDate, modalCursor);

  const {
    data: libraryRecentBookInfoData,
    isLoading: isRecentBookLoading,
  } = useLibraryRecentBookInfo();

  const dropdownPositionClass =
    selectedView === "focus"
      ? "absolute right-20 bottom-81 z-50"
      : "absolute right-20 bottom-115 z-50";

  const mockLibraryBookGoal = mockLibraryBookGoalResponse.result;

  const totalBookNum = libraryBookData?.totalBookNum ?? 0;
  const goal = libraryBookGoalData?.goal ?? mockLibraryBookGoal.goal;
  const remainingCount =
    libraryBookGoalData?.remainingCount ?? mockLibraryBookGoal.remainingCount;
  const progressPercent =
    libraryBookGoalData?.progressPercent ?? mockLibraryBookGoal.progressPercent;
  const iconProgressPercent = getGoalPercent(progressPercent);

  const focusItems = libraryFocusMonthlyData?.focusBookItems ?? [];
  const totalFocusMin = libraryFocusMonthlyData?.totalFocusMin ?? 0;

  const bookDays = libraryBooksMonthlyData?.days ?? [];
  const totalBookCount = libraryBooksMonthlyData?.totalBookCount ?? 0;

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

  const modalItems = specificDateBookInfo?.items ?? [];

  const nickName = authMe?.nickName ?? "";

  const isPageLoading =
    isAuthMeLoading ||
    isBookLoading ||
    isBookGoalLoading ||
    isYearsLoading ||
    isRecentBookLoading ||
    isSpecificDateLoading ||
    (selectedView === "focus"
      ? isFocusMonthlyLoading
      : isBooksMonthlyLoading);

  if (isPageLoading) {
    return <LoadingState variant="fullscreen" />;
  }

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
              {isBookLoading
                ? mockLibraryBookNumResponse.result.totalBookNum
                : totalBookNum}
            </label>
            <label className="text-label-20-b text-yellow-70">권</label>
            <label className="text-label-20-b text-gray-90">의 책이 있어요.</label>
          </div>
          <Link to="/library/status">
            <Icon size="m" className="items-center">
              <img src={arrowRight} />
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

      <div className="flex flex-col pt-8 pb-10">
        <div className="flex w-full">
          <SectionHeader
            size="16"
            top={
              <div
                ref={dropdownRef}
                className="flex flex-row gap-2 items-center justify-center"
              >
                <button
                  type="button"
                  className="flex items-center justify-center gap-2"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <span className="text-label-16-b text-gray-90">
                    {selectedYearMonth.month}월 독서 달력
                  </span>
                  <span className="flex w-3 h-3 items-center justify-center">
                    <img src={isDropdownOpen ? CaretUp : CaretDown} alt="" />
                  </span>
                </button>
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
                {selectedView === "focus" ? focusBottomText : bookBottomText}
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

      {isBannerOpen && libraryRecentBookInfoData ? (
        <BottomBanner
          bookId={libraryRecentBookInfoData.bookId}
          title={libraryRecentBookInfoData.title}
          coverUrl={libraryRecentBookInfoData.coverUrl}
          page={libraryRecentBookInfoData.page}
          focusTime={libraryRecentBookInfoData.focusTime}
          onClick={() => {
            console.log("이동:", libraryRecentBookInfoData.bookId);
          }}
          onClose={() => {
            sessionStorage.setItem("libraryBottomBannerDismissed", "true");
            setIsBannerOpen(false);
          }}
        />
      ) : null}

      <DateFocusBookModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        items={modalItems}
      />
    </div>
  );
}
