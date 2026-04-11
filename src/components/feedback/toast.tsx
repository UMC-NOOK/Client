import { useEffect, useState } from "react";

type ToastProps = {
  icon?: string;
  text: string;
  isOpen: boolean;
  onClose?: () => void;
};

export default function Toast({ icon, text, isOpen, onClose }: ToastProps) {
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
        flex h-11 w-full items-center gap-2 rounded-lg bg-gray-90 px-4 py-3
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
    </div>
  );
}
