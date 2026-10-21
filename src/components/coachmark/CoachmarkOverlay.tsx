import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type MeasuredRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
};

export type CoachmarkGeometry = {
  anchor: MeasuredRect;
  app: MeasuredRect;
  viewportHeight: number;
};

type CoachmarkOverlayProps = {
  open: boolean;
  anchorName: string;
  actionLabel: string;
  onAction: () => void;
  highlight: ReactNode;
  children: (geometry: CoachmarkGeometry) => ReactNode;
  highlightInset?: Partial<{
    top: number;
    right: number;
    bottom: number;
    left: number;
  }>;
  scrollAnchorIntoView?: boolean;
  scrollAnchorBlock?: ScrollLogicalPosition;
  anchorViewportBottomInset?: number;
  additionalActions?: ReactNode;
};

function toRect(rect: DOMRect): MeasuredRect {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    right: rect.right,
    bottom: rect.bottom,
  };
}

function useCoachmarkGeometry(
  open: boolean,
  anchorName: string,
  scrollAnchorIntoView: boolean,
  scrollAnchorBlock: ScrollLogicalPosition,
  anchorViewportBottomInset: number,
) {
  const [geometry, setGeometry] = useState<CoachmarkGeometry | null>(null);

  useEffect(() => {
    if (!open) return;

    let frame = 0;
    let observer: ResizeObserver | undefined;

    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const app = document.querySelector<HTMLElement>("[data-app-shell]");
        const anchor = document.querySelector<HTMLElement>(
          `[data-coachmark-anchor="${anchorName}"]`,
        );

        if (!app || !anchor) return;

        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        const anchorBottom = anchor.getBoundingClientRect().bottom;

        // 안내용 바텀시트와 설명이 대상 요소를 가리지 않도록 공간을 확보한다.
        if (
          anchorViewportBottomInset > 0 &&
          anchorBottom > viewportHeight - anchorViewportBottomInset
        ) {
          window.scrollBy({
            top: anchorBottom - viewportHeight + anchorViewportBottomInset,
            behavior: "instant",
          });
        }

        const appRect = app.getBoundingClientRect();
        const anchorRect = anchor.getBoundingClientRect();

        setGeometry({
          app: toRect(appRect),
          anchor: toRect(anchorRect),
          viewportHeight,
        });
      });
    };

    const measureAfterViewportChange = () => {
      const anchor = document.querySelector<HTMLElement>(
        `[data-coachmark-anchor="${anchorName}"]`,
      );

      if (scrollAnchorIntoView) {
        anchor?.scrollIntoView({ block: scrollAnchorBlock });
      }

      measure();
    };

    const app = document.querySelector<HTMLElement>("[data-app-shell]");
    const anchor = document.querySelector<HTMLElement>(
      `[data-coachmark-anchor="${anchorName}"]`,
    );

    if (app && anchor) {
      if (scrollAnchorIntoView) {
        anchor.scrollIntoView({ block: scrollAnchorBlock });
      }

      observer = new ResizeObserver(measure);
      observer.observe(app);
      observer.observe(anchor);
    }

    measure();
    window.addEventListener("resize", measureAfterViewportChange);
    window.addEventListener("orientationchange", measureAfterViewportChange);
    window.addEventListener("scroll", measure, true);
    window.visualViewport?.addEventListener("resize", measureAfterViewportChange);
    window.visualViewport?.addEventListener("scroll", measure);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", measureAfterViewportChange);
      window.removeEventListener(
        "orientationchange",
        measureAfterViewportChange,
      );
      window.removeEventListener("scroll", measure, true);
      window.visualViewport?.removeEventListener(
        "resize",
        measureAfterViewportChange,
      );
      window.visualViewport?.removeEventListener("scroll", measure);
    };
  }, [
    anchorName,
    anchorViewportBottomInset,
    open,
    scrollAnchorBlock,
    scrollAnchorIntoView,
  ]);

  return geometry;
}

export function CoachmarkText({
  title,
  description,
  align = "right",
  compact = false,
}: {
  title: ReactNode;
  description: ReactNode;
  align?: "left" | "right";
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2 whitespace-nowrap ${align === "right" ? "items-end text-right" : "items-start text-left"}`}
    >
      <p
        className={`${compact ? "text-label-16-b" : "text-body-16-b"} text-mint-60`}
      >
        {title}
      </p>
      <p
        className={`text-body-14-b text-gray-90 ${compact ? "leading-none" : ""}`}
      >
        {description}
      </p>
    </div>
  );
}

export default function CoachmarkOverlay({
  open,
  anchorName,
  actionLabel,
  onAction,
  highlight,
  children,
  highlightInset = {},
  scrollAnchorIntoView = false,
  scrollAnchorBlock = "nearest",
  anchorViewportBottomInset = 0,
  additionalActions,
}: CoachmarkOverlayProps) {
  const geometry = useCoachmarkGeometry(
    open,
    anchorName,
    scrollAnchorIntoView,
    scrollAnchorBlock,
    anchorViewportBottomInset,
  );

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const app = document.querySelector<HTMLElement>("[data-app-shell]");
    const previousInert = app?.inert ?? false;
    document.body.style.overflow = "hidden";
    if (app) app.inert = true;

    return () => {
      document.body.style.overflow = previousOverflow;
      if (app) app.inert = previousInert;
    };
  }, [open]);

  if (!open || !geometry) return null;

  const { app, anchor, viewportHeight } = geometry;
  const top = anchor.top - (highlightInset.top ?? 0);
  const left = anchor.left - app.left - (highlightInset.left ?? 0);
  const width =
    anchor.width + (highlightInset.left ?? 0) + (highlightInset.right ?? 0);
  const height =
    anchor.height + (highlightInset.top ?? 0) + (highlightInset.bottom ?? 0);
  const highlightStyle: CSSProperties = { top, left, width, height };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="처음 사용자 안내"
      className="fixed z-100 overflow-hidden"
      style={{ left: app.left, top: 0, width: app.width, height: viewportHeight }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-10 overflow-hidden"
        style={highlightStyle}
      >
        {highlight}
      </div>

      <button
        type="button"
        aria-label={actionLabel}
        onClick={onAction}
        className="absolute z-20 cursor-pointer bg-transparent"
        style={highlightStyle}
      />

      {additionalActions && (
        <div className="pointer-events-none absolute inset-0 z-20">
          {additionalActions}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
        {children(geometry)}
      </div>
    </div>,
    document.body,
  );
}
