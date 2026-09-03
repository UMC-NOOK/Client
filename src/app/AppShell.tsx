// src/app/AppShell.tsx

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/navigation/Footer";

export type ShellContextValue = {
  hideFooter: boolean;
  setHideFooter: React.Dispatch<React.SetStateAction<boolean>>;
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
  maxWidthPx = 375,
  disableSafeAreaTop = false,
}: AppShellProps) {
  const [hideFooter, setHideFooter] = useState(false);

  const value = useMemo(
    () => ({
      hideFooter,
      setHideFooter,
    }),
    [hideFooter],
  );

  return (
    <ShellContext.Provider value={value}>
      <div className="relative isolate min-h-dvh w-full">
        {/* 화면 상하좌우 전체를 채우는 고정 배경 */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-gradient-background"
        />

        {/* 실제 앱 콘텐츠는 최대 375px */}
        <div
          className="relative z-10 mx-auto min-h-dvh w-full"
          style={{ maxWidth: maxWidthPx }}
        >
          <div
            className={[
              "flex min-h-dvh flex-col",
              disableSafeAreaTop
                ? ""
                : "pt-[calc(env(safe-area-inset-top)+8px)]",
              "pb-[env(safe-area-inset-bottom)]",
            ].join(" ")}
          >
            <main className="w-full flex-1 px-4">
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
    </ShellContext.Provider>
  );
}