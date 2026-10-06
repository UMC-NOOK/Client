import { useCallback, useLayoutEffect, useRef, useState } from "react";

const ELLIPSIS = "...";

type Props = {
  text: string;
  className?: string;
};

type VisibleText = {
  content: string;
  isTruncated: boolean;
};

export default function WidthAwareEllipsis({ text, className = "" }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [visibleText, setVisibleText] = useState<VisibleText>({
    content: text,
    isTruncated: false,
  });

  const fitText = useCallback(() => {
    const container = containerRef.current;
    const measurer = measureRef.current;

    if (!container || !measurer) return;

    const availableWidth = container.clientWidth;
    const characters = Array.from(text);

    measurer.textContent = text;

    if (measurer.getBoundingClientRect().width <= availableWidth) {
      setVisibleText((current) =>
        current.content === text && !current.isTruncated
          ? current
          : { content: text, isTruncated: false },
      );
      return;
    }

    measurer.textContent = ELLIPSIS;
    const textWidth = Math.max(
      availableWidth - measurer.getBoundingClientRect().width,
      0,
    );
    let low = 0;
    let high = characters.length;

    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      const candidate = characters.slice(0, middle).join("").trimEnd();

      measurer.textContent = candidate;

      if (measurer.getBoundingClientRect().width <= textWidth) {
        low = middle;
      } else {
        high = middle - 1;
      }
    }

    const content = characters.slice(0, low).join("").trimEnd();

    setVisibleText((current) =>
      current.content === content && current.isTruncated
        ? current
        : { content, isTruncated: true },
    );
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
        <span className="min-w-0 overflow-hidden">{visibleText.content}</span>
        {visibleText.isTruncated ? (
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
