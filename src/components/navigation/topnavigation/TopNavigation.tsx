// Client/src/components/navigation/topnavigation/TopNavigation.tsx

import React from "react";

type TopNavigationProps = {
  left?: React.ReactNode;
  onClickLeft?: () => void;
  center?: React.ReactNode;
  right?: React.ReactNode;
  onClickRight?: () => void;
  className?: string;
};

function isTextLike(node: React.ReactNode): boolean {
  if (typeof node === "string" || typeof node === "number") return true;

  if (Array.isArray(node)) {
    return node.some(isTextLike);
  }

  if (React.isValidElement(node)) {
    const elementType = node.type;

    if (typeof elementType === "string") {
      return ["span", "p", "h1", "h2", "h3", "div"].includes(elementType);
    }

    return isTextLike((node.props as { children?: React.ReactNode })?.children);
  }

  return false;
}

function isButtonElement(node: React.ReactNode): boolean {
  return React.isValidElement(node) && node.type === "button";
}

function renderNavItem(
  node: React.ReactNode,
  onClick?: () => void,
  padding = "p-2",
) {
  if (!node) return null;

  /**
   * node 자체가 이미 button이면 다시 button으로 감싸지 않는다.
   * 예: right={<button ...>...</button>}
   */
  if (isButtonElement(node)) {
    return node;
  }

  /**
   * onClick이 있는 경우에만 TopNavigation에서 button으로 감싼다.
   * onClick이 없으면 단순 표시 요소로 렌더링한다.
   */
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${padding} rounded-lg flex items-center justify-center`}
      >
        {node}
      </button>
    );
  }

  return (
    <div className={`${padding} flex items-center justify-center`}>
      {node}
    </div>
  );
}

export default function TopNavigation({
  left,
  onClickLeft,
  center,
  right,
  onClickRight,
  className = "",
}: TopNavigationProps) {
  const getPadding = (node: React.ReactNode) => {
    return isTextLike(node) ? "px-4 py-2" : "p-2";
  };

  return (
    <header
      className={[
        "relative w-full h-10 flex items-center justify-center",
        className,
      ].join(" ")}
    >
      {/* LEFT */}
      <div className="absolute left-0 flex items-center">
        {renderNavItem(left, onClickLeft, getPadding(left))}
      </div>

      {/* CENTER */}
      <div className="text-title-18-m text-gray-90 flex items-center justify-center">
        {center}
      </div>

      {/* RIGHT */}
      <div className="absolute right-0 flex items-center">
        {renderNavItem(right, onClickRight, getPadding(right))}
      </div>
    </header>
  );
}