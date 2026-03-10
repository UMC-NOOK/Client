// libraries
import { useState } from "react";
// components
import TopNavigation from "../components/navigation/topnavigation/TopNavigation";
import BookCover from "../components/atomic/BookCover";
import TabBar from "../components/navigation/tabs/TabBar";
import BottomSheet from "../components/presentation/modal/bottomsheet/Origin";
// assets
import chevron_left from "../assets/icons/chevron_left.svg";
import testBookCover from "../assets/book-info/testBookCover.svg";
// types
type DetailTab = "info" | "log";
// values
const detailTabs = [
  { value: "info", label: "책 정보" },
  { value: "log", label: "독서 이력" },
] as const;
// data
const bookData = {
  isSuccess: true,
  code: "SUCCESS-200",
  message: "요청에 성공했습니다.",
  result: {
    book: {
      isbn13: "9791162243077",
      bookId: 101,
      title: "이것이 자바다",
      author: "신용권, 임경균",
      publisher: "한빛미디어",
      publicationDate: "2022-09-05",
      mallType: "국내도서",
      mallTypeCode: "BOOK",
      category: "IT",
      pages: 900,
      description: "자바의 정석 기초편...",
      coverImageUrl: "https://image.aladin.co.kr/...",
      aladinLink: "http://...",
      sourceType: "ALADIN",
      bookshelfId: 52,
    },
  },
};

export default function BookInfo() {
  const [selectedTab, setSelectedTab] = useState<DetailTab>("info");

  return (
    <div className="flex flex-col pb-[calc(120px+env(safe-area-inset-bottom))]">
      {/* 상단 */}
      <div className="relative">
        <div className="absolute inset-0 z-0 -mx-4 -mt-2 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[375px] h-[525px]">
            <BookCover
              imageUrl={testBookCover}
              size="XL"
              type="Image"
              className="w-full h-full blur-[20px] opacity-50"
            />
            <div className="absolute inset-0 bg-black opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-10" />
          </div>
        </div>
        <div className="relative z-10">
          <TopNavigation left={<img src={chevron_left} alt="back" />} />
          <div className="flex flex-col justify-center items-center mt-10 gap-4">
            <BookCover imageUrl={testBookCover} size="XL" type="Image" />
            <div>
              <p className="text-title-18-b text-gray-90 text-center">
                {bookData.result.book.title}
              </p>
              <p className="text-body-14-m text-gray-80 mt-[6px] text-center">
                {bookData.result.book.author}
              </p>
            </div>
          </div>
          <TabBar
            options={detailTabs}
            value={selectedTab}
            onChange={setSelectedTab}
            variant="underlineGradient"
            className="mt-6"
          />
        </div>
      </div>
      {/* 하단 */}
      {selectedTab === "info" ? (
        <div className="flex flex-col justify-content items-center gap-10 mt-8">
          <div className="grid grid-cols-2 gap-8 text-gray-90">
            <div className="col-span-2 flex flex-col gap-3">
              {/* 컴포넌트 개발 시 리팩토링*/}
              <div className="text-label-14-sb">소개</div>
              <div className="text-body-14-r">
                {bookData.result.book.description}
              </div>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="text-label-14-sb ">분야</div>
              <div className="text-body-14-r">
                {bookData.result.book.category}
              </div>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="text-label-14-sb">분량</div>
              <div className="text-body-14-r">
                {bookData.result.book.pages}쪽
              </div>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="text-label-14-sb">출판</div>
              <div className="text-body-14-r">
                {bookData.result.book.publisher} (
                {bookData.result.book.publicationDate})
              </div>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="text-label-14-sb">ISBN</div>
              <div className="text-body-14-r">
                {bookData.result.book.isbn13}
              </div>
            </div>
          </div>
          {/* 컴포넌트 개발 시 리팩토링*/}
          <div className="flex gap-2 text-gray-50 text-label-12-sb">
            <div>도서 DB 제공: 알라딘</div>
            <div
              className="underline cursor-pointer"
              onClick={() =>
                window.open(bookData.result.book.aladinLink, "_blank")
              }
            >
              도서 구매하기
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-8 px-1 gap-8 text-gray-90">
          <div className="flex flex-col gap-3">
            <div className="text-label-14-sb">포커스</div>
            <div className="text-body-14-r p-4 rounded-sm bg-gray-15">
              아직 포커스하지 않았어요.
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-label-14-sb">기록</div>
            <div className="text-body-14-r p-4 rounded-sm bg-gray-15">
              아직 기록이 없어요.
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-label-14-sb">독서 히스토리</div>
            <div className="text-body-14-r p-4 rounded-sm bg-gray-15">
              아직 독서 활동이 없어요.
            </div>
          </div>
        </div>
      )}
      {/* 버튼 모달 */}
      <BottomSheet
        open={true}
        onClose={() => {}}
        overlay={false}
        footer={{
          layout: "single",
          variant: "mint",
          label: "서재에 등록하기",
          onClick: () => {},
        }}
      />
    </div>
  );
}
