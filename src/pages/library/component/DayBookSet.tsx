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

// component props
type Props = {
  year: number;
  month: number;
  dayInfomations: DayInfo[];
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
}: Props) {
  const lastDate = getDatesInMonth(year, month);
  const startDay = getStartDay(year, month); // 0=월 … 6=일

  const dayInfosForArray: DayInfoForArray[] = [];

  // 앞쪽 빈칸 채우기
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

  // 날짜별 실제 데이터 채우기
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
        {dayInfosForArray.map((d, index) => (
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}