import IndicatorSet from "../../../components/content/Calendar/Resource/IndicatorSet"
import type { Percent } from "../../../components/content/Calendar/Resource/Indicator";
import {getDatesInMonth, getStartDay} from "./GlobalFunction";

//dayInfo
type DayInfo = {
  day: string;
  percent: string;
};

type DayInfoForArray = {
    day: string;
    disable: boolean;
    percent: Percent;
}

//componentInfo
type Props = {
  year: number;
  month: number; 
  dayInformations: DayInfo[];
};

//string Percent
function toPercent(value: string): Percent {
  if (
    value === "none" ||
    value === "0" ||
    value === "25" ||
    value === "50" ||
    value === "75" ||
    value === "100"
  ) {
    return value;
  }

  return "none";
}

export default function DayIndicatorSet({
    year,
    month,
    dayInformations
}: Props){
    //해당 년/월에 따른 요일/며칠 정보 가져오기
    const lastDate = getDatesInMonth(year, month);
    const startDay = getStartDay(year, month); // 0=월 … 6=일 (헤더 월~일과 동일)

    //내가 지정한 요일의 정보들로 배열 이루기
    const dayInfosForArray : DayInfoForArray[] = [];

    const noServerData = dayInformations.length === 0;
    /** 빈 배열이면 그 달의 모든 일자는 0%로 채움. 데이터가 있으면 매칭되는 날만 서버 값, 없으면 none */
    const defaultPercentForDay = noServerData ? "0" : "none";

    //앞에서부터 다 채워야겟지? staryDay전까지
    for(let i = 0; i < startDay; i++){
        dayInfosForArray.push({
            day:"",
            disable: false,
            percent: "none"
        });
    }

    //이제 채워넣기 (day 문자열로 find — 빈 배열이어도 안전)
    for (let l = 1; l <= lastDate; l++) {
        const entry = dayInformations.find((d) => d.day === String(l));
        const raw = entry?.percent ?? defaultPercentForDay;
        dayInfosForArray.push({
            day: String(l),
            disable: true,
            percent: toPercent(raw),
        });
    }

    return(
        <div className="flex flex-col w-full">
            <div className="grid w-full grid-cols-7 pb-4 gap-y-6">
                {dayInfosForArray.map((d, index) => (
                    <div
                        key={`${d.day || "none"}=${index}`}
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
    )
 }
