import BannerActionCard from "../../../components/presentation/modal/bottombanner/Origin";
import SingleLineBannerCard from "../../../components/presentation/modal/bottombanner/Small";
import ReadingRecordBannerCard from "../../../components/presentation/modal/bottombanner/ReadingRecord";

export default function BannerActionCardTestPage() {
  return (
    <div className="min-h-screen bg-gray-17 pt-6 flex flex-col gap-6">
      <BannerActionCard
        line1="클라우드 쿠쿠 랜드"
        line2="147쪽부터 이어서 포커스 하기"
        onClick={() => console.log("click 1")}
      />

      <BannerActionCard
        line1="배경 이미지 테스트"
        line2="가독성 확인"
        onClick={() => console.log("click 3")}
      />


      <SingleLineBannerCard
        label="지금 바로 독서 기록 추가하기"
        onClick={() => console.log("clicked")}
      />

      <ReadingRecordBannerCard
        count={5}
        subtitle="기억에 남는 문장, 떠오르는 감상을 기록하세요."
        onClick={() => console.log("독서 기록 클릭 2")}
      />

    </div>

    
  );
}