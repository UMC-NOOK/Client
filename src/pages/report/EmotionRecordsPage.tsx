// libraries
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// components
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import Chip from "../../components/action/Chip/Chip";
import ReportList from "../../components/content/card/Report/List";
import EmptyState from "../../components/content/EmptyState/EmptyState";
import FAB from "../../components/action/Button/FAB";
import BookCover from "../../components/atomic/BookCover";
import Text from "../../components/action/Button/Text";
// api
import { useGetIndividueleRecords } from "../../hooks/queries/report/useGetEmotionRecords";
import { useGetEmotions } from "../../hooks/queries/report/useGetEmotions";
// types
import type { EmotionKey } from "../../types/report/emotions.type";
import type { EmotionKey as emotion } from "../../components/action/Chip/Emotion";
// assets
import chevron_left from "../../assets/icons/chevron_left.svg";
import plus from "../../assets/icons/plus-gray-10.svg";
import testBookCover from "../../assets/book-info/testBookCover.svg";

export default function IndividueleReportPage() {
  const { id } = useParams();
  const bookTitle = history.state?.usr?.bookTitle || "책 제목 없음";
  const bookId = history.state?.usr?.bookId || id;
  const book = history.state?.usr?.book || null;

  const navigate = useNavigate();

  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey>("ALL");

  const { data: recordsData, isLoading: isLoadingRecords } =
    useGetIndividueleRecords(parseInt(id || "0", 10), "10", selectedEmotion);

  const records = recordsData?.pages.flatMap((page) => page.items) ?? [];

  const { data: emotionsData } = useGetEmotions(parseInt(id || "0", 10));

  const emotionMetaMap: Record<EmotionKey, { text: string; count: number }> = {
    ALL: {
      text: "전체",
      count: emotionsData?.totalCount || 0,
    },
    FUN: {
      text: "재밌어요",
      count:
        emotionsData?.emotionCounts.find((e) => e.emotion === "FUN")
          ?.recordCount || 0,
    },
    EMPATHIZING: {
      text: "공감돼요",
      count:
        emotionsData?.emotionCounts.find((e) => e.emotion === "EMPATHIZING")
          ?.recordCount || 0,
    },

    USEFUL: {
      text: "유익해요",
      count:
        emotionsData?.emotionCounts.find((e) => e.emotion === "USEFUL")
          ?.recordCount || 0,
    },
    SAD: {
      text: "슬퍼요",
      count:
        emotionsData?.emotionCounts.find((e) => e.emotion === "SAD")
          ?.recordCount || 0,
    },
    UNCOMFORTABLE: {
      text: "불편해요",
      count:
        emotionsData?.emotionCounts.find((e) => e.emotion === "UNCOMFORTABLE")
          ?.recordCount || 0,
    },
    COMPLICATED: {
      text: "복잡해요",
      count:
        emotionsData?.emotionCounts.find((e) => e.emotion === "COMPLICATED")
          ?.recordCount || 0,
    },
    EMPTY: {
      text: "선택없음",
      count:
        emotionsData?.emotionCounts.find((e) => e.emotion === "EMPTY")
          ?.recordCount || 0,
    },
  };

  return (
    <div
      className="flex flex-col items-center justify-start w-full gap-4 relative  
       "
    >
      <div className="relative w-full min-w-0">
        {/*배경영역*/}
        <div className="absolute inset-0 z-0 -mx-4 -mt-2 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-131.25">
            <BookCover
              imageUrl={book?.coverImageUrl || testBookCover}
              size="XL"
              type="Image"
              className="w-full h-full blur-[20px] opacity-50 "
            />
            <div className="absolute inset-0 bg-black opacity-40" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-10" />
          </div>
        </div>
        {/* 상단 네비게이션 및 책 정보 영역 */}
        <div className="relative z-10 w-full min-w-0">
          <TopNavigation
            right={null}
            left={<img src={chevron_left} alt="back" />}
            onClickLeft={() => navigate(-1)}
          />
          <div className="flex flex-col items-start justify-start gap-8 w-full min-w-0">
            <div className="flex justify-start items-start mt-4 gap-7 w-full ">
              <BookCover
                imageUrl={book?.coverImageUrl || testBookCover}
                size="M"
                type="Image"
                className="shrink-0 "
              />
              <div className="flex flex-col justify-between h-36 ">
                <div className="flex flex-col items-start gap-1.5">
                  <p className="text-title-18-m text-gray-90 ">{bookTitle}</p>
                  <p className="text-body-16-r text-gray-80 ">
                    {book?.author || "작가 정보 없음"}
                  </p>
                </div>
                <Text
                  size="18"
                  active={false}
                  onClick={() =>
                    navigate(`/library/${bookId}`, {
                      state: { bookTitle, bookId, book },
                    })
                  }
                >
                  도서 상세 보기 →
                </Text>
              </div>
            </div>
            <div className="flex items-start w-full min-w-0 overflow-x-scroll gap-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {Object.entries(emotionMetaMap).map(([key, { text, count }]) => (
                <div key={key} className="shrink-0">
                  <Chip
                    active={selectedEmotion === key}
                    text={`${text} ${count}`}
                    variant="none"
                    onClick={() => setSelectedEmotion(key as EmotionKey)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full overflow-y-auto flex flex-col items-center justify-start gap-1 pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isLoadingRecords && <EmptyState text="기록을 불러오는 중이에요..." />}
        {!isLoadingRecords && records.length === 0 && (
          <EmptyState text="작성한 기록이 없어요." />
        )}
        {!isLoadingRecords &&
          records.map((record) => (
            <ReportList
              key={record.recordId}
              date={record.createdDate}
              emojiKey={record.emotion as emotion}
              review={record.content}
              images={record.imgUrls}
              onClick={() =>
                navigate(`/report/${id}/${record.recordId}`, {
                  state: { bookTitle, record, bookId, book },
                })
              }
            />
          ))}
      </div>
      <FAB
        aria-label="기록 작성"
        icon={<img src={plus} alt="plus" />}
        onClick={() =>
          navigate(`/report/${id}/create`, { state: { bookTitle, bookId } })
        }
        className="absolute bottom-6 right-0 z-10"
      />
    </div>
  );
}
