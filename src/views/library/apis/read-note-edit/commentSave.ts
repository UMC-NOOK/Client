import instance from '../../../../apis/instance';
import { CommentSave } from '../../types/read-note-edit/commentSave';

const commentPostFetch = async (
  bookId: number,
  parentRecordId: number | null,
  content: string,
): Promise<CommentSave | undefined> => {
  try {
    const response = await instance.post<CommentSave>(
      '/api/records/comment/save',
      {
        bookId,
        parentRecordId,
        content,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error saving comment:', error);
    return undefined;
  }
};

export default commentPostFetch;
