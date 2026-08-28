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

import FocusMainPage from "../pages/focus/FocusMainPage";
import FocusSelectPage from "../pages/focus/FocusSelectPage";
import FocusThemePage from "../pages/focus/FocusThemePage";
import FocusSessionPage from "../pages/focus/FocusSessionPage";
import GroupPage from "../pages/group/GroupPage";
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
import IndividueleReportPage from "../pages/report/EmotionRecordsPage";
import ViewReportPage from "../pages/report/ViewReportPage";
import CreateReportPage from "../pages/report/CreateReportPage";

import DevLoginButton from "../components/dev/DevLoginButton";

import LibraryPage from "../pages/library/LibraryPage";
import LibraryGoalInputPage from "../pages/library/LibraryGoalInputPage";
import LibraryAllBookPage from "../pages/library/LibraryAllBookPage";
import MainMyPage from "../pages/myPage/MainMyPage";
import ProfileMyPage from "../pages/myPage/ProfileMyPage";

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
        onTabChange={(tab: TabKey) => navigate(tabToPath(tab))}
        onSearchClick={() => navigate("/search")}
        onMenuClick={() => navigate("/mypage")}
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

/* ---------------- Auth ---------------- */

function RequireAuth() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function getAuthRedirectPath() {
  const accessToken = localStorage.getItem("accessToken");
  const onboardingCompleted = localStorage.getItem("onboardingCompleted");

  if (!accessToken) {
    return "/login";
  }

  /**
   * accessToken만 있고 onboardingCompleted가 없는 경우:
   * 이전 테스트/OAuth 실패/임시 로그인 잔여 상태로 보고 정리
   */
  if (onboardingCompleted === null) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("onboardingCompleted");
    return "/login";
  }

  return onboardingCompleted === "true" ? "/library" : "/onboarding";
}

/* ---------------- Routes ---------------- */

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route element={<AppShellLayout />}>
          {/* ROOT */}
          <Route
            path="/"
            element={<Navigate to={getAuthRedirectPath()} replace />}
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
                <Route
                  index
                  element={<Navigate to="/onboarding/goal" replace />}
                />
                <Route path="goal" element={<OnboardingGoalPage />} />
                <Route path="category" element={<OnboardingCategoryPage />} />
                <Route path="profile" element={<OnboardingProfilePage />} />
              </Route>
            </Route>

            {/* SEARCH */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/new" element={<SearchNewAddPage />} />
            <Route
              path="/search/new/category"
              element={<SearchNewAddCategoryPage />}
            />
            <Route path="/search/new/more" element={<SearchNewAddMorePage />} />

            {/* MAIN TABS + TEST */}
            <Route element={<MainTabsLayout />}>
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/focus" element={<FocusMainPage />} />
              <Route path="/record" element={<ReportPage />} />
              <Route path="/group" element={<GroupPage />} />

              <Route
                path="/test/banner-action-card"
                element={<BannerActionCardTestPage />}
              />
              <Route
                path="/test/bottomsheet"
                element={<BottomSheetTestPage />}
              />
              <Route
                path="/test/popup"
                element={<PopupConfirmModalTestPage />}
              />
            </Route>

            {/* 포커스 도메인 서브 화면 - 상단 탭 없이 뒤로가기 헤더만 사용 (TopNavigation은 각 페이지에서 구현) */}
            <Route element={<NoFooterLayout />}>
              <Route path="/focus/select" element={<FocusSelectPage />} />
              <Route path="/focus/theme" element={<FocusThemePage />} />
              <Route path="/focus/session" element={<FocusSessionPage />} />
            </Route>

            {/* 기타 */}
            <Route path="/mypage" element={<MainMyPage />} />
            <Route path="/mypage/profile" element={<ProfileMyPage />} />
            <Route path="/library/status" element={<LibraryAllBookPage />} />


            <Route element={<NoFooterLayout />}>
              
              <Route path="/library/:isbn13" element={<BookInfoPage />} />
              <Route
                path="/library/:isbn13/history"
                element={<AllHistoryPage />}
              />
            </Route>

            <Route path="/report/search" element={<ReportSearchPage />} />
            <Route element={<NoFooterLayout />}>
              <Route path="/report/:id" element={<IndividueleReportPage />} />
              <Route
                path="/report/:id/:recordId"
                element={<ViewReportPage />}
              />
              <Route path="/report/:id/create" element={<CreateReportPage />} />
              <Route
                path="/report/:id/:recordId/edit"
                element={<CreateReportPage />}
              />
            </Route>

            <Route
              path="/users/me/onboarding/goal"
              element={<LibraryGoalInputPage />}
            />
           

          </Route>

          {/* FALLBACK */}
          <Route
            path="*"
            element={<Navigate to={getAuthRedirectPath()} replace />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
