import { useState, type ReactNode } from "react";

import caretDownIcon from "../../../assets/icons/caret_down.svg";
import caretUpIcon from "../../../assets/icons/caret_up.svg";

type SectionHeaderSize = "13" | "14" | "16" | "20";

type Props = {
  size: SectionHeaderSize;
  top: ReactNode;
  bottom?: ReactNode; // 13, 16, 20
  showCaret?: boolean; // 14, 16, 20
  open?: boolean;
  onToggle?: (open: boolean) => void; // caret 열 onClick
  onClick?: () => void; // 사용자용 Click
};

const clampOneLineStyle = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical" as const,
};

export default function SectionHeader({
  size,
  top,
  bottom,
  showCaret = false,
  open,
  onToggle,
  onClick,
}: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;

  const handleClick = () => {
    if (showCaret) {
      const next = !isOpen;
      if (open === undefined) {
        setInternalOpen(next);
      }
      onToggle?.(next);
    }

    onClick?.();
  };

  const caretSrc = isOpen ? caretUpIcon : caretDownIcon;
  const clickable = showCaret || Boolean(onClick);

  if (size === "13") {
    return (
      <div className="flex w-full flex-col items-start justify-center gap-2">
        <div className="w-full text-label-13-sb text-gray-90 ">{top}</div>

        {bottom ? (
          <div
            className="self-stretch text-label-12-sb text-gray-50"
            style={clampOneLineStyle}
          >
            {bottom}
          </div>
        ) : null}
      </div>
    );
  }

  if (size === "14") {
    const Content = (
      <>
        <span className="min-w-0 text-label-14-sb text-gray-90">{top}</span>

        {showCaret ? (
          <img
            src={caretSrc}
            alt=""
            aria-hidden="true"
            className="h-3 w-3 shrink-0"
          />
        ) : null}
      </>
    );

    return clickable ? (
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full items-center gap-2 text-left"
      >
        {Content}
      </button>
    ) : (
      <div className="flex w-full items-center gap-2">{Content}</div>
    );
  }

  if (size === "16") {
    const TopRow = (
      <>
        <span className="min-w-0 text-label-16-sb text-gray-90">{top}</span>

        {showCaret ? (
          <img
            src={caretSrc}
            alt=""
            aria-hidden="true"
            className="h-3 w-3 shrink-0"
          />
        ) : null}
      </>
    );

    return (
      <div className="flex w-full flex-col items-start justify-center gap-2">
        {clickable ? (
          <button
            type="button"
            onClick={handleClick}
            className="flex w-full items-center gap-2 text-left"
          >
            {TopRow}
          </button>
        ) : (
          <div className="flex w-full items-center gap-2">{TopRow}</div>
        )}

        {bottom ? (
          <div
            className="self-stretch text-label-14-sb text-gray-50"
            style={clampOneLineStyle}
          >
            {bottom}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start justify-center">
      <div className="w-full text-title-20-b text-gray-90">{top}</div>

      {bottom ? (
        <div
          className="self-stretch whitespace-pre-wrap text-body-14-m text-gray-50"
          style={clampOneLineStyle}
        >
          {bottom}
        </div>
      ) : null}
    </div>
  );
}
