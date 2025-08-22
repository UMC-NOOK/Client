// src/components/MobileModal.tsx

import forPCBtn from '../../../assets/auth/plzPC.svg';

// ✨ 모달을 닫는 함수를 props로 받도록 수정
interface MobileModalProps {
  onClose: () => void;
}

const MobileModal = ({ onClose }: MobileModalProps) => {
  return (
    // 1. 전체 화면을 덮는 반투명 배경 (모달 오버레이)
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="relative">
        <img src={forPCBtn} className="object-contain" alt="PC 환경 권장" />
        <button
          onClick={onClose}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[65px] h-[29px] mb-[20px] bg-[rgba(66,60,53,1)] rounded-md text-sm text-nook-100 font-medium"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default MobileModal;
