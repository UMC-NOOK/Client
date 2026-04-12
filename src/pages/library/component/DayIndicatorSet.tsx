import IndicatorSet from "../../../components/content/Calendar/Resource/IndicatorSet";
import type { Percent } from "../../../components/content/Calendar/Resource/Indicator";
import { getDatesInMonth, getStartDay } from "./GlobalFunction";
import type { FocusTimeItems, FocusTimeSlotType } from "../../../types/libraryInfo/library";

function toPercentFromTimeSlot(value: FocusTimeSlotType): Percent {
  switch (value) {
    case "FOCUS_00":
      return "none";
    case "FOCUS_01":
      return "25";
    case "FOCUS_02":
      return "50";
    case "FOCUS_03":
      return "75";
    case "FOCUS_04":
      return "100";
    default:
      return "none";
  }
}

type DayInfoForArray = {
  day: string;
  disable: boolean;
  percent: Percent;
};

type Props = {
  year: number;
  month: number;
  dayInformations: FocusTimeItems[];
};

export default function DayIndicatorSet({
  year,
  month,
  dayInformations,
}: Props) {
  const lastDate = getDatesInMonth(year, month);
  const startDay = getStartDay(year, month);

  const dayInfosForArray: DayInfoForArray[] = [];

  const noServerData = dayInformations.length === 0;
  const defaultPercentForDay: Percent = noServerData ? "0" : "none";

  for (let i = 0; i < startDay; i++) {
    dayInfosForArray.push({
      day: "",
      disable: false,
      percent: "none",
    });
  }

  for (let l = 1; l <= lastDate; l++) {
    const entry = dayInformations.find((d) => {
      const entryDay = new Date(d.date).getDate();
      return entryDay === l;
    });

    const percent = entry
      ? toPercentFromTimeSlot(entry.timeSlot)
      : defaultPercentForDay;

    dayInfosForArray.push({
      day: String(l),
      disable: true,
      percent,
    });
  }

  return (
    <div className="flex flex-col w-full">
      <div className="grid w-full grid-cols-7 pb-4 gap-y-6">
        {dayInfosForArray.map((d, index) => (
          <div
            key={`${d.day || "none"}-${index}`}
            className="flex min-w-0 justify-center"
          >
            <IndicatorSet
              day={d.day}
              disable={d.disable}
              percent={d.percent}
            />
          </div>
        ))}
      </div>
    </div>
  );
}