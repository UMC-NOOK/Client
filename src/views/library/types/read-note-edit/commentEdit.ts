export interface CommentPut {
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

export interface CommentDelete {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
