import BookSet from "../../../components/content/Calendar/Resource/BookSet";
import type { Count } from "../../../components/content/Calendar/Resource/BookSet";
import { getDatesInMonth, getStartDay } from "./GlobalFunction";

// 클라이언트(부모)로부터 받는 원본 데이터
type DayInfo = {
  day: string;
  bookCount: number;
  coverUrl?: string | null;
  bookId: number | null;
};

// 내부에서 계산해서 BookSet에 넘길 데이터
type DayInfoForArray = {
  day: string;
  visible: boolean;
  disable: boolean;
  count: Count;
  coverUrl: string | null;
  bookNum: number;
};

type Props = {
  year: number;
  month: number;
  dayInfomations: DayInfo[];
  onSelectDate?: (date: string) => void;
};

function toCount(value: number): Count {
  if (value <= 1) {
    return "single";
  }

  return "multiple";
}

function toDisable(value: number): boolean {
  return value === 0;
}

export default function DayBookSet({
  year,
  month,
  dayInfomations,
  onSelectDate,
}: Props) {
  const lastDate = getDatesInMonth(year, month);
  const startDay = getStartDay(year, month);

  const dayInfosForArray: DayInfoForArray[] = [];

  for (let i = 0; i < startDay; i++) {
    dayInfosForArray.push({
      day: "",
      visible: false,
      disable: true,
      count: "single",
      coverUrl: null,
      bookNum: 0,
    });
  }

  for (let l = 1; l <= lastDate; l++) {
    const entry = dayInfomations.find((d) => d.day === String(l));
    const bookNum = entry?.bookCount ?? 0;

    dayInfosForArray.push({
      day: String(l),
      visible: true,
      disable: toDisable(bookNum),
      count: toCount(bookNum),
      coverUrl: entry?.coverUrl ?? null,
      bookNum,
    });
  }

  return (
    <div className="flex w-full flex-col">
      <div className="grid w-full grid-cols-7 gap-y-6 pb-4">
        {dayInfosForArray.map((d, index) => {
          const fullDate =
            d.day.trim() === ""
              ? ""
              : `${year}-${String(month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;

          return (
            <div
              key={`${d.day || "none"}-${index}`}
              className="flex min-w-0 justify-center"
            >
              <BookSet
                day={d.day}
                visible={d.visible}
                disable={d.disable}
                count={d.count}
                coverUrl={d.coverUrl}
                bookNum={d.bookNum}
                onClick={
                  d.visible
                    ? () => onSelectDate?.(fullDate)
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
