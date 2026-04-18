import bottomBanner from "../../../assets/images/bottom_banner.jpg";
import movement from "../../../assets/icons/movement.svg";
import close from "../../../assets/icons/close.svg";
import Text  from "../../../components/action/Button/Text";
import SectionHeader from "../../../components/content/InformationText/SectionHeader";

type BottomBannerProps = {
    bookId: number;
    title: string;
    coverUrl: string;
    page: number;
    focusTime: string;
    onClick?: (bookId: number) => void;
};

export default function BottomBanner({
    bookId,
    title,
    coverUrl,
    page,
    focusTime,
    onClick,
} : BottomBannerProps) {
    return (
        <div className="flex flex-col items-end justify-center w-full h-29"> 
            <div className="flex justify-center items-center">
                <Text size="12">
                        닫기
                </Text>
                
                <img src={close} className="h-3 w-3" />
            </div>

             <div
                className="flex flex-row items-end justify-center jusitfy-between w-full h-24 rounded-[10px] bg-contain bg-cover bg-no-repeat p-4 gap-4"
                style={{
                    backgroundImage: `url(${bottomBanner})`,
                }}
            >
                <img src={coverUrl} className="w-11 h-full"/>
                
                <div className="flex h-full flex-1 items-center justify-between">
                    <div className="flex h-full flex-1 flex-col items-star">
                        <div className="text-label-13-sb text-gray-60">
                            {focusTime}
                        </div>

                        <div className="mt-auto w-full">
                            <SectionHeader
                                size="16"
                                top={title}
                                bottom={`${page}쪽부터 이어서 포커스하기`}
                            />
                        </div>
                    </div>

                    <div 
                        className="flex shrink-0 items-center justify-center"
                        onClick={() => onClick?.(bookId)}>
                            <img src={movement} className="w-8 h-8"/>
                    </div>
                </div>
            </div>
        </div>
       
    );
}