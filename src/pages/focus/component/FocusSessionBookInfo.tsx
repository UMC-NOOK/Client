import { useEffect, useLayoutEffect, useRef, useState } from "react";

const VIEWPORT_WIDTH = 224;
const MARQUEE_SPEED = 28;
const MARQUEE_PAUSE_SECONDS = 1.5;

type Props = {
  title: string;
  author: string;
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
  const trackRef = useRef<HTMLDivElement>(null);
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

  // 오른쪽 밖에서 들어와 왼쪽 밖으로 완전히 나간 뒤, 텍스트가 안 보이는 상태로 잠시 멈췄다가 처음부터 반복한다.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !isOverflowing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const moveSeconds = (VIEWPORT_WIDTH + contentWidth) / MARQUEE_SPEED;
    const totalSeconds = moveSeconds + MARQUEE_PAUSE_SECONDS;
    const hiddenTransform = `translate3d(${-contentWidth}px, 0, 0)`;

    const animation = track.animate(
      [
        { transform: `translate3d(${VIEWPORT_WIDTH}px, 0, 0)` },
        { transform: hiddenTransform, offset: moveSeconds / totalSeconds },
        { transform: hiddenTransform },
      ],
      { duration: totalSeconds * 1000, iterations: Infinity, easing: "linear" },
    );

    return () => animation.cancel();
  }, [contentWidth, isOverflowing]);

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
          ref={trackRef}
          className="focus-session-book-info-track flex w-max items-center will-change-transform"
          aria-hidden="true"
        >
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
