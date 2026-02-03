// src/app/AppRoutes.tsx
import { Navigate, Route, Routes, Outlet, useLocation, useNavigate } from "react-router-dom";
import AppShell from "./AppShell";
import TopAppBar from "../components/layout/TopAppBar/TopAppBar";

import LibraryMobilePage from "../pages/search/LibraryMobilePage";
import FocusMobilePage from "../pages/search/FocusMobilePage";
import RecordMobilePage from "../pages/search/RecordMobilePage";
import GroupMobilePage from "../pages/search/GroupMobilePage";
import SearchPage from "../pages/search/SearchPage";

import SearchNewAddPage from "../pages/search/SearchNewAddPage";
import SearchNewAddCategoryPage from "../pages/search/SearchNewAddCategoryPage";
import SearchNewAddMorePage from "../pages/search/SearchNewAddMorePage";

type TabKey = "library" | "focus" | "record" | "group";

function pathToTab(pathname: string): TabKey {
  if (pathname.startsWith("/focus")) return "focus";
  if (pathname.startsWith("/record")) return "record";
  if (pathname.startsWith("/group")) return "group";
  return "library";
}

function tabToPath(tab: TabKey) {
  switch (tab) {
    case "focus":
      return "/focus";
    case "record":
      return "/record";
    case "group":
      return "/group";
    default:
      return "/library";
  }
}

/** ✅ Main Tabs 레이아웃 (TopAppBar + Outlet) */
function MainTabsLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeTab = pathToTab(pathname);

  return (
    <>
      <TopAppBar
        activeTab={activeTab}
        onTabChange={(tab) => navigate(tabToPath(tab))}
        onSearchClick={() => navigate("/search")}
        onMenuClick={() => console.log("menu click")}
        onLogoClick={() => navigate("/library")}
      />
      <div className="w-full max-w-85.75 mx-auto">
        <Outlet />
      </div>
    </>
  );
}

/** ✅ Search 레이아웃 (검색 영역만 max-width 래핑) */
function SearchLayout() {
  return (
    <div className="w-full max-w-85.75 mx-auto">
      <Outlet />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* ✅ AppShell은 최상단에서 딱 한 번만 */}
      <Route element={<AppShell />}>
        {/* 홈 진입 시 기본 탭으로 */}
        <Route path="/" element={<Navigate to="/library" replace />} />

        {/* ✅ Search Routes */}
        <Route element={<SearchLayout />}>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/new" element={<SearchNewAddPage />} />
          <Route path="/search/new/category" element={<SearchNewAddCategoryPage />} />
          <Route path="/search/new/more" element={<SearchNewAddMorePage />} />
        </Route>

        {/* ✅ Main Tabs Routes */}
        <Route element={<MainTabsLayout />}>
          <Route path="/library" element={<LibraryMobilePage />} />
          <Route path="/focus" element={<FocusMobilePage />} />
          <Route path="/record" element={<RecordMobilePage />} />
          <Route path="/group" element={<GroupMobilePage />} />
        </Route>

        {/* ✅ 그 외 모든 경로는 기본 탭으로 */}
        <Route path="*" element={<Navigate to="/library" replace />} />
      </Route>
    </Routes>
  );
}
