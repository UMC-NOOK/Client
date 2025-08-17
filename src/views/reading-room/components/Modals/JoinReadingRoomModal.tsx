// src/views/reading-room/components/modals/JoinReadingRoomModal.tsx
import React from "react";

interface JoinReadingRoomModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const JoinReadingRoomModal = ({
  open,
  onConfirm,
  onCancel,
  isLoading = false,
}: JoinReadingRoomModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Dimmed background */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal card (원본 클래스 유지) */}
      <div
        className="relative w-224 h-86 rounded-3xl shadow-xl"
        style={{ backgroundColor: "rgba(45, 40, 34, 1)" }}
      >
        {/* 메시지 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 text-white text-center text-lg whitespace-nowrap">
          이 리딩룸에 가입하시겠습니까?
        </div>

        {/* 버튼 영역 */}
        <div className="absolute right-14 bottom-10 mt-17 flex items-center">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="w-34 h-15 px-10 py-2 rounded-lg mr-7 font-bold disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: "rgba(122,191,201,1)" }}
          >
            {isLoading ? "가입 중..." : "가입"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-35 h-15 px-10 py-2 rounded-lg border font-bold text-white/50 hover:text-white"
            style={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinReadingRoomModal;
