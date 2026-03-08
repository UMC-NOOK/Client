import React from "react";

import searchPng from "../../assets/logo/top-navigation-button-icon-search.svg";
import menuPng from "../../assets/logo/top-navigation-button-icon.svg";
import logoSvg from "../../assets/logo/top-navigation-logo.svg";

type Props = {
  onSearchClick?: () => void;
  onMenuClick?: () => void;
  onLogoClick?: () => void;

  logoSrc?: string;
  logoAlt?: string;

  /** 아이콘 노출 제어가 필요할 때 */
  showSearch?: boolean;
  showMenu?: boolean;

  /** 가운데 정렬/폭 제한을 바깥에서 할지, 여기서 할지 선택 */
  className?: string;
};

export default function TopGnb({
  onSearchClick,
  onMenuClick,
  onLogoClick,
  logoSrc,
  logoAlt = "nook",
  showSearch = true,
  showMenu = true,
  className = "w-full h-10 flex items-center justify-between",
}: Props) {
  const resolvedLogoSrc = logoSrc ?? logoSvg;

  return (
    <div className={className}>
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
        {showSearch && (
          <IconButton ariaLabel="Search" onClick={onSearchClick}>
            <img src={searchPng} alt="" className="w-6 h-6" draggable={false} />
          </IconButton>
        )}

        {showMenu && (
          <IconButton ariaLabel="Menu" onClick={onMenuClick}>
            <img src={menuPng} alt="" className="w-6 h-6" draggable={false} />
          </IconButton>
        )}
      </div>
    </div>
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
