import { useState } from 'react';
import memberBtn from '../../../../../assets/readingRoom/controll-icon/member.svg';
import moreBtn from '../../../../../assets/readingRoom/controll-icon/more.svg';
import offMusicBtn from '../../../../../assets/readingRoom/controll-icon/music.svg';
import readBtn from '../../../../../assets/readingRoom/controll-icon/read.svg';
import deleteBtn from '../../../../../assets/readingRoom/controll-icon/delete.svg';
import onMusicBtn from '../../../../../assets/readingRoom/controll-icon/onMusic.svg';
import exitBtn from '../../../../../assets/readingRoom/controll-icon/exitBtn.svg';
import memberUnion from '../../../../../assets/readingRoom/controll-icon/memberUnion.svg';

interface ControlBarProps {
  roll: 'host' | 'guest';
  onMemberClick: () => void;
  onBookClick: () => void;
}

function ControlBar({ roll, onMemberClick, onBookClick }: ControlBarProps) {
  const [music, setMusic] = useState<boolean>(false);

  return (
    <div className="w-[288px] h-[60px] bg-[rgba(43,34,23,0.8)] gap-5 rounded-[12px] flex justify-center items-center absolute bottom-30 left-1/2 -translate-x-1/2">
      {/* 소리 */}
      {music === true ? (
        <img
          src={onMusicBtn}
          alt="소리켬"
          className="w-22 h-22 rounded-[8px] object-contain cursor-pointer"
          onClick={() => setMusic((prev) => !prev)}
        />
      ) : (
        <img
          src={offMusicBtn}
          alt="소리끔"
          className="w-22 h-22 rounded-[8px] object-contain cursor-pointer"
          onClick={() => setMusic((prev) => !prev)}
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
        />
      ) : (
        <img
          src={exitBtn}
          alt=""
          className="w-22 h-22 bg-[rgba(255,207,92,0.2)] rounded-[8px] object-contain cursor-pointer"
        />
      )}

      {/* 탈주 */}
      <img
        src={deleteBtn}
        alt=""
        className="w-22 h-22 bg-[rgba(241,73,75,0.2)] rounded-[8px] object-contain cursor-pointer"
      />
    </div>
  );
}

export default ControlBar;
