// src/app/AppRoutes.tsx
import {
  Navigate,
  Route,
  Routes,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AppShell from "./AppShell";
import TopAppBar from "../components/layout/TopAppBar/TopAppBar";
import LibraryMobilePage from "../pages/LibraryMobilePage";
import FocusMobilePage from "../pages/FocusMobilePage";
import RecordMobilePage from "../pages/RecordMobilePage";
import GroupMobilePage from "../pages/GroupMobilePage";
import SearchPage from "../pages/SearchPage";
import SearchDirectAddPage from "../pages/SearchDirectAddPage";
import BookInfo from "../pages/BookInfo";

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
      <div className="w-full max-w-85.75 mx-auto">
        <Outlet />
      </div>
    </AppShell>
  );
}

function SearchLayout() {
  const { pathname } = useLocation();

  // ✅ /search/direct 에서는 AppShell의 safe-area top padding 제거
  const disableSafeAreaTop = pathname.startsWith("/search/direct");

  return (
    <AppShell disableSafeAreaTop={disableSafeAreaTop}>
      <div className="w-full max-w-85.75 mx-auto">
        <Outlet />
      </div>
    </AppShell>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/library" replace />} />

      <Route element={<SearchLayout />}>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/direct" element={<SearchDirectAddPage />} />
      </Route>

      <Route element={<MainTabsLayout />}>
        <Route path="/library" element={<LibraryMobilePage />} />
        <Route path="/focus" element={<FocusMobilePage />} />
        <Route path="/record" element={<RecordMobilePage />} />
        <Route path="/group" element={<GroupMobilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/library" replace />} />

      <Route path="/library/123" element={<BookInfo />}></Route>
    </Routes>
  );
}
