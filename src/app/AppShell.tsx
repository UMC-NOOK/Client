// src/app/AppShell.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
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

  const value = useMemo(() => ({ hideFooter, setHideFooter }), [hideFooter]);

  return (
    <ShellContext.Provider value={value}>
      <div className="relative isolate min-h-dvh w-full flex justify-center bg-white">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-y-0 left-1/2 z-0 -translate-x-1/2 bg-gradient-background"
          style={{ width: `min(100vw, ${maxWidthPx}px)` }}
        />
        <div
          className="relative z-10 min-h-dvh w-full bg-gradient-background"
          style={{ maxWidth: maxWidthPx }}
        >
          <div
            className={[
              "min-h-dvh flex flex-col",
              disableSafeAreaTop ? "" : "pt-[calc(env(safe-area-inset-top)+8px)]",
              "pb-[env(safe-area-inset-bottom)]",
            ].join(" ")}
          >
            {/* main */}
            <div className="flex-1 w-full px-4">
              <Outlet />
            </div>

            {/* footer */}
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
