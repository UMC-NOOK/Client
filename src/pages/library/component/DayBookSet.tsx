import BookSet from "../../../components/content/Calendar/Resource/BookSet";
import type { Count } from "../../../components/content/Calendar/Resource/BookSet";
import {getDatesInMonth, getStartDay} from "./GlobalFunction";

//클라이언트로부터 얻어야하는 각 day의 정보
type DayInfo = {
    day: string;
    imageUrl?: string;//없을 수도 잇음
    bookNum: number;//0일 수도 있음
};

//배열에 넣을 정보들
type DayInfoForArray = {
    day: string;
    visible: boolean;
    disable: boolean;
    count: Count;
    imageUrl: string | null;
    bookNum: number;
}

//componentInfo
type Props = {
    year: number;
    month: number;
    dayInfomations: DayInfo[];
};

function toCount(value: number): Count {
    if(value == 0 || value == 1){
        const result = "single";
        return result;
    }

    return "multiple";
}

function toDisable(value: number): boolean {
    if(value == 0){
        return true;
    }

    return false;
}


//visible : 채워넣기
//disable: 책 정보 0 이면...
//count : 책 정보 1이면 -> single, 초과면 -> multiple

export default function DayBookSet({
    year,
    month,
    dayInfomations
}: Props){
    const lastDate = getDatesInMonth(year, month);
    const startDay = getStartDay(year, month); // 0=월 … 6=일 (헤더 월~일과 동일)

    const dayInfosForArray : DayInfoForArray[] = [];

    for(let i = 0; i < startDay; i++){
        dayInfosForArray.push({
            day: "",
            visible: false,
            disable: true,
            count: "single",
            imageUrl: null,
            bookNum: 0
        });
    }


    for (let l = 1; l <= lastDate; l++) {
        const entry = dayInfomations.find((d) => d.day === String(l));
        const bookNum = entry?.bookNum ?? 0;
        dayInfosForArray.push({
            day: String(l),
            visible: true,
            disable: toDisable(bookNum),
            count: toCount(bookNum),
            imageUrl: entry?.imageUrl ?? null,
            bookNum,
        });
    }

    return(
            <div className="flex w-full flex-col">
                <div className="grid w-full grid-cols-7 gap-y-6 pb-4">
                    {dayInfosForArray.map((d, index) => (
                        <div
                            key={`${d.day || "none"}=${index}`}
                            className="flex min-w-0 justify-center"
                        >
                            <BookSet
                                day={d.day}
                                visible={d.visible}
                                disable={d.disable}
                                count={d.count}
                                imageUrl={d.imageUrl}
                                bookNum={d.bookNum}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
}
