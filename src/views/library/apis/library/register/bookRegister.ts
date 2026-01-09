import instance from '../../../../../apis/instance';

const bookFetchMonth = async () => {
  try {
    const res = await instance.post(`api/bookshelf/register`);
    return res.data;
  } catch (err) {
    console.log('책등록', err);
  }
};

export default bookFetchMonth;
