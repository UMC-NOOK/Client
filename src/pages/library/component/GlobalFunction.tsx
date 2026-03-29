export function getDatesInMonth(year: number, month: number){
    return new Date(year, month, 0).getDay();
}

export function getStartDay(year: number, month: number){
    const jsDay = new Date(year, month - 1 , 1).getDate(); // 1 : 월
    return (jsDay + 6) % 7;
}