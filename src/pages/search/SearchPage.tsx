import { useState } from "react";
import SearchTopSection, { type SearchScope } from "../../components/search/SearchTopSection";
import AllBookListSection from "../../components/search/AllBookListSection";
import MyLibraryListSection from "../../components/search/MyLibraryListSection";
import RecentKeywordSection, { type RecentKeyword } from "../../components/search/RecentKeywordSection";
import SearchResultSection from "../../components/search/SearchResultSection";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [scope, setScope] = useState<SearchScope>("all");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [mode, setMode] = useState<ViewMode>("idle");
  const [recent, setRecent] = useState<RecentKeyword[]>(MOCK_RECENT);

  const handleSearch = (overrideQuery?: string) => {
    const target = overrideQuery ?? query; // 인자가 있으면 그걸로 검색
    if (!target.trim()) return;

    setQuery(target);          
    setSubmittedQuery(target); 
    setMode("results");        // 결과 화면으로 전환
  };

  const isInputMode = mode === "searching";

  return (
    <div className="w-full pb-20"> {/* 하단 여백 확보 */}
      <SearchTopSection
        title="도서 검색"
        activeScope={scope}
        onScopeChange={(next) => {
          setScope(next);
          setMode((prev) => (prev === "results" ? "results" : "idle"));
        }}
        query={query}
        onQueryChange={(v) => {
          setQuery(v);
          setMode("searching");
        }}
        onSearchClick={() => handleSearch()}
        onEnter={() => handleSearch()}
        onFocus={() => setMode("searching")}
        onBlur={() => {}}
        isInputMode={isInputMode}
        onClose={() => {
            setQuery("");
            setMode("idle");
            navigate(-1);
        }}
      />

      {/* 1. 검색 중 화면 (최근 검색어) */}
      {mode === "searching" && (
        <RecentKeywordSection
          keywords={recent}
          onDelete={(id) => setRecent((prev) => prev.filter((k) => k.id !== id))}
          onClickKeyword={(text) => {
            handleSearch(text);
          }}
        />
      )}

      {/* 2. 기본(idle) 화면: 탭에 따라 컴포넌트 교체 */}
      {mode === "idle" && (
        scope === "all" ? <AllBookListSection /> : <MyLibraryListSection />
      )}

      {/* 3. 검색 결과 화면 */}
      {mode === "results" && (
        <SearchResultSection 
          scope={scope} 
          query={submittedQuery} 
          onDirectAdd={() => navigate("/search/new")}
        />
      )}
    </div>
  );
}