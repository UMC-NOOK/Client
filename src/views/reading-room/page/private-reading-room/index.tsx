import { useState } from 'react';
import CampFire from '../../components/private-reading-room/CampFire';
import ControlBar from '../../components/private-reading-room/control-bar/ControlBar';
import ReadingRoom from '../../components/private-reading-room/ReadingRoom';
import Subway from '../../components/private-reading-room/Subway';
import MemberPanel from '../../components/private-reading-room/panel/member/MemberPanel';
import BookPanel from '../../components/private-reading-room/panel/book/bookPanel';

const PrivateReadingRoom = () => {
  const [memberClick, setMemberClick] = useState(false);
  const [bookClick, setBookClick] = useState(false);
  return (
    <div className="max-w-[970px] h-[780px] m-auto">
      {/* <CampFire /> */}
      <ReadingRoom />
      {/* <Subway /> */}

      <div className="relative">
        {memberClick === true && (
          <div className="absolute bottom-[130px] left-[300px]">
            <MemberPanel />
          </div>
        )}
        {bookClick === true && (
          <div className="absolute bottom-[130px] left-[285px]">
            <BookPanel />
          </div>
        )}
        <ControlBar
          roll="guest"
          onMemberClick={() => setMemberClick(!memberClick)}
          onBookClick={() => setBookClick(!bookClick)}
        />
      </div>
    </div>
  );
};

export default PrivateReadingRoom;
