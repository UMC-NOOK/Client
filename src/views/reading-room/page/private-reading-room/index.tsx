import { useEffect, useState } from 'react';
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
import useWebSocket from '../../hooks/private-reading-room/web-socket/useWebSocket';

const PrivateReadingRoom = () => {
  const [memberClick, setMemberClick] = useState(false);
  const [bookClick, setBookClick] = useState(false);
  const [settingClick, setSettingClick] = useState(false);

  const roomId = '123';
  const userId = 'user456';

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

  const { client, isConnected, connectionStatus, actions } = useWebSocket({
    roomId,
    userId,
  });

  return (
    <div className="max-w-[970px] h-[780px] m-auto relative">
      <div className="absolute top-2 left-2 text-sm z-10 space-y-2">
        <div>
          <span
            className={`px-2 py-1 rounded ${isConnected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
          >
            {isConnected ? '연결됨' : '연결 중...'}
          </span>
        </div>
        <div className="text-xs bg-black bg-opacity-50 text-white p-2 rounded max-w-xs">
          {connectionStatus}
        </div>
        <div className="space-x-2">
          <button
            onClick={actions.testPublish}
            className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
          >
            테스트 메시지
          </button>
          <button
            onClick={actions.checkConnection}
            className="px-2 py-1 bg-purple-500 text-white text-xs rounded"
          >
            연결 체크
          </button>
          <button
            onClick={() => actions.toggleBgm(true)}
            className="px-2 py-1 bg-yellow-500 text-white text-xs rounded"
          >
            BGM ON 테스트
          </button>
        </div>
      </div>
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
          roll="host"
          onMemberClick={() => setMemberClick(!memberClick)}
          onBookClick={() => setBookClick(!bookClick)}
          onSettingClick={() => setSettingClick(!settingClick)}
          onBgmToggle={actions.toggleBgm} // BGM 토글 함수 전달
        />
      </div>
    </div>
  );
};

export default PrivateReadingRoom;
