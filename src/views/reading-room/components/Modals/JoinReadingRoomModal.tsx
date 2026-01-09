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
            
        <div
            className="absolute inset-0 bg-black/40"
            onClick={onCancel}
            aria-hidden="true"
        />

        <div
            className="relative w-[448px] h-[172px] rounded-3xl shadow-xl"
            style={{ backgroundColor: "rgba(45, 40, 34, 1)" }}
        >
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 text-white text-center text-lg whitespace-nowrap">
            이 리딩룸에 가입하시겠습니까?
        </div>

        <div className="absolute left-[270px] bottom-10 mt-17 flex items-center gap-5">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex w-[68px] h-[30px] px-10 py-2 rounded-lg text-[16px] justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: "rgba(122,191,201,1)" }}
          >
            {isLoading ? "가입 중..." : "가입"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex w-[68px] h-[30px] px-[18px] py-2 rounded-lg border text-[16px] justify-center text-white/50 hover:text-white"
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
