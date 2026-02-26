import BannerActionCard from "../../components/presentation/modal/bottombanner/Origin";

export default function BannerActionCardTestPage() {
  return (
    <div className="min-h-screen bg-gray-17 p-6 flex flex-col gap-6">
      <BannerActionCard
        line1="클라우드 쿠쿠 랜드"
        line2="147쪽부터 이어서 포커스 하기"
        onClick={() => console.log("click 1")}
      />

      <BannerActionCard
        line1="배경 이미지 테스트"
        line2="가독성 확인"
        backgroundImageUrl="/assets/sample-bg.png"
        onClick={() => console.log("click 3")}
      />
    </div>
  );
}