import { MediaInfoCard } from "../../components/content/Card/Book/List/Focus";

import sampleBook from "../../assets/Book Cover.jpg";

export default function FocusPage() {
  return (
      <div >
        <p className="text-sm text-white/80">Card/Book/List/Focus</p>

        <MediaInfoCard
          imageUrl={sampleBook}
          timeText="00:00:00"
          title="첫사랑의 침공"
          author="권혁일"
        />

        <MediaInfoCard
          imageUrl="https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg"
          timeText="01:24:12"
          title="The Little Prince"
          author="Antoine de Saint-Exupéry"
        />

        <MediaInfoCard
          imageUrl="https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
          timeText="12:59:59"
          title="아주 긴 제목이 들어갔을 때 한 줄 말줄임 처리가 잘 되는지 확인하기 위한 테스트용 제목입니다"
          author="아주 긴 저자명 테스트"
          onClick={() => {
            console.log("media info card clicked");
          }}
        />
      </div>
  );
}