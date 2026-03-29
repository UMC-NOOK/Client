import BookSet from "../../../components/content/Calendar/Resource/BookSet";
import type { Count } from "../../../components/content/Calendar/Resource/BookSet"

//하루마다 필요한 정보들
type DayInfo = {
    day: string;
    count: <Count></Count>
}