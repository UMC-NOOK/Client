import { useEffect, useRef, useState } from "react";

const ELLIPSIS = "...";

type Props = {
  text: string;
  className?: string;
};

function splitGraphemes(text: string) {
  if (typeof Intl.Segmenter === "function") {
    return Array.from(
      new Intl.Segmenter("ko", { granularity: "grapheme" }).segment(text),
      ({ segment }) => segment,
    );
  }

  return Array.from(text);
}

function getFittedText(
  text: string,
  availableWidth: number,
  measureText: (value: string) => number,
) {
  if (measureText(text) <= availableWidth) return text;
  if (measureText(ELLIPSIS) > availableWidth) return "";

  const graphemes = splitGraphemes(text);
  let start = 0;
  let end = graphemes.length;

  while (start < end) {
    const middle = Math.ceil((start + end) / 2);
    const candidate = `${graphemes.slice(0, middle).join("").trimEnd()}${ELLIPSIS}`;

    if (measureText(candidate) <= availableWidth) {
      start = middle;
    } else {
      end = middle - 1;
    }
  }

  return `${graphemes.slice(0, start).join("").trimEnd()}${ELLIPSIS}`;
}

export default function WidthLimitedText({ text, className = "" }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [content, setContent] = useState(text);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    let disposed = false;

    const update = () => {
      if (disposed) return;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return;

      const computedStyle = window.getComputedStyle(container);
      context.font = computedStyle.font;

      const letterSpacing = Number.parseFloat(computedStyle.letterSpacing) || 0;
      const measureText = (value: string) => {
        const graphemeCount = splitGraphemes(value).length;
        return (
          context.measureText(value).width +
          Math.max(0, graphemeCount - 1) * letterSpacing
        );
      };

      setContent(
        getFittedText(text, container.clientWidth, measureText),
      );
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(container);
    requestUpdate();

    void document.fonts?.ready.then(requestUpdate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [className, text]);

  return (
    <span
      ref={containerRef}
      className={`block w-full min-w-0 overflow-hidden whitespace-nowrap ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true">{content}</span>
    </span>
  );
}
