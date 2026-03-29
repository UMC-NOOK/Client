import IndicatorSet from "../../../components/content/Calendar/Resource/IndicatorSet"
import type { Percent } from "../../../components/content/Calendar/Resource/Indicator";

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

//며칠 가져오기
//정보가 0부터 1월임, 맨 마지막 파라미터 0은 전달의 마지막 날 이란다.;;;(싸갈 이렇게어렵게 해둘거임?)
function getDatesInMonth(year: number, month: number){
    return new Date(year, month, 0).getDate();
}

//요일 가져오기
//for문 사용해서 해당안하는 날의 요일을 알아내야함(싸갈진짜 귀찮다.)
function getStartDay(year: number, month: number){
    const jsDay = new Date(year, month - 1 , 1).getDay(); // 1 : 월
    return (jsDay + 6) % 7;
}

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
    const startDay = getStartDay(year,month); //0부터 일요일임

    //내가 지정한 요일의 정보들로 배열 이루기
    const dayInfosForArray : DayInfoForArray[] = [];

    //앞에서부터 다 채워야겟지? staryDay전까지
    for(let i = 0; i < startDay; i++){
        dayInfosForArray.push({
            day:"",
            disable: false,
            percent: "none"
        });
    }

    //이제 채워넣기
    for(let l = 1; l <= lastDate; l ++ ){
        dayInfosForArray.push({
            day: String(l),
            disable: true,
            percent: toPercent(dayInformations[l].percent)
        });
    }

    return(
        <div className="flex flex-col w-full gap-6">
            <div className="grid grid-cols-7">
                {dayInfosForArray.map((d, index) => (
                    //Percent로 받아야함
                    <IndicatorSet
                        key={`${d.day || "none"}=${index}`}
                        day={d.day}
                        disable={d.disable}
                        percent={d.percent}
                    />))
                }
            </div>
        </div>
    )
 }
