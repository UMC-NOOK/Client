import React, { useState, useRef, useEffect } from 'react';
import backIcon from '../../../assets/button/home/chevron-left.png';
import { usePatchHomeGoals } from '../hooks/useMutation/usePatchHomeGoals';

type GoalValue = 50 | 100 | 150 | 200 | 250 | 300;

const ReadingGoalModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (goal: number) => void;
}) => {
  const options: GoalValue[] = [50, 100, 150, 200, 250, 300];
  const [selected, setSelected] = useState<GoalValue>(50);
  const [isError, setIsError] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { mutate: patchGoal } = usePatchHomeGoals();
  
  const handleSave = () => {
    // API 호출 전 에러 상태 초기화
    setIsError(false);
    
    patchGoal(
      { goal: selected },
      {
        onSuccess: () => {
          onSave(selected);
        },
        onError: () => {
          setIsError(true);
        },
      },
    );
  };

  const updateSelectedByPosition = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left - 15; // 15px 여백 고려
    const sliderWidth = rect.width - 30; // 양쪽 15px 여백 제외
    const stepWidth = sliderWidth / (options.length - 1);
    const index = Math.round(relativeX / stepWidth);
    const clampedIndex = Math.max(0, Math.min(options.length - 1, index));
    setSelected(options[clampedIndex]);
  };

  const handleSliderClick = (e: React.MouseEvent | React.TouchEvent) => {
    if ('clientX' in e) {
      updateSelectedByPosition(e.clientX);
    } else if ('touches' in e && e.touches.length > 0) {
      updateSelectedByPosition(e.touches[0].clientX);
    }
  };

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const isInsideSlider = (clientX: number) => clientX >= rect.left && clientX <= rect.right;

    let clientX = 0;
    if ('clientX' in e) {
      clientX = e.clientX;
    } else if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    }

    if (isInsideSlider(clientX)) {
      updateSelectedByPosition(clientX);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-[380px] h-[346px] rounded-[12px] bg-[#2D2822] flex flex-col items-center relative">
        <img
          src={backIcon}
          alt="back"
          className="absolute left-[24px] top-[38px] w-[20px] h-[20px] object-contain cursor-pointer"
          onClick={onClose}
        />
        <p className="mt-[38px] text-white text-[18px] font-[600] leading-[22px]">독서 목표 설정</p>

        <div className="mt-[79px] flex flex-col items-center">
          {/* 텍스트들을 절대 위치로 배치하여 세로선과 정확히 일치시킴 */}
          <div className="relative w-[323px] h-[22px]">
            {options.map((num, idx) => (
              <p
                key={num}
                className={`absolute text-[16px] leading-[22px] cursor-pointer transform -translate-x-1/2 whitespace-nowrap ${
                  selected === num ? 'text-white font-[600]' : 'text-white/50 font-[400]'
                }`}
                style={{
                  left: `${15 + (idx / (options.length - 1)) * (323 - 30)}px`,
                }}
                onClick={() => setSelected(num)}
              >
                {num}권
              </p>
            ))}
          </div>

          <div
            ref={sliderRef}
            className="relative mt-[17px] w-[323px] h-[20px] touch-none"
            onClick={handleSliderClick}
            onMouseDown={handleDrag}
            onTouchStart={handleDrag}
          >
            {/* 가로선 */}
            <div className="absolute top-[10px] left-0 right-0 h-[1px] bg-white/50" />
            
            {/* 세로선들 */}
            <div className="absolute top-[2px] left-[15px] right-[15px] h-[18px]">
              {options.map((_, idx) => (
                <div 
                  key={idx} 
                  className="absolute w-[1px] h-[18px] bg-white/50"
                  style={{
                    left: `${(idx / (options.length - 1)) * 100}%`,
                  }}
                />
              ))}
            </div>
            
            {/* 슬라이더 동그라미 - 세로선과 정확히 일치하도록 조정 */}
            <div
              className="absolute top-[6px] w-[8px] h-[8px] rounded-full bg-white cursor-pointer transform -translate-x-1/2"
              style={{
                left: `${15 + (options.indexOf(selected) / (options.length - 1)) * (323 - 30)}px`,
              }}
              onDragStart={(e) => e.preventDefault()}
              onMouseDown={handleDrag}
              onTouchStart={handleDrag}
            />
          </div>
        </div>
        
        {isError && (
          <p className="mt-4 text-red-500 text-sm">목표 설정에 실패했습니다. 다시 시도해 주세요.</p>
        )}

        <button
          className="mt-auto mb-[24px] w-[323px] h-[40px] rounded-[4px] bg-[#423C35] text-white text-[16px] font-[600]"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default ReadingGoalModal;