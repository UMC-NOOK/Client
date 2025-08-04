import React from 'react';
import union from '../../../../../assets/readingRoom/controll-icon/smallUnion.svg';
import editBtn from '../../../../../assets/readingRoom/small-control-icon/edit.svg';
import deleteBtn from '../../../../../assets/readingRoom/small-control-icon/delete.svg';
import AsoundBtn from '../../../../../assets/readingRoom/small-control-icon/Asound.svg';
import AsoundOffBtn from '../../../../../assets/readingRoom/small-control-icon/AsoundOff.svg';
import useSoundStore from '../../../../../store/private-reading-room/useSoundStore';

interface SmallControlBarProps {
  onEdit?: () => void;
  onSound: () => void;
  onDelete: () => void;
}

function SmallControlBar({ onEdit, onSound, onDelete }: SmallControlBarProps) {
  const SoundState = useSoundStore((state) => state.Sound);
  return (
    <div className="relative">
      <img src={union} alt="" className="object-contain relative" />
      <div className="absolute inset-0 w-full h-[75%] backdrop-blur-xl rounded-[12px]" />
      <div className="flex bottom-10 top-0 right-0 left-0 justify-center items-center gap-5 absolute">
        <img
          src={editBtn}
          alt="수정버튼"
          className="object-contain cursor-pointer"
          onClick={onEdit}
        />
        {SoundState ? (
          <img
            src={AsoundBtn}
            alt="소리설정"
            className="object-contain cursor-pointer"
            onClick={onSound}
          />
        ) : (
          <img
            src={AsoundOffBtn}
            alt="소리설정"
            className="object-contain cursor-pointer"
            onClick={onSound}
          />
        )}

        <img
          src={deleteBtn}
          alt="삭제버튼"
          className="object-contain cursor-pointer"
          onClick={onDelete}
        />
      </div>
    </div>
  );
}

export default SmallControlBar;
