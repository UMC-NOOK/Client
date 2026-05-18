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

import FocusMobilePage from "../pages/search/FocusMobilePage";
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
import IndividueleReportPage from "../pages/report/IndividueleReportPage";
import ViewReportPage from "../pages/report/ViewReportPage";
import CreateReportPage from "../pages/report/CreateReportPage";

import DevLoginButton from "../components/dev/DevLoginButton";

import LibraryPage from "../pages/library/LibraryPage";
import LibraryGoalInputPage from "../pages/library/LibraryGoalInputPage";
import LibraryAllBookPage from "../pages/library/LibraryAllBookPage";

import OnboardingGoalPage from "../pages/onboarding/OnboardingGoalPage";
import { OnboardingCategoryPage } from "../pages/onboarding/OnboardingCategoryPage";
import { OnboardingProfilePage } from "../pages/onboarding/OnboardingProfilePage";
import { OnboardingProvider } from "../pages/onboarding/OnboardingContext";

import LoginPage from "../pages/login/LoginPage";
import OAuthCallbackPage from "../pages/login/OAuthCallbackPage";

/* ---------------- Tabs ---------------- */

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
      <div className="mx-auto w-full max-w-85.75">
        <Outlet />
      </div>
    </>
  );
}

/* ---------------- Layout ---------------- */

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

function RequireAuth() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function getAuthenticatedHomePath() {
  const onboardingCompleted =
    localStorage.getItem("onboardingCompleted") === "true";

  return onboardingCompleted ? "/library" : "/onboarding";
}

/* ---------------- Routes ---------------- */

export default function AppRoutes() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route element={<AppShellLayout />}>

          {/* ROOT */}
          <Route
            path="/"
            element={
              accessToken ? (
                <Navigate to={getAuthenticatedHomePath()} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* PUBLIC */}
          <Route element={<NoFooterLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/google/oauth" element={<OAuthCallbackPage />} />
            <Route path="/kakao/callback" element={<OAuthCallbackPage />} />
          </Route>

          {/* PROTECTED */}
          <Route element={<RequireAuth />}>

            {/* ONBOARDING */}
            <Route element={<NoFooterLayout />}>
              <Route
                path="/onboarding"
                element={
                  <OnboardingProvider>
                    <Outlet />
                  </OnboardingProvider>
                }
              >
                <Route index element={<Navigate to="/onboarding/goal" replace />} />
                <Route path="goal" element={<OnboardingGoalPage />} />
                <Route path="category" element={<OnboardingCategoryPage />} />
                <Route path="profile" element={<OnboardingProfilePage />} />
              </Route>
            </Route>

            {/* SEARCH */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/new" element={<SearchNewAddPage />} />
            <Route path="/search/new/category" element={<SearchNewAddCategoryPage />} />
            <Route path="/search/new/more" element={<SearchNewAddMorePage />} />

            {/* MAIN TABS + TEST 복구 */}
            <Route element={<MainTabsLayout />}>
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/focus" element={<FocusMobilePage />} />
              <Route path="/record" element={<ReportPage />} />
              <Route path="/group" element={<GroupMobilePage />} />

              <Route path="/test/banner-action-card" element={<BannerActionCardTestPage />} />
              <Route path="/test/bottomsheet" element={<BottomSheetTestPage />} />
              <Route path="/test/popup" element={<PopupConfirmModalTestPage />} />
            </Route>

            {/* 기타 */}
            <Route path="/library/status" element={<LibraryAllBookPage />} />
            <Route path="/users/me/onboarding/goal" element={<LibraryGoalInputPage />} />
            <Route path="/library/:isbn13" element={<BookInfoPage />} />
            <Route path="/library/:isbn13/history" element={<AllHistoryPage />} />

            <Route path="/report/search" element={<ReportSearchPage />} />
            <Route path="/report/:id" element={<IndividueleReportPage />} />
            <Route path="/report/:id/:recordId" element={<ViewReportPage />} />
            <Route path="/report/:id/create" element={<CreateReportPage />} />
            <Route path="/report/:id/:recordId/edit" element={<CreateReportPage />} />
          </Route>

          {/* FALLBACK */}
          <Route
            path="*"
            element={
              accessToken ? (
                <Navigate to={getAuthenticatedHomePath()} replace />
              ) : (
                <LoginPage />
              )
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}