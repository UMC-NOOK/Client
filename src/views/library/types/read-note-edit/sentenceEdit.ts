export interface SentencePut {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Sentence;
}

export interface Sentence {
  senrntenceId: number;
  page: string;
  content: string;
  createdDate: string;
}

export interface SentenceDelete {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
