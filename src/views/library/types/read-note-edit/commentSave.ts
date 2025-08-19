export interface CommentSave {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Comment;
}

export interface Comment {
  commentId: number;
  content: string;
  createdDate: string;
}
