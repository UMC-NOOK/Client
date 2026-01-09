import instance from '../../../../apis/instance';
import { SentenceSave } from '../../types/read-note-edit/sentenceSave';

const sentencePostFetch = async (
  bookId: number,
  page: string | null,
  content: string,
): Promise<SentenceSave | undefined> => {
  try {
    const response = await instance.post<SentenceSave>(
      '/api/records/sentence/save',
      {
        bookId,
        page,
        content,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error saving sentence:', error);
    return undefined;
  }
};

export default sentencePostFetch;
