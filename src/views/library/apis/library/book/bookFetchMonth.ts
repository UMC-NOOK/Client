import instance from '../../../../../apis/instance';

export interface bookFetchMonthProps {
  yearMonth: string;
}

const bookFetchMonth = async ({ yearMonth }: bookFetchMonthProps) => {
  try {
    const res = await instance.get(`api/bookshelf/my-books/monthly`, {
      params: { yearMonth },
    });
    return res.data.result;
  } catch (err) {
    console.log('월별책조회', err);
  }
};

export default bookFetchMonth;
