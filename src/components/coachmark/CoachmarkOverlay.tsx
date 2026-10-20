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

        const appRect = app.getBoundingClientRect();
        const anchorRect = anchor.getBoundingClientRect();
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

        setGeometry({
          app: toRect(appRect),
          anchor: toRect(anchorRect),
          viewportHeight,
        });
      });
    };

    const app = document.querySelector<HTMLElement>("[data-app-shell]");
    const anchor = document.querySelector<HTMLElement>(
      `[data-coachmark-anchor="${anchorName}"]`,
    );

    if (app && anchor) {
      if (scrollAnchorIntoView) {
        anchor.scrollIntoView({ block: "nearest" });
      }

      observer = new ResizeObserver(measure);
      observer.observe(app);
      observer.observe(anchor);
    }

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    window.addEventListener("scroll", measure, true);
    window.visualViewport?.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("scroll", measure);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("scroll", measure, true);
      window.visualViewport?.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("scroll", measure);
    };
  }, [anchorName, open, scrollAnchorIntoView]);

  return geometry;
}

export function CoachmarkText({
  title,
  description,
  align = "right",
}: {
  title: ReactNode;
  description: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`flex flex-col gap-2 whitespace-nowrap ${align === "right" ? "items-end text-right" : "items-start text-left"}`}
    >
      <p className="text-body-16-b text-mint-60">{title}</p>
      <p className="text-body-14-b text-gray-90">{description}</p>
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
}: CoachmarkOverlayProps) {
  const geometry = useCoachmarkGeometry(
    open,
    anchorName,
    scrollAnchorIntoView,
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

      <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
        {children(geometry)}
      </div>
    </div>,
    document.body,
  );
}
