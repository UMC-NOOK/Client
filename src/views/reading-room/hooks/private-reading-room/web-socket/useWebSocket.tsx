// hooks/useWebSocket.ts
import { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import {
  UseWebSocketProps,
  ReceivedMessages,
  WebSocketActions,
} from '../../../types/private-reading-room/websocket/websocket';
import { createStompClient } from '../../../utils/private-reading-room/stompClient';
import { createMessageHandlers } from '../../../utils/private-reading-room/messageHandlers';
import {
  createSubscriptions,
  setupSubscriptions,
} from '../../../utils/private-reading-room/subscriptions';
import { useWebSocketActions } from './useWebSocketActions';

const useWebSocket = ({ roomId, userId }: UseWebSocketProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] =
    useState<string>('초기화 중...');
  const [messages, setMessages] = useState<ReceivedMessages>({
    userEnter: [],
    userLeave: [],
    roomInfoUpdate: null,
    roomRemoved: false,
    bgmToggle: null,
    readingBooks: [],
    allCurrentBooks: [],
  });
  const clientRef = useRef<Client | null>(null);

  // WebSocket 액션들
  const actions = useWebSocketActions(
    roomId,
    userId,
    clientRef,
    isConnected,
    connectionStatus,
    messages,
    setMessages,
  );

  // 웹소켓 연결
  useEffect(() => {
    console.log('🚀 WebSocket 연결 시도 시작', { roomId, userId });
    setConnectionStatus('WebSocket 생성 중...');

    // 메시지 핸들러 생성
    const messageHandlers = createMessageHandlers(setMessages);

    // 구독 설정 생성
    const subscriptions = createSubscriptions(roomId, messageHandlers);

    // 연결 이벤트 핸들러들
    // hooks/useWebSocket.ts의 handleConnect에 추가
    const handleConnect = (frame: any) => {
      // console.log('🎉 STOMP 연결 성공!', frame);
      setIsConnected(true);
      setConnectionStatus('연결됨');

      // 구독 설정
      setupSubscriptions(stompClient, subscriptions);

      // 방 상태 요청 추가
      setTimeout(() => {
        if (stompClient && stompClient.connected) {
          // 현재 방 상태 요청
          stompClient.publish({
            destination: `/pub/all-reading-books/${roomId}`,
            body: JSON.stringify({ roomId }),
            headers: { 'content-type': 'application/json' },
          });

          // 자동 입장
          const enterData = { roomId, userId };
          stompClient.publish({
            destination: '/pub/enter',
            body: JSON.stringify(enterData),
            headers: { 'content-type': 'application/json' },
          });
        }
      }, 1000);
    };

    const handleStompError = (frame: any) => {
      // console.error('💥 STOMP 브로커 오류:', frame);
      setIsConnected(false);
      setConnectionStatus(
        `STOMP 오류: ${frame.headers?.message || '알 수 없는 오류'}`,
      );
    };

    const handleWebSocketError = (error: any) => {
      // console.error('🔌 WebSocket 오류:', error);
      setIsConnected(false);
      setConnectionStatus('WebSocket 오류');
    };

    const handleWebSocketClose = (event: any) => {
      // console.log('🔌 WebSocket 연결 종료:', event);
      setIsConnected(false);
      setConnectionStatus(`연결 종료: ${event.code} - ${event.reason}`);
    };

    const handleDisconnect = (frame: any) => {
      // console.log('👋 STOMP 연결 해제:', frame);
      setIsConnected(false);
      setConnectionStatus('연결 해제됨');
    };

    // STOMP 클라이언트 생성
    const stompClient = createStompClient(
      handleConnect,
      handleStompError,
      handleWebSocketError,
      handleWebSocketClose,
      handleDisconnect,
      setConnectionStatus,
    );

    // console.log('🔄 STOMP 클라이언트 활성화...');
    stompClient.activate();
    setClient(stompClient);
    clientRef.current = stompClient;

    return () => {
      // console.log('🧹 컴포넌트 언마운트 - 연결 정리');
      if (clientRef.current && clientRef.current.connected) {
        actions.leaveRoom();
        setTimeout(() => {
          clientRef.current?.deactivate();
        }, 100);
      }
    };
  }, [roomId, userId]);

  return {
    client,
    isConnected,
    connectionStatus,
    messages,
    actions: actions as WebSocketActions,
  };
};

export default useWebSocket;
