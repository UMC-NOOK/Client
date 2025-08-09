import { useEffect, useState, useCallback, useRef } from 'react';
import { Client, IMessage } from '@stomp/stompjs';

interface UseWebSocketProps {
  roomId: string;
  userId: string;
  bookId?: string;
  bgmOn?: string;
}

interface WebSocketActions {
  enterRoom: () => void;
  leaveRoom: () => void;
  selectBook: (bookId: string) => void;
  toggleBgm: (bgmOn: boolean) => void;
  subscribe: (
    destination: string,
    callback: (message: IMessage) => void,
  ) => void;
  // 테스트용 함수들 추가
  testPublish: () => void;
  checkConnection: () => void;
}

const useWebSocket = ({ roomId, userId }: UseWebSocketProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] =
    useState<string>('초기화 중...');
  const clientRef = useRef<Client | null>(null);

  // 웹소켓 연결
  useEffect(() => {
    console.log('🚀 WebSocket 연결 시도 시작', { roomId, userId });
    setConnectionStatus('토큰 확인 중...');

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('❌ 인증 토큰이 없습니다. 웹소켓 연결을 할 수 없습니다.');
      setConnectionStatus('토큰 없음');
      return;
    }

    console.log('✅ 토큰 확인됨:', accessToken.substring(0, 20) + '...');
    setConnectionStatus('WebSocket 생성 중...');

    const stompClient = new Client({
      webSocketFactory: () => {
        const baseUrl =
          import.meta.env.VITE_API_BASE_URL?.replace(/^https?:\/\//, '') ||
          'localhost:8080';
        const protocol = import.meta.env.VITE_API_BASE_URL?.startsWith('https')
          ? 'wss'
          : 'ws';
        const socketUrl = `${protocol}://${baseUrl}ws?access_token=${accessToken}`;

        console.log('🌐 WebSocket URL:', socketUrl);
        setConnectionStatus(`연결 시도: ${socketUrl}`);
        return new WebSocket(socketUrl);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },

      onConnect: (frame) => {
        console.log('🎉 STOMP 연결 성공!', frame);
        setIsConnected(true);
        setConnectionStatus('연결됨');

        // 구독 설정 with 더 자세한 로깅
        console.log('📝 구독 설정 시작...');

        const subscriptions = [
          {
            destination: `/sub/readingroom/${roomId}/user-enter`,
            name: '사용자 입장',
          },
          {
            destination: `/sub/readingroom/${roomId}/user-leave`,
            name: '사용자 퇴장',
          },
          {
            destination: `/sub/readingroom/${roomId}/room-info-update`,
            name: '룸 정보 업데이트',
          },
          {
            destination: `/sub/readingroom/${roomId}/room-removed`,
            name: '룸 삭제',
          },
          {
            destination: `/sub/readingroom/${roomId}/bgm-toggle`,
            name: 'BGM 토글',
          },
          {
            destination: `/sub/readingroom/${roomId}/reading-books`,
            name: '읽는 책 정보',
          },
        ];

        subscriptions.forEach(({ destination, name }) => {
          try {
            const subscription = stompClient.subscribe(
              destination,
              (message) => {
                console.log(`📨 [${name}] 메시지 수신:`, {
                  destination,
                  body: message.body,
                  headers: message.headers,
                  rawMessage: message,
                });

                console.log(`💡 메시지 바디 원본:`, message.body);

                // 메시지 파싱 시도
                try {
                  const parsedBody = JSON.parse(message.body);
                  console.log(`📋 [${name}] 파싱된 데이터:`, parsedBody);
                } catch (parseError) {
                  console.log(
                    `📋 [${name}] 파싱 실패 (텍스트 메시지):`,
                    message.body,
                  );
                }
              },
            );

            console.log(`✅ 구독 성공: ${destination}`, subscription);
          } catch (subError) {
            console.error(`❌ 구독 실패: ${destination}`, subError);
          }
        });

        console.log('📝 모든 구독 설정 완료');

        // 연결 완료 후 자동 입장
        setTimeout(() => {
          console.log('🚪 자동 입장 시도...');
          enterRoom();
        }, 1000);
      },

      onStompError: (frame) => {
        console.error('💥 STOMP 브로커 오류:', frame);
        setIsConnected(false);
        setConnectionStatus(
          `STOMP 오류: ${frame.headers?.message || '알 수 없는 오류'}`,
        );
      },

      onWebSocketError: (error) => {
        console.error('🔌 WebSocket 오류:', error);
        setIsConnected(false);
        setConnectionStatus('WebSocket 오류');
      },

      onWebSocketClose: (event) => {
        console.log('🔌 WebSocket 연결 종료:', event);
        setIsConnected(false);
        setConnectionStatus(`연결 종료: ${event.code} - ${event.reason}`);
      },

      onDisconnect: (frame) => {
        console.log('👋 STOMP 연결 해제:', frame);
        setIsConnected(false);
        setConnectionStatus('연결 해제됨');
      },

      debug: (str) => {
        console.log('🐛 STOMP Debug:', str);
      },
    });

    console.log('🔄 STOMP 클라이언트 활성화...');
    stompClient.activate();
    setClient(stompClient);
    clientRef.current = stompClient;

    return () => {
      console.log('🧹 컴포넌트 언마운트 - 연결 정리');
      if (clientRef.current && clientRef.current.connected) {
        leaveRoom();
        setTimeout(() => {
          clientRef.current?.deactivate();
        }, 100);
      }
    };
  }, [roomId, userId]);

  // 방 입장
  const enterRoom = useCallback(() => {
    if (clientRef.current && clientRef.current.connected) {
      const enterData = {
        roomId: roomId,
        userId: userId,
      };

      console.log('🚪 입장 메시지 발송 시도:', enterData);

      try {
        clientRef.current.publish({
          destination: '/pub/enter',
          body: JSON.stringify(enterData),
          headers: {
            'content-type': 'application/json',
          },
        });
        console.log('✅ 입장 메시지 발송 완료');
      } catch (error) {
        console.error('❌ 입장 메시지 발송 실패:', error);
      }
    } else {
      console.warn('⚠️ 클라이언트가 연결되지 않음 - 입장 메시지 발송 불가');
    }
  }, [roomId, userId]);

  // 방 퇴장
  const leaveRoom = useCallback(() => {
    if (clientRef.current && clientRef.current.connected) {
      const leaveData = {
        roomId: roomId,
        userId: userId,
      };

      console.log('🚪 퇴장 메시지 발송:', leaveData);

      try {
        clientRef.current.publish({
          destination: '/pub/leave',
          body: JSON.stringify(leaveData),
          headers: {
            'content-type': 'application/json',
          },
        });
        console.log('✅ 퇴장 메시지 발송 완료');
      } catch (error) {
        console.error('❌ 퇴장 메시지 발송 실패:', error);
      }
    }
  }, [roomId, userId]);

  // 책 선택
  const selectBook = useCallback(
    (bookId: string) => {
      if (clientRef.current && clientRef.current.connected) {
        const bookData = {
          roomId: roomId,
          userId: userId,
          bookId: bookId,
        };

        console.log('📚 책 선택 메시지 발송:', bookData);

        try {
          clientRef.current.publish({
            destination: '/pub/reading-books',
            body: JSON.stringify(bookData),
            headers: {
              'content-type': 'application/json',
            },
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

  // BGM 토글
  const toggleBgm = useCallback(
    (bgmOn: boolean) => {
      if (clientRef.current && clientRef.current.connected) {
        const bgmData = {
          roomId: roomId,
          userId: userId,
          bgmOn: bgmOn,
        };

        console.log('🎵 BGM 토글 메시지 발송:', bgmData);

        try {
          clientRef.current.publish({
            destination: '/pub/bgm-toggle',
            body: JSON.stringify(bgmData),
            headers: {
              'content-type': 'application/json',
            },
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

  // 추가 구독
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

  // 테스트용 함수들
  const testPublish = useCallback(() => {
    if (clientRef.current && clientRef.current.connected) {
      console.log('🧪 테스트 메시지 발송...');
      try {
        clientRef.current.publish({
          destination: '/pub/enter',
          body: JSON.stringify({
            roomId: roomId,
            userId: userId + '_test',
            test: true,
          }),
          headers: {
            'content-type': 'application/json',
          },
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
    });
  }, [isConnected, connectionStatus]);

  const actions: WebSocketActions = {
    enterRoom,
    leaveRoom,
    selectBook,
    toggleBgm,
    subscribe,
    testPublish,
    checkConnection,
  };

  return {
    client,
    isConnected,
    connectionStatus, // 연결 상태 메시지 추가
    actions,
  };
};

export default useWebSocket;
