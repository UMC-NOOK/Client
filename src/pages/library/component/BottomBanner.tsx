import bottomBanner from "../../../assets/images/bottom_banner.jpg";
import arrowRight from "../../../assets/icons/arrow_right.svg";

export default function BottomBanner(){
    return(
        <div 
            className="relative inset-0 z-40 flex w-full h-19 rounded-[8px] bg-cover bg-no-repeat bg-contain px-4 py-5"
            style={{
                backgroundImage: `url(${bottomBanner})`,
            }}>
            <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start justify-start text-label-14-sb text-gray-90 gap-2">
                    <label>
                        클라우드 쿠쿠 랜드
                    </label>
                
                    <label>
                        147쪽부터 이어서 포커스하기
                    </label>
                </div>
                <div className="flex justify-end">
                    <img src={arrowRight}/>
                </div>
            </div>
        </div>
    )
}