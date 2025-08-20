import instance from '../../../../apis/instance';
import {
  getNookChatResponse,
  NookChatSendRequest,
  NookChatSendResponse,
  NookChatMessageSaveResponse,
} from '../../types/read-note-edit/nookChat';

const nookChatFetch = async (
  bookId: number,
): Promise<getNookChatResponse | undefined> => {
  try {
    const response = await instance.get<getNookChatResponse>(
      '/api/records/chat/view',
      {
        params: {
          bookId,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching nook chat:', error);
    return undefined;
  }
};

const nookChatPostFetch = async ({
  bookId,
  message,
}: NookChatSendRequest): Promise<NookChatSendResponse | undefined> => {
  try {
    const response = await instance.post<NookChatSendResponse>(
      '/api/records/send-message',
      {
        bookId,
        message,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error sending nook chat:', error);
    return undefined;
  }
};

const nookChatMessageSaveFetch = async (
  messageId: number,
): Promise<NookChatMessageSaveResponse | undefined> => {
  try {
    const response = await instance.post<NookChatMessageSaveResponse>(
      `/api/records/chat/${messageId}/save`,
    );
    return response.data;
  } catch (error) {
    console.error('Error saving nook chat message:', error);
    return undefined;
  }
};

export { nookChatFetch, nookChatPostFetch, nookChatMessageSaveFetch };
