// src/app/AppShell.tsx

import React, { createContext, useContext, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/navigation/Footer";
import RateLimitModal from "../components/feedback/RateLimitModal";
import DevLayoutWidthControl from "../components/dev/DevLayoutWidthControl";

export type ShellContextValue = {
  hideFooter: boolean;
  setHideFooter: React.Dispatch<React.SetStateAction<boolean>>;
  widthStyle: React.CSSProperties;
};

const ShellContext = createContext<ShellContextValue | null>(null);

export function useShell() {
  const ctx = useContext(ShellContext);

  if (!ctx) {
    throw new Error("useShell must be used within <AppShell />");
  }

  return ctx;
}

type AppShellProps = {
  maxWidthPx?: number;
  disableSafeAreaTop?: boolean;
};

export default function AppShell({
  maxWidthPx = 480,
  disableSafeAreaTop = false,
}: AppShellProps) {
  const [hideFooter, setHideFooter] = useState(false);
  const [previewWidth, setPreviewWidth] = useState<number | null>(null);
  const desktopPreviewWidth = import.meta.env.DEV
    ? (previewWidth ?? maxWidthPx)
    : maxWidthPx;
  const widthStyle = useMemo(
    () => ({
      "--app-shell-width": `${maxWidthPx}px`,
      "--preview-shell-width": `${desktopPreviewWidth}px`,
    }) as React.CSSProperties,
    [maxWidthPx, desktopPreviewWidth],
  );

  const value = useMemo(
    () => ({
      hideFooter,
      setHideFooter,
      widthStyle,
    }),
    [hideFooter, widthStyle],
  );

  return (
    <ShellContext.Provider value={value}>
      {import.meta.env.DEV && (
        <DevLayoutWidthControl
          width={previewWidth ?? maxWidthPx}
          onWidthChange={setPreviewWidth}
        />
      )}
      <div className="relative isolate min-h-dvh w-full bg-mint-60">
        {/* 레이아웃 확인용 임시 배경: 앱 바깥 영역을 민트색으로 구분한다. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-mint-60"
        />

        {/* 실제 앱 콘텐츠는 maxWidthPx까지 유동적으로 확장한다. */}
        <div
          data-app-shell
          className="relative z-10 mx-auto min-h-dvh w-full max-w-(--app-shell-width) bg-gradient-background lg:max-w-(--preview-shell-width)"
          style={widthStyle}
        >
          <div className="flex min-h-dvh flex-col pb-[env(safe-area-inset-bottom)]">
            <main
              className={[
                "relative w-full flex-1 px-4",
                disableSafeAreaTop
                  ? ""
                  : "pt-[calc(env(safe-area-inset-top)+8px)]",
              ].join(" ")}
            >
              <Outlet />
            </main>

            {!hideFooter && (
              <div className="w-full px-4">
                <Footer />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <RateLimitModal />
    </ShellContext.Provider>
  );
}
