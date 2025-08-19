import instance from '../../../../apis/instance';
import {
  CommentPut,
  CommentDelete,
} from '../../types/read-note-edit/commentEdit';

const commentPutFetch = async (
  commentId: number,
  content: string,
): Promise<CommentPut | undefined> => {
  try {
    const response = await instance.put<CommentPut>(
      `/api/records/comment/${commentId}`,
      {
        commentId,
        content,
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    return undefined;
  }
};

const commentDeleteFetch = async (
  commentId: number,
): Promise<CommentDelete | undefined> => {
  try {
    const response = await instance.delete<CommentDelete>(
      `/api/records/comment/${commentId}`,
    );

    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    return undefined;
  }
};

export { commentPutFetch, commentDeleteFetch };
