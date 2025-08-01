import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface SearchModalProps {
  onClose: () => void;
  onGoToLibrary: () => void;
}

export default function BookAlreadyAddedModal({
  onClose,
  onGoToLibrary,
}: SearchModalProps) {
  // body scroll lock (선택)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* 백드롭 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* 모달 박스 */}
      <div className="relative w-[449px] h-[172px] rounded-[12px] bg-[#2D2822] flex flex-col items-center justify-center gap-[24px] px-[24px]">
        <p className="text-white text-center font-pretendard text-[18px] font-normal leading-[22px]">
          이미 등록한 책입니다.
        </p>

        <div className="flex gap-[12px]">
          <button
            onClick={onGoToLibrary}
            className="inline-flex px-[20px] py-[4px] justify-center items-center gap-[10px] rounded-[4px] bg-[#7ABFC9]"
          >
            <span className="text-[#1F1C19] text-center font-pretendard text-[16px] font-semibold leading-[22px]">
              서재로 이동
            </span>
          </button>

          <button
            onClick={onClose}
            className="inline-flex px-[20px] py-[4px] justify-center items-center gap-[10px] rounded-[4px] border border-[rgba(255,255,255,0.5)]"
          >
            <span className="text-[rgba(255,255,255,0.5)] text-center font-pretendard text-[16px] font-semibold leading-[22px]">
              취소
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  // portal로 body 바로 아래에 렌더링 (stacking context 문제 회피)
  return createPortal(modalContent, document.body);
}
