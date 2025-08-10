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
    const relativeX = clientX - rect.left;
    const stepWidth = rect.width / (options.length - 1);
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

          <div
            ref={sliderRef}
            className="relative mt-[16px] w-[323px] h-[20px] touch-none"
            onClick={handleSliderClick}
            onMouseDown={handleDrag}
            onTouchStart={handleDrag}
          >
            <div className="absolute top-[10px] left-0 w-full h-[1px] bg-white" />
            <div className="absolute top-[6px] left-0 w-full flex justify-between">
              {options.map((_, idx) => (
                <div key={idx} className="w-[1px] h-[10px] bg-white" />
              ))}
            </div>
            <div
              className="absolute top-[1px] w-[18px] h-[18px] rounded-full bg-white cursor-pointer"
              style={{
                left: `calc(${(options.indexOf(selected) / (options.length - 1)) * 100}% - 9px)`,
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
