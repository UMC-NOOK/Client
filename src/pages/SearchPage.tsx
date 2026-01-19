//Client\src\pages\SearchPage.tsx
import { useNavigate } from "react-router-dom";
import SearchTopSection, { type SearchScope } from "../components/search/SearchTopSection";

export default function SearchPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0B1020] p-4">
      <div className="w-full max-w-[343px] mx-auto">
        <SearchTopSection
          activeScope={"all" as SearchScope}
          onScopeChange={(s) => console.log("scope:", s)}
          onClose={() => navigate(-1)}
          onSearchClick={() => console.log("search")}
        />
      </div>
    </div>
  );
}