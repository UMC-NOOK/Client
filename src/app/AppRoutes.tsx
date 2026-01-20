//src/app/AppRoutes.tsx
import { Navigate, Route, Routes, Outlet, useLocation, useNavigate } from "react-router-dom";
import AppShell from "./AppShell";
import TopAppBar from "../components/layout/TopAppBar/TopAppBar";

import LibraryMobilePage from "../pages/LibraryMobilePage";
import FocusMobilePage from "../pages/FocusMobilePage";
import RecordMobilePage from "../pages/RecordMobilePage";
import GroupMobilePage from "../pages/GroupMobilePage";
import SearchPage from "../pages/SearchPage";

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

function MainTabsLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeTab = pathToTab(pathname);

  return (
    <AppShell>
      <TopAppBar
        activeTab={activeTab}
        onTabChange={(tab) => navigate(tabToPath(tab))}
        onSearchClick={() => navigate("/search")}
        onMenuClick={() => console.log("menu click")}
        onLogoClick={() => navigate("/library")}
      />
      <div className="w-full max-w-[343px] mx-auto">
        <Outlet />
      </div>
    </AppShell>
  );
}

// ✅ 검색 페이지 전용 레이아웃 (AppShell만 적용, TopAppBar 없음)
function SearchLayout() {
  return (
    <AppShell>
      <div className="w-full max-w-[343px] mx-auto">
        <Outlet />
      </div>
    </AppShell>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/library" replace />} />

      {/* 🔹 검색 페이지도 AppShell 안에서 렌더링되게 */}
      <Route element={<SearchLayout />}>
        <Route path="/search" element={<SearchPage />} />
      </Route>

      {/* 🔸 공통 헤더 + 탭이 필요한 기본 페이지들 */}
      <Route element={<MainTabsLayout />}>
        <Route path="/library" element={<LibraryMobilePage />} />
        <Route path="/focus" element={<FocusMobilePage />} />
        <Route path="/record" element={<RecordMobilePage />} />
        <Route path="/group" element={<GroupMobilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/library" replace />} />
    </Routes>
  );
}
