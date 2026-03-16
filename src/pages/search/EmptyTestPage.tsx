import EmptyState from "../../components/content/EmptyState/EmptyState";

export default function EmptyStateTestPage() {
  return (
    <main className="flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <h2 className="text-label-14-sb text-gray-80">텍스트만 있는 경우</h2>
        <EmptyState text="표시할 항목이 없습니다." />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-label-14-sb text-gray-80">텍스트 + 버튼이 있는 경우</h2>
        <EmptyState
          text="아직 등록된 일정이 없습니다."
          buttonText="추가하기"
          onButtonClick={() => {
            console.log("추가하기 클릭");
          }}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-label-14-sb text-gray-80">버튼 문구 변경 예시</h2>
        <EmptyState
          text="저장된 책이 없습니다."
          buttonText="등록하기"
          onButtonClick={() => {
            console.log("등록하기 클릭");
          }}
        />
      </section>
    </main>
  );
}