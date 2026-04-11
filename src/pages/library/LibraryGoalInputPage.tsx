import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/action/Button/Icon";
import close from "../../assets/icons/close.svg";
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import { Text } from "../../components/action/Button/Text";
import SectionHeader from "../../components/content/InformationText/SectionHeader";

function getRemainingDaysInYear(date = new Date()) {
    const year = date.getFullYear();
    
    const startOfToday = new Date(year, date.getMonth(), date.getDate());
    const endOfToday = new Date(year, 11, 31);
  
    const diffMs = endOfToday.getTime() - startOfToday.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    return {
      year,
      remainingDays: diffDays,
    };
  }

export default function LibraryGoalInputPage() {
    const [goalCount, setGoalCount] = useState("");

    const { year, remainingDays } = getRemainingDaysInYear();

    return(
        <div className="flex flex-col">
            <div className="pt-2">
                <TopNavigation
                    left={
                        <Link
                            to="/library"
                            className="inline-flex text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-gray-40 focus-visible:ring-offset-2 rounded-full"
                        >
                            <Icon size="m">
                                <img src={close} alt="" />
                            </Icon>
                        </Link>
                    }
                    right={
                        <Text
                            text="완료"
                            size="18"
                        />
                    }                
                />
            </div>
            <div className="flex flex-col px-1 pt-12 gap-10">
                    <div>
                        <SectionHeader
                            size="20"
                            top={
                                <div>
                                    <div>
                                        올해 몇 권의 책을 읽고 싶은지
                                    </div>
                                    <div>
                                        목표를 설정해주세요.
                                    </div>
                                </div>
                            }
                            bottom={`${year}년은 ${remainingDays}일 남았어요.`}
                        />
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <div className="flex h-[54px] w-[305px] items-center rounded-[8px] bg-gray-17 py-3 px-4">
                            <input
                                type="text"
                                autoComplete="off"
                                value={goalCount}
                                onChange={(e) => setGoalCount(e.target.value)}
                                placeholder="몇"
                                className="w-full bg-transparent text-label-20-b text-gray-90 outline-none  placeholder:text-label-20-b placeholder:text-gray-70"
                            />
                        </div>
                        <div className="text-label-20-b text-gray-80 items-center">
                            권
                        </div>
                    </div> 
            </div>
        </div>
    )
}