// src/components/layout/TopAppBar/TopAppBar.tsx
import React from "react";

import searchPng from "../../../assets/logo/top-navigation-button-icon-search.svg";
import menuPng from "../../../assets/logo/top-navigation-button-icon.svg";
import logoSvg from "../../../assets/logo/top-navigation-logo.svg";

export type TabKey = "library" | "focus" | "record" | "group";

export type TopAppBarProps = {
  activeTab?: TabKey;
  onTabChange?: (tab: TabKey) => void;

  onSearchClick?: () => void;
  onMenuClick?: () => void;
  onLogoClick?: () => void;

  logoSrc?: string;
  logoAlt?: string;

  showTabs?: boolean;
};

export default function TopAppBar({
  activeTab = "library",
  onTabChange,
  onSearchClick,
  onMenuClick,
  onLogoClick,
  logoSrc,
  logoAlt = "nook",
  showTabs = true,
}: TopAppBarProps) {
  const resolvedLogoSrc = logoSrc ?? logoSvg;

  return (
    <header className="w-full">
      <div className="w-full max-w-85.75 mx-auto flex flex-col items-start">
        {/* GNB */}
        <div className="w-full h-10 flex items-center justify-between">
          <button
            type="button"
            onClick={onLogoClick}
            aria-label="Go to home"
            className="h-10 flex items-center"
          >
            <img
              src={resolvedLogoSrc}
              alt={logoAlt}
              draggable={false}
              className="h-[22.67px] w-auto"
            />
          </button>

          <div className="flex items-center gap-4">
            <IconButton ariaLabel="Search" onClick={onSearchClick}>
              <img src={searchPng} alt="" className="w-6 h-6" draggable={false} />
            </IconButton>
            <IconButton ariaLabel="Menu" onClick={onMenuClick}>
              <img src={menuPng} alt="" className="w-6 h-6" draggable={false} />
            </IconButton>
          </div>
        </div>

        {/* Tabs */}
        {showTabs && (
          <nav className="relative w-full h-10 flex items-center justify-center">
            {/* 기본 divider */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-divider"
            />

            <Tab
              label="서재"
              selected={activeTab === "library"}
              onClick={() => onTabChange?.("library")}
            />
            <Tab
              label="포커스"
              selected={activeTab === "focus"}
              onClick={() => onTabChange?.("focus")}
            />
            <Tab
              label="기록"
              selected={activeTab === "record"}
              onClick={() => onTabChange?.("record")}
            />
            <Tab
              label="그룹"
              selected={activeTab === "group"}
              onClick={() => onTabChange?.("group")}
            />
          </nav>
        )}
      </div>
    </header>
  );
}

/* ───────────────── Tab ───────────────── */

function Tab({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected ? "page" : undefined}
      className="
        flex-1 h-10 px-3
        flex items-center justify-center
        relative
      "
    >
      {/* 선택 underline */}
      <span
        aria-hidden="true"
        className={`
          pointer-events-none absolute left-0 right-0 bottom-0 h-0.5
          ${selected ? "bg-gray-100" : "bg-transparent"}
        `}
      />

      <span
        className={`
          text-center text-body-16-b
          ${selected ? "text-gray-100" : "text-gray-500"}
        `}
      >
        {label}
      </span>
    </button>
  );
}

/* ───────────────── Icon Button ───────────────── */

function IconButton({
  ariaLabel,
  onClick,
  children,
}: {
  ariaLabel: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="
        h-10 w-10 rounded-full
        flex items-center justify-center
        transition active:scale-95
        focus:outline-none focus:ring-2 focus:ring-white/15
      "
    >
      {children}
    </button>
  );
}
