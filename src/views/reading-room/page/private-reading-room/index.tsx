import { useState } from 'react';
import CampFire from '../../components/private-reading-room/CampFire';
import ControlBar from '../../components/private-reading-room/control-bar/ControlBar';
import ReadingRoom from '../../components/private-reading-room/ReadingRoom';
import Subway from '../../components/private-reading-room/Subway';
import MemberPanel from '../../components/private-reading-room/panel/member/MemberPanel';
import BookPanel from '../../components/private-reading-room/panel/book/BookPanel';
import useModalStore from '../../../../store/private-reading-room/useModalStore';
import DeleteBtn from '../../../../components/delete-modal/reading-room/DeleteModal';
import SmallControlBar from '../../components/private-reading-room/control-bar/SmallControlBar';
import useSoundStore from '../../../../store/private-reading-room/useSoundStore';

const PrivateReadingRoom = () => {
  const [memberClick, setMemberClick] = useState(false);
  const [bookClick, setBookClick] = useState(false);
  const [settingClick, setSettingClick] = useState(false);

  const isExitModalOpen = useModalStore((state) => state.isExitModalOpen);
  const toggleExitModal = useModalStore((state) => state.toggleExitModal);
  const isDeleteModalOpen = useModalStore((state) => state.isDeleteModalOpen);
  const toggleDeleteModal = useModalStore((state) => state.toggleDeleteModal);

  const toggleSound = useSoundStore((state) => state.toggleSound);

  const handleDelete = () => {
    console.log('삭제로직');
  };

  return (
    <div className="max-w-[970px] h-[780px] m-auto relative">
      <CampFire />
      {/* <ReadingRoom />
      <Subway /> */}

      {isExitModalOpen && (
        <DeleteBtn
          usage="exit"
          onDelete={handleDelete}
          closeModal={toggleExitModal}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteBtn
          usage="delete"
          onDelete={handleDelete}
          closeModal={toggleDeleteModal}
        />
      )}

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
        {settingClick === true && (
          <div className="absolute bottom-[130px] left-[394px]">
            <SmallControlBar
              onDelete={toggleDeleteModal}
              // onEdit={}
              onSound={toggleSound}
            />
          </div>
        )}
        <ControlBar
          roll="guest"
          onMemberClick={() => setMemberClick(!memberClick)}
          onBookClick={() => setBookClick(!bookClick)}
          onSettingClick={() => setSettingClick(!settingClick)}
        />
      </div>
    </div>
  );
};

export default PrivateReadingRoom;
