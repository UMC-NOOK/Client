import TopGnb from "../../navigation/Gnb"; 

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
  return (
    <header className="w-full">
      <div className="w-full max-w-85.75 mx-auto flex flex-col items-start">
        {/* ✅ GNB */}
        <TopGnb
          onLogoClick={onLogoClick}
          onSearchClick={onSearchClick}
          onMenuClick={onMenuClick}
          logoSrc={logoSrc}
          logoAlt={logoAlt}
        />

        {/* Tabs */}
        {showTabs && (
          <nav className="relative w-full h-10 flex items-center justify-center">
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
