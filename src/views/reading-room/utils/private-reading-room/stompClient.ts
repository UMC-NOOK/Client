// utils/stompClient.ts
import { Client } from '@stomp/stompjs';

export const createStompClient = (
  onConnect: (frame: any) => void,
  onStompError: (frame: any) => void,
  onWebSocketError: (error: any) => void,
  onWebSocketClose: (event: any) => void,
  onDisconnect: (frame: any) => void,
  setConnectionStatus: (status: string) => void,
) => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL?.replace(/^https?:\/\//, '') ||
    'localhost:8080';
  const protocol = import.meta.env.VITE_API_BASE_URL?.startsWith('https')
    ? 'wss'
    : 'ws';
  const socketUrl = `${protocol}://${baseUrl}ws`;

  console.log('🌐 WebSocket URL:', socketUrl);
  setConnectionStatus(`연결 시도: ${socketUrl}`);

  return new Client({
    webSocketFactory: () => new WebSocket(socketUrl),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect,
    onStompError,
    onWebSocketError,
    onWebSocketClose,
    onDisconnect,
    // debug: (str) => console.log('🐛 STOMP Debug:', str),
  });
};
