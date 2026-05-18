// src/app/AppRoutes.tsx

import { useEffect } from "react";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";

import AppShell, { useShell } from "./AppShell";

import SearchPage from "../pages/search/SearchPage";
import SearchNewAddPage from "../pages/search/SearchNewAddPage";
import SearchNewAddCategoryPage from "../pages/search/SearchNewAddCategoryPage";
import SearchNewAddMorePage from "../pages/search/SearchNewAddMorePage";

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
            <Route
              path="/login"
              element={
                accessToken ? (
                  <Navigate to={getAuthenticatedHomePath()} replace />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route path="/google/oauth" element={<OAuthCallbackPage />} />
            <Route path="/kakao/callback" element={<OAuthCallbackPage />} />
          </Route>

          {/* PROTECTED */}
          <Route element={<RequireAuth />}>

            {/* 🔥 ONBOARDING (Provider 포함) */}
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

            {/* LIBRARY */}
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/library/status" element={<LibraryAllBookPage />} />
            <Route path="/users/me/onboarding/goal" element={<LibraryGoalInputPage />} />
            <Route path="/library/:isbn13" element={<BookInfoPage />} />
            <Route path="/library/:isbn13/history" element={<AllHistoryPage />} />

            {/* SEARCH */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/new" element={<SearchNewAddPage />} />
            <Route path="/search/new/category" element={<SearchNewAddCategoryPage />} />
            <Route path="/search/new/more" element={<SearchNewAddMorePage />} />

            {/* REPORT */}
            <Route path="/record" element={<ReportPage />} />
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