// src/pages/SearchPage.tsx
import { useState } from "react";
import SearchTopSection, { type SearchScope } from "../components/search/SearchTopSection";
import AllBookListSection from "../components/search/AllBookListSection";
import MyLibraryListSection from "../components/search/MyLibraryListSection";

export default function SearchPage() {
  const [scope, setScope] = useState<SearchScope>("all");
  const [query, setQuery] = useState("");

  const handleSearchClick = () => {
    // 검색 버튼 눌렀을 때 API 호출 로직 등
  };

  return (
    <div className="w-full">
      <SearchTopSection
        title="도서 검색"
        activeScope={scope}
        onScopeChange={setScope}
        query={query}
        onQueryChange={setQuery}
        onSearchClick={handleSearchClick}
        onClose={() => {
          // 닫기 클릭 시 처리
        }}
      />

      {scope === "all" ? (
        <AllBookListSection query={query} />
      ) : (
        <MyLibraryListSection query={query} />
      )}
    </div>
  );
}
