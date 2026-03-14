import ReportList from "../../components/content/Card/Report/List";

import sampleBook from "../../assets/Book Cover.jpg";

export default function ReportListPage() {
  return (
    <div className="flex w-full flex-col gap-2">

        <ReportList
          date="25.09.12"
          emoji="(^_^)"
          variant="yellow"
          review="오늘은 생각보다 집중이 잘 돼서 읽고 싶었던 부분을 꽤 많이 읽었다."
        />

        <ReportList
          date="25.09.13"
          emoji="(T_T)"
          variant="blue"
          review="생각이 많아서 초반에는 잘 안 읽혔는데, 중간부터 조금씩 흐름을 탔다. 마지막 문장이 특히 오래 남았다."
          images={[sampleBook]}
        />

        <ReportList
          date="25.09.14"
          emoji="(>_<)"
          variant="red"
          review="오늘 기록은 이미지 여러 장이 들어갔을 때의 레이아웃을 확인하기 위한 테스트입니다. 줄 수가 늘어나면 카드 높이도 자연스럽게 커져야 합니다."
          images={[
            sampleBook,
            "https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg",
            "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg",
            "https://covers.openlibrary.org/b/isbn/9780439554930-M.jpg",
            "https://covers.openlibrary.org/b/isbn/9780140449136-M.jpg",
          ]}
        />

        <ReportList
          date="25.09.15"
          emoji="(._.)"
          variant="none"
          review={`줄바꿈이 들어가는 경우도 확인합니다.
이렇게 여러 줄 텍스트가 들어와도 자연스럽게 보여야 합니다.`}
          onClick={() => {
            console.log("report list clicked");
          }}
        />
      </div>
  );
}