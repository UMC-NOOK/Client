import Icon from "../../components/action/Button/Icon";
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import chevronLeft from "../../assets/icons/chevron_left.svg";
import search from "../../assets/icons/search.svg";
import SectionHeader from "../../components/content/InformationText/SectionHeader";
import TabBar from "../../components/navigation/tabs/TabBar";
import type { TabOption } from "../../components/navigation/tabs/TabBar";
import { useMemo, useState } from "react";
import BookList from "../../components/content/card/Book/List";
import Divider from "../../components/layout/Divider";

type LibraryTab = "BEFORE" | "READING" | "FINISHED";

const TAB_OPTIONS: TabOption<LibraryTab>[] = [
    { value: "BEFORE", label: "독서 전" },
    { value: "READING", label: "독서 중" },
    { value: "FINISHED", label: "완독" },
];

type LibraryBookItem = {
    bookId: number;
    title: string;
    author: string;
    coverUrl: string;
    startedAt: string;
    endedAt: string | null;
    tab: LibraryTab;
};

const MOCK_BOOKS: LibraryBookItem[] = [
    {
      bookId: 1,
      title: "[국내도서] 혼모노",
      author: "성해나",
      coverUrl:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop",
      startedAt: "",
      endedAt: null,
      tab: "BEFORE",
    },
    {
      bookId: 2,
      title: "[eBook] 혼모노",
      author: "성해나",
      coverUrl:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop",
      startedAt: "2026-04-10",
      endedAt: null,
      tab: "READING",
    },
    {
      bookId: 3,
      title: "나는 성해나의 <혼모노>를 이렇게 읽었다",
      author: "문지한",
      coverUrl:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400&auto=format&fit=crop",
      startedAt: "2026-03-22",
      endedAt: "2026-03-29",
      tab: "FINISHED",
    },
    {
      bookId: 4,
      title: "[국내도서] 혼모노 특별판",
      author: "성해나",
      coverUrl:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop",
      startedAt: "2026-04-01",
      endedAt: null,
      tab: "READING",
    },
  ];

  function getBookListProps(item: LibraryBookItem, tab: LibraryTab) {
    if (tab === "BEFORE") {
      return {
        type: "BEFORE" as const,
        typeLabel: null,
      };
    }
  
    if (tab === "READING") {
      return {
        type: "READINGORDONE" as const,
        typeLabel: "25.12.16 ~",
      };
    }
  
    return {
      type: "READINGORDONE" as const,
      typeLabel: "25.12.16 ~ 25.12.27",
    };
  }

  function getEmptyText(tab: LibraryTab) {
    if (tab === "BEFORE") return "서재에 독서 전인 책이 없어요.";
    if (tab === "READING") return "서재에 독서 중인 책이 없어요.";
    return "서재에 완독한 책이 없어요.";
  }

export default function LibraryAllBookPage() {
    
    const [tab, setTab] = useState<LibraryTab>("BEFORE");
    
    const filteredBooks = useMemo(() => {
        return MOCK_BOOKS.filter((book) => book.tab === tab);
      }, [tab]);

      return(
        <div>
            <div className="pt-2">
                <TopNavigation
                    left={
                        <Icon size="m">
                            <img src={chevronLeft}/>
                        </Icon>
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
                                독서 전인 책이 
                            </label>
                            <label className="text-yellow-70">
                                2권
                            </label>
                            <label className="text-gray-90">
                                있어요.
                            </label>
                        </div>
                    }
                    bottom={
                        <div>
                            아직 포커스 한 적 없는 책들이에요.
                        </div>
                    }
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
            {filteredBooks.length === 0 ? (
                <div className="text-label-14-sb text-gray-60">
                    {getEmptyText(tab)}
                </div>
            ) : (
                filteredBooks.map((item, index) => {
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

                            {index !== filteredBooks.length - 1 ? (
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
    )
}