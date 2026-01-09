import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  onClose: () => void;
  onGoToLibrary?: () => void; // 있어도 되지만 호출 안 함(충돌 방지)
}

export default function BookAlreadyAddedModal({
  onClose,
}: SearchModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleGoLibrary = () => {
    // 부모 스텁 호출로 터지는 걸 원천 차단: 그냥 닫고 이동
    onClose();
    navigate('/library');
  };

  const modalContent = (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-[449px] h-[172px] rounded-[12px] bg-[#2D2822] flex flex-col items-center justify-center gap-[24px] px-[24px]">
        <p className="text-white text-center font-pretendard text-[18px] font-normal leading-[22px]">
          이미 등록한 책입니다.
        </p>
        <div className="flex gap-[12px]">
          <button onClick={handleGoLibrary} className="inline-flex px-[20px] py-[4px] justify-center items-center gap-[10px] rounded-[4px] bg-[#7ABFC9]">
            <span className="text-[#1F1C19] text-center font-pretendard text-[16px] font-semibold leading-[22px]">
              서재로 이동
            </span>
          </button>
          <button onClick={onClose} className="inline-flex px-[20px] py-[4px] justify-center items-center gap-[10px] rounded-[4px] border border-[rgba(255,255,255,0.5)]">
            <span className="text-[rgba(255,255,255,0.5)] text-center font-pretendard text-[16px] font-semibold leading-[22px]">
              취소
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
