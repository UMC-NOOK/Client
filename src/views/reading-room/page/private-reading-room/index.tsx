import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
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
import SpeechBubble from '../../components/private-reading-room/speech-bubble/SpeechBubble';
import CreateReadingRoom from '../../components/views/CreateReadingRoom';
import Modal from '../../components/private-reading-room/common/ModifyModal';

const PrivateReadingRoom = () => {
  const [memberClick, setMemberClick] = useState(false);
  const [bookClick, setBookClick] = useState(false);
  const [settingClick, setSettingClick] = useState(false);

  const {
    isExitModalOpen,
    toggleExitModal,
    isDeleteModalOpen,
    toggleDeleteModal,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
  } = useModalStore(
    useShallow((state) => ({
      isExitModalOpen: state.isExitModalOpen,
      toggleExitModal: state.toggleExitModal,
      isDeleteModalOpen: state.isDeleteModalOpen,
      toggleDeleteModal: state.toggleDeleteModal,
      isEditModalOpen: state.isEditModalOpen,
      openEditModal: state.openEditModal,
      closeEditModal: state.closeEditModal,
    })),
  );

  const toggleSound = useSoundStore((state) => state.toggleSound);

  const handleDelete = () => {
    console.log('삭제로직');
  };

  return (
    <div className="max-w-[970px] h-[780px] m-auto relative">
      {/* <CampFire /> */}
      <ReadingRoom />
      {/* <Subway /> */}

      {/* <SpeechBubble /> */}

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
              onEdit={openEditModal}
              onSound={toggleSound}
            />
          </div>
        )}
        {isEditModalOpen && (
          <Modal onClose={closeEditModal}>
            <CreateReadingRoom usage="edit" onCloseModal={closeEditModal} />
          </Modal>
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
