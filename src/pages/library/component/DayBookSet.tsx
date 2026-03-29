import BookSet from "../../../components/content/Calendar/Resource/BookSet";
import type { Count } from "../../../components/content/Calendar/Resource/BookSet";
import {getDatesInMonth, getStartDay} from "./GlobalFunction";

//클라이언트로부터 얻어야하는 각 day의 정보
type DayInfo = {
    day: string;
    imageUrl?: string;//없을 수도 잇음
    bookNum?: number;//0일 수도 있음
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




//visible : 내가 해야함
//disable: 책 정보 0 이면...
//count : 책 정보 1이면 -> single, 초과면 -> multiple

//아 졸라 ASMR
function toCount