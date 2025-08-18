// utils/messageHandlers.ts
import { IMessage } from '@stomp/stompjs';
import { ReceivedMessages } from '../../types/private-reading-room/websocket/websocket';

export const createMessageHandlers = (
  setMessages: React.Dispatch<React.SetStateAction<ReceivedMessages>>,
) => {
  const handleRoomState = (message: IMessage) => {
    try {
      const data = JSON.parse(message.body);
      // console.log('📨 방 상태 데이터:', data);

      setMessages((prev) => ({
        ...prev,
        roomInfoUpdate: data.roomInfo || prev.roomInfoUpdate,
        bgmToggle: data.bgmState || prev.bgmToggle,
        readingBooks: data.readingBooks || prev.readingBooks,
      }));
    } catch (error) {
      // console.error('❌ 방 상태 메시지 파싱 실패:', error);
    }
  };

  const handleUserEnter = (message: IMessage) => {
    try {
      const data = JSON.parse(message.body);
      // console.log('📨 사용자 입장 데이터:', data);
      setMessages((prev) => ({
        ...prev,
        userEnter: [...prev.userEnter, { ...data, timestamp: Date.now() }],
      }));
    } catch (error) {
      // console.error('❌ 사용자 입장 메시지 파싱 실패:', error);
    }
  };

  const handleUserLeave = (message: IMessage) => {
    try {
      const data = JSON.parse(message.body);
      // console.log('📨 사용자 퇴장 데이터:', data);
      setMessages((prev) => ({
        ...prev,
        userLeave: [...prev.userLeave, { ...data, timestamp: Date.now() }],
      }));
    } catch (error) {
      // console.error('❌ 사용자 퇴장 메시지 파싱 실패:', error);
    }
  };

  const handleRoomInfoUpdate = (message: IMessage) => {
    try {
      const data = JSON.parse(message.body);
      // console.log('📨 룸 정보 업데이트 데이터:', data);
      setMessages((prev) => ({
        ...prev,
        roomInfoUpdate: { ...data, timestamp: Date.now() },
      }));
    } catch (error) {
      // console.error('❌ 룸 정보 업데이트 메시지 파싱 실패:', error);
    }
  };

  const handleRoomRemoved = (message: IMessage) => {
    try {
      const data = JSON.parse(message.body);
      // console.log('📨 룸 삭제 데이터:', data);
      setMessages((prev) => ({
        ...prev,
        roomRemoved: true,
      }));
    } catch (error) {
      // console.error('❌ 룸 삭제 메시지 파싱 실패:', error);
    }
  };

  const handleBgmToggle = (message: IMessage) => {
    try {
      const data = JSON.parse(message.body);
      // console.log('📨 BGM 토글 데이터:', data);
      setMessages((prev) => ({
        ...prev,
        bgmToggle: { ...data, timestamp: Date.now() },
      }));
    } catch (error) {
      // console.error('❌ BGM 토글 메시지 파싱 실패:', error);
    }
  };

  const handleReadingBooks = (message: IMessage) => {
    try {
      const data = JSON.parse(message.body);
      // console.log('📨 읽는 책 정보 데이터:', data);
      setMessages((prev) => ({
        ...prev,
        readingBooks: [
          ...prev.readingBooks,
          { ...data, timestamp: Date.now() },
        ],
      }));
    } catch (error) {
      // console.error('❌ 읽는 책 정보 메시지 파싱 실패:', error);
    }
  };

  const handleAllCurrentBooks = (message: IMessage) => {
    try {
      const data = JSON.parse(message.body);
      // console.log('📨 읽는 책 정보 데이터:', data);
      setMessages((prev) => ({
        ...prev,
        allCurrentBooks: [
          ...prev.allCurrentBooks,
          { ...data, timestamp: Date.now() },
        ],
      }));
    } catch (error) {
      // console.error('❌ 읽는 책 정보 메시지 파싱 실패:', error);
    }
  };

  return {
    handleUserEnter,
    handleUserLeave,
    handleRoomInfoUpdate,
    handleRoomRemoved,
    handleBgmToggle,
    handleReadingBooks,
    handleRoomState,
    handleAllCurrentBooks,
  };
};
