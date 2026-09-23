import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { readFocusSession } from "../utils/focusSessionStorage";

export default function ActiveFocusGuard() {
  const { pathname } = useLocation();
  const session = readFocusSession();
  const hasAccessToken = localStorage.getItem("accessToken") !== null;
  const hasActiveSession = session !== null && hasAccessToken;

  useEffect(() => {
    if (!hasActiveSession) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasActiveSession]);

  if (!hasActiveSession) return <Outlet />;

  const recordCreatePath = `/report/${session.bookId}/create`;
  const isAllowedPath =
    pathname === "/focus/session" || pathname === recordCreatePath;

  if (!isAllowedPath) {
    return <Navigate to="/focus/session" replace />;
  }

  return <Outlet />;
}
