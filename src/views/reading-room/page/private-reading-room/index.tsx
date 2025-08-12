import { useEffect, useMemo, useRef, useState } from 'react';
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
import useGetBookList from '../../hooks/private-reading-room/useQuery/useGetBookList';
import useGetTheme from '../../hooks/private-reading-room/useQuery/useGetTheme';
import NotFoundPage from '../../../404';
import useCurrentBookStore from '../../../../store/private-reading-room/useCurrentBookStore';
import { useParams } from 'react-router-dom';
import useAudio from '../../hooks/private-reading-room/audio/useAudio';

const PrivateReadingRoom = () => {
  const [activePanel, setActivePanel] = useState<
    'member' | 'book' | 'setting' | null
  >(null);

  const { roomId, userId } = useParams();
  const finalRoomId = roomId || '12';
  const finalUserId = userId || '12';

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

  const handlePanelToggle = (panelType: 'member' | 'book' | 'setting') => {
    setActivePanel(activePanel === panelType ? null : panelType);
  };

  const toggleSound = useSoundStore((state) => state.toggleSound);

  const handleDelete = () => {
    console.log('삭제로직');
  };

  const { data, isLoading, isError, error, isSuccess, refetch } = useGetTheme({
    roomId: Number(roomId),
  });

  const { play, pause, togglePlay, isPlaying } = useAudio(data?.bgmUrl || '', {
    volume: 0.9,
    loop: true,
  });

  const isSoundEnabled = useSoundStore((state) => state.isSoundEnabled);

  useEffect(() => {
    if (isSoundEnabled && data?.bgmUrl) {
      play();
    } else {
      pause();
    }
  }, [isSoundEnabled, data?.bgmUrl, play, pause]);

  console.log('배경', data?.bgmUrl);

  const { messages, isConnected, actions } = useWebSocket({
    roomId: finalRoomId,
    userId: finalUserId,
  });

  const handleBgmToggle = () => {
    toggleSound(); // 로컬 사운드 상태 토글
    actions.toggleBgm; // WebSocket으로 다른 사용자들에게 전달
  };

  console.log('전체메세지', messages);

  // 입장 정보 업데이트 감지
  const [currentUsers, setCurrentUsers] = useState(null);

  // useEffect(() => {
  //   if (messages.userEnter.length > 0) {
  //     const latestEnter =
  //       messages.userEnter[messages.userEnter.length - 1].currentUsers;
  //     setCurrentUsers(latestEnter);
  //     console.log('새 사용자가 입장했습니다:', latestEnter);
  //   }
  // }, [messages.userEnter]);

  // console.log('오나나', currentUsers);

  const setCurrentReadingBooks = useCurrentBookStore((state) => state.setBooks);

  useEffect(() => {
    if (messages.allCurrentBooks && messages.allCurrentBooks.length > 0) {
      // 배열의 마지막 요소(최신 데이터)를 가져옴
      const latestBooksData =
        messages.allCurrentBooks[messages.allCurrentBooks.length - 1];
      setCurrentReadingBooks(latestBooksData.books || latestBooksData);
      console.log('최신 책 정보 동기화:', latestBooksData);
    }
  }, [messages.allCurrentBooks, setCurrentReadingBooks]);

  useEffect(() => {
    // 기존 readingBooks 처리 로직
    if (messages.readingBooks) {
      setCurrentReadingBooks(messages.readingBooks);
      console.log('실시간 책조회', messages.readingBooks);
    }
  }, [messages.readingBooks, setCurrentReadingBooks]);

  useEffect(() => {
    // 사용자 입장/퇴장 시 전체 상태 동기화
    const updateRoomState = () => {
      let latestUsers = null;
      let shouldUpdateBooks = false;

      // 사용자 목록 업데이트
      if (messages.userEnter && messages.userEnter.length > 0) {
        latestUsers =
          messages.userEnter[messages.userEnter.length - 1].currentUsers;
        shouldUpdateBooks = true;
      }

      if (messages.userLeave && messages.userLeave.length > 0) {
        const leaveUsers =
          messages.userLeave[messages.userLeave.length - 1].currentUsers;
        if (
          !latestUsers ||
          messages.userLeave[messages.userLeave.length - 1].timestamp >
            messages.userEnter[messages.userEnter.length - 1].timestamp
        ) {
          latestUsers = leaveUsers;
          shouldUpdateBooks = true;
        }
      }

      // 사용자 목록 업데이트
      if (
        latestUsers &&
        JSON.stringify(latestUsers) !== JSON.stringify(currentUsers)
      ) {
        setCurrentUsers(latestUsers);
        console.log('사용자 목록 업데이트:', latestUsers);
      }
    };

    updateRoomState();
  }, [
    messages.userEnter,
    messages.userLeave,
    messages.readingBooks,
    currentUsers,
    setCurrentReadingBooks,
  ]);

  // console.log('zlzllz', currentReadingBooks);

  // 룸 정보 업데이트 감지
  // useEffect(() => {
  //   if (messages.roomInfoUpdate) {
  //     console.log('룸 정보가 업데이트되었습니다:', messages.roomInfoUpdate);
  //   }
  // }, [messages.roomInfoUpdate]);

  // BGM 토글 감지
  // useEffect(() => {
  //   if (messages.bgmToggle) {
  //     console.log('BGM 상태가 변경되었습니다:', messages.bgmToggle);
  //   }
  // }, [messages.bgmToggle]);

  const themeComponent = useMemo(() => {
    if (!data?.themeName) return <NotFoundPage />;

    switch (data.themeName) {
      case 'CAMPFIRE':
        return <CampFire currentUsers={currentUsers} />;
      case 'SUBWAY':
        return <Subway currentUsers={currentUsers} />;
      case 'READINGROOM':
      default:
        return <ReadingRoom currentUsers={currentUsers} />;
    }
  }, [data?.themeName, currentUsers]);

  return (
    <div className="max-w-[970px] h-[780px] m-auto relative">
      {themeComponent}

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
        {activePanel === 'member' && (
          <div className="absolute bottom-[130px] left-[300px]">
            <MemberPanel />
          </div>
        )}
        {activePanel === 'book' && (
          <div className="absolute bottom-[130px] left-[285px]">
            <BookPanel onChoose={actions.selectBook} />
          </div>
        )}
        {activePanel === 'setting' && (
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
          onMemberClick={() => handlePanelToggle('member')}
          onBookClick={() => handlePanelToggle('book')}
          onSettingClick={() => handlePanelToggle('setting')}
          onBgmToggle={handleBgmToggle} // BGM 토글 함수 전달
          onLeave={actions.leaveRoom}
        />
      </div>
    </div>
  );
};

export default PrivateReadingRoom;
