import Icon from "../../components/action/Button/Icon";
import close from "../../assets/icons/close.svg";
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import { Text } from "../../components/action/Button/Text";
import SectionHeader from "../../components/content/InformationText/SectionHeader";

export default function LibraryGoalInputPage(){
    return(
        <div className="flex flex-col">
            <div className="pt-2">
                <TopNavigation
                    left={
                        <Icon size="m">
                            <img src={close} alt="" />
                        </Icon>
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
                            top="올해 몇 권의 책을 읽고 싶은지 목표를 설정해주세요."
                            bottom="2026년은 244일 남았어요."
                        />
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <div className="flex w-[305px] h-[54px] rounded-[8px] py-3 px-4 bg-gray-17 label-20-b text-gray-70 items-center ">
                            몇
                        </div>
                        <div className="label-20-b text-gray-80 items-center">
                            권
                        </div>
                    </div> 
            </div>
        </div>
    )
}