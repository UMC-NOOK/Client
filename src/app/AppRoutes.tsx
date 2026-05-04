import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AppShell, { useShell } from "./AppShell";
import TopAppBar from "../components/layout/TopAppBar/TopAppBar";

//import LibraryMobilePage from "../pages/search/LibraryMobilePage";
import FocusMobilePage from "../pages/search/FocusMobilePage";
// import RecordMobilePage from "../pages/search/RecordMobilePage";
import GroupMobilePage from "../pages/search/GroupMobilePage";
import SearchPage from "../pages/search/SearchPage";

import SearchNewAddPage from "../pages/search/SearchNewAddPage";
import SearchNewAddCategoryPage from "../pages/search/SearchNewAddCategoryPage";
import SearchNewAddMorePage from "../pages/search/SearchNewAddMorePage";
import BannerActionCardTestPage from "../pages/search/test/testpage";
import BottomSheetTestPage from "../pages/search/test/BottomSheetTestPage";
import PopupConfirmModalTestPage from "../pages/search/test/PopupTestPage";

import BookInfoPage from "../pages/bookInfo/BookInfoPage";
import AllHistoryPage from "../pages/bookInfo/AllHistoryPage";

import ReportPage from "../pages/report/ReportPage";
import ReportSearchPage from "../pages/report/ReportSearchPage";

import DevLoginButton from "../components/dev/DevLoginButton";

import LibraryPage from "../pages/library/LibraryPage";
import LibraryGoalInputPage from "../pages/library/LibraryGoalInputPage";
import LibraryAllBookPage from "../pages/library/LibraryAllBookPage";

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

function SearchLayout() {
  return (
    <div className="w-full max-w-85.75 mx-auto">
      <Outlet />
    </div>
  );
}

function NoFooterLayout() {
  const { setHideFooter } = useShell();

  useEffect(() => {
    setHideFooter(true);
    return () => setHideFooter(false);
  }, [setHideFooter]);

  return <Outlet />;
}

function AppShellLayout() {
  return (
    <>
      <DevLoginButton />
      <Outlet />
    </>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route element={<AppShellLayout />}>
          <Route path="/" element={<Navigate to="/library" replace />} />

          <Route element={<SearchLayout />}>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/new" element={<SearchNewAddPage />} />
            <Route
              path="/search/new/category"
              element={<SearchNewAddCategoryPage />}
            />
            <Route path="/search/new/more" element={<SearchNewAddMorePage />} />
          </Route>

          {/* Main Tabs */}
          <Route element={<MainTabsLayout />}>
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/focus" element={<FocusMobilePage />} />
            <Route path="/record" element={<ReportPage />} />
            <Route path="/group" element={<GroupMobilePage />} />
            <Route
              path="/test/banner-action-card"
              element={<BannerActionCardTestPage />}
            />
            <Route path="/test/bottomsheet" element={<BottomSheetTestPage />} />
            <Route path="/test/popup" element={<PopupConfirmModalTestPage />} />
          </Route>
          <Route
            path="/users/me/onboarding/goal"
            element={<LibraryGoalInputPage />}
          />
          <Route path="/library/status" element={<LibraryAllBookPage />} />
          <Route path="*" element={<Navigate to="/library" replace />} />

          <Route element={<NoFooterLayout />}>
            <Route path="/library/123" element={<BookInfoPage />} />
            <Route path="/library/123/history" element={<AllHistoryPage />} />
          </Route>

          <Route path="/report/search" element={<ReportSearchPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
