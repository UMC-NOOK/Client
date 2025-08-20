export interface getNookChatResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: NookChat[];
}
export interface NookChat {
  chatRecordId: number;
  message: string;
  chatType: 'USER' | 'SYSTEM' | 'COMMENT';
  createdDate: string;
}

export interface NookChatSendRequest {
  bookId: number;
  message: string;
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
  result: {
    commentId: number;
    content: string;
    createdDate: string;
  };
}
