import { Normal } from "../../components/content/Card/Book/Normal"; // 경로 맞게 수정

export default function NormalCardTestPage() {
  const items = [
    {
      imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
      title: "아주아주 긴 제목 테스트를 위한 책 제목입니다. 두 줄까지만 보이고 이후에는 말줄임 처리가 되어야 합니다.",
      author: "저자 이름도 길게 써서 한 줄 말줄임이 되는지 확인해볼게요. 홍길동 김철수 박영희",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
      title: "짧은 제목",
      author: "짧은 저자",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80",
      title: "두 줄 경계 테스트: 적당히 길지만 세 줄이 되지 않게 조절한 제목 문장입니다.",
      author: "한 줄 넘어가면 … 되어야 함",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=80",
      title: "제목에 이모지/특수문자도 섞어보기 📚✨ — 줄바꿈/클램프가 깨지지 않아야 함",
      author: "Author Name (EN) / 저자명(KR)",
    },
  ];

  return (
    <main className="min-h-dvh w-full bg-[#0B0F23] flex justify-center py-10">
      {/* phone-like frame */}
      <section className="w-full max-w-[375px] px-4">
        <header className="mb-6">
          <h1 className="text-gray-90 text-lg font-semibold">Card / Book / Normal</h1>
          <p className="text-gray-70 text-sm mt-1">
            제목(2줄), 저자(1줄) clamp 동작 확인용
          </p>
        </header>

        {/* grid */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-6">
          {items.map((item, idx) => (
            <Normal
              key={idx}
              imageUrl={item.imageUrl}
              title={item.title}
              author={item.author}
              onClick={() => {
                console.log("clicked:", idx, item.title);
                alert(`clicked: ${idx + 1}`);
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}