import React from "react";
import { BookListCard } from "../../components/content/card/Book/List";

// 임시 커버 이미지들 (프로젝트에 있는 이미지로 교체해도 됨)
const covers = [
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1455885666463-13df0f7b9a7f?auto=format&fit=crop&w=300&q=80",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=300&q=80",
];

function PhoneFrame({
  title,
  subtitle,
  children,
  rightTop,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  rightTop?: React.ReactNode; // X 버튼/검색 아이콘 같은 자리
}) {
  return (
    <div>
        <div className="mb-2 flex items-center justify-between px-2 text-gray-400 text-xs">
            <span>{title}</span>
            {rightTop ?? <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-green-600 text-white text-xs">{"</>"}</span>}
        </div>

            <div className="rounded-[16px] bg-[#0B0F23] px-4 pt-5 pb-8 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                <div className="relative mb-4 flex items-center justify-center">
                <h1 className="text-white text-lg font-semibold">{subtitle ? subtitle : "서재 전체 보기"}</h1>

                <div className="absolute right-0 top-0">{rightTop}</div>
                </div>
                {children}
                <div className="mt-10 text-[#616A91]">
                <div className="text-lg font-semibold tracking-wide">NOOK</div>
                <div className="mt-2 text-xs leading-6 opacity-80">
                    소개&nbsp;&nbsp;|&nbsp;&nbsp;자주 묻는 질문&nbsp;&nbsp;|&nbsp;&nbsp;이용 약관&nbsp;&nbsp;|&nbsp;&nbsp;개인정보 취급방침
                    <br />
                    메일(고객 전용): help@nook.kr
                    <br />
                    사업자 등록번호: 302-01-12345
                </div>
                </div>
            </div>

    </div>
      );
}

export default function BookListTestPage() {
  return (
    <div>
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-10 px-4">
        {/* 1) report: 도서 선택 검색 결과 (첫 번째 스샷 느낌) */}
        <PhoneFrame
          title="report : 도서 선택 검색 결과"
          subtitle={
            <div className="w-full text-center">
              <div className="text-white text-lg font-semibold">도서 선택</div>
            </div>
          }
          rightTop={
            <button
              type="button"
              className="h-9 w-9 rounded-full flex items-center justify-center text-white/80"
              aria-label="close"
            >
              ✕
            </button>
          }
        >
          {/* 검색바 느낌 */}
          <div className="mb-5 flex items-center justify-between rounded-xl bg-white/10 px-4 py-4">
            <span className="text-white text-base">첫사랑</span>
            <span className="text-white/80">🔍</span>
          </div>

          <p className="mb-3 text-white/80">3권의 도서가 검색되었어요.</p>

          <div className="flex flex-col">
            {/* 첫 번째는 report: 라벨은 "독서 중" 또는 "완독" 같은 텍스트만 (아이콘 없음) */}
            <div className="border-b border-white/10 py-4">
              <BookListCard
                type="REPORT"
                typeLabel="독서 중"
                imageUrl={covers[0]}
                title="자본주의 시대에서 살아남기 위한 최소한의 경제..."
                author="성해나"
              />
            </div>

            <div className="border-b border-white/10 py-4">
              <BookListCard
                type="LIBRARY"
                typeLabel="독서 중"
                imageUrl={covers[1]}
                title="오로라를 따라간 푸트만스 씨"
                author="성해나"
              />
            </div>

            <div className="py-4">
              <BookListCard
                type="SEARCH"
                typeLabel="완독"
                imageUrl={covers[2]}
                title="나는 오늘 어디까지라도 달릴 수 있어"
                author="윤지한"
              />
            </div>
          </div>
        </PhoneFrame>

        {/* 2) library type: 서재 전체 보기 (독서 중) (두 번째 스샷 느낌) */}
        <PhoneFrame
          title="library : 서재 전체 보기 (독서 중)"
          subtitle={
            <div className="w-full text-center">
              <div className="text-white text-lg font-semibold">서재 전체 보기</div>
            </div>
          }
          rightTop={<span className="text-white/80">🔍</span>}
        >
          <div className="mb-4">
            <div className="text-white text-xl font-semibold">
              독서 중인 책이 <span className="text-yellow-300">6권</span> 있어요.
            </div>
            <div className="mt-1 text-white/50 text-sm">한 번 이상 포커스 한 책들이에요.</div>
          </div>

          {/* 탭 느낌 */}
          <div className="mb-4 flex items-end justify-between text-white/40">
            <div className="flex-1 text-center pb-2">독서 전</div>
            <div className="flex-1 text-center pb-2 text-white border-b-2 border-white">독서 중</div>
            <div className="flex-1 text-center pb-2">완독</div>
          </div>

          <div className="flex flex-col">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-b border-white/10 py-4">
                <BookListCard
                  type="LIBRARY"
                  typeLabel="독서 중"
                  imageUrl={covers[(i + 1) % covers.length]}
                  title={i % 2 === 0 ? "[국내도서] 혼모노" : "[eBook] 혼모노"}
                  author={i % 2 === 0 ? "성해나" : "성해나"}
                />
              </div>
            ))}
          </div>
        </PhoneFrame>

        {/* 3) none type: 서재 전체 보기 (독서 전) (세 번째 스샷 느낌) */}
        <PhoneFrame
          title="library : 서재 전체 보기 (독서 전)"
          subtitle={
            <div className="w-full text-center">
              <div className="text-white text-lg font-semibold">서재 전체 보기</div>
            </div>
          }
          rightTop={<span className="text-white/80">🔍</span>}
        >
          <div className="mb-4">
            <div className="text-white text-xl font-semibold">
              독서 전인 책이 <span className="text-yellow-300">2권</span> 있어요.
            </div>
            <div className="mt-1 text-white/50 text-sm">아직 포커스 한 적 없는 책들이에요.</div>
          </div>

          <div className="mb-4 flex items-end justify-between text-white/40">
            <div className="flex-1 text-center pb-2 text-white border-b-2 border-white">독서 전</div>
            <div className="flex-1 text-center pb-2">독서 중</div>
            <div className="flex-1 text-center pb-2">완독</div>
          </div>

          <div className="flex flex-col">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-b border-white/10 py-4">
                <BookListCard
                  type="NONE"
                  typeLabel={null} // ✅ none은 라벨도 없도록
                  imageUrl={covers[i % covers.length]}
                  title={i % 2 === 0 ? "[국내도서] 혼모노" : "[eBook] 혼모노"}
                  author="성해나"
                />
              </div>
            ))}
          </div>
        </PhoneFrame>

        {/* 4) search type: 내 서재 검색 (네 번째 스샷 느낌) */}
        <PhoneFrame
          title="search : 내 서재 검색"
          subtitle={
            <div className="w-full text-center">
              <div className="text-white text-lg font-semibold">도서 검색</div>
            </div>
          }
          rightTop={
            <button
              type="button"
              className="h-9 w-9 rounded-full flex items-center justify-center text-white/80"
              aria-label="close"
            >
              ✕
            </button>
          }
        >
          {/* 상단 토글 느낌 */}
          <div className="mb-4 flex rounded-full bg-white/10 p-1 text-white/60">
            <button className="flex-1 py-2 rounded-full">전체 도서 검색</button>
            <button className="flex-1 py-2 rounded-full bg-white/15 text-white">내 서재 검색</button>
          </div>

          {/* 검색바 */}
          <div className="mb-4 flex items-center justify-between rounded-xl bg-white/10 px-4 py-4">
            <span className="text-white text-base">혼모노</span>
            <span className="text-white/80">🔍</span>
          </div>

          <p className="mb-3 text-white/80">5권의 도서가 검색되었어요.</p>

          <div className="flex flex-col">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-b border-white/10 py-4">
                <BookListCard
                  type="SEARCH"         // ✅ search 타입: 아이콘 있음
                  typeLabel={null}      // 네 번째 스샷은 라벨 없이 “아이콘만” 보이는 느낌이라 null
                  imageUrl={covers[i % covers.length]}
                  title={i % 2 === 0 ? "[국내도서] 혼모노" : "[eBook] 혼모노"}
                  author="성해나"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 text-white/60">
            찾으시는 도서가 없나요?{" "}
            <button className="underline text-white/80">도서 직접 추가</button>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}