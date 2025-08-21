// src/views/reading-room/components/reading-room/ActionButtons.tsx
import React from 'react';
import { useReadingRoomActions } from '../../contexts/ReadingRoomActionsContext';

type ButtonType = 'create' | 'edit';

interface ActionButtonsProps {
  usage: ButtonType;
  disabled?: boolean;
}

const ActionButtons = ({ usage, disabled = false }: ActionButtonsProps) => {
  const { create, edit, cancel } = useReadingRoomActions();

  if (usage === 'create') {
    return (
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => !disabled && create()}
          disabled={disabled}                        
          className="flex justify-center items-center w-81 h-20 rounded-lg border mt-[150px]"
          style={{
            backgroundColor: disabled ? 'transparent' : 'rgba(122,191,201,1)',
            borderColor: disabled ? 'rgba(66, 60, 53,1)' : 'transparent',
            color: disabled ? 'rgba(66,60,53,1)' : 'black',
          }}
        >
          <div
            className="flex justify-center items-center rounded-full border mr-5 p-1"
            style={{ borderColor: 'rgba(43, 34, 23, 1)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 8" fill="none">
              <path
                d="M4.44488 0.185547V4.00083M4.44488 7.8161V4.00083M4.44488 4.00083H0.722656M4.44488 4.00083H8.1671"
                stroke="#2B2217"
                strokeWidth="0.372222"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="text-sm">리딩룸 생성하기</div>
        </button>
      </div>
    );
  }

  if (usage === 'edit') {
    return (
      <div className="flex flex-row justify-end gap-3 mt-[100px]">
        <button
          type="button"
          onClick={edit}
          className="flex items-center w-46 h-16 bg-[rgba(122,191,201,1)] text-sm font-semibold px-10 py-4 rounded-lg"
          style={{ color: 'rgba(43, 34, 23, 1)' }}
        >
          정보 수정
        </button>
        <button
          type="button"
          onClick={cancel}
          className="flex justify-center items-center w-32 h-16 border text-sm font-semibold px-8 py-4 rounded-lg"
          style={{
            borderColor: 'rgba(255,255,255,0.5)',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          취소
        </button>
      </div>
    );
  }

  return null;
};

export default ActionButtons;
