import Icon from "../../components/action/Button/Icon";
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import chevronLeft from "../../assets/icons/chevron_left.svg";
import search from "../../assets/icons/search.svg";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import TabBar from "../../components/navigation/tabs/TabBar";
import type { TabOption } from "../../components/navigation/tabs/TabBar";
import { useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BookList from "../../components/content/card/Book/List";
import Divider from "../../components/layout/Divider";
import type { BaseStatusBookItems } from "../../types/libraryInfo/library";
import { useLibraryStatusBooks } from "../../hooks/queries/library";

const LIBRARY_TAB_VALUES = ["BEFORE", "READING", "FINISHED"] as const;
type LibraryTab = (typeof LIBRARY_TAB_VALUES)[number];

function isLibraryTab(value: string): value is LibraryTab {
  return (LIBRARY_TAB_VALUES as readonly string[]).includes(value);
}

function parseQueryInt(value: string | null, fallback: number): number {
  if (value == null || value === "") return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

const TAB_OPTIONS: TabOption<LibraryTab>[] = [
    { value: "BEFORE", label: "독서 전" },
    { value: "READING", label: "독서 중" },
    { value: "FINISHED", label: "완독" },
];

const SECTION_SUBJECT: Record<LibraryTab, string> = {
    BEFORE: "독서 전인",
    READING: "독서 중인",
    FINISHED: "완독한",
};

const SECTION_BOTTOM: Record<LibraryTab, string> = {
    BEFORE: "아직 포커스 한 적 없는 책들이에요.",
    READING: "한 번 이상 포커스 한 책들이에요.",
    FINISHED: "다 읽은 책들이에요.",
};

function formatDateLabel(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
}

function getBookListProps(
    item: BaseStatusBookItems & Partial<{ startedAt: string; endedAt: string }>,
    tab: LibraryTab,
) {
    if (tab === "BEFORE") {
        return { type: "BEFORE" as const, typeLabel: null };
    }
    if (tab === "READING" && item.startedAt) {
        return {
            type: "READINGORDONE" as const,
            typeLabel: formatDateLabel(item.startedAt),
        };
    }
    if (tab === "FINISHED" && item.startedAt && item.endedAt) {
        return {
            type: "READINGORDONE" as const,
            typeLabel: `${formatDateLabel(item.startedAt)} - ${formatDateLabel(item.endedAt)}`,
        };
    }
    return { type: "READINGORDONE" as const, typeLabel: null };
}

function getEmptyText(tab: LibraryTab) {
    if (tab === "BEFORE") return "서재에 독서 전인 책이 없어요.";
    if (tab === "READING") return "서재에 독서 중인 책이 없어요.";
    return "서재에 완독한 책이 없어요.";
}

export default function LibraryAllBookPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const statusParam = searchParams.get("status");
    const tab: LibraryTab =
        statusParam && isLibraryTab(statusParam) ? statusParam : "BEFORE";

    const cursor = parseQueryInt(searchParams.get("cursor"), 0);
    const size = parseQueryInt(searchParams.get("size"), 20);

    const setTab = useCallback(
        (next: LibraryTab) => {
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

    const { data, isLoading, isError } = useLibraryStatusBooks({
        status: tab,
        cursor,
        size,
    });

    const bookItems = data?.bookItems ?? [];
    const totalBookNum = data?.totalBookNum ?? 0;

    return (
        <div>
            <div className="pt-2">
                <TopNavigation
                    left={
                        <Link to="/library">
                            <Icon size="m">
                                <img src={chevronLeft}/>
                            </Icon>
                        </Link>
                    }
                    center={
                        <div className="text-label-18-rb text-gray-90">
                            서제 전체 보기
                        </div>
                    }

                    right={
                        <Icon size="m">
                            <img src={search}/>
                        </Icon>
                    }
                />
            </div>
            <div className="py-8">
                <SectionHeader
                    size="20"
                    top={
                        <div className="flex items-center gap-1">
                            <label className="text-gray-90">
                                {SECTION_SUBJECT[tab]} 책이{" "}
                            </label>
                            <label className="text-yellow-70">
                                {isLoading ? "0권" : `${totalBookNum}권`}
                            </label>
                            <label className="text-gray-90"> 있어요.</label>
                        </div>
                    }
                    bottom={<div>{SECTION_BOTTOM[tab]}</div>}
                />
            </div>
            <div>
                <TabBar
                    options={TAB_OPTIONS}
                    value={tab}
                    onChange={setTab}
                />
            </div>
            <div className="flex flex-col pt-6">
            {isLoading ? (
                <div className="text-label-14-sb text-gray-60">불러오는 중…</div>
            ) : isError ? (
                <div className="text-label-14-sb text-gray-60">
                    목록을 불러오지 못했어요.
                </div>
            ) : bookItems.length === 0 ? (
                <div className="text-label-14-sb text-gray-60">
                    {getEmptyText(tab)}
                </div>
            ) : (
                bookItems.map((item, index) => {
                    const bookListProps = getBookListProps(item, tab);

                    return (
                        <div key={item.bookId}>
                            <BookList
                                imageUrl={item.coverUrl}
                                title={item.title}
                                author={item.author}
                                type={bookListProps.type}
                                typeLabel={bookListProps.typeLabel}
                                onClick={() => {
                                console.log("clicked:", item.bookId);
                                }}
                            />

                            {index !== bookItems.length - 1 ? (
                                <div className="py-1">
                                    <Divider width={"full"} />
                                </div>
                            ) : null}
                        </div>
                    );
                })
            )}
            </div>
        </div>
    );
}