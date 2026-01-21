// src/app/AppShell.tsx
import React from "react";

type AppShellProps = {
  children: React.ReactNode;
  maxWidthPx?: number; // default: 375
};

export default function AppShell({ children, maxWidthPx = 375 }: AppShellProps) {
  return (
    <div className="min-h-dvh w-full flex justify-center bg-white">
      <div
        className="min-h-dvh w-full"
        style={{
          maxWidth: maxWidthPx,
          background: "linear-gradient(180deg, #0E1430 0%, #0E101B 100%)",
        }}
      >
        <div className="pt-[calc(env(safe-area-inset-top)+8px)] pb-[env(safe-area-inset-bottom)]">
          {children}
        </div>
      </div>
    </div>
  );
}
