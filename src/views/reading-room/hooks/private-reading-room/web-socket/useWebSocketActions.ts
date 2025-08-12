// hooks/useWebSocketActions.ts
import { useCallback, MutableRefObject } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { ReceivedMessages } from '../../../types/private-reading-room/websocket/websocket';

export const useWebSocketActions = (
  roomId: string,
  userId: string,
  clientRef: MutableRefObject<Client | null>,
  isConnected: boolean,
  connectionStatus: string,
  messages: ReceivedMessages,
  setMessages: React.Dispatch<React.SetStateAction<ReceivedMessages>>,
) => {
  const enterRoom = useCallback(() => {
    if (clientRef.current && clientRef.current.connected) {
      const enterData = { roomId, userId };
      // console.log('🚪 입장 메시지 발송 시도:', enterData);

      try {
        clientRef.current.publish({
          destination: '/pub/enter',
          body: JSON.stringify(enterData),
          headers: { 'content-type': 'application/json' },
        });
        console.log('✅ 입장 메시지 발송 완료');
      } catch (error) {
        console.error('❌ 입장 메시지 발송 실패:', error);
      }
    } else {
      console.warn('⚠️ 클라이언트가 연결되지 않음 - 입장 메시지 발송 불가');
    }
  }, [roomId, userId]);

  const leaveRoom = useCallback(() => {
    if (clientRef.current && clientRef.current.connected) {
      const leaveData = { roomId, userId };
      console.log('🚪 퇴장 메시지 발송:', leaveData);

      try {
        clientRef.current.publish({
          destination: '/pub/leave',
          body: JSON.stringify(leaveData),
          headers: { 'content-type': 'application/json' },
        });
        console.log('✅ 퇴장 메시지 발송 완료');
      } catch (error) {
        console.error('❌ 퇴장 메시지 발송 실패:', error);
      }
    }
  }, [roomId, userId]);

  const selectBook = useCallback(
    (title: string) => {
      if (clientRef.current && clientRef.current.connected) {
        const bookData = { roomId, userId, title };
        // console.log('📚 책 선택 메시지 발송:', bookData);

        try {
          clientRef.current.publish({
            destination: '/pub/reading-books',
            body: JSON.stringify(bookData),
            headers: { 'content-type': 'application/json' },
          });
          console.log('✅ 책 선택 메시지 발송 완료');
        } catch (error) {
          console.error('❌ 책 선택 메시지 발송 실패:', error);
        }
      } else {
        console.warn(
          '⚠️ 클라이언트가 연결되지 않음 - 책 선택 메시지 발송 불가',
        );
      }
    },
    [roomId, userId],
  );

  const toggleBgm = useCallback(
    (bgmOn: boolean) => {
      if (clientRef.current && clientRef.current.connected) {
        const bgmData = { roomId, userId, bgmOn };
        // console.log('🎵 BGM 토글 메시지 발송:', bgmData);

        try {
          clientRef.current.publish({
            destination: '/pub/bgm-toggle',
            body: JSON.stringify(bgmData),
            headers: { 'content-type': 'application/json' },
          });
          console.log('✅ BGM 토글 메시지 발송 완료');
        } catch (error) {
          console.error('❌ BGM 토글 메시지 발송 실패:', error);
        }
      } else {
        console.warn(
          '⚠️ 클라이언트가 연결되지 않음 - BGM 토글 메시지 발송 불가',
        );
      }
    },
    [roomId, userId],
  );

  const subscribe = useCallback(
    (destination: string, callback: (message: IMessage) => void) => {
      if (clientRef.current && clientRef.current.connected) {
        console.log('📝 새 구독 추가:', destination);
        const subscription = clientRef.current.subscribe(destination, callback);
        console.log('✅ 구독 추가 완료:', destination);
        return subscription;
      } else {
        console.warn('⚠️ 클라이언트가 연결되지 않음 - 구독 불가');
      }
    },
    [],
  );

  // const clearMessages = useCallback(() => {
  //   setMessages({
  //     userEnter: [],
  //     userLeave: [],
  //     roomInfoUpdate: null,
  //     roomRemoved: false,
  //     bgmToggle: null,
  //     readingBooks: [],
  //   });
  //   console.log('🧹 메시지 상태 초기화 완료');
  // }, [setMessages]);

  const testPublish = useCallback(() => {
    if (clientRef.current && clientRef.current.connected) {
      console.log('🧪 테스트 메시지 발송...');
      try {
        clientRef.current.publish({
          destination: '/pub/enter',
          body: JSON.stringify({
            roomId,
            userId: userId + '_test',
            test: true,
          }),
          headers: { 'content-type': 'application/json' },
        });
        console.log('✅ 테스트 메시지 발송 완료');
      } catch (error) {
        console.error('❌ 테스트 메시지 발송 실패:', error);
      }
    } else {
      console.warn('⚠️ 연결되지 않음 - 테스트 메시지 발송 불가');
    }
  }, [roomId, userId]);

  const checkConnection = useCallback(() => {
    console.log('🔍 연결 상태 체크:', {
      client: !!clientRef.current,
      connected: clientRef.current?.connected,
      isConnected,
      connectionStatus,
      webSocketState: clientRef.current?.webSocket?.readyState,
      messagesCount: {
        userEnter: messages.userEnter.length,
        userLeave: messages.userLeave.length,
        readingBooks: messages.readingBooks.length,
      },
    });
  }, [isConnected, connectionStatus, messages]);

  return {
    enterRoom,
    leaveRoom,
    selectBook,
    toggleBgm,
    subscribe,
    // clearMessages,
    testPublish,
    checkConnection,
  };
};
