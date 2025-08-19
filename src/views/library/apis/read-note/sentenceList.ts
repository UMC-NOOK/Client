import instance from '../../../../apis/instance';
import { SentenceList } from '../../types/read-note/sentenceList';

const sentenceListFetch = async (
  bookId: string | undefined,
): Promise<SentenceList | undefined> => {
  try {
    const response = await instance.get<SentenceList>(
      '/api/records/sentence/list',
      {
        params: { bookId },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching sentence list:', error);
    return undefined;
  }
};

export default sentenceListFetch;
