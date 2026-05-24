import movement from "../../../assets/icons/movement.svg";
import close from "../../../assets/icons/close-gray-60.svg";
import Icon from "../../../components/action/Button/Icon";
import Text  from "../../../components/action/Button/Text";
import SectionHeader from "../../../components/content/InformationText/SectionHeader";

type BottomBannerProps = {
    bookId: number;
    title: string;
    coverUrl: string;
    page: number;
    focusTime: string;
    onClick?: (bookId: number) => void;
    onClose?: () => void;
};

export default function BottomBanner({
    bookId,
    title,
    coverUrl,
    page,
    focusTime,
    onClick,
    onClose,
} : BottomBannerProps) {
    return (
        <div className="pointer-events-none fixed inset-0 z-30 flex items-end justify-center pb-1">
            <div className="pointer-events-auto flex flex-col items-end justify-center min-w-[375px] h-29 px-4"> 
                <div className="flex justify-center items-center shadow-elevation-20">
                    <Text size="12">
                            닫기
                    </Text>
                    <div onClick={onClose}>
                        <Icon size="xs" className="h-3 w-3 p-0">
                            <img src={close} alt="" />
                        </Icon>
                    </div>
                </div>

                <div
                    className="flex flex-row items-end justify-center justify-between w-full h-24 rounded-[10px] bg-gray-15 p-4 gap-4"
                >
                    <img src={coverUrl} className="w-11 h-full rounded-[2px]"/>
                    
                    <div className="flex h-full flex-1 items-center justify-between">
                        <div className="flex h-full flex-1 flex-col items-start">
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
        </div>
    );
}
