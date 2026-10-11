import {
  useEffect,
  useRef,
  type ChangeEvent,
  type ReactNode,
} from "react";

import "./ProfilePhotoModal.css";

interface ProfilePhotoModalProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onSelectImage: (file: File) => void;
  onDeleteProfile: () => void;
}

export default function ProfilePhotoModal({
  children,
  className,
  disabled = false,
  onSelectImage,
  onDeleteProfile,
}: ProfilePhotoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOutsidePointerDown = (event: PointerEvent) => {
      const dialog = dialogRef.current;
      if (!(event.target instanceof Node)) return;

      if (
        !dialog?.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        dialog?.close();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dialogRef.current?.open) {
        dialogRef.current.close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown, true);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";

    if (file) onSelectImage(file);
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const openDialog = () => {
    dialogRef.current?.show();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="프로필 사진 변경"
        aria-haspopup="dialog"
        className={className}
        disabled={disabled}
        onClick={openDialog}
      >
        {children}
      </button>

      <dialog
        ref={dialogRef}
        className="profile-photo-modal absolute left-auto right-4 top-47 h-27 w-65"
        aria-label="프로필 사진 설정"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className="flex w-full flex-col items-start gap-4.5">
          <label
            className={`flex w-full items-center text-left text-btn-14-sb text-gray-90 ${
              disabled ? "pointer-events-none opacity-50" : "cursor-pointer"
            }`}
          >
            <span
              aria-hidden="true"
              className="profile-photo-modal__change-icon"
            />
            <div className="px-2 py-1 text-btn-14-sb text-gray-90">사진 변경</div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={disabled}
              className="hidden"
            />
          </label>
          <button
            type="button"
            className="flex w-full items-center border-0 bg-transparent text-left text-btn-14-sb text-red-60"
            disabled={disabled}
            onClick={() => {
              closeDialog();
              onDeleteProfile();
            }}
            >
            <span
              aria-hidden="true"
              className="profile-photo-modal__profile-icon"
            />
            <div className="px-2 py-1 text-btn-14-sb text-red-60">
              프로필 사진 삭제
            </div>
          </button>
        </div>
      </dialog>

    </>
  );
}
