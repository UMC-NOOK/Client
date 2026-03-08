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
// functions

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
                첫사랑의 침공
              </p>
              <p className="text-body-14-m text-gray-80 mt-[6px] text-center">
                권혁일
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
                표제작 〈첫사랑의 침공〉에서 주인공의 마음을 사로잡은 누나는
                지구를 침략하러 온 외계인이다. 다른 수록작의 주인공들의 처지도
                험난해 보이기는 마찬가지다. 그들은 업무 평가에서 매번 꼴찌를
                도맡는 신을, 지구를 침략할 생각이 없는 외계인을, 북한에서 온
                간첩을 마음에 둔다.
              </div>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="text-label-14-sb ">분야</div>
              <div className="text-body-14-r">소실/시/희곡</div>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="text-label-14-sb">분량</div>
              <div className="text-body-14-r">228쪽</div>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="text-label-14-sb">출판</div>
              <div className="text-body-14-r">안전가옥 (2024.06.10)</div>
            </div>
            <div className=" flex flex-col gap-3">
              <div className="text-label-14-sb">ISBN</div>
              <div className="text-body-14-r">9791193024713</div>
            </div>
          </div>
          {/* 컴포넌트 개발 시 리팩토링*/}
          <div className="flex gap-2 text-gray-50 text-label-12-sb">
            <div>도서 DB 제공: 알라딘</div>
            <div>도서 구매하기</div>
          </div>
        </div>
      ) : (
        <div>
          <div></div>
          <div></div>
          <div></div>
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
