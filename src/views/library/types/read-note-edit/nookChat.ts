export interface getNookChatResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: NookChat[];
}
export interface NookChat {
  message: string;
  chatType: 'USER' | 'SYSTEM' | 'COMMENT';
  createdDate: string;
}

export interface NookChatSendRequest {
  bookId: number;
  content: string;
}

export interface NookChatSendResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: NookChat;
}

export interface NookChatMessageSaveResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: NookChat;
}
