import Report from "../../components/content/Card/Book/List/Report";

import sampleBook from "../../assets/Book Cover.jpg";

export default function ReportTestPage() {
  return (
      <section className="mx-auto flex w-full flex-col gap-6  bg-[#0B0F23]">
        <Report
          imageUrl={sampleBook}
          title="Title"
          author="Author"
          recent="Recent Report"
          reviewNumber={12}
        />

        <Report
          imageUrl="https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg"
          title="아주 긴 제목이 들어갔을 때 한 줄 말줄임 처리가 잘 되는지 확인하는 테스트용 제목입니다"
          author="아주 긴 저자명 테스트"
          recent="이 문장도 최근 리포트가 길어졌을 때 두 줄까지 자연스럽게 말줄임 처리되는지 확인하기 위한 테스트용 문장입니다."
          reviewNumber={3}
        />

        <Report
          imageUrl="https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
          title="나는 오늘 어디까지라도 달릴 수 있어"
          author="윤지한"
          recent="최근 리포트 문장입니다. 두 줄 영역 안에서 얼마나 자연스럽게 정리되는지 확인합니다."
          reviewNumber={99}
          onClick={() => {
            console.log("report clicked");
          }}
        />
      </section>
  );
}