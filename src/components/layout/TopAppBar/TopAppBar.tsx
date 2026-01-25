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
            className="h-10 flex items-center"
            aria-label="Go to home"
          >
            <img
              src={resolvedLogoSrc}
              alt={logoAlt}
              className="h-[22.67px] w-auto"
              draggable={false}
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
          <div className="w-full">
            <nav className="relative w-full h-10 flex items-center justify-center">
              {/* 기본선(그라디언트) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 bottom-0 h-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(46,57,107,0) 0%, #2E396B 50%, rgba(46,57,107,0) 100%)",
                }}
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
          </div>
        )}
      </div>
    </header>
  );
}

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
      className={[
        "flex-1 h-10 p-3 box-border",
        "flex items-center justify-center",
        "relative",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-0.5"
        style={{ background: selected ? "#ECECEC" : "transparent" }}
      />

      <span
        className="text-center"
        style={{
          fontFamily: "SUIT Variable",
          fontWeight: 600,
          fontSize: 16,
          lineHeight: "100%",
          color: selected ? "#ECECEC" : "#697198",
        }}
      >
        {label}
      </span>
    </button>
  );
}

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
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "h-10 w-10 rounded-full",
        "flex items-center justify-center",
        "active:scale-95 transition",
        "focus:outline-none focus:ring-2 focus:ring-white/15",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
