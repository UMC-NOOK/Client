// libraries
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// components
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import BookCover from "../../components/atomic/BookCover";
import TabBar from "../../components/navigation/tabs/TabBar";
import BottomSheet from "../../components/presentation/modal/bottomsheet/Origin";
import PopupConfirmModal from "../../components/presentation/modal/popup/Origin";
import MaskGradient from "../../components/layout/MaskGradient";
import Snackbar from "../../components/feedback/snackbar";
import Solid from "../../components/action/Button/Solid";
import HistoryInfoCard from "../../components/content/list/History";
import InformationSection from "../../components/content/InformationText/InformationSection";
import ResourceDate from "../../components/content/list/Resource/Date";
// assets
import chevron_left from "../../assets/icons/chevron_left.svg";
import testBookCover from "../../assets/book-info/testBookCover.svg";
import book_shelf from "../../assets/icons/book_shelf-gray-30.svg";
// hooks
import { useGetBookDetailWithISBN } from "../../hooks/queries/bookInfo/useGetBookDetailWithISBN";
// types
type DetailTab = "info" | "log";
// values
const detailTabs = [
  { value: "info", label: "도서 정보" },
  { value: "log", label: "독서 이력" },
] as const;
// data
const bookHistoryData = [
  {
    year: 2026,
    showYear: true,
    monthDay: "12.09",
    items: [
      {
        timelineId: 103,
        type: "FOCUS",
        occurredAt: "2026-12-09T23:15:00",
        title: "1시간 13분의 포커스",
        subtitle: "22:02 - 23:15",
        previewText: "1시간 13분의 포커스",
        targetId: 7001,
      },
      {
        timelineId: 102,
        type: "FOCUS",
        occurredAt: "2026-12-09T16:50:00",
        title: "1시간 27분의 포커스",
        subtitle: "15:23 - 16:50",
        previewText: "1시간 27분의 포커스",
        targetId: 7002,
      },
    ],
  },
  {
    year: 2026,
    showYear: false,
    monthDay: "12.09",
    items: [
      {
        timelineId: 103,
        type: "RECORD",
        occurredAt: "2026-12-09T23:15:00",
        title: "독서 기록",
        subtitle: "[p.40] 변하는 실제가 없음은 물론 그것이 거쳐가는 길이",
        previewText: "독서 기록",
        targetId: 7001,
      },
      {
        timelineId: 102,
        type: "RECORD",
        occurredAt: "2026-12-09T16:50:00",
        title: "독서 기록",
        subtitle: "3개의 이미지",
        previewText: "독서 기록",
        targetId: 7002,
      },
    ],
  },
  {
    year: 2025,
    showYear: true,
    monthDay: "11.30",
    items: [
      {
        timelineId: 100,
        type: "REGISTER",
        occurredAt: "2025-11-30T09:00:00",
        title: "첫사랑의 침공",
        subtitle: "서재에 등록했어요.",
        previewText: "서재에 등록했어요.",
        targetId: 12,
      },
    ],
  },
];

