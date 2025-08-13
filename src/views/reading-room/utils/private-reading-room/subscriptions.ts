// utils/subscriptions.ts
import { Client } from '@stomp/stompjs';
import { SubscriptionConfig } from '../../types/private-reading-room/websocket/websocket';

export const createSubscriptions = (
  roomId: string,
  messageHandlers: ReturnType<
    typeof import('./messageHandlers').createMessageHandlers
  >,
): SubscriptionConfig[] => [
  {
    destination: `/sub/readingroom/${roomId}/user-enter`,
    name: '사용자 입장',
    handler: messageHandlers.handleUserEnter,
  },
  {
    destination: `/sub/readingroom/${roomId}/user-leave`,
    name: '사용자 퇴장',
    handler: messageHandlers.handleUserLeave,
  },
  {
    destination: `/sub/readingroom/${roomId}/room-info-update`,
    name: '룸 정보 업데이트',
    handler: messageHandlers.handleRoomInfoUpdate,
  },
  {
    destination: `/sub/readingroom/${roomId}/room-removed`,
    name: '룸 삭제',
    handler: messageHandlers.handleRoomRemoved,
  },
  {
    destination: `/sub/readingroom/${roomId}/bgm-toggle`,
    name: 'BGM 토글',
    handler: messageHandlers.handleBgmToggle,
  },
  {
    destination: `/sub/readingroom/${roomId}/reading-books`,
    name: '읽는 책 정보',
    handler: messageHandlers.handleReadingBooks,
  },
  {
    destination: `/sub/readingroom/${roomId}/all-reading-books`,
    name: '읽는 책 정보',
    handler: messageHandlers.handleAllCurrentBooks,
  },
];

export const setupSubscriptions = (
  client: Client,
  subscriptions: SubscriptionConfig[],
) => {
  console.log('📝 구독 설정 시작...');

  subscriptions.forEach(({ destination, name, handler }) => {
    try {
      const subscription = client.subscribe(destination, (message) => {
        console.log(`📨 [${name}] 메시지 수신:`, {
          destination,
          body: message.body,
          headers: message.headers,
        });
        handler(message);
      });

      console.log(`✅ 구독 성공: ${destination}`, subscription);
    } catch (subError) {
      console.error(`❌ 구독 실패: ${destination}`, subError);
    }
  });

  console.log('📝 모든 구독 설정 완료');
};
