import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import searchIcon from "../../assets/icons/search.svg";
import Icon from "../../components/action/Button/Icon";
import { Focus as FocusBookRow } from "../../components/content/card/Book/List/Focus";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import Toast from "../../components/feedback/toast";
import Dim from "../../components/layout/Dim";
import MaskGradient from "../../components/layout/MaskGradient";
import TabBar from "../../components/navigation/tabs/TabBar";
import { mockFocusMainSummaryResponse } from "../../mocks/focus/focus";
import type { FocusBookStatus } from "../../types/focus/focus";
import { formatDurationHms } from "./utils/formatDurationHms";

const STATUS_TABS: {
  value: FocusBookStatus;
  label: string;
  emptyText: string;
}[] = [
  { value: "BEFORE", label: "독서 전", emptyText: "독서 전인 책이 없어요." },
  { value: "READING", label: "독서 중", emptyText: "독서 중인 책이 없어요." },
  { value: "FINISHED", label: "완독", emptyText: "완독한 책이 없어요." },
];

function isFocusStatus(value: string): value is FocusBookStatus {
  return value === "BEFORE" || value === "READING" || value === "FINISHED";
}

export default function FocusMainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationState = location.state as {
    showFocusEndToast?: boolean;
  } | null;
  const [focusEndToastOpen, setFocusEndToastOpen] = useState(
    navigationState?.showFocusEndToast === true,
  );
  const handleFocusEndToastClose = useCallback(() => {
    setFocusEndToastOpen(false);
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const activeStatus: FocusBookStatus =
    statusParam && isFocusStatus(statusParam) ? statusParam : "BEFORE";

  const setActiveStatus = useCallback(
    (next: FocusBookStatus) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          p.set("status", next);
          return p;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // TODO(담당자): docs/api/focus.md 계약 확정 후 실제 query hook으로 교체
  const { todayTotalFocusSeconds, recentTheme, books } =
    mockFocusMainSummaryResponse.result;

  const activeTab = STATUS_TABS.find((tab) => tab.value === activeStatus)!;
  const visibleBooks = books.filter((book) => book.status === activeStatus);

  // 새로고침이나 뒤로가기로 완료 Toast가 다시 뜨지 않도록 일회성 navigation state를 지운다.
  // 로컬 state의 open 값은 유지되므로 현재 진입에서는 Toast의 4초 노출이 정상 진행된다.
  useEffect(() => {
    if (!navigationState?.showFocusEndToast) return;

    navigate(`${location.pathname}${location.search}`, {
      replace: true,
      state: null,
    });
  }, [
    location.pathname,
    location.search,
    navigate,
    navigationState?.showFocusEndToast,
  ]);

  return (
    <div className="flex flex-col pb-8">
      {/* Figma node 2621:27492 (focus : 메인/이미지) 기준 정확한 스펙 반영, 2026-08-10 */}
      <section className="relative mt-3 h-76 w-full">
        {recentTheme && (
          <>
            <img
              src={recentTheme.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <Dim width="full" height="full" top={0} left={0} />
            <MaskGradient
              width="full"
              height={20}
              top={0}
              left={0}
              className="rotate-180"
            />
            <MaskGradient width="full" height={20} className="bottom-0" />
          </>
        )}

        <div className="relative flex h-full flex-col items-center justify-center gap-2">
          <p className="text-body-16-b text-gray-90">오늘 독서한 시간</p>
          <p className="text-title-40-b text-gray-90 tabular-nums">
            {formatDurationHms(todayTotalFocusSeconds)}
          </p>
        </div>
      </section>

      <section className="mt-4 flex flex-col gap-5">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <SectionHeader
              size="16"
              top="독서할 책 선택"
              bottom="책을 선택하고 포커스를 시작해주세요."
            />

            <button
              type="button"
              aria-label="포커스할 책 검색"
              onClick={() => navigate("/focus/select")}
            >
              <Icon size="m">
                <img src={searchIcon} alt="" />
              </Icon>
            </button>
          </div>

          <TabBar
            options={STATUS_TABS.map(({ value, label }) => ({ value, label }))}
            value={activeStatus}
            onChange={setActiveStatus}
            variant="underlineGradient"
          />
        </div>

        {visibleBooks.length === 0 ? (
          <p className="py-16 text-center text-body-14-r text-gray-50">
            {activeTab.emptyText}
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {visibleBooks.map((book) => (
              <FocusBookRow
                key={book.libraryId}
                imageUrl={book.coverUrl}
                title={book.title}
                author={book.author}
                timeText={formatDurationHms(book.todayFocusSeconds)}
                onClick={() => navigate("/focus/theme")}
              />
            ))}
          </div>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-[calc(16px+env(safe-area-inset-bottom))] z-50 mx-auto flex w-full max-w-93.75 justify-center px-4">
        <Toast
          text="포커스를 종료했어요."
          isOpen={focusEndToastOpen}
          onClose={handleFocusEndToastClose}
        />
      </div>
    </div>
  );
}
