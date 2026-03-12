import React from "react";
import Report from "../../components/content/Card/Book/List/Report"

import img from "../../assets/Book Cover.jpg";

export default function ReportTestPage() {
  return (
    <main className="min-h-screen bg-neutral-100 py-8">
        <Report
          imageUrl=""
          title="Title"
          author="Author"
          reportText="Recent Report"
          reviewNumber={12}
        />

        <Report
          imageUrl={img}
          title="아주 긴 제목이 들어갔을 때 한 줄 말줄임 처리가 잘 되는지 확인하는 테스트용 제목입니다"
          author="아주 긴 저자명 테스트"
          reportText="이 문장도 최근 리포트가 길어졌을 때 한 줄로 말줄임 처리되는지 보기 위한 테스트입니다."
          reviewNumber={3}
        />

        <Report
          imageUrl="https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
          title="나는 오늘 어디까지라도 달릴 수 있어"
          author="윤지한"
          reportText="최근 리포트 문장"
          reviewNumber={99}
          onClick={() => {
            console.log("report clicked");
          }}
        />
    </main>
  );
}