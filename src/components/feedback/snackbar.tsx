import { useEffect, useState } from "react";

type SnackbarProps = {
  icon?: string;
  text: string;
  buttonText: string;
  onButtonClick: () => void;
  isOpen: boolean;
  onClose?: () => void;
};

export default function Snackbar({
  icon,
  text,
  buttonText,
  onButtonClick,
  isOpen,
  onClose,
}: SnackbarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setVisible(false);
      return;
    }

    const enterTimer = requestAnimationFrame(() => {
      setVisible(true);
    });

    const autoCloseTimer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        onClose?.();
      }, 300); // 닫히는 애니메이션 시간
    }, 4000); // 유지 시간 4초

    return () => {
      cancelAnimationFrame(enterTimer);
      clearTimeout(autoCloseTimer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`
        absolute bottom-4 z-[100]
        flex h-[46px] w-full items-center gap-2 rounded-lg bg-gray-90 px-4 py-3
        transition-all duration-300 ease-out
        ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
      `}
    >
      {icon && (
        <img src={icon} alt="Icon" className="inline-block h-5 w-5 shrink-0" />
      )}

      <span className="flex-1 text-left text-btn-14-sb text-gray-25">
        {text}
      </span>

      <button
        onClick={onButtonClick}
        className="shrink-0 whitespace-nowrap bg-transparent px-2 py-1 text-btn-14-sb text-gray-60"
      >
        {buttonText}
      </button>
    </div>
  );
}
