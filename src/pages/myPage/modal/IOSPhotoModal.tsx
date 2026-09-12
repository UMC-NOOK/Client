import {
  useEffect,
  useRef,
  type ChangeEvent,
  type ReactNode,
} from "react";

import cameraIcon from "../../../assets/icons/camera-outline.svg";
import libraryIcon from "../../../assets/icons/images-outline.svg";
import folderIcon from "../../../assets/icons/folder-outline.svg";
import profileIcon from "../../../assets/icons/Icon-Profile.svg";

import "./IOSPhotoModal.css";


interface IOSPhotoModalProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;

  onSelectImage: (file: File) => void;
  onSelectDefaultImage: () => void;
}


export function IOSPhotoModal({
  children,
  className,
  disabled = false,
  onSelectImage,
  onSelectDefaultImage,
}: IOSPhotoModalProps) {

  const dialogRef =
    useRef<HTMLDialogElement>(null);

  const triggerRef =
    useRef<HTMLButtonElement>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const cameraInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutsidePointerDown = (event: PointerEvent) => {
      const dialog = dialogRef.current;
      if (!dialog?.open || !(event.target instanceof Node)) return;
      if (
        !dialog.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        dialog.close();
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



  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {

    const file =
      event.currentTarget.files?.[0];


    event.currentTarget.value = "";


    if (file) {
      onSelectImage(file);
    }
  };



  const openDialog = () => {

    const dialog =
      dialogRef.current;

    const trigger =
      triggerRef.current;


    if (!dialog || !trigger) {
      return;
    }


    dialog.show();


    requestAnimationFrame(() => {

      const triggerRect =
        trigger.getBoundingClientRect();


      const modalWidth =
        dialog.offsetWidth;


      const left =
        Math.min(
          triggerRect.left,
          window.innerWidth -
            modalWidth - 16,
        );


      const top = triggerRect.top + 100;

      dialog.style.left =
        `${Math.max(16, left)}px`;


      dialog.style.top =
        `${Math.max(16, top)}px`;

    });
  };



  const closeDialog = () => {
    dialogRef.current?.close();
  };



  const selectFile = (
    type: "library" | "camera",
  ) => {

    closeDialog();


    if (type === "camera") {
      const isMobileDevice =
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);

      if (!isMobileDevice) {
        window.alert("PC에서는 사진 촬영을 지원하지 않아요. 모바일에서 이용해 주세요.");
        return;
      }

      cameraInputRef.current?.click();
      return;
    }


    fileInputRef.current?.click();
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
        className="ios-photo-modal"
        aria-label="프로필 사진 선택"
        onClick={(event) => {

          if (
            event.target ===
            event.currentTarget
          ) {
            closeDialog();
          }

        }}
      >

        <div className="ios-photo-modal__actions">


          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              selectFile("library")
            }
          >
            <img src={libraryIcon} alt="" className="ios-photo-modal__profile-icon" />

            <span>
              사진 보관함
            </span>
          </button>



          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              selectFile("camera")
            }
          >

            <img src={cameraIcon} alt="" className="ios-photo-modal__profile-icon" />

            <span>
              사진 찍기
            </span>

          </button>



          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              selectFile("library")
            }
          >

            <img src={folderIcon} alt="" className="ios-photo-modal__profile-icon" />

            <span>
              파일 선택
            </span>

          </button>



          <button
            type="button"
            disabled={disabled}
            onClick={() => {

              closeDialog();

              onSelectDefaultImage();

            }}
          >

            <img
              src={profileIcon}
              alt=""
              className="
                ios-photo-modal__profile-icon
              "
            />


            <span>
              기본 이미지
            </span>

          </button>


        </div>

      </dialog>



      <input
        ref={fileInputRef}
        type="file"
        accept="
          image/jpeg,
          image/png,
          image/webp
        "
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />



      <input
        ref={cameraInputRef}
        type="file"
        accept="
          image/jpeg,
          image/png,
          image/webp
        "
        capture="user"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

    </>
  );
}


export default IOSPhotoModal;
