import { useCallback, useLayoutEffect, useRef, useState } from "react";

const ELLIPSIS = "...";

type Props = {
  text: string;
  className?: string;
};

export default function WidthAwareEllipsis({ text, className = "" }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const fitText = useCallback(() => {
    const container = containerRef.current;
    const measurer = measureRef.current;

    if (!container || !measurer) return;

    const availableWidth = container.clientWidth;
    measurer.textContent = text;
    setIsTruncated(measurer.getBoundingClientRect().width > availableWidth);
  }, [text]);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const animationFrame = window.requestAnimationFrame(fitText);
    const resizeObserver = new ResizeObserver(fitText);

    resizeObserver.observe(container);
    void document.fonts.ready.then(fitText);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [fitText]);

  return (
    <span
      ref={containerRef}
      className={`relative block w-full min-w-0 overflow-hidden whitespace-nowrap ${className}`}
      aria-label={text}
    >
      <span className="flex w-full min-w-0" aria-hidden="true">
        <span className="min-w-0 overflow-hidden">{text}</span>
        {isTruncated ? (
          <span className="ml-auto shrink-0">{ELLIPSIS}</span>
        ) : null}
      </span>
      <span
        ref={measureRef}
        className="invisible absolute left-0 top-0 w-max whitespace-nowrap"
        aria-hidden="true"
      >
        {text}
      </span>
    </span>
  );
}
