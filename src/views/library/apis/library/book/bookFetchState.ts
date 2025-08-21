import instance from '../../../../../apis/instance';

export interface bookFetchStateProps {
  status: 'BOOKMARK' | 'READING' | 'FINISHED';
  page?: number;
  size: number;
  sort: 'RECENT' | 'LATEST' | 'TITLE' | 'RATING';
}

const bookFetchState = async ({
  status = 'BOOKMARK',
  page,
  size = 8,
  sort,
}: bookFetchStateProps) => {
  try {
    const res = await instance.get(`api/bookshelf`, {
      params: { status, page, size, sort },
    });
    return res.data.result;
  } catch (err) {
    console.log('월별책조회', err);
  }
};

export default bookFetchState;
