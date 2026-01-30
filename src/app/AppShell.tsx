// src/app/AppShell.tsx
import React from "react";

type AppShellProps = {
  children: React.ReactNode;
  maxWidthPx?: number; // default: 375
  disableSafeAreaTop?: boolean;
};

export default function AppShell({
  children,
  maxWidthPx = 375,
  disableSafeAreaTop = false,
}: AppShellProps) {
  return (
    <div className="min-h-dvh w-full flex justify-center bg-white">
      <div
        className="min-h-dvh w-full bg-gradient-background"
        style={{ maxWidth: maxWidthPx }}
      >
        <div
          className={[
            disableSafeAreaTop ? "" : "pt-[calc(env(safe-area-inset-top)+8px)]",
            "pb-[env(safe-area-inset-bottom)]",
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

