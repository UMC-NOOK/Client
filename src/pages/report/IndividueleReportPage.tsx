// libraries
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// components
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import Chip from "../../components/action/Chip/Chip";
import ReportList from "../../components/content/card/Report/List";
import EmptyState from "../../components/content/EmptyState/EmptyState";
import FAB from "../../components/action/Button/FAB";
// api
import { useGetIndividueleRecords } from "../../hooks/queries/report/useGetIndividueleRecords";
// types
import type { EmotionKey } from "../../types/report/emotions.type";
import type { EmotionKey as emotion } from "../../components/action/Chip/Emotion";
// assets
import chevron_left from "../../assets/icons/chevron_left.svg";
import plus from "../../assets/icons/plus-gray-10.svg";

export default function IndividueleReportPage() {
  const { id } = useParams();
  const bookTitle = history.state?.usr?.bookTitle || "책 제목 없음";
  const navigate = useNavigate();

  const emotionMetaMap: Record<EmotionKey, { text: string; count: number }> = {
    ALL: {
      text: "전체",
      count: 6,
    },
    FUN: {
      text: "재밌어요",
      count: 2,
    },
    EMPATHIZING: {
      text: "공감돼요",
      count: 0,
    },

    USEFUL: {
      text: "유익해요",
      count: 0,
    },
    SAD: {
      text: "슬퍼요",
      count: 0,
    },
    UNCOMFORTABLE: {
      text: "불편해요",
      count: 3,
    },
    COMPLICATED: {
      text: "복잡해요",
      count: 1,
    },
    EMPTY: {
      text: "선택없음",
      count: 0,
    },
  };

  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey>("ALL");

  const { data: recordsData } = useGetIndividueleRecords(
    parseInt(id || "0", 10),
    undefined,
    selectedEmotion,
  );

  return (
    <div className="flex flex-col items-center justify-start w-full h-[100dvh] overflow-hidden gap-4 relative">
      <TopNavigation
        left={<img src={chevron_left} alt="back" />}
        onClickLeft={() => navigate(-1)}
        center={bookTitle}
      />

      <div className="flex items-start w-full overflow-x-scroll gap-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {Object.entries(emotionMetaMap).map(([key, { text, count }]) => (
          <Chip
            key={key}
            active={selectedEmotion === key}
            text={`${text} ${count}`}
            variant="none"
            onClick={() => setSelectedEmotion(key as EmotionKey)}
          />
        ))}
      </div>
      <div className="flex-1 w-full overflow-y-auto flex flex-col items-center justify-start gap-1 pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {recordsData?.items.length === 0 && (
          <EmptyState text="작성한 기록이 없어요." />
        )}
        {(recordsData?.items ?? []).map((record) => (
          <ReportList
            key={record.recordId}
            date={record.createdDate}
            emojiKey={record.emotion as emotion | null}
            review={record.content}
            images={record.imageUrl}
          />
        ))}
      </div>
      <FAB
        icon={<img src={plus} alt="plus" />}
        onClick={() => navigate(`/report/${id}/create`)}
        className="absolute bottom-6 right-4 z-10"
      />
    </div>
  );
}
