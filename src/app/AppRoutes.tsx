//Client/src/app/AppRoutes.tsx
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppShell from "./AppShell";
import { TopAppBar } from "../components/layout/TopAppBar";

import LibraryMobilePage from "../pages/LibraryMobilePage";
import FocusMobilePage from "../pages/FocusMobilePage";
import RecordMobilePage from "../pages/RecordMobilePage";
import GroupMobilePage from "../pages/GroupMobilePage";

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
    case "library":
    default:
      return "/library";
  }
}

function MainTabsLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = pathToTab(location.pathname);

  return (
    <AppShell>
      <TopAppBar
        activeTab={activeTab}
        onTabChange={(tab) => navigate(tabToPath(tab))}
        onSearchClick={() => {
          // TODO: 검색 페이지/모달 연결 시 navigate("/search") 등으로 변경
          console.log("search click");
        }}
        onMenuClick={() => {
          // TODO: 메뉴(드로어) 연결
          console.log("menu click");
        }}
        onLogoClick={() => navigate("/library")}
      />

      {/* 실제 페이지 렌더링 영역 */}
      <div className="w-full max-w-[343px] mx-auto">
        <Routes>
          <Route path="/library" element={<LibraryMobilePage />} />
          <Route path="/focus" element={<FocusMobilePage />} />
          <Route path="/record" element={<RecordMobilePage />} />
          <Route path="/group" element={<GroupMobilePage />} />
        </Routes>
      </div>
    </AppShell>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* 첫 진입은 /library로 */}
      <Route path="/" element={<Navigate to="/library" replace />} />

      {/* 탭 4개 메인 영역(공통 헤더 적용) */}
      <Route path="/*" element={<MainTabsLayout />} />

      {/* ✅ 나중에 헤더 없는 상세 페이지 필요하면 여기처럼 분리 가능
          <Route path="/library/:id" element={<LibraryDetailPage />} />
      */}
    </Routes>
  );
}
