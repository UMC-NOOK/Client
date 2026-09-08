// libraries
import { useEffect, useMemo, useRef, useState } from "react";
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

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [selectedTimelineId, setSelectedTimelineId] = useState<number | null>(
    null,
  );
  console.log("history state", history.state);
  console.log("libraryId", libraryId);

  const {
    data: timelineData,
    isPending: isTimelinePending,
    isError: isTimelineError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetBookTimelineAll(libraryId);

  console.log("timelineData", timelineData);

  const {
    data: selectedDetail,
    isPending: isDetailPending,
    isError: isDetailError,
  } = useGetBookTimelineAllDetail(libraryId, selectedTimelineId);

  const { deleteBook } = useLibraryBookRegister();

  /**
   * 각 페이지의 dateGroups를 하나의 배열로 합친다.
   *
   * 페이지 마지막 날짜와 다음 페이지 첫 날짜가 같은 경우
   * 날짜 헤더가 중복되지 않도록 items를 하나로 합친다.
   */
  const historyData = useMemo(() => {
    const groups = timelineData?.pages.flatMap((page) => page.dateGroups);

    if (!groups) {
      return [];
    }

    return groups.reduce<typeof groups>((result, currentGroup) => {
      const previousGroup = result[result.length - 1];

      const isSameDate =
        previousGroup &&
        previousGroup.year === currentGroup.year &&
        previousGroup.monthDay === currentGroup.monthDay;

      if (isSameDate) {
        previousGroup.items = [...previousGroup.items, ...currentGroup.items];

        return result;
      }

      result.push({
        ...currentGroup,
        items: [...currentGroup.items],
      });

      return result;
    }, []);
  }, [timelineData]);

  /**
   * 화면 하단 감지 후 다음 페이지 조회
   */
  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const handleCloseBottomSheet = () => {
    setSelectedTimelineId(null);
  };

  const handleDeleteBook = () => {
    if (!bookDetailData) {
      return;
    }

    deleteBook(bookDetailData.bookId, {
      onSuccess: () => {
        navigate(`/library/${bookDetailData.isbn13}`, {
          replace: true,
        });
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

      {isTimelinePending ? (
        <div className="py-10 text-center text-body-14-r text-gray-60">
          독서 히스토리를 불러오는 중이에요.
        </div>
      ) : isTimelineError ? (
        <div className="py-10 text-center text-body-14-r text-gray-60">
          독서 히스토리를 불러오지 못했어요.
        </div>
      ) : (
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

          {/* 이 요소가 화면 근처에 보이면 다음 페이지를 불러온다. */}
          <div
            ref={loadMoreRef}
            className="flex min-h-10 items-center justify-center"
          >
            {isFetchingNextPage ? (
              <p className="text-body-14-r text-gray-60">
                히스토리를 더 불러오는 중이에요.
              </p>
            ) : null}
          </div>
        </div>
      )}

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
              selectedDetail?.type === "FOCUS" ||
              selectedDetail?.type === "STATUS"
                ? "primaryAlert"
                : "mint",
            label:
              selectedDetail?.type === "REGISTER" ||
              selectedDetail?.type === "STATUS"
                ? "서재에서 제거하기"
                : selectedDetail?.type === "FOCUS"
                  ? "포커스 기록 삭제하기"
                  : selectedDetail?.type === "RECORD"
                    ? "기록 상세 보기"
                    : "",
            onClick: () => {
              if (
                selectedDetail?.type === "REGISTER" ||
                selectedDetail?.type === "STATUS"
              ) {
                handleDeleteBook();
                return;
              }
              if (selectedDetail?.type === "FOCUS") {
                alert("포커스 기록 삭제하기");
                return;
              }
              if (selectedDetail?.type === "RECORD") {
                console.log("selectedDetail", selectedDetail);
                navigate(
                  `/report/${bookDetailData.bookId}/${selectedDetail.targetId}`,
                  {
                    state: {
                      record: selectedDetail.detail,
                      bookTitle: bookDetailData.title,
                      bookId: bookDetailData.bookId,
                      book: bookDetailData,
                    },
                  },
                );
                return;
              }
              alert("기록 상세 보기");
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

                {selectedDetail.detail.emotion ? (
                  <Emotion
                    active={true}
                    size="s"
                    emojiKey={selectedDetail.detail.emotion}
                  />
                ) : null}
              </div>

              {(selectedDetail.detail.imageUrls?.length ?? 0) > 0 ? (
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
