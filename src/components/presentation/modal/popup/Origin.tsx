//Client\src\components\presentation\modal\popup\Origin.tsx

import { useId } from "react";
import Solid from "../../../action/Button/Solid";

type Props = {
  open: boolean;

  title: string;
  description: string;

  // 버튼 1개 또는 2개 지원
  leftLabel?: string;
  rightLabel: string;

  onLeftClick?: () => void;
  onRightClick?: () => void;

  /** overlay 등 외부 닫기 처리 */
  onClose?: () => void;

  /** overlay 클릭으로 닫기 (기본 true) */
  closeOnOverlayClick?: boolean;

  className?: string;

  /** 접근성: 팝업 구분용 라벨 */
  ariaLabel?: string;
  onClick?: () => void;
};

export default function PopupConfirmModal({
  open,
  title,
  description,
  leftLabel,
  rightLabel,
  onLeftClick,
  onRightClick,
  onClose,
  closeOnOverlayClick = true,
  className = "",
  ariaLabel,
  onClick,
}: Props) {
  const id = useId();

  if (!open) return null;

  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  const hasLeftButton = Boolean(leftLabel?.trim());

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={
          closeOnOverlayClick ? onClose : undefined
        }
        className={[
          "absolute inset-0",
          "bg-black/50",
          "z-0",
          closeOnOverlayClick
            ? "cursor-pointer"
            : "cursor-default",
        ].join(" ")}
      />

      {/* Dialog */}
      <div
        className={[
          "pointer-events-none absolute inset-0",
          "flex items-center justify-center",
          "px-4",
          className,
        ].join(" ")}
      >
        {/* Popup box */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={titleId}
          aria-describedby={descId}
          onClick={onClick}
          className={[
            "pointer-events-auto",
            "w-77.75 max-w-full",
            "flex flex-col items-center justify-center",
            hasLeftButton ? "px-12 py-8" : "p-8",
            "gap-5",
            "rounded-lg",
            "bg-gray-17",
          ].join(" ")}
        >
          {/* Text block */}
          <div
            className={[
              "self-stretch",
              "flex flex-col items-center",
              "gap-1",
            ].join(" ")}
          >
            <p
              id={titleId}
              className={[
                "w-full",
                "text-center",
                "text-body-16-b",
                "text-gray-90",
                "break-keep",
              ].join(" ")}
            >
              {title}
            </p>

            <p
              id={descId}
              className={[
                "self-stretch",
                "text-center",
                "text-body-14-m",
                "text-gray-90",
                "break-keep",
              ].join(" ")}
            >
              {description}
            </p>
          </div>

          {/* Buttons */}
          <div
            className={[
              "flex items-center justify-center",
              "gap-2",
              "w-full",
            ].join(" ")}
          >
            {/* 왼쪽 버튼: 라벨이 있을 때만 표시 */}
            {hasLeftButton && (
              <Solid
                text={leftLabel!}
                variant="secondary"
                size="s"
                fullWidth={false}
                onClick={onLeftClick}
                className="flex-1"
              />
            )}

            {/* 오른쪽 버튼 */}
            <Solid
              text={rightLabel}
              variant="primary"
              size={hasLeftButton ? "s" : "m"}
              fullWidth={!hasLeftButton}
              onClick={onRightClick}
              className={
                hasLeftButton ? "flex-1" : ""
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
