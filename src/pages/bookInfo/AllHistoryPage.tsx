// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import HistoryInfoCard from "../../components/content/list/History";
import ResourceDate from "../../components/content/list/Resource/Date";
import BottomSheet from "../../components/presentation/modal/bottomsheet/Origin";
import Emotion from "../../components/action/Chip/Emotion";

// assets
import chevron_left from "../../assets/icons/chevron_left.svg";
import focus from "../../assets/icons/focus-gray-90.svg";

// hooks
import {
  useGetBookTimelineAll,
  useGetBookTimelineAllDetail,
} from "../../hooks/queries/bookInfo/useGetBookTimelineAll";
import { useLibraryBookRegister } from "../../hooks/mutations/library/useLibraryBookRegister";

// utils
import { formatDateKorean, formatDateDot } from "../../utils/formatDateParts";

export default function AllHistoryPage() {
  const navigate = useNavigate();

  const libraryId = history.state?.usr?.libraryId || null;
  const bookDetailData = history.state?.usr?.book || null;

  const [selectedTimelineId, setSelectedTimelineId] = useState<number | null>(
    null,
  );

  const { data: timelineData } = useGetBookTimelineAll(libraryId);

  const {
    data: selectedDetail,
    isPending: isDetailPending,
    isError: isDetailError,
  } = useGetBookTimelineAllDetail(libraryId, selectedTimelineId);

  const historyData = timelineData?.dateGroups ?? [];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const { deleteBook } = useLibraryBookRegister();

  const handleCloseBottomSheet = () => {
    setSelectedTimelineId(null);
  };
  const handleDeleteBook = () => {
    if (!bookDetailData) return;
    console.log("bookDetailData", bookDetailData);

    deleteBook(bookDetailData.bookId, {
      onSuccess: () => {
        navigate(`/library/${bookDetailData.isbn13}`, { replace: true });
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start pb-10">
      <TopNavigation
        left={<img src={chevron_left} alt="back" />}
        onClickLeft={() => navigate(-1)}
        center="독서 히스토리"
        className="mb-10"
      />

      <div className="flex w-full flex-col gap-4">
        {historyData.map((yearGroup) => (
          <div
            key={`${yearGroup.year}-${yearGroup.monthDay}`}
            className="flex items-start gap-2"
          >
            <ResourceDate
              topText={yearGroup.monthDay}
              bottomText={yearGroup.showYear ? String(yearGroup.year) : ""}
            />

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              {yearGroup.items.map((item) => (
                <HistoryInfoCard
                  key={item.timelineId}
                  variant={item.type === "RECORD" ? "history" : "time"}
                  title={item.title}
                  time={item.subtitle || item.previewText}
                  hasIcon={item.type !== "REGISTER" && item.type !== "STATUS"}
                  onClick={() => setSelectedTimelineId(item.timelineId)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedTimelineId !== null ? (
        <BottomSheet
          open={true}
          title={
            selectedDetail
              ? (formatDateKorean(selectedDetail.occurredAt, {
                  year: false,
                }) ?? "상세 기록")
              : "상세 기록"
          }
          footer={{
            layout: "single",
            variant:
              selectedDetail?.type === "REGISTER" ||
              selectedDetail?.type === "FOCUS"
                ? "primaryAlert"
                : "mint",
            label:
              selectedDetail?.type === "REGISTER"
                ? "서재에서 제거하기"
                : selectedDetail?.type === "FOCUS"
                  ? "포커스 기록 삭제하기"
                  : "기록 상세 보기",
            onClick: () => {
              selectedDetail?.type === "REGISTER"
                ? handleDeleteBook()
                : selectedDetail?.type === "FOCUS"
                  ? alert("포커스 기록 삭제하기")
                  : alert("기록 상세 보기");
            },
          }}
          overlay={true}
          onClose={handleCloseBottomSheet}
        >
          {isDetailPending ? (
            <div className="py-5 text-center text-body-14-r text-gray-60">
              상세 정보를 불러오는 중이에요.
            </div>
          ) : isDetailError ? (
            <div className="py-5 text-center text-body-14-r text-gray-60">
              상세 정보를 불러오지 못했어요.
            </div>
          ) : selectedDetail?.type === "REGISTER" ? (
            <div className="flex flex-col gap-2">
              <p className="text-label-14-sb text-gray-80">
                {formatDateDot(selectedDetail.occurredAt, {
                  year: false,
                }) ?? "mm.dd."}
              </p>

              <p className="text-body-16-r text-gray-70">
                {selectedDetail.detail.description}
              </p>
            </div>
          ) : selectedDetail?.type === "STATUS" ? (
            <div className="flex flex-col gap-2">
              <p className="text-title-16-b text-gray-90">
                {selectedDetail.detail.title}
              </p>

              <p className="text-body-14-r text-gray-70">
                {selectedDetail.detail.description}
              </p>
            </div>
          ) : selectedDetail?.type === "FOCUS" ? (
            <div className="flex flex-col gap-2">
              <p className="text-label-14-sb text-gray-80">
                {formatDateDot(selectedDetail.occurredAt, {
                  year: false,
                }) ?? "mm.dd."}
              </p>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <img src={focus} alt="focus" />

                  <p className="text-body-16-b text-gray-90">
                    {selectedDetail.detail.timeText}
                  </p>
                </div>

                {selectedDetail.detail.page != null ? (
                  <p className="text-body-14-r text-gray-60">
                    ~ {selectedDetail.detail.page}쪽
                  </p>
                ) : null}
              </div>
            </div>
          ) : selectedDetail?.type === "RECORD" ? (
            <div className="flex flex-col gap-2">
              <p className="text-label-14-sb text-gray-80">
                {formatDateDot(selectedDetail.occurredAt, {
                  year: false,
                }) ?? "mm.dd."}
              </p>

              <div className="flex flex-col gap-1">
                <p className="text-body-16-r text-gray-70">
                  {selectedDetail.detail.content}
                </p>
                {selectedDetail.detail.emotion && (
                  <Emotion
                    active={true}
                    size="s"
                    emojiKey={selectedDetail.detail.emotion}
                  />
                )}
              </div>

              {selectedDetail.detail.imageUrls.length > 0 ? (
                <div className="flex gap-1 overflow-x-auto">
                  {selectedDetail.detail.imageUrls.map((url, index) => (
                    <img
                      key={`${url}-${index}`}
                      src={url}
                      alt={`record-${index + 1}`}
                      className="h-14 w-14 shrink-0 rounded-xs object-cover"
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </BottomSheet>
      ) : null}
    </div>
  );
}
