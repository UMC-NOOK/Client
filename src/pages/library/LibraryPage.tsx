import DayBookSet from "./component/DayBookSet";
import DayIndicatorSet from "./component/DayIndicatorSet";
import BookGoal  from "../../components/content/card/BookGoal/BookGoal";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import Icon from "../../components/action/Button/Icon";
import arrowRight from "../../assets/icons/arrow_right.svg";
import focus from "../../assets/icons/focus.svg";
import focusGray from "../../assets/icons/focus-gray.svg";
import book from "../../assets/icons/book.svg";
import bookGray from "../../assets/icons/book-gray.svg";
import { useState } from "react";
import DayOfTheWeek from "../../components/content/Calendar/Resource/DayOfTheWeek";



export default function LibraryPage(){
    //state가 focus 일 때,
    const [selectedView, setSelectedView] = useState<"focus"|"book">("focus");


    return(
        <div className="flex flex-col w-full">
            <div className="flex flex-col pt-6">
                <div className="flex flex-row gap-1">
                    <label className="text-label-20-b text-gray-90">
                        경민
                    </label>
                    <label className="text-label-20-b text-gray-90">
                        님의 서재에
                    </label>
                </div>
                <div className="flex flex-row gap-1 pt-2.5">
                    <div>
                        <label className="text-label-20-b text-yellow-70">
                            106권
                        </label>
                        <label className="text-label-20-b text-gray-90">
                            의 책이 있어요.
                        </label>
                    </div>
                    <Icon size="m" className="items-center">
                        <img src={arrowRight}/>
                    </Icon>
                </div>
                <div className="pt-4">
                    <BookGoal percent="PCT_1_9" message="100권까지 99권 남았어요."/>
                </div>
            </div>

            <div className="flex flex-col pt-8">
                <div className="flex w-full">
                    <SectionHeader 
                        size="16"
                        top={
                            <div className="flex flex-row gap-2 justify-center">
                                <div className="text-label-16-b text-gray-90">
                                    12월 독서 달력
                                </div>
                            </div>
                        }
                        bottom={
                            <div className="text-label-14-sb text-gray-70">
                                {selectedView === "focus"
                                    ? "52시간 17분 동안 포커스 했어요."
                                    : "0권의 책을 독서했어요."}
                            </div>
                        }>
                        
                    </SectionHeader>

                    <div className="ml-auto flex flex-row gap-0">
                        <div
                            className="cursor-pointer"
                            onClick={() => setSelectedView("focus")}
                        >
                            <Icon size="m">
                                <img src={selectedView === "focus" ? focus : focusGray} alt="" />
                            </Icon>
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => setSelectedView("book")}
                        >
                            <Icon size="m">
                                <img src={selectedView === "book" ? book : bookGray} alt="" />
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
                        <DayIndicatorSet year={2026} month={4} dayInformations={[]} />
                    ) : (
                        <DayBookSet year={2026} month={4} dayInfomations={[]} />
                    )}
                </div>

            </div>

        </div>
    )
}