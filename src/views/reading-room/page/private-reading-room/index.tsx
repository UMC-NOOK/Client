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
import { useNavigate, useParams } from 'react-router-dom';
import useAudio from '../../hooks/private-reading-room/audio/useAudio';
import audio1 from '/audio/readingroom_campfire.mp3';
import audio2 from '/audio/readingroom_library.mp3';
import audio3 from '/audio/readingroom_subway.mp3';
import usePatchRoomInfo from '../../hooks/private-reading-room/useMutation/usePatchRoomInfo';
import useDeleteRoom from '../../hooks/private-reading-room/useMutation/useDeleteRoom';
import useExitRoom from '../../hooks/private-reading-room/useMutation/useExitRoom';
import useGetMyRole from '../../hooks/private-reading-room/useQuery/useGetMyRole';

type ThemeName = 'CAMPFIRE' | 'READINGROOM' | 'SUBWAY';

const PrivateReadingRoom = () => {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState<
    'member' | 'book' | 'setting' | null
  >(null);

  const { roomId, userId } = useParams();
  const finalRoomId = roomId || '12';
  const finalUserId = userId || '12';

  const audioRef = useRef<HTMLAudioElement>(null);

  const [music, setMusic] = useState<boolean>(true);
  const [currentTheme, setCurrentTheme] = useState('');

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

  const {
    isEntSoundEnabled,
    isSoundEnabled,
    setEntSound,
    setSound,
    toggleSound,
    toggleEntSound,
    onSound,
    offSound,
    onEntSound,
    offEntSound,
  } = useSoundStore(
    useShallow((state) => ({
      isSoundEnabled: state.isSoundEnabled,
      isEntSoundEnabled: state.isEntSoundEnabled,
      setEntSound: state.setEntSound,
      setSound: state.setSound,
      toggleSound: state.toggleSound,
      toggleEntSound: state.toggleEntSound,
      onSound: state.onSound,
      offSound: state.offSound,
      onEntSound: state.onEntSound,
      offEntSound: state.offEntSound,
    })),
  );

  const { data, isLoading, isError, error, isSuccess, refetch } = useGetTheme({
    roomId: Number(roomId),
  });
  // setCurrentTheme(data?.themeName);
  useEffect(() => {
    setCurrentTheme(data?.themeName);
  }, [data]);

  const { data: myRoleData } = useGetMyRole({
    roomId: Number(roomId),
  });

  const audioMap: Record<ThemeName, string> = useMemo(
    () => ({
      CAMPFIRE: audio1,
      READINGROOM: audio2,
      SUBWAY: audio3,
    }),
    [],
  );

  // 현재 테마에 맞는 오디오 소스
  const currentAudioSrc = useMemo(() => {
    const themeName = currentTheme as ThemeName | undefined;

    if (themeName && themeName in audioMap) {
      return audioMap[themeName];
    }
    return audioMap['READINGROOM']; // 기본값
  }, [data?.themeName, audioMap, currentTheme]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && currentAudioSrc) {
      const wasPlaying = !audioElement.paused;

      audioElement.src = currentAudioSrc;
      audioElement.load();

      if (wasPlaying) {
        audioElement.play().catch((error) => {
          console.error('Audio play failed:', error);
        });
      }
    }
  }, [currentAudioSrc, currentTheme]);

  const handleBgm = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (audioElement.paused) {
        audioElement.play().catch((error) => {
          console.error('Audio play failed:', error);
        });
      } else {
        audioElement.pause();
      }
    }
  };

  const handlePanelToggle = (panelType: 'member' | 'book' | 'setting') => {
    setActivePanel(activePanel === panelType ? null : panelType);
  };

  const deleteRoomMutation = useDeleteRoom({
    onSuccess: () => {
      navigate('/reading-rooms');
    },
    onError: (error) => {},
  });
  const handleDelete = (roomId: number) => {
    deleteRoomMutation.mutate({ roomId });
  };

  const exitRoomMutation = useExitRoom({
    onSuccess: () => {
      navigate('/reading-rooms');
    },
    onError: (error) => {},
  });
  const handleExit = (roomId: number) => {
    exitRoomMutation.mutate({ roomId });
  };

  // console.log('asdfadf', data);

  // console.log('배경', data?.bgmUrl);

  const { messages, isConnected, actions } = useWebSocket({
    roomId: finalRoomId,
    userId: finalUserId,
  });

  const handleBgmToggle = () => {
    const newEntSoundState = !isEntSoundEnabled;
    setEntSound(newEntSoundState);
    actions.toggleBgm(newEntSoundState);

    if (!newEntSoundState) {
      setSound(false);
    }
  };

  const handlePersonalBgmToggle = (bgmOn: boolean) => {
    if (isEntSoundEnabled && bgmOn) {
      handleBgm(); // 오디오 재생
    } else {
      const audioElement = audioRef.current;
      if (audioElement && !audioElement.paused) {
        audioElement.pause(); // 오디오 정지
      }
    }
  };

  // console.log('전체메세지', messages);

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
      const latestBooksData =
        messages.allCurrentBooks[messages.allCurrentBooks.length - 1];
      setCurrentReadingBooks(latestBooksData.books || latestBooksData);
      // console.log('최신 책 정보 동기화:', latestBooksData);
    }
  }, [messages.allCurrentBooks, setCurrentReadingBooks]);

  useEffect(() => {
    // 기존 readingBooks 처리 로직
    if (messages.readingBooks) {
      setCurrentReadingBooks(messages.readingBooks);
      // console.log('실시간 책조회', messages.readingBooks);
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
        // console.log('사용자 목록 업데이트:', latestUsers);
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

  const patchRoomInfo = usePatchRoomInfo();

  const handleUpdateRoom = (data: any) => {
    patchRoomInfo.mutate({
      roomId: data?.roomId,
      themeName: convertThemeName(data?.theme),
      hashtags: data?.tags,
      requestBody: {
        name: data?.name,
        description: data?.description,
      },
    });
  };

  const convertThemeName = (theme: string) => {
    switch (theme) {
      case 'Campfire':
        return 'CAMPFIRE';
      case 'Subway':
        return 'SUBWAY';
      case 'ReadingRoom':
      default:
        return 'LIBRARY';
    }
  };

  // 룸 정보 업데이트 감지
  useEffect(() => {
    if (messages.roomInfoUpdate) {
      setCurrentTheme(messages?.roomInfoUpdate.themeName);
    } else if (data?.themeName) {
      setCurrentTheme(data?.themeName);
    }
  }, [messages.roomInfoUpdate, data?.themeName]);

  // BGM 토글 감지
  useEffect(() => {
    if (messages.bgmToggle) {
      const bgmState = messages.bgmToggle.bgmOn;
      setEntSound(bgmState);

      // 전체 소리 상태에 따른 오디오 처리
      if (bgmState && isSoundEnabled) {
        handleBgm(); // 재생
      } else {
        const audioElement = audioRef.current;
        if (audioElement && !audioElement.paused) {
          audioElement.pause(); // 정지
        }
      }
    }
  }, [messages.bgmToggle, isSoundEnabled]);

  const themeComponent = useMemo(() => {
    if (!currentTheme) return <NotFoundPage />;

    switch (currentTheme) {
      case 'CAMPFIRE':
        return <CampFire currentUsers={currentUsers} />;
      case 'SUBWAY':
        return <Subway currentUsers={currentUsers} />;
      case 'READINGROOM':
      default:
        return <ReadingRoom currentUsers={currentUsers} />;
    }
  }, [currentTheme, currentUsers]);

  return (
    <div className="max-w-[970px] h-[780px] m-auto relative">
      {themeComponent}

      {/* <SpeechBubble /> */}

      <audio
        ref={audioRef}
        src={currentAudioSrc}
        loop
        preload="auto"
        style={{ display: 'none' }}
      />

      {isExitModalOpen && (
        <DeleteBtn
          usage="exit"
          onDelete={() => handleExit(Number(finalRoomId))}
          closeModal={toggleExitModal}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteBtn
          usage="delete"
          onDelete={() => handleDelete(Number(finalRoomId))}
          closeModal={toggleDeleteModal}
        />
      )}

      <div className="relative">
        {activePanel === 'member' && (
          <div className="absolute bottom-[130px] left-[300px]">
            <MemberPanel roomId={Number(finalRoomId)} />
          </div>
        )}
        {activePanel === 'book' && (
          <div className="absolute bottom-[130px] left-[285px]">
            <BookPanel onChoose={actions.selectBook} />
          </div>
        )}
        {activePanel === 'setting' && (
          <div className="absolute bottom-[130px] left-[475px]">
            <SmallControlBar
              onDelete={toggleDeleteModal}
              onEdit={openEditModal}
              onSound={handleBgmToggle}
            />
          </div>
        )}
        {isEditModalOpen && (
          <Modal onClose={closeEditModal}>
            <CreateReadingRoom
              usage="edit"
              onCloseModal={closeEditModal}
              onEdit={(data) => {
                console.log('변경된 룸 정보', data);
                handleUpdateRoom(data);
              }}
              room={{
                roomId: Number(finalRoomId),
                name: '',
                description: '',
                theme: 'Subway',
                tags: [],
              }}
            />
          </Modal>
        )}
        <ControlBar
          roll={myRoleData === 'HOST' ? 'host' : 'guest'}
          // roll={'host'}
          onMemberClick={() => handlePanelToggle('member')}
          onBookClick={() => handlePanelToggle('book')}
          onSettingClick={() => handlePanelToggle('setting')}
          onBgmToggle={handleBgm} // BGM 토글 함수 전달
          onLeave={actions.leaveRoom}
        />
      </div>
    </div>
  );
};

export default PrivateReadingRoom;
