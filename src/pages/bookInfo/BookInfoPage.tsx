// Client/src/pages/bookInfo/BookInfoPage.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

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

import chevronLeft from "../../assets/icons/chevron_left.svg";
import testBookCover from "../../assets/book-info/testBookCover.svg";
import bookShelf from "../../assets/icons/book_shelf-gray-30.svg";

import { useGetBookDetailWithISBN } from "../../hooks/queries/bookInfo/useGetBookDetailWithISBN";
import { useGetBookDetailWithBookId } from "../../hooks/queries/bookInfo/useGetBookDetailWithBookId";
import { useLibraryBookRegister } from "../../hooks/mutations/library/useLibraryBookRegister";
import { useGetBookTimeline } from "../../hooks/queries/bookInfo/useGetBookTimeline";

type DetailTab =
  | "info"
  | "log";

type BookStatusType =
  | "BEFORE"
  | "READING"
  | "FINISHED"
  | "UNREGISTERED";

const detailTabs = [
  {
    value: "info",
    label: "도서 정보",
  },
  {
    value: "log",
    label: "독서 이력",
  },
] as const;

export default function BookInfoPage() {
  const navigate = useNavigate();
  const bookId = history.state?.usr?.bookId || null;

  const { isbn13: identifier } =
    useParams<{
      isbn13: string;
    }>();

  const [searchParams] =
    useSearchParams();

  const identifierType =
    searchParams.get("type");

  const isBookId =
    identifierType === "bookId";

  const parsedBookId =
    Number(identifier);

  const bookId =
    isBookId &&
    Number.isInteger(parsedBookId) &&
    parsedBookId > 0
      ? parsedBookId
      : null;

  const isbn =
    !isBookId && identifier
      ? identifier
      : null;

  const bookIdQuery =
    useGetBookDetailWithBookId(
      bookId,
      isBookId,
    );

  const isbnQuery =
    useGetBookDetailWithISBN(
      isbn,
      !isBookId,
    );

  const activeQuery = isBookId
    ? bookIdQuery
    : isbnQuery;

  const {
    data: bookDetailData,
    isLoading,
    isError,
  } = activeQuery;

  const hasValidIdentifier =
    isBookId
      ? bookId !== null
      : Boolean(isbn);

  const [
    selectedTab,
    setSelectedTab,
  ] = useState<DetailTab>("info");

  const [
    readStatus,
    setReadStatus,
  ] = useState<BookStatusType>(
    "UNREGISTERED",
  );

  const [
    libraryId,
    setLibraryId,
  ] = useState<number | null>(
    null,
  );

  const [
    snackbar,
    setSnackbar,
  ] = useState({
    open: false,
    message: "",
  });

  const { data: bookDetailData, isLoading } = bookId
    ? useGetBookDetailWithBookId(bookId)
    : useGetBookDetailWithISBN(bookISBN!);
  const [
    showReadingModal,
    setShowReadingModal,
  ] = useState(false);

  const [
    showCompleteModal,
    setShowCompleteModal,
  ] = useState(false);

  const effectiveLibraryId =
    libraryId ??
    bookDetailData?.libraryId ??
    null;

  const {
    data: bookTimelineData,
  } = useGetBookTimeline(
    effectiveLibraryId,
  );

  const {
    addBook,
    deleteBook,
    patchBookStatus,
  } = useLibraryBookRegister();

  useEffect(() => {
    if (!bookDetailData) return;

    setReadStatus(
      bookDetailData.readingStatus ??
        "UNREGISTERED",
    );

    setLibraryId(
      bookDetailData.libraryId ??
        null,
    );
  }, [bookDetailData]);

  useEffect(() => {
    if (!hasValidIdentifier) {
      alert(
        "유효하지 않은 도서 정보입니다.",
      );

      navigate(-1);

      return;
    }

    if (
      !isLoading &&
      (isError ||
        bookDetailData === null)
    ) {
      alert(
        "도서 정보를 불러오지 못했습니다.",
      );

      navigate(-1);
    }
  }, [
    hasValidIdentifier,
    isLoading,
    isError,
    bookDetailData,
    navigate,
  ]);

  const openSnackbar = (
    message: string,
  ) => {
    setSnackbar({
      open: true,
      message,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((previous) => ({
      ...previous,
      open: false,
    }));
  };

  const handleDeleteBook = () => {
    if (!bookDetailData) return;

    deleteBook(
      bookDetailData.bookId,
      {
        onSuccess: () => {
          setLibraryId(null);

          setReadStatus(
            "UNREGISTERED",
          );
        },
      },
    );
  };

  const handleRegisterBook = () => {
    if (!bookDetailData) return;

    addBook(
      bookDetailData.bookId,
      {
        onSuccess: () => {
          setLibraryId(
            bookDetailData.libraryId ??
              null,
          );

          openSnackbar(
            "내 서재에 책을 등록했어요.",
          );

          setReadStatus(
            "READING",
          );
        },
      },
    );
  };

  const handleOpenPurchaseLink =
    () => {
      if (
        !bookDetailData?.aladinLink
      ) {
        return;
      }

      window.open(
        bookDetailData.aladinLink,
        "_blank",
        "noopener,noreferrer",
      );
    };

  return (
    <div className="relative flex flex-col pb-[calc(120px+env(safe-area-inset-bottom))]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 z-0 -mx-4 -mt-2 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 h-131.25 w-93.75 -translate-x-1/2">
            {isLoading ? (
              <div className="h-full w-full animate-pulse bg-gray-20 opacity-50 blur-[20px]" />
            ) : (
              <BookCover
                imageUrl={
                  bookDetailData
                    ?.coverImageUrl ||
                  testBookCover
                }
                size="XL"
                type="Image"
                className="h-full w-full opacity-50 blur-[20px]"
              />
            )}

            <div className="absolute inset-0 bg-black opacity-40" />

            <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-10" />
          </div>
        </div>

        <div className="relative z-10">
          <TopNavigation
            left={
              <img
                src={
                  chevronLeft
                }
                alt="뒤로 가기"
              />
            }
            onClickLeft={() => {
              navigate(-1);
            }}
          />

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            {isLoading ? (
              <div className="h-50 w-35 animate-pulse rounded-md bg-gray-20" />
            ) : (
              <BookCover
                imageUrl={
                  bookDetailData
                    ?.coverImageUrl ||
                  testBookCover
                }
                size="XL"
                type="Image"
              />
            )}

            <div className="flex flex-col items-center gap-2">
              {isLoading ? (
                <>
                  <div className="h-6 w-48 animate-pulse rounded-sm bg-gray-20" />

                  <div className="mt-1 h-4 w-24 animate-pulse rounded-sm bg-gray-20" />
                </>
              ) : (
                <>
                  <p className="text-center text-title-18-b text-gray-90">
                    {
                      bookDetailData
                        ?.title
                    }
                  </p>

                  <p className="text-center text-body-14-m text-gray-80">
                    {
                      bookDetailData
                        ?.author
                    }
                  </p>
                </>
              )}
            </div>
          </div>

          <TabBar
            options={detailTabs}
            value={selectedTab}
            onChange={
              setSelectedTab
            }
            variant="underlineGradient"
            className="mt-6"
          />
        </div>
      </div>

      {selectedTab === "info" ? (
        <div className="mt-8 flex flex-col items-center justify-center gap-10">
          <div className="grid w-full grid-cols-2 gap-8 px-1 text-gray-90">
            {isLoading ? (
              <>
                <div className="col-span-2 h-24 w-full animate-pulse rounded-sm bg-gray-15" />

                <div className="h-12 w-full animate-pulse rounded-sm bg-gray-15" />

                <div className="h-12 w-full animate-pulse rounded-sm bg-gray-15" />

                <div className="h-12 w-full animate-pulse rounded-sm bg-gray-15" />

                <div className="h-12 w-full animate-pulse rounded-sm bg-gray-15" />
              </>
            ) : (
              <>
                <div className="col-span-2 w-full">
                  <InformationSection
                    flow="vertical"
                    top="소개"
                    bottom={
                      bookDetailData
                        ?.description
                    }
                  />
                </div>

                <InformationSection
                  flow="vertical"
                  top="분야"
                  bottom={
                    bookDetailData
                      ?.category
                  }
                />

                <InformationSection
                  flow="vertical"
                  top="분량"
                  bottom={
                    bookDetailData
                      ? `${bookDetailData.pages}쪽`
                      : ""
                  }
                />

                <InformationSection
                  flow="vertical"
                  top="출판"
                  bottom={
                    bookDetailData
                      ? `${bookDetailData.publisher} (${bookDetailData.publicationDate})`
                      : ""
                  }
                />

                <InformationSection
                  flow="vertical"
                  top="ISBN"
                  bottom={
                    bookDetailData
                      ?.isbn13
                  }
                />
              </>
            )}
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-2">
            {!isLoading &&
              bookDetailData &&
              readStatus !==
                "UNREGISTERED" && (
                <Solid
                  text="서재에서 삭제하기"
                  variant="alert"
                  size="m"
                  onClick={
                    handleDeleteBook
                  }
                />
              )}

            {!isLoading &&
              bookDetailData
                ?.aladinLink && (
                <div className="flex gap-2 text-label-12-sb text-gray-50">
                  <div>
                    도서 DB 제공:
                    알라딘
                  </div>

                  <button
                    type="button"
                    className="cursor-pointer underline"
                    onClick={
                      handleOpenPurchaseLink
                    }
                  >
                    도서 구매하기
                  </button>
                </div>
              )}
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-8 px-1 text-gray-90">
          <div className="flex flex-col gap-3">
            <div className="text-label-16-sb">
              포커스
            </div>

            <div className="rounded-sm bg-gray-15 p-4 text-body-14-r">
              {bookTimelineData ? (
                <div className="flex flex-col gap-4">
                  <InformationSection
                    flow="horizontal"
                    top="기간"
                    bottom={`${
                      bookTimelineData
                        .focusSummary
                        .startedAt
                    } ~ ${
                      bookTimelineData
                        .focusSummary
                        .endedAt ||
                      ""
                    }`}
                  />

                  <InformationSection
                    flow="horizontal"
                    top="시간"
                    bottom={`${Math.floor(
                      bookTimelineData
                        .focusSummary
                        .totalFocusSec /
                        3600,
                    )}시간 ${Math.floor(
                      (
                        bookTimelineData
                          .focusSummary
                          .totalFocusSec %
                        3600
                      ) / 60,
                    )}분`}
                  />

                  <InformationSection
                    flow="horizontal"
                    top="횟수"
                    bottom={`${bookTimelineData.focusSummary.focusCount}번`}
                  />

                  <InformationSection
                    flow="horizontal"
                    top="페이지"
                    bottom={`${bookTimelineData.focusSummary.page}쪽`}
                  />
                </div>
              ) : (
                "아직 포커스하지 않았어요."
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {bookTimelineData ? (
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-label-16-sb">
                    기록
                  </span>

                  <span className="text-label-16-sb text-mint-60">
                    {
                      bookTimelineData
                        .recordSummary
                        .recordCount
                    }
                  </span>
                </div>

                <button
                  type="button"
                  className="cursor-pointer px-2 py-1 text-btn-14-sb text-gray-60"
                  onClick={() => {
                    if (
                      !bookDetailData
                    ) {
                      return;
                    }

                    navigate(
                      `/report/${bookDetailData.bookId}`,
                      {
                        state: {
                          bookTitle:
                            bookDetailData.title,
                          bookId:
                            bookDetailData.bookId,
                        },
                      },
                    );
                  }}
                >
                  전체 보기
                </button>
              </div>
            ) : (
              <div className="text-label-16-sb">
                기록
              </div>
            )}

            <div className="rounded-sm bg-gray-15 p-4 text-body-14-r">
              {bookTimelineData ? (
                <InformationSection
                  flow="horizontal"
                  bottom={
                    <div className="line-clamp-3 w-full overflow-hidden">
                      {
                        bookTimelineData
                          .recordSummary
                          .latestRecordPreview
                      }
                    </div>
                  }
                />
              ) : (
                "아직 기록이 없어요."
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {bookTimelineData ? (
              <div className="flex items-center justify-between">
                <div className="text-label-16-sb">
                  독서 히스토리
                </div>

                <button
                  type="button"
                  className="cursor-pointer px-2 py-1 text-btn-14-sb text-gray-60"
                  onClick={() => {
                    if (
                      !effectiveLibraryId
                    ) {
                      return;
                    }

                    navigate(
                      `/library/${effectiveLibraryId}/history`,
                    );
                  }}
                >
                  전체 보기
                </button>
              </div>
            ) : (
              <div className="text-label-16-sb">
                독서 히스토리
              </div>
            )}

            <div
              className={`rounded-sm bg-gray-15 p-4 text-body-14-r ${
                effectiveLibraryId
                  ? "relative h-80 overflow-hidden"
                  : ""
              }`}
            >
              {bookTimelineData ? (
                <>
                  <MaskGradient
                    width="full"
                    height={20}
                    className="-m-4 bottom-0"
                  />

                  {bookTimelineData.timelinePreview.dateGroups.map(
                    (
                      history,
                    ) => (
                      <div
                        key={`${history.year}-${history.monthDay}`}
                        className="mb-4 flex w-full items-start gap-2"
                      >
                        <ResourceDate
                          topText={
                            history.monthDay
                          }
                          bottomText={
                            history.showYear
                              ? String(
                                  history.year,
                                )
                              : ""
                          }
                        />

                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          {history.items.map(
                            (
                              item,
                            ) => (
                              <HistoryInfoCard
                                key={
                                  item.timelineId
                                }
                                variant={
                                  item.type ===
                                  "RECORD"
                                    ? "history"
                                    : "time"
                                }
                                title={
                                  item.title
                                }
                                time={
                                  item.subtitle ||
                                  ""
                                }
                                hasIcon={
                                  item.type !==
                                    "REGISTER" &&
                                  item.type !==
                                    "STATUS"
                                }
                              />
                            ),
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </>
              ) : (
                "아직 독서 활동이 없어요."
              )}
            </div>
          </div>
        </div>
      )}

      {!isLoading &&
        bookDetailData &&
        (readStatus ===
          "BEFORE" ||
          readStatus ===
            "READING") && (
          <>
            <BottomSheet
              open
              onClose={() => {}}
              overlay={false}
              footer={{
                layout:
                  "double",
                sizeMode:
                  "split",
                leftVariant:
                  "secondary",
                leftLabel:
                  "완독 표시",
                rightLabel:
                  "포커스 시작하기",
                onLeftClick:
                  () => {
                    setShowCompleteModal(
                      true,
                    );
                  },
                onRightClick:
                  () => {
                    // 포커스 페이지 이동
                  },
              }}
            />

            <Snackbar
              icon={bookShelf}
              isOpen={
                snackbar.open
              }
              onClose={
                closeSnackbar
              }
              text={
                snackbar.message
              }
              buttonText="서재로 이동"
              onButtonClick={
                closeSnackbar
              }
            />
          </>
        )}

      {!isLoading &&
        bookDetailData &&
        readStatus ===
          "UNREGISTERED" && (
          <BottomSheet
            open
            onClose={() => {}}
            overlay={false}
            footer={{
              layout:
                "single",
              variant:
                "mint",
              label:
                "서재에 등록하기",
              onClick:
                handleRegisterBook,
            }}
          />
        )}

      {!isLoading &&
        bookDetailData &&
        readStatus ===
          "FINISHED" && (
          <BottomSheet
            open
            onClose={() => {}}
            overlay={false}
            footer={{
              layout:
                "single",
              variant:
                "primarySecondaryText",
              label:
                "완독 취소하기",
              onClick:
                () => {
                  setShowReadingModal(
                    true,
                  );
                },
            }}
          />
        )}

      {showCompleteModal &&
        bookDetailData && (
          <PopupConfirmModal
            open
            onClose={() => {
              setShowCompleteModal(
                false,
              );
            }}
            title="완독 상태로 변경할까요?"
            description="다시 독서 중 상태로 되돌릴 수 있어요."
            leftLabel="취소"
            rightLabel="변경"
            onLeftClick={() => {
              setShowCompleteModal(
                false,
              );
            }}
            onRightClick={() => {
              patchBookStatus(
                {
                  bookId:
                    bookDetailData.bookId,
                  readingStatus:
                    "FINISHED",
                },
                {
                  onSuccess:
                    () => {
                      setReadStatus(
                        "FINISHED",
                      );

                      setShowCompleteModal(
                        false,
                      );
                    },
                },
              );
            }}
          />
        )}

      {showReadingModal &&
        bookDetailData && (
          <PopupConfirmModal
            open
            onClose={() => {
              setShowReadingModal(
                false,
              );
            }}
            title="독서 중 상태로 변경할까요?"
            description="다시 완독 상태로 되돌릴 수 있어요."
            leftLabel="취소"
            rightLabel="변경"
            onLeftClick={() => {
              setShowReadingModal(
                false,
              );
            }}
            onRightClick={() => {
              patchBookStatus(
                {
                  bookId:
                    bookDetailData.bookId,
                  readingStatus:
                    "READING",
                },
                {
                  onSuccess:
                    () => {
                      setReadStatus(
                        "READING",
                      );

                      setShowReadingModal(
                        false,
                      );
                    },
                },
              );
            }}
          />
        )}
    </div>
  );
}