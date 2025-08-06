import instance from '../../../../../apis/instance';

export interface bookFetchStateProps {
  status: 'BOOKMARK' | 'READING' | 'FINISHED';
  cursorBookId?: number;
  size: number;
  sort: 'recent' | 'latest' | 'title' | 'rating';
}

const bookFetchState = async ({
  status = 'BOOKMARK',
  cursorBookId,
  size = 10,
  sort,
}: bookFetchStateProps) => {
  try {
    const res = await instance.get(`api/bookshelf`, {
      params: { status, cursorBookId, size, sort },
    });
    return res.data;
  } catch (err) {
    console.log('월별책조회', err);
  }
};

export default bookFetchState;