export default function BookInfoPage() {
  const bookISBN = useParams().isbn13;
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState<DetailTab>("info");
  const [readStatus, setReadStatus] = useState<"unread" | "reading" | "read">(
    "unread",
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const { data: bookDetailData, isLoading } = useGetBookDetailWithISBN(
    bookISBN!,
  );

  // 개발용 상태
  const [hasFocus, setHasFocus] = useState(true);
  const [hasRecord, setHasRecord] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);
  const [showReadingModal, setShowReadingModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const openSnackbar = (message: string) => {
    setSnackbar({
      open: true,
      message,
    });
  };

  const onClickSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // 개발용 핸들러 함수
  const toggleReadStatus = () => {
    if (readStatus === "unread") {
      setReadStatus("reading");
      openSnackbar("내 서재에 책을 등록했어요.");
    } else if (readStatus === "reading") {
      setShowCompleteModal(true);
    } else {
      setShowReadingModal(true);
    }

    console.log("현재 읽기 상태:", readStatus);
  };

  return (
    <div className="relative flex flex-col pb-[calc(120px+env(safe-area-inset-bottom))]">
      {/* 상단 */}
      <div className="relative">
        <div className="absolute inset-0 z-0 -mx-4 -mt-2 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[375px] h-[525px]">
            {/* 배경 흐림 커버 스켈레톤 */}
            {isLoading ? (
              <div className="w-full h-full bg-gray-20 animate-pulse blur-[20px] opacity-50" />
            ) : (
              <BookCover
                imageUrl={bookDetailData?.coverImageUrl || testBookCover}
                size="XL"
                type="Image"
                className="w-full h-full blur-[20px] opacity-50"
              />
            )}
            <div className="absolute inset-0 bg-black opacity-40" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-10" />
          </div>
        </div>
        <div className="relative z-10">
          <TopNavigation
            left={<img src={chevron_left} alt="back" />}
            onClickLeft={() => navigate(-1)}
          />
          <div className="flex flex-col justify-center items-center mt-10 gap-4">
            {/* 메인 도서 커버 스켈레톤 */}
            {isLoading ? (
              <div className="w-[140px] h-[200px] bg-gray-20 animate-pulse rounded-md" />
            ) : (
              <BookCover
                imageUrl={bookDetailData?.coverImageUrl || testBookCover}
                size="XL"
                type="Image"
              />
            )}

            <div className="flex flex-col items-center gap-2">
              {/* 타이틀 & 저자 스켈레톤 */}
              {isLoading ? (
                <>
                  <div className="w-48 h-6 bg-gray-20 animate-pulse rounded-sm" />
                  <div className="w-24 h-4 bg-gray-20 animate-pulse rounded-sm mt-1" />
                </>
              ) : (
                <>
                  <p className="text-title-18-b text-gray-90 text-center">
                    {bookDetailData?.title}
                  </p>
                  <p className="text-body-14-m text-gray-80 text-center">
                    {bookDetailData?.author}
                  </p>
                </>
              )}
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
        <div className="flex flex-col justify-center items-center gap-10 mt-8">
          <div className="grid grid-cols-2 gap-8 text-gray-90 w-full px-4">
            {/* 정보 섹션 스켈레톤 */}
            {isLoading ? (
              <>
                <div className="col-span-2 w-full h-24 bg-gray-15 animate-pulse rounded-sm" />
                <div className="w-full h-12 bg-gray-15 animate-pulse rounded-sm" />
                <div className="w-full h-12 bg-gray-15 animate-pulse rounded-sm" />
                <div className="w-full h-12 bg-gray-15 animate-pulse rounded-sm" />
                <div className="w-full h-12 bg-gray-15 animate-pulse rounded-sm" />
              </>
            ) : (
              <>
                <div className="col-span-2 w-full">
                  <InformationSection
                    flow="vertical"
                    top="소개"
                    bottom={bookDetailData?.description}
                  />
                </div>
                <InformationSection
                  flow="vertical"
                  top="분야"
                  bottom={bookDetailData?.category}
                />
                <InformationSection
                  flow="vertical"
                  top="분량"
                  bottom={`${bookDetailData?.pages}쪽`}
                />
                <InformationSection
                  flow="vertical"
                  top="출판"
                  bottom={`${bookDetailData?.publisher} (${bookDetailData?.publicationDate})`}
                />
                <InformationSection
                  flow="vertical"
                  top="ISBN"
                  bottom={bookDetailData?.isbn13}
                />
              </>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full justify-center items-center">
            {readStatus !== "unread" && (
              <Solid
                text="서재에서 제거"
                variant="alert"
                size="m"
                onClick={() => setReadStatus("unread")}
              />
            )}
            {!isLoading && bookDetailData?.aladinLink && (
              <div className="flex gap-2 text-gray-50 text-label-12-sb">
                <div>도서 DB 제공: 알라딘</div>
                <div
                  className="underline cursor-pointer"
                  onClick={() =>
                    window.open(bookDetailData?.aladinLink!, "_blank")
                  }
                >
                  도서 구매하기
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-8 px-1 gap-8 text-gray-90">
          <div className="flex flex-col gap-3">
            <div className="text-label-16-sb">포커스</div>
            <div
              className="text-body-14-r p-4 rounded-sm bg-gray-15"
              onClick={() => {
                // 개발용 토글
                setHasFocus(!hasFocus);
              }}
            >
              {hasFocus ? (
                <div className="flex flex-col gap-4">
                  <InformationSection
                    flow="horizontal"
                    top="기간"
                    bottom="25.12.30 - 26.01.19"
                  />
                  <InformationSection
                    flow="horizontal"
                    top="시간"
                    bottom="3시간 4분 22초"
                  />
                  <InformationSection
                    flow="horizontal"
                    top="횟수"
                    bottom="39번"
                  />
                  <InformationSection
                    flow="horizontal"
                    top="페이지"
                    bottom="~99쪽"
                  />
                </div>
              ) : (
                "아직 포커스하지 않았어요."
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {hasRecord ? (
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-label-16-sb">기록</span>
                  <span className="text-mint-60 text-label-16-sb">16</span>
                </div>
                <div
                  className="curser-pointer text-btn-14-sb text-gray-60"
                  onClick={() => {
                    // 전체 기록 보기로 이동
                  }}
                >
                  전체 보기
                </div>
              </div>
            ) : (
              <div className="text-label-16-sb">기록</div>
            )}

            <div
              className="text-body-14-r p-4 rounded-sm bg-gray-15"
              onClick={() => {
                // 개발용 토글
                setHasRecord(!hasRecord);
              }}
            >
              {hasRecord ? (
                <InformationSection
                  flow="horizontal"
                  bottom={
                    <div className="w-full overflow-hidden line-clamp-3">
                      [p.131] 어느 쪽의 이야기가 그럴듯하고 그들에게 어울립니까?
                      아가씨에게 존속 상해치사의 죄를 추가하고 싶지는 않으니
                      나는 첫번째를 고르지 않겠습니다 진짜 뭐라는 겁니까
                    </div>
                  }
                />
              ) : (
                "아직 기록이 없어요."
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {hasHistory ? (
              <div className="flex items-center justify-between">
                <div className="text-label-16-sb">독서 히스토리</div>
                <div
                  className="curser-pointer text-btn-14-sb text-gray-60"
                  onClick={() => {
                    navigate("/library/123/history");
                  }}
                >
                  전체 보기
                </div>
              </div>
            ) : (
              <div className="text-label-16-sb">독서 히스토리</div>
            )}
            <div
              className={`text-body-14-r p-4 rounded-sm bg-gray-15 ${hasHistory ? "h-80 relative overflow-hidden" : ""}`}
              onClick={() => {
                // 개발용 토글
                setHasHistory(!hasHistory);
              }}
            >
              {hasHistory ? (
                <>
                  <MaskGradient
                    width={"full"}
                    height={20}
                    className="-m-4 bottom-0"
                  />
                  {bookHistoryData.map((history) => (
                    <div
                      key={history.year}
                      className="flex items-start gap-2 mb-4 w-full"
                    >
                      <ResourceDate
                        topText={history.monthDay}
                        bottomText={
                          history.showYear ? String(history.year) : ""
                        }
                      />
                      <div className="min-w-0 flex flex-1 flex-col gap-1">
                        {history.items.map((item) => (
                          <HistoryInfoCard
                            key={item.timelineId}
                            variant={
                              item.type === "RECORD" ? "history" : "time"
                            }
                            title={item.title}
                            time={item.subtitle}
                            hasIcon={
                              item.type !== "REGISTER" && item.type !== "STATUS"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                "아직 독서 활동이 없어요."
              )}
            </div>
          </div>
        </div>
      )}
      {/* 버튼 모달 */}
      {readStatus === "reading" && (
        <BottomSheet
          open={true}
          onClose={() => {}}
          overlay={false}
          footer={{
            layout: "double",
            sizeMode: "split",
            leftVariant: "secondary",
            leftLabel: "완독 표시",
            rightLabel: "포커스 시작하기",
            onLeftClick: () => {
              toggleReadStatus();
            },
            onRightClick: () => {},
          }}
        />
      )}
      {readStatus === "unread" && (
        <BottomSheet
          open={true}
          onClose={() => {}}
          overlay={false}
          footer={{
            layout: "single",
            variant: "mint",
            label: "서재에 등록하기",
            onClick: () => {
              toggleReadStatus();
            },
          }}
        />
      )}
      {readStatus === "read" && (
        <BottomSheet
          open={true}
          onClose={() => {}}
          overlay={false}
          footer={{
            layout: "single",
            variant: "primarySecondaryText",
            label: "완독 취소하기",
            onClick: () => {
              toggleReadStatus();
            },
          }}
        />
      )}
      {/* 팝업 모달 */}
      {showCompleteModal && (
        <PopupConfirmModal
          open={true}
          onClose={() => setShowCompleteModal(false)}
          title="완독 상태로 변경할까요?"
          description="다시 독서 중 상태로 되돌릴 수 있어요."
          leftLabel="취소"
          rightLabel="변경"
          onLeftClick={() => setShowCompleteModal(false)}
          onRightClick={() => {
            setReadStatus("read");
            setShowCompleteModal(false);
          }}
        />
      )}
      {showReadingModal && (
        <PopupConfirmModal
          open={true}
          onClose={() => setShowReadingModal(false)}
          title="독서 중 상태로 변경할까요?"
          description="다시 완독 상태로 되돌릴 수 있어요."
          leftLabel="취소"
          rightLabel="변경"
          onLeftClick={() => setShowReadingModal(false)}
          onRightClick={() => {
            setReadStatus("reading");
            setShowReadingModal(false);
          }}
        />
      )}
      {/* 스낵바 */}
      <Snackbar
        icon={book_shelf}
        isOpen={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        text={snackbar.message}
        buttonText="서재로 이동"
        onButtonClick={onClickSnackbar}
      />
    </div>
  );
}
