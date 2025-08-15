import { useState } from 'react';
import memberBtn from '../../../../../assets/readingRoom/controll-icon/member.svg';
import moreBtn from '../../../../../assets/readingRoom/controll-icon/more.svg';
import offMusicBtn from '../../../../../assets/readingRoom/controll-icon/music.svg';
import readBtn from '../../../../../assets/readingRoom/controll-icon/read.svg';
import deleteBtn from '../../../../../assets/readingRoom/controll-icon/delete.svg';
import onMusicBtn from '../../../../../assets/readingRoom/controll-icon/onMusic.svg';
import exitBtn from '../../../../../assets/readingRoom/controll-icon/exitBtn.svg';
import memberUnion from '../../../../../assets/readingRoom/controll-icon/memberUnion.svg';
import useModalStore from '../../../../../store/private-reading-room/useModalStore';
import { useNavigate } from 'react-router-dom';
import useSoundStore from '../../../../../store/private-reading-room/useSoundStore';
import { useShallow } from 'zustand/react/shallow';

interface ControlBarProps {
  roll: 'host' | 'guest';
  onMemberClick: () => void;
  onBookClick: () => void;
  onSettingClick: () => void;
  onBgmToggle: (bgmOn: boolean) => void;
  onLeave: () => void;
}

function ControlBar({
  roll,
  onMemberClick,
  onBookClick,
  onSettingClick,
  onBgmToggle,
  onLeave,
}: ControlBarProps) {
  const [music, setMusic] = useState<boolean>(true);
  const { isSoundEnabled, setSound } = useSoundStore(
    useShallow((state) => ({
      isSoundEnabled: state.isSoundEnabled,
      setSound: state.setSound,
    })),
  );
  const toggleExitModal = useModalStore((state) => state.toggleExitModal);
  const toggleDeleteModal = useModalStore((state) => state.toggleDeleteModal);
  const navigate = useNavigate();

  const handleMusicToggle = () => {
    const newMusicState = !isSoundEnabled; // 상태 반전
    setSound(newMusicState);
    onBgmToggle(newMusicState);
  };

  console.log(isSoundEnabled);

  const handleLeave = () => {
    onLeave();
    navigate('/reading-room');
  };

  return (
    <div className="w-[288px] h-[60px] bg-[rgba(43,34,23,0.8)] gap-5 rounded-[12px] flex justify-center backdrop-blur-xl items-center absolute bottom-30 left-1/2 -translate-x-1/2">
      {/* 소리 */}
      {isSoundEnabled === true ? (
        <img
          src={offMusicBtn}
          alt="소리끔"
          className="w-22 h-22 rounded-[8px] object-contain cursor-pointer"
          onClick={handleMusicToggle}
        />
      ) : (
        <img
          src={onMusicBtn}
          alt="소리켬"
          className="w-22 h-22 rounded-[8px] object-contain cursor-pointer"
          onClick={handleMusicToggle}
        />
      )}

      {/* 맴버조회 */}
      <img
        src={memberBtn}
        alt="맴버목록조회"
        className="w-22 h-22 rounded-[8px] object-contain cursor-pointer"
        onClick={onMemberClick}
      />

      {/* 읽는책 조회 */}
      <img
        src={readBtn}
        alt="책조회"
        className="w-22 h-22 rounded-[8px] object-contain cursor-pointer"
        onClick={onBookClick}
      />

      {/* 설정 */}
      {roll === 'host' ? (
        <img
          src={moreBtn}
          alt=""
          className="w-22 h-22 rounded-[8px] object-contain cursor-pointer"
          onClick={onSettingClick}
        />
      ) : (
        <img
          src={exitBtn}
          alt=""
          className="w-22 h-22 bg-[rgba(255,207,92,0.2)] rounded-[8px] object-contain cursor-pointer"
          onClick={toggleExitModal}
        />
      )}

      {/* 탈주 */}
      <img
        src={deleteBtn}
        alt=""
        className="w-22 h-22 bg-[rgba(241,73,75,0.2)] rounded-[8px] object-contain cursor-pointer"
        onClick={handleLeave}
      />
    </div>
  );
}

export default ControlBar;
