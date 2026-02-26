/**
 * 문구(title/description, 버튼 label)만 바뀌는 고정 레이아웃 팝업입니다.
 * ++ closeOnOverlayClick=false로 오버레이 클릭 닫기 비활성화 가능
 */


type Props = {
  open: boolean;

  title: string;
  description: string;

  leftLabel: string;
  rightLabel: string;

  onLeftClick?: () => void;
  onRightClick?: () => void;

  /** overlay/ESC 등 외부 닫기 훅 (원하면 사용) */
  onClose?: () => void;

  /** overlay 클릭으로 닫기 (기본 true) */
  closeOnOverlayClick?: boolean;

  className?: string;

  /** 접근성: 팝업 구분용 라벨 */
  ariaLabel?: string;
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
  ariaLabel = "popup confirm modal",
}: Props) {
  if (!open) return null;

  const titleId = "popup-confirm-title";
  const descId = "popup-confirm-desc";

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <button
        type="button"
        aria-label="close overlay"
        onClick={closeOnOverlayClick ? onClose : undefined}
        className={[
          "absolute inset-0",
          "bg-black/50",
          "z=0",
          closeOnOverlayClick ? "cursor-pointer" : "cursor-default",
        ].join(" ")}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={[
          "absolute inset-0",
          "flex items-center justify-center",
          className,
        ].join(" ")}
      >
        {/* Popup box */}
        <div
          className={[
            // base
            "w-77.75",
            "flex flex-col items-center justify-center",
            "px-12 py-8", // 48px / 32px
            "gap-5", // 20px
            "rounded-lg",
            "bg-gray-17", // #1B203B
          ].join(" ")}
        >
          {/* Text block: title + description (gap 4px) */}
          <div
            className={[
              "self-stretch",
              "flex flex-col items-center",
              "gap-1", // 4px
            ].join(" ")}
          >
            <p
              id={titleId}
              className={[
                "text-center",
                "text-body-16-b",
                "text-gray-90",
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
              ].join(" ")}
            >
              {description}
            </p>
          </div>

          {/* Buttons row */}
          <div className={["flex items-center justify-center", "gap-2"].join(" ")}>
            {/* Left button */}
            <button
              type="button"
              onClick={onLeftClick}
              className={[
                "flex items-center justify-center",
                "px-8 py-3", // 32px / 12px
                "rounded-sm",
                "bg-gray-25", // #272D49
                "text-btn-14-sb",
                "text-gray-70", // #A2A7C3
                "cursor-pointer",
              ].join(" ")}
            >
              {leftLabel}
            </button>

            {/* Right button */}
            <button
              type="button"
              onClick={onRightClick}
              className={[
                "flex items-center justify-center",
                "px-8 py-3",
                "rounded-sm",
                "bg-mint-60", // #7AD8D2
                "text-btn-14-sb",
                "text-gray-10", // #13172A
                "cursor-pointer",
              ].join(" ")}
            >
              {rightLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}