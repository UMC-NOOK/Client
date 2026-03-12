import { useState } from "react";

import caretDownIcon from "../../../assets/icons/caret_down.svg";
import caretUpIcon from "../../../assets/icons/caret_up.svg";

type SectionHeaderSize = "13" | "14" | "16" | "20";

type Props = {
  size: SectionHeaderSize;
  title: string;
  description?: string; // 13, 16, 20
  showCaret?: boolean; // 14, 16, 20
  onToggle?: (open: boolean) => void; // caret 열 onClick 
  onClick?: () => void; // 사용자용 Click
};

const clampOneLineStyle = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical" as const,
  WebkitLineClamp: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default function SectionHeader({
  size,
  title,
  description,
  showCaret = false,
  onToggle,
  onClick,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (showCaret) {
      const next = !open;
      setOpen(next);
      onToggle?.(next);
    }

    onClick?.();
  };

  const caretSrc = open ? caretUpIcon : caretDownIcon;
  const clickable = showCaret || Boolean(onClick);

  if (size === "13") {
    return (
      <div className="flex w-full flex-col items-start justify-center gap-2">
        <p className="text-label-13-sb text-gray-90">{title}</p>

        {description ? (
          <p
            className="self-stretch text-label-12-sb text-gray-50"
            style={clampOneLineStyle}
          >
            {description}
          </p>
        ) : null}
      </div>
    );
  }

  if (size === "14") {
    const Content = (
      <>
        <span className="text-label-14-sb text-gray-90">{title}</span>

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
        <span className="text-label-16-sb text-gray-90">{title}</span>

        {showCaret ? (
          <img
            src={caretSrc}
            alt=""
            aria-hidden="true"
            className="h-3 w- shrink-0"
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

        {description ? (
          <p
            className="self-stretch text-label-14-sb text-gray-50"
            style={clampOneLineStyle}
          >
            {description}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start justify-center">
      <p className="text-title-20-b text-gray-90">{title}</p>

      {description ? (
        <p
          className="self-stretch text-body-14-m text-gray-50"
          style={clampOneLineStyle}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}