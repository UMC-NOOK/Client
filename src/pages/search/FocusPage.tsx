import React from "react";
import { MediaInfoCard } from "../../components/content/Card/Book/List/Focus";

// ✅ 커버 이미지(임시). 프로젝트에 이미 있는 이미지로 바꿔도 됨
import cover1 from "../../assets/icons/book_illust_100.svg";
import cover2 from "../../assets/icons/book_illust_100.svg";
import cover3 from "../../assets/icons/book_illust_100.svg";

export default function FocusMediaInfoCardTestPage() {
  return (
    <main className="min-h-dvh w-full bg-neutral-50 flex justify-center py-8">
      {/* phone-like frame */}
      <section className="w-full max-w-[375px] px-4">
        {/* dark screen */}
        <div className="rounded-[16px] bg-[#0B0F23] px-4 pt-6 pb-10">
          {/* 상단 큰 배너(이미지 영역) */}
          <div className="w-full aspect-[343/260] rounded-[12px] bg-white/10" />

          {/* 헤더 텍스트 영역 */}
          <div className="mt-6 flex items-start justify-between gap-3">
            <div>
              <p className="text-gray-90 text-label-16-b">독서할 책 선택</p>
              <p className="mt-1 text-gray-70 text-label-12-r">
                책을 선택하고 포커스를 시작해주세요.
              </p>
            </div>
            <button
              type="button"
              className="h-10 w-10 grid place-items-center rounded-full bg-white/5"
              aria-label="search"
            >
              {/* 임시 검색 아이콘 */}
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M10.5 3a7.5 7.5 0 1 0 4.7 13.35l4.48 4.48 1.42-1.42-4.48-4.48A7.5 7.5 0 0 0 10.5 3Zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {/* 탭 */}
          <div className="mt-6 grid grid-cols-3 text-center text-label-12-r text-gray-70">
            <div className="relative py-3 text-gray-90">
              독서 전
              <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-gray-90/80" />
            </div>
            <div className="py-3">독서 중</div>
            <div className="py-3">완독</div>
          </div>

          {/* 카드 리스트 */}
          <div className="mt-4 flex flex-col gap-3">
            <div className="rounded-[12px] bg-white/5">
              <MediaInfoCard
                imageUrl={cover1}
                timeText="00:00:00"
                title="첫사랑의 침공"
                author="권혁일"
                onClick={() => {}}
              />
            </div>

            <div className="rounded-[12px] bg-white/5">
              <MediaInfoCard
                imageUrl={cover2}
                timeText="00:00:00"
                title="행복할 거야 이래도 되나 싶게"
                author="일홍"
                onClick={() => {}}
              />
            </div>

            <div className="rounded-[12px] bg-white/5">
              <MediaInfoCard
                imageUrl={cover3}
                timeText="00:00:00"
                title="내버려 두면"
                author="(저자명)"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}