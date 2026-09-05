// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import Report from "../../components/content/card/Book/List/Report";
import BottomSheet from "../../components/presentation/modal/bottomsheet/Origin";
import ContainerText from "../../components/action/Button/ContainerText";
import EmptyState from "../../components/content/EmptyState/EmptyState";
import Snackbar from "../../components/feedback/snackbar";
// assets
import plus from "../../assets/icons/plus.svg";
//types
import type { SortOption } from "../../types/report/sortOption.type";
// hooks
import { useGetReportCount } from "../../hooks/queries/report/useGetReportCount";
import { useGetReport } from "../../hooks/queries/report/useGetReort";

export default function ReportPage() {
  const navigate = useNavigate();

  const [showSortSheet, setShowSortSheet] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("RECENT_RECORDED");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const options: { label: string; value: SortOption }[] = [
    { label: "최신 기록 순", value: "RECENT_RECORDED" },
    { label: "오래된 기록 순", value: "OLDEST_RECORDED" },
    { label: "기록 많은 순", value: "RECORD_COUNT_DESC" },
    { label: "기록 적은 순", value: "RECORD_COUNT_ASC" },
  ];

  // 개발용 상태
  // const [hasReport, setHasReport] = useState(true);

  // hooks 호출
  const { data: recordCount } = useGetReportCount();
  const { data: recordData } = useGetReport("10", sortOption);

  const openSnackbar = (message: string) => {
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

  const onClickPlus = () => {
    if (recordCount && recordCount > 0) {
      navigate("/search");
    } else {
      openSnackbar("내 서재에 기록을 남길 책이 없어요.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* header */}
      <div className="flex items-start justify-between mt-6">
        <SectionHeader
          size="20"
          top="독서 기록"
          bottom={
            recordCount === 0 ? (
              <p className="text-body-14-m text-gray-50">남긴 기록이 없어요.</p>
            ) : (
              <p className="text-body-14-m text-gray-50">
                {recordCount}개의 기록을 남겼어요.
              </p>
            )
          }
        />
        <div className="cursor-pointer p-2 w-auto h-auto" onClick={onClickPlus}>
          <img src={plus} alt="plus" />
        </div>
        <Snackbar
          isOpen={snackbar.open}
          onClose={closeSnackbar}
          text={snackbar.message}
          buttonText="서재 검색"
          onButtonClick={() => {
            navigate("/report/search");
            closeSnackbar();
          }}
        />
      </div>

      {/* content */}
      <div className="flex flex-col gap-4">
        <div className="self-end m-2">
          <SectionHeader
            size="14"
            showCaret={true}
            open={showSortSheet}
            top={
              <span>{options.find((o) => o.value === sortOption)?.label}</span>
            }
            onToggle={setShowSortSheet}
          />
        </div>
        <div
          className="flex flex-col gap-2"
          // onClick={() => setHasReport(!hasReport)}
        >
          {recordData?.items && recordData.items.length > 0 ? (
            recordData.items.map((item) => (
              <Report
                key={item.bookId}
                {...item}
                imageUrl={item.coverImageUrl}
                title={item.title}
                author={item.author}
                recent={item.recordContent}
                reviewNumber={item.recordCount}
                onClick={() =>
                  navigate(`/report/${item.bookId}`, {
                    state: {
                      bookTitle: item.title,
                      bookId: item.bookId,
                      book: item,
                    },
                  })
                }
              />
            ))
          ) : (
            <EmptyState text="작성한 기록이 없어요." />
          )}
        </div>
      </div>
      {/* bottom sheet */}
      <BottomSheet
        open={showSortSheet}
        onClose={() => setShowSortSheet(false)}
        title="정렬"
      >
        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <ContainerText
              key={option.value}
              text={option.label}
              active={sortOption === option.value}
              onClick={() => setSortOption(option.value)}
            />
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
