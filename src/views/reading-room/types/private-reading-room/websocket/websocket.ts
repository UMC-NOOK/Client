// types/websocket.types.ts
import { IMessage } from '@stomp/stompjs';

export interface UseWebSocketProps {
  roomId: string;
  userId: string;
  bookId?: string;
  bgmOn?: string;
}

export interface ReceivedMessages {
  userEnter: any[];
  userLeave: any[];
  roomInfoUpdate: any | null;
  roomRemoved: boolean;
  bgmToggle: any | null;
  readingBooks: any[];
  allCurrentBooks: any[];
}

export interface WebSocketActions {
  enterRoom: () => void;
  leaveRoom: () => void;
  selectBook: (bookId: string) => void;
  toggleBgm: (bgmOn: boolean) => void;
  subscribe: (
    destination: string,
    callback: (message: IMessage) => void,
  ) => void;
  clearMessages: () => void;
  testPublish: () => void;
  checkConnection: () => void;
  allCurrentBook: () => void;
}

export interface SubscriptionConfig {
  destination: string;
  name: string;
  handler: (message: IMessage) => void;
}
