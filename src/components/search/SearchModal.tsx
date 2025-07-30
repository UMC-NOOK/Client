import React from 'react';

interface SearchModalProps {
  onClose: () => void;
  onGoToLibrary: () => void;
}

export default function BookAlreadyAddedModal({
  onClose,
  onGoToLibrary,
}: SearchModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="w-[449px] h-[172px] rounded-[12px] bg-[#2D2822] flex flex-col items-center justify-center gap-[24px] px-[24px]">
        {/* 모달 메세지 */}
        <p className="text-white text-center font-pretendard text-[18px] font-normal leading-[22px]">
          이미 등록한 책입니다.
        </p>

        {/* 실행 버튼 */}
        <div className="flex gap-[12px]">
          {/* 서재로 이동 버튼 */}
          <button
            onClick={onGoToLibrary}
            className="inline-flex px-[20px] py-[4px] justify-center items-center gap-[10px] rounded-[4px] bg-[#7ABFC9]"
          >
            <span className="text-[#1F1C19] text-center font-pretendard text-[16px] font-semibold leading-[22px]">
              서재로 이동
            </span>
          </button>

          {/*  취소 버튼 */}
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
}
