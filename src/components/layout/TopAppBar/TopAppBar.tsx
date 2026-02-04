import TopGnb from "../../navigation/Gnb";
import TabBar from "../../navigation/tabs/TabBar";
import type { TabOption } from "../../navigation/tabs/TabBar";

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

  /** 탭 갯수는 인자로 넘겨줘야 설정 가능  */
  tabs?: readonly TabOption<TabKey>[];
};

const DEFAULT_TABS: readonly TabOption<TabKey>[] = [
  { value: "library", label: "서재" },
  { value: "focus", label: "포커스" },
  { value: "record", label: "기록" },
  { value: "group", label: "그룹" },
] as const;

export default function TopAppBar({
  activeTab = "library",
  onTabChange,
  onSearchClick,
  onMenuClick,
  onLogoClick,
  logoSrc,
  logoAlt = "nook",
  showTabs = true,
  tabs = DEFAULT_TABS,
}: TopAppBarProps) {
  return (
    <header className="w-full">
      <div className="w-full max-w-85.75 mx-auto">
        {/* 공용 컴포넌트 GNB */}
        <TopGnb
          onLogoClick={onLogoClick}
          onSearchClick={onSearchClick}
          onMenuClick={onMenuClick}
          logoSrc={logoSrc}
          logoAlt={logoAlt}
        />

        {/* 공용 컴포넌트 TabBar */}
        {showTabs && (
          <TabBar<TabKey>
            value={activeTab}
            onChange={(v) => onTabChange?.(v)}
            options={tabs}
          />
        )}
      </div>
    </header>
  );
}
