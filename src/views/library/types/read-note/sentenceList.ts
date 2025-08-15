export interface SentenceList {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Sentence[];
}
export interface Sentence {
  recordId: number;
  page: string;
  content: string;
  recordType: 'RECORD' | 'SENTENCE';
  createdDate: string;
  comments: Comment[];
}

export interface Comment {
  commentId: number;
  content: string;
  createdDate: string;
}
