import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const VIEWPORT_WIDTH = 224;
const COPY_GAP = 32;
const FIGMA_TRANSITION_SECONDS = 6;
const FIGMA_TRANSITION_DISTANCE = 224;

type Props = {
  title: string;
  author: string;
};

type MarqueeStyle = CSSProperties & {
  "--focus-book-info-distance": string;
  "--focus-book-info-duration": string;
};

function BookInfoCopy({ title, author }: Props) {
  return (
    <div className="flex w-max shrink-0 flex-col items-center gap-0.5 text-center">
      <p className="whitespace-nowrap text-subtitle-14-sb text-gray-90">
        {title}
      </p>
      <p className="whitespace-nowrap text-body-13-r text-gray-90">
        {author}
      </p>
    </div>
  );
}

export default function FocusSessionBookInfo({ title, author }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const measurementRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const measurement = measurementRef.current;
    if (!viewport || !measurement) return;

    let frameId = 0;
    let disposed = false;

    const update = () => {
      if (disposed) return;
      setContentWidth(measurement.scrollWidth);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(viewport);
    resizeObserver.observe(measurement);
    requestUpdate();

    void document.fonts?.ready.then(requestUpdate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [author, title]);

  const isOverflowing = contentWidth > VIEWPORT_WIDTH;
  const travelDistance = contentWidth + COPY_GAP;
  const duration =
    (travelDistance / FIGMA_TRANSITION_DISTANCE) * FIGMA_TRANSITION_SECONDS;
  const marqueeStyle: MarqueeStyle = {
    "--focus-book-info-distance": `${travelDistance}px`,
    "--focus-book-info-duration": `${duration}s`,
  };

  return (
    <div
      ref={viewportRef}
      className="focus-session-book-info-mask relative h-10.75 w-56 overflow-hidden"
      aria-label={`${title}, ${author}`}
    >
      <div
        ref={measurementRef}
        className="pointer-events-none invisible absolute w-max"
        aria-hidden="true"
      >
        <BookInfoCopy title={title} author={author} />
      </div>

      {isOverflowing ? (
        <div
          className="focus-session-book-info-track flex w-max items-center gap-8"
          style={marqueeStyle}
          aria-hidden="true"
        >
          <BookInfoCopy title={title} author={author} />
          <BookInfoCopy title={title} author={author} />
        </div>
      ) : (
        <div className="flex w-full justify-center" aria-hidden="true">
          <BookInfoCopy title={title} author={author} />
        </div>
      )}
    </div>
  );
}
