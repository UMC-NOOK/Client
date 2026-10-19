//Client\src\components\presentation\modal\bottomsheet\Origin.tsx
//이거 하나로 조정 가능

import React, { useState, useEffect } from "react";
import closeIcon from "../../../../assets/icons/close.svg";

type DoubleSizeMode = "equal" | "split"; // equal=5:5 / split=left 80px + right fill
type SingleVariant =
  | "mint" // second=false 기본
  | "primaryAlert"
  | "primaryDisabled"
  | "primarySecondaryText";
type DoubleLeftVariant = "secondary" | "alert"; // 5번=secondary, 6번=alert

export type BottomSheetFooterConfig =
  | {
      layout: "single";
      variant: SingleVariant;
      label: string;
      onClick?: () => void;
      ariaLabel?: string;
    }
  | {
      layout: "double";
      sizeMode: DoubleSizeMode;
      leftVariant: DoubleLeftVariant;
      leftLabel: string;
      rightLabel: string;
      onLeftClick?: () => void;
      onRightClick?: () => void;
      leftDisabled?: boolean;
      rightDisabled?: boolean;
      ariaLabelLeft?: string;
      ariaLabelRight?: string;
    };

type Props = {
  open: boolean;
  onClose: () => void;

  /** header ON/OFF: title이 있으면 헤더 렌더 */
  title?: string;

  /** footer ON/OFF */
  footer?: BottomSheetFooterConfig;

  /** body ON/OFF */
  children?: React.ReactNode;

  /** overlay 클릭으로 닫기 (기본 true) */
  closeOnOverlayClick?: boolean;

  /** 뒷 배경 오버레이 */
  overlay?: boolean;

  className?: string;
};

function BottomSheetHeader({
  title,
  onClose,
  className = "",
}: {
  title: string;
  onClose: () => void;
  className?: string;
}) {
  return (
    <div
      className={[
        "flex h-10 items-center justify-between self-stretch",
        className,
      ].join(" ")}
    >
      {/* left spacer (title 중앙정렬 유지) */}
      <div className="w-10 h-10" />

      <div className="flex-1 text-center text-title-18-m text-gray-90 truncate">
        {title}
      </div>

      <button
        type="button"
        aria-label="close bottom sheet"
        onClick={onClose}
        className={["flex w-10 h-10 items-center justify-center", "p-2"].join(
          " ",
        )}
      >
        <img src={closeIcon} alt="close" className="w-6 h-6" />
      </button>
    </div>
  );
}

function BottomSheetFooter({
  config,
  className = "",
}: {
  config: BottomSheetFooterConfig;
  className?: string;
}) {
  const baseBtn = [
    "flex items-center justify-center",
    "h-12", // 버튼 2개 케이스 왼쪽 버튼 48px 고정
    "px-6 py-4",
    "rounded-lg",
    "text-btn-16-sb",
  ].join(" ");

  const singleClassByVariant: Record<SingleVariant, string> = {
    mint: "bg-mint-60 text-gray-10",
    primaryAlert: "bg-red-20 text-red-1",
    primaryDisabled: "bg-gray-25 text-gray-50",
    primarySecondaryText: "bg-gray-25 text-gray-70",
  };

  const leftClassByVariant: Record<DoubleLeftVariant, string> = {
    secondary: "bg-gray-25 text-gray-70",
    alert: "bg-red-20 text-red-1",
  };

  const rightBtnClass = "bg-mint-60 text-gray-10";

  if (config.layout === "single") {
    const disabled = config.variant === "primaryDisabled";

    return (
      <div className={["w-full", className].join(" ")}>
        <button
          type="button"
          aria-label={config.ariaLabel}
          onClick={disabled ? undefined : config.onClick}
          disabled={disabled}
          className={[
            baseBtn,
            "w-full",
            singleClassByVariant[config.variant],
            disabled ? "cursor-not-allowed" : "cursor-pointer",
          ].join(" ")}
        >
          {config.label}
        </button>
      </div>
    );
  }

  const equal = config.sizeMode === "equal";

  return (
    <div className={["w-full flex gap-2", className].join(" ")}>
      <button
        type="button"
        aria-label={config.ariaLabelLeft}
        onClick={config.leftDisabled ? undefined : config.onLeftClick}
        disabled={config.leftDisabled}
        className={[
          baseBtn,
          leftClassByVariant[config.leftVariant],
          equal ? "flex-1" : "",
          config.leftDisabled ? "cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        {config.leftLabel}
      </button>

      <button
        type="button"
        aria-label={config.ariaLabelRight}
        onClick={config.rightDisabled ? undefined : config.onRightClick}
        disabled={config.rightDisabled}
        className={[
          baseBtn,
          config.rightDisabled ? "bg-gray-25 text-gray-50" : rightBtnClass,
          "flex-1",
          config.rightDisabled ? "cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        {config.rightLabel}
      </button>
    </div>
  );
}

export default function BottomSheet({
  open,
  onClose,
  title,
  footer,
  children,
  overlay = true,
  closeOnOverlayClick = true,
  className = "",
}: Props) {
  // 닫힘 애니메이션이 끝날 때까지 컴포넌트를 유지
  const [isRendered, setIsRendered] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId1: number | undefined;
    let frameId2: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (open) {
      setIsRendered(true);
      setIsVisible(false);

      // 초기 위치를 먼저 브라우저에 반영한 뒤 애니메이션 시작
      frameId1 = requestAnimationFrame(() => {
        frameId2 = requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);

      timeoutId = setTimeout(() => {
        setIsRendered(false);
      }, 300);
    }

    return () => {
      if (frameId1 !== undefined) cancelAnimationFrame(frameId1);
      if (frameId2 !== undefined) cancelAnimationFrame(frameId2);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [open]);

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay */}
      {overlay && (
        <button
          type="button"
          aria-label="close overlay"
          onClick={closeOnOverlayClick ? onClose : undefined}
          className={[
            "absolute inset-0",
            open ? "pointer-events-auto" : "pointer-events-none",
            "bg-black/50",
            "transition-opacity duration-300 ease-out",
            isVisible ? "opacity-100" : "opacity-0",
            closeOnOverlayClick ? "cursor-pointer" : "cursor-default",
          ].join(" ")}
        />
      )}

      {/* Sheet Wrapper */}
      <div
        className={[
          "absolute inset-x-0 bottom-0 mx-auto",
          open ? "pointer-events-auto" : "pointer-events-none",
          "w-full max-w-93.75",
          "flex flex-col items-start",
          "px-4 pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))]",
          "rounded-t-2xl",
          "bg-gray-15",
          "transition-transform duration-300 ease-out",
          "will-change-transform",
          isVisible ? "translate-y-0" : "translate-y-full",
          className,
        ].join(" ")}
        role="dialog"
        aria-modal={overlay ? "true" : undefined}
      >
        {/* Header */}
        {title ? <BottomSheetHeader title={title} onClose={onClose} /> : null}

        {/* Body */}
        {children ? (
          <div className={["w-full", title ? "mt-4" : ""].join(" ")}>
            {children}
          </div>
        ) : null}

        {/* Footer */}
        {footer ? (
          <div className={["w-full", children ? "mt-8" : ""].join(" ")}>
            <BottomSheetFooter config={footer} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
