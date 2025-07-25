import React, { useState, useRef, useEffect } from 'react';
import backIcon from '../../assets/button/home/chevron-left.png';

const ReadingGoalModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (goal: number) => void;
}) => {
  const options = [50, 100, 150, 200, 250, 300];
  const [selected, setSelected] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // 공통 로직: 마우스 or 터치 좌표로 index 계산
  const updateSelectedByPosition = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const stepWidth = rect.width / (options.length - 1);
    const index = Math.round(relativeX / stepWidth);
    const clampedIndex = Math.max(0, Math.min(options.length - 1, index));
    setSelected(options[clampedIndex]);
  };

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  // 드래그 이동
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    updateSelectedByPosition(e.clientX);
  };
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current || e.touches.length === 0) return;
    updateSelectedByPosition(e.touches[0].clientX);
  };

  // 드래그 끝
  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  // 슬라이더 바 클릭 or 터치
  const handleSliderClick = (e: React.MouseEvent | React.TouchEvent) => {
    if ('clientX' in e) {
      updateSelectedByPosition(e.clientX);
    } else if ('touches' in e && e.touches.length > 0) {
      updateSelectedByPosition(e.touches[0].clientX);
    }
  };

  // 안전 해제
  useEffect(() => {
    return () => {
      handleMouseUp();
      handleTouchEnd();
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-[380px] h-[346px] rounded-[12px] bg-[#2D2822] flex flex-col items-center relative">
        {/* 상단 */}
        <img
          src={backIcon}
          alt="back"
          className="absolute left-[24px] top-[38px] w-[20px] h-[20px] object-contain cursor-pointer"
          onClick={onClose}
        />
        <p className="mt-[38px] text-white text-[18px] font-[600] leading-[22px]">독서 목표 설정</p>

        {/* 권수 선택 */}
        <div className="mt-[66px] flex flex-col items-center">
          <div className="flex flex-row justify-between w-[323px] px-[2px]">
            {options.map((num) => (
              <p
                key={num}
                className={`text-[16px] leading-[22px] cursor-pointer ${
                  selected === num ? 'text-white font-[600]' : 'text-white/50 font-[400]'
                }`}
                onClick={() => setSelected(num)}
              >
                {num}권
              </p>
            ))}
          </div>

          {/* 슬라이더 */}
          <div
            ref={sliderRef}
            className="relative mt-[16px] w-[323px] h-[20px] touch-none"
            onClick={handleSliderClick}
            onTouchStart={handleSliderClick}
          >
            {/* 가로 선 */}
            <div className="absolute top-[10px] left-0 w-full h-[1px] bg-white" />

            {/* 눈금선 */}
            <div className="absolute top-[6px] left-0 w-full flex justify-between">
              {options.map((_, idx) => (
                <div key={idx} className="w-[1px] h-[10px] bg-white" />
              ))}
            </div>

            {/* 드래그 핸들 */}
            <div
              className="absolute top-[1px] w-[18px] h-[18px] rounded-full bg-white cursor-pointer"
              style={{
                left: `calc(${(options.indexOf(selected) / (options.length - 1)) * 100}% - 9px)`,
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            />
          </div>
        </div>

        {/* 저장 버튼 */}
        <button
          className="mt-auto mb-[24px] w-[323px] h-[40px] rounded-[4px] bg-[#423C35] text-white text-[16px] font-[600]"
          onClick={() => onSave(selected)}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default ReadingGoalModal;
