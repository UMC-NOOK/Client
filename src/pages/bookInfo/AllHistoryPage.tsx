// libraries
import { useState, useMemo } from "react";
// components
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import HistoryInfoCard from "../../components/content/list/History";
import ResourceDate from "../../components/content/list/Resource/Date";
import BottomSheet from "../../components/presentation/modal/bottomsheet/Origin";
import Emotion from "../../components/action/Chip/Emotion";
// assets
import chevron_left from "../../assets/icons/chevron_left.svg";
import focus from "../../assets/icons/focus-gray-90.svg";
// mocks
import { historyData } from "../../mocks/bookInfo/historyData";
import { timelineDetailMockMap } from "../../mocks/bookInfo/timelineDetailMock";
// types
import type { TimelineDetailResponse } from "../../types/bookInfo/history.type";
// utils
import { formatDateKorean, formatDateDot } from "../../utils/formatDateParts";

export default function AllHistoryPage() {
  const [selectedTimelineId, setSelectedTimelineId] = useState<number | null>(
    null,
  );

  const selectedDetail: TimelineDetailResponse | null = useMemo(() => {
    if (selectedTimelineId === null) return null;
    return timelineDetailMockMap[selectedTimelineId] ?? null;
  }, [selectedTimelineId]);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center pb-10">
      <TopNavigation
        left={<img src={chevron_left} alt="back" />}
        onClickLeft={() => window.history.back()}
        center="독서 히스토리"
        className="mb-10"
      />
      <div className="flex flex-col gap-4 w-full">
        {historyData.map((yearGroup) => (
          <div
            key={`${yearGroup.year}-${yearGroup.monthDay}`}
            className="flex gap-2 items-start"
          >
            <ResourceDate
              topText={yearGroup.monthDay}
              bottomText={yearGroup.showYear ? String(yearGroup.year) : ""}
            />{" "}
            <div className="min-w-0 flex flex-1 flex-col gap-1">
              {yearGroup.items.map((item) => (
                <HistoryInfoCard
                  key={item.timelineId}
                  variant={item.type === "RECORD" ? "history" : "time"}
                  title={item.title}
                  time={item.subtitle}
                  hasIcon={item.type !== "REGISTER" && item.type !== "STATUS"}
                  onClick={() => setSelectedTimelineId(item.timelineId)}
                />
              ))}{" "}
            </div>
          </div>
        ))}
      </div>
      {selectedDetail ? (
        <BottomSheet
          open={!!selectedDetail}
          title={
            formatDateKorean(selectedDetail.result.occurredAt, {
              year: false,
            }) ?? "mm월 dd일"
          }
          footer={{
            layout: "single",
            variant:
              selectedDetail.result.type === "REGISTER" ||
              selectedDetail.result.type === "FOCUS"
                ? "primaryAlert"
                : "mint",
            label:
              selectedDetail.result.type === "REGISTER"
                ? "서재에서 제거하기"
                : selectedDetail.result.type === "FOCUS"
                  ? "포커스 기록 삭제하기"
                  : "기록 상세 보기",
          }}
          overlay={true}
          onClose={() => setSelectedTimelineId(null)}
        >
          {selectedDetail.result.type === "REGISTER" ? (
            <div className="flex flex-col gap-2">
              <p className="text-label-14-sb text-gray-80">
                {formatDateDot(selectedDetail.result.occurredAt, {
                  year: false,
                }) ?? "mm.dd."}
              </p>
              <p className="text-body-16-r text-gray-70">
                {selectedDetail.result.detail.description}
              </p>
            </div>
          ) : selectedDetail.result.type === "STATUS" ? (
            <div className="flex flex-col gap-4">
              <p className="text-body-14 text-gray-90">
                {selectedDetail.result.detail.description}
              </p>
            </div>
          ) : selectedDetail.result.type === "FOCUS" ? (
            <div className="flex flex-col gap-2">
              <p className="text-label-14-sb text-gray-80">
                {formatDateDot(selectedDetail.result.occurredAt, {
                  year: false,
                }) ?? "mm.dd."}
              </p>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <img src={focus} alt="focus" />
                  <div className="text-body-16-b text-gray-90">
                    {selectedDetail.result.detail.timeText}
                  </div>
                </div>
                {selectedDetail.result.detail.page ? (
                  <div className="text-body-14 text-gray-60">
                    {`~ ${selectedDetail.result.detail.page}쪽`}
                  </div>
                ) : null}
              </div>
            </div>
          ) : selectedDetail.result.type === "RECORD" ? (
            <div className="flex flex-col gap-2">
              <p className="text-label-14-sb text-gray-80">
                {formatDateDot(selectedDetail.result.occurredAt, {
                  year: false,
                }) ?? "mm.dd."}
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-body-16-r text-gray-70">
                  {selectedDetail.result.detail.content}
                </p>
                <Emotion
                  active={true}
                  size="s"
                  emojiKey={selectedDetail.result.detail.emotion}
                />
              </div>
              <div className="flex gap-1 overflow-x-auto">
                {selectedDetail.result.detail.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`record-${index + 1}`}
                    className="w-14 h-14 object-cover rounded-xs"
                  />
                ))}
              </div>
            </div>
          ) : null}
        </BottomSheet>
      ) : null}
    </div>
  );
}
