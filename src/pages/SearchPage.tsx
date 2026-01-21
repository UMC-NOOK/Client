// Client/src/pages/SearchPage.tsx
import { useState } from "react";
import SearchTopSection, { type SearchScope } from "../components/search/SearchTopSection";
import AllBookListSection from "../components/search/AllBookListSection";
import MyLibraryListSection from "../components/search/MyLibraryListSection";
import RecentKeywordSection, { type RecentKeyword } from "../components/search/RecentKeywordSection";

type ViewMode = "idle" | "searching" | "results";

const MOCK_RECENT: RecentKeyword[] = [
  { id: 1, text: "파과" },
  { id: 2, text: "구유경" },
  { id: 3, text: "승민이" },
  { id: 4, text: "오경민" },
  { id: 5, text: "치즈 이야기" },
  { id: 6, text: "체인소맨" },
];

export default function SearchPage() {
  const [scope, setScope] = useState<SearchScope>("all");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [mode, setMode] = useState<ViewMode>("idle");
  const [recent, setRecent] = useState<RecentKeyword[]>(MOCK_RECENT);

  const handleSearch = () => {
    const q = query.trim();
    setSubmittedQuery(q);
    setMode("results");
  };

  const isInputMode = mode === "searching";

  return (
    <div className="w-full">
      <SearchTopSection
        title="도서 검색"
        activeScope={scope}
        onScopeChange={(next) => {
          setScope(next);
          setMode((prev) => (prev === "searching" ? "searching" : prev === "results" ? "results" : "idle"));
        }}
        query={query}
        onQueryChange={(v) => {
          setQuery(v);
          setMode("searching");
        }}
        onSearchClick={handleSearch}
        onEnter={handleSearch}
        onFocus={() => setMode("searching")}
        onBlur={() => {}}
        isInputMode={isInputMode}
        onClose={() => {}}
      />

      {/* 검색 중 화면 */}
      {mode === "searching" && (
        <RecentKeywordSection
          keywords={recent}
          onDelete={(id) => setRecent((prev) => prev.filter((k) => k.id !== id))}
          onClickKeyword={(text) => {
            setQuery(text);
            setMode("searching"); 
          }}
        />
      )}

      {/*  기본(idle) 화면: 탭에 따라 다르게 */}
      {mode === "idle" && (scope === "all" ? <AllBookListSection query="" /> : <MyLibraryListSection query="" />)}

      {/* 결과(results) - 아직 미구현 */}
      {mode === "results" && (
        <div className="w-full pt-8 px-4">
          <p className="text-[#A2A7C3] text-[14px] font-[500] leading-[21px] font-[SUIT]">
            검색 결과 화면은 아직 구현 중입니다. (query: {submittedQuery || "없음"})
          </p>
        </div>
      )}
    </div>
  );
}
