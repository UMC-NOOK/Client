import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import searchIcon from "../../assets/icons/search.svg";
import Icon from "../../components/action/Button/Icon";
import { Focus as FocusBookRow } from "../../components/content/card/Book/List/Focus";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import LoadingState from "../../components/feedback/LoadingState";
import Toast from "../../components/feedback/toast";
import Dim from "../../components/layout/Dim";
import MaskGradient from "../../components/layout/MaskGradient";
import TabBar from "../../components/navigation/tabs/TabBar";
import { useFocusHome } from "../../hooks/queries/focus/useFocusHome";
import type { FocusBookStatus } from "../../types/focus/focus";
import { findFocusTheme } from "./utils/focusThemes";
import { readStoredFocusThemeId } from "./utils/focusThemeStorage";

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
  const loadMoreTargetRef = useRef<HTMLDivElement | null>(null);
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
  const [recentThemeId] = useState(readStoredFocusThemeId);
  const recentThemeImageUrl = findFocusTheme(recentThemeId)?.mainImageUrl;

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useFocusHome({ status: activeStatus });

  const books = useMemo(
    () => data?.pages.flatMap((page) => page.books.items) ?? [],
    [data],
  );
  const todayFocusTime = data?.pages[0]?.todayFocusTime;

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

  const activeTab = STATUS_TABS.find((tab) => tab.value === activeStatus)!;

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

  useEffect(() => {
    const target = loadMoreTargetRef.current;

    if (!target || !hasNextPage || isFetchingNextPage || isFetchNextPageError) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        void fetchNextPage();
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchNextPageError, isFetchingNextPage, books.length]);

  if (isLoading) {
    return <LoadingState variant="fullscreen" />;
  }

  if (isError && books.length === 0) {
    return (
      <p className="py-16 text-center text-label-14-sb text-gray-60">
        목록을 불러오지 못했어요.
      </p>
    );
  }

  return (
    <div className="flex flex-col pb-8">
      {/* Figma node 2621:27492 (focus : 메인/이미지) 기준 정확한 스펙 반영, 2026-08-10 */}
      <section className="relative mt-3 h-76 w-full">
        {recentThemeImageUrl && (
          <>
            <img
              src={recentThemeImageUrl}
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
            {todayFocusTime}
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

        {books.length === 0 ? (
          <p className="py-16 text-center text-body-14-r text-gray-50">
            {activeTab.emptyText}
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {books.map((book) => (
              <FocusBookRow
                key={book.bookId}
                imageUrl={book.coverUrl}
                title={book.title}
                author={book.author}
                timeText={book.todayFocusTime}
                onClick={() =>
                  navigate(`/focus/theme?bookId=${encodeURIComponent(book.bookId)}`)
                }
              />
            ))}

            {hasNextPage && !isFetchNextPageError ? (
              <div ref={loadMoreTargetRef} className="h-6 shrink-0" />
            ) : null}

            {isFetchingNextPage ? (
              <p className="py-4 text-center text-label-14-sb text-gray-60">
                더 불러오는 중…
              </p>
            ) : null}

            {isFetchNextPageError ? (
              <p className="py-4 text-center text-label-14-sb text-gray-60">
                추가 목록을 불러오지 못했어요.
              </p>
            ) : null}
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
