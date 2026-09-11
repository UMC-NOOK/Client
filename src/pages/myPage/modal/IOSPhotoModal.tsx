import { useEffect, useRef, type ChangeEvent } from "react";
import "./IOSPhotoModal.css";

interface IOSPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (file: File) => void;
  onSelectDefaultImage: () => void;
}

export function IOSPhotoModal({ isOpen, onClose, onSelectImage, onSelectDefaultImage }: IOSPhotoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    onSelectImage(file);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="ios-photo-modal"
      aria-label="프로필 사진 선택"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="user" hidden onChange={handleFileChange} />
      <input ref={documentInputRef} type="file" hidden onChange={handleFileChange} />
      <div className="ios-photo-modal__container">
        <div className="ios-photo-modal__actions">
          <button type="button" onClick={() => fileInputRef.current?.click()}>사진 보관함</button>
          <button type="button" onClick={() => cameraInputRef.current?.click()}>사진 찍기</button>
          <button type="button" onClick={() => documentInputRef.current?.click()}>파일 선택</button>
        </div>
        <button
          type="button"
          className="ios-photo-modal__default"
          onClick={() => {
            onSelectDefaultImage();
            onClose();
          }}
        >기본 이미지 추가</button>
      </div>
    </dialog>
  );
}

export default IOSPhotoModal;
