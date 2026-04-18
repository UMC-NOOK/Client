import bottomBanner from "../../../assets/images/bottom_banner.jpg";
import arrowRight from "../../../assets/icons/arrow_right.svg";

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
    onClick
} : BottomBannerProps) {
    return (
        <div className="flex flex-col items-end justify-center w-full h-29"> 
            <div className="flex justify-between jusitfy-end">
                <div>

                </div>
            </div>
             <div
            className="flex items-end justify-center w-full h-19 rounded-[8px] bg-contain bg-cover bg-no-repeat px-4 py-5"
            style={{
                backgroundImage: `url(${bottomBanner})`,
            }}
            onClick={() => onClick?.(bookId)}
        >
            <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start justify-start gap-2 text-label-14-sb text-gray-90">
                    <label>{title}</label>
                    <label>{page}쪽부터 이어서 포커스하기</label>
                </div>

                <div className="flex justify-end">
                    <img src={arrowRight} alt="" />
                </div>
            </div>
        </div>
        </div>
       
    );
}