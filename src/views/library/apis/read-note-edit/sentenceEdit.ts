import instance from '../../../../apis/instance';
import {
  SentencePut,
  SentenceDelete,
} from '../../types/read-note-edit/sentenceEdit';

const sentencePutFetch = async (
  recordId: number,
  sentenceData: { page: string; content: string },
): Promise<SentencePut | undefined> => {
  try {
    const response = await instance.put<SentencePut>(
      `/api/records/sentence/${recordId}`,
      {
        recordId,
        page: sentenceData.page,
        content: sentenceData.content,
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error updating sentence:', error);
    return undefined;
  }
};

const sentenceDeleteFetch = async (
  recordId: number,
): Promise<SentenceDelete | undefined> => {
  try {
    const response = await instance.delete<SentenceDelete>(
      `/api/records/sentence/${recordId}`,
    );

    return response.data;
  } catch (error) {
    console.error('Error deleting sentence:', error);
    return undefined;
  }
};

export { sentencePutFetch, sentenceDeleteFetch };
